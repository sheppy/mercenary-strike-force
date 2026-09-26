class_name TacticalUnit extends Node3D

signal step_taken(current_grid_pos)
signal ap_changed(new_ap)

@export var max_ap: int = 60

# The setter automatically emits the signal whenever current_ap goes up or down
var current_ap: int = max_ap:
	set(value):
		current_ap = value
		ap_changed.emit(current_ap)

# The unit's actual source of truth for location
var current_grid_pos: Vector3i
var interrupt_movement: bool = false # Other systems can set this to true to halt the unit


func _ready() -> void:
	add_to_group("units")


func initialize_position(grid_map: GridMap, start_cell: Vector3i) -> void:
	current_grid_pos = start_cell
	global_position = grid_map.map_to_local(start_cell) + Vector3(0, 0.5, 0)


func reset_ap() -> void:
	current_ap = max_ap
	print("Unit AP Reset to: ", current_ap)


func move_along_path(
	grid_map: GridMap,
	grid_manager: GridManager,
	path: PackedVector3Array,
) -> void:
	interrupt_movement = false

	for i in range(1, path.size()):
		if interrupt_movement:
			print("Movement interrupted!")
			break

		var target_pos = path[i]

		# 1. Calculate the cost of JUST this next step (Turn Cost + Step Cost)
		var turn_cost = grid_manager.calculate_turn_cost(global_transform, target_pos)

		var grid_current = grid_map.local_to_map(global_position)
		var grid_next = grid_map.local_to_map(target_pos)
		var is_diagonal = (
			abs(grid_next.x - grid_current.x) == 1 and abs(grid_next.z - grid_current.z) == 1
		)
		var step_cost = 6 if is_diagonal else 4

		var total_step_cost = turn_cost + step_cost

		# 2. Stop if we can't afford the next step
		if current_ap < total_step_cost:
			print("Out of AP! Stopping early.")
			break

		# 3. Deduct AP and execute the step
		current_ap -= total_step_cost

		var target_look_pos = Vector3(target_pos.x, global_position.y, target_pos.z)
		if global_position.distance_to(target_look_pos) > 0.01:
			var original_rot = rotation.y
			look_at(target_look_pos, Vector3.UP)
			var target_rot = rotation.y

			rotation.y = original_rot

			var diff = wrapf(target_rot - original_rot, -PI, PI)
			target_rot = original_rot + diff

			# Tween the rotation and wait for it to finish
			if abs(diff) > 0.01:
				var rot_tween = get_tree().create_tween()
				rot_tween.tween_property(self, "rotation:y", target_rot, 0.1)
				await rot_tween.finished

		if global_position.distance_to(target_pos) > 0.01:
			var move_tween = get_tree().create_tween()
			move_tween.tween_property(self, "global_position", target_pos, 0.2)
			await move_tween.finished

		current_grid_pos = grid_map.local_to_map(global_position)

		# 4. Broadcast that we took a step so the game can check for interrupts (FOV/Overwatch)
		step_taken.emit(current_grid_pos)

# func move_along_path(grid_map: GridMap, path: PackedVector3Array) -> void:
# 	for point in path:
# 		var target_pos = point + Vector3(0, 0.5, 0)
# 		var target_look_pos = Vector3(target_pos.x, global_position.y, target_pos.z)
#
# 		# 1. Only rotate if the target is actually away from our current position
# 		if global_position.distance_to(target_look_pos) > 0.01:
# 			var original_rot = rotation.y
# 			look_at(target_look_pos, Vector3.UP)
# 			var target_rot = rotation.y
#
# 			rotation.y = original_rot
#
# 			var diff = wrapf(target_rot - original_rot, -PI, PI)
# 			target_rot = original_rot + diff
#
# 			# Tween the rotation and wait for it to finish
# 			if abs(diff) > 0.01:
# 				var rot_tween = get_tree().create_tween()
# 				rot_tween.tween_property(self, "rotation:y", target_rot, 0.1)
# 				await rot_tween.finished
#
# 		# 2. Tween the movement step (skip if we are already there)
# 		if global_position.distance_to(target_pos) > 0.01:
# 			var move_tween = get_tree().create_tween()
# 			move_tween.tween_property(self, "global_position", target_pos, 0.2)
# 			await move_tween.finished
#
# 	if path.size() > 0:
# 		current_grid_pos = grid_map.local_to_map(path[path.size() - 1])


func rotate_towards(target_world_pos: Vector3) -> void:
	var original_rot = rotation.y
	# Look at the target, keeping the Y axis flat
	look_at(Vector3(target_world_pos.x, global_position.y, target_world_pos.z), Vector3.UP)
	var target_rot = rotation.y

	# Reset instantly so the tween can do the actual animation
	rotation.y = original_rot

	# Ensure it turns the shortest distance (no spinning 270 degrees the wrong way)
	var diff = wrapf(target_rot - original_rot, -PI, PI)
	target_rot = original_rot + diff

	var tween = get_tree().create_tween()
	tween.tween_property(self, "rotation:y", target_rot, 0.15)
