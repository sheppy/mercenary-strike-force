class_name TacticalUnit extends CharacterBody3D

signal step_taken(unit: TacticalUnit, from_cell: Vector3i, to_cell: Vector3i)
signal ap_changed(new_ap)

const OFFSET: Vector3 = Vector3(0, 0.5, 0)

# 0 = Player 1, 1 = Player 2 / AI, etc.
@export var team_id: int = 0
@export var max_ap: int = 60


# The setter automatically emits the signal whenever current_ap goes up or down
var current_ap: int = max_ap:
	set(value):
		current_ap = value
		ap_changed.emit(current_ap)

var current_grid_pos: Vector3i # The unit's actual source of truth for location
var interrupt_movement: bool = false # Other systems can set this to true to halt the unit


func _ready() -> void:
	add_to_group("units")


func initialize_position(grid_map: GridMap, start_cell: Vector3i) -> void:
	current_grid_pos = start_cell

	# 1. Get the exact mathematical center of the cell in the grid's local space
	var cell_center_local := grid_map.map_to_local(start_cell)

	# 2. Convert it to world space so the unit aligns perfectly even if the GridMap was moved
	var cell_center_global := grid_map.to_global(cell_center_local)

	# 3. Snap the unit to the dead center, offsetting Y so the capsule sits on the floor
	global_position = cell_center_global + OFFSET


func spend_ap(amount: int) -> bool:
	if current_ap >= amount:
		current_ap -= amount
		return true
	return false


func reset_ap() -> void:
	current_ap = max_ap
	print("Unit AP Reset to: ", current_ap)


func move_along_steps(steps: Array[MovementStep]) -> void:
	interrupt_movement = false

	for step: MovementStep in steps:
		if interrupt_movement:
			print("Movement interrupted!")
			break

		if not spend_ap(step.ap_cost):
			print("Out of AP! Stopping early. Need: ", step.ap_cost, " Have: ", current_ap)
			break

		# 1. Rotate
		var target_look_pos := Vector3(step.world_pos.x, global_position.y, step.world_pos.z)
		if global_position.distance_to(target_look_pos) > 0.01:
			var original_rot := rotation.y
			look_at(target_look_pos, Vector3.UP)
			var target_rot := rotation.y
			rotation.y = original_rot

			var diff := wrapf(target_rot - original_rot, -PI, PI)
			target_rot = original_rot + diff
			if abs(diff) > 0.01:
				var rot_tween := get_tree().create_tween()
				rot_tween.tween_property(self, "rotation:y", target_rot, 0.1)
				await rot_tween.finished

		# 2. Move
		if global_position.distance_to(step.world_pos) > 0.01:
			var move_tween := get_tree().create_tween()
			move_tween.tween_property(self, "global_position", step.world_pos, 0.2)
			await move_tween.finished

		# 3. Update grid tracking & notify systems
		var from_cell := current_grid_pos
		current_grid_pos = step.grid_cell
		step_taken.emit(self, from_cell, current_grid_pos)


func rotate_towards(target_world_pos: Vector3) -> void:
	var original_rot := rotation.y
	# Look at the target, keeping the Y axis flat
	look_at(Vector3(target_world_pos.x, global_position.y, target_world_pos.z), Vector3.UP)
	var target_rot := rotation.y

	# Reset instantly so the tween can do the actual animation
	rotation.y = original_rot

	# Ensure it turns the shortest distance (no spinning 270 degrees the wrong way)
	var diff := wrapf(target_rot - original_rot, -PI, PI)
	target_rot = original_rot + diff

	var tween := get_tree().create_tween()
	tween.tween_property(self, "rotation:y", target_rot, 0.15)

	await tween.finished

	# Tell the server to recalculate sightlines.
	step_taken.emit(self, current_grid_pos, current_grid_pos)
