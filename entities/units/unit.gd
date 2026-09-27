class_name TacticalUnit extends CharacterBody3D

signal step_taken(unit: TacticalUnit, current_grid_pos: Vector3i)
signal ap_changed(new_ap)

# 0 = Player 1, 1 = Player 2 / AI, etc.
@export var team_id: int = 0
@export var max_ap: int = 60

const OFFSET: Vector3 = Vector3(0, 0.5, 0)

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
	global_position = grid_map.map_to_local(start_cell) + OFFSET


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

		# Keep the raw path point for perfect grid math (Y = 0)
		var raw_target = path[i]
		#Add the offset ONLY for the physical tween (Y = 0.5)
		var target_pos = raw_target + OFFSET

		# Calculate the cost of JUST this next step (Turn Cost + Step Cost)
		var turn_cost = grid_manager.calculate_turn_cost(global_transform, target_pos)

		# Use our tracked current_grid_pos and the raw_target for flawless tile math
		var grid_current = current_grid_pos
		var grid_next = grid_map.local_to_map(raw_target)
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

		# Rotation tween
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

		# Movement tween
		if global_position.distance_to(target_pos) > 0.01:
			var move_tween = get_tree().create_tween()
			move_tween.tween_property(self, "global_position", target_pos, 0.2)
			await move_tween.finished

		# Safely update our grid tracking using the pure grid cell coordinate
		current_grid_pos = grid_next

		# Broadcast that we took a step so the game can check for interrupts (FOV/Overwatch)
		step_taken.emit(self, current_grid_pos)


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

	await tween.finished

	# Tell the server to recalculate sightlines.
	step_taken.emit(self, current_grid_pos)
