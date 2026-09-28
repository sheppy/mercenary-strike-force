extends Node

signal active_unit_changed(new_unit: TacticalUnit)

enum InputState {
	IDLE,
	PREVIEW,
	ANIMATING,
}

@export var camera: Camera3D
@export var grid_manager: GridManager
@export var active_unit: TacticalUnit
@export var cursor: Node3D

var team_units: Array[TacticalUnit] = [] # Array to hold all selectable units
var grid_map: GridMap
var current_state: InputState = InputState.IDLE
var preview_cell: Vector3i = Vector3i.MAX
var cached_path: PackedVector3Array
var cached_steps: Array[MovementStep] = []
var path_dots: Array = []


func _physics_process(_delta: float) -> void:
	if (
		TurnManager.current_state != TurnManager.TurnState.PLAYER_TURN
		or current_state == InputState.ANIMATING
	):
		cursor.visible = false
		if current_state != InputState.ANIMATING:
			_clear_preview()
		return

	var mouse_cell := _get_mouse_grid_cell()
	if mouse_cell != Vector3i.MAX:
		cursor.global_position = grid_map.map_to_local(mouse_cell) + Vector3(0, 0.01, 0)
		cursor.visible = true

		# Update preview dynamically if we are in IDLE state and mouse moves
		# if current_state == InputState.IDLE and mouse_cell != preview_cell:
		# preview_cell = mouse_cell
		# _update_path_visuals(mouse_cell)
	else:
		cursor.visible = false


func _unhandled_input(event: InputEvent) -> void:
	# Block all player clicks if it's not the player's turn!
	if (
		TurnManager.current_state != TurnManager.TurnState.PLAYER_TURN
		or current_state == InputState.ANIMATING
	):
		return

	# Spacebar to test ending turn (using physical keycode for reliability)
	if event.is_action_pressed("ui_end_turn"):
		TurnManager.end_player_turn()

	# Press TAB to cycle units
	if event.is_action_pressed("ui_next_unit"):
		if team_units.size() > 1:
			var current_idx = team_units.find(active_unit)
			var next_idx = (current_idx + 1) % team_units.size()

			active_unit = team_units[next_idx]
			_clear_preview()

			# Tell the rest of the game (like the HUD) that we swapped characters
			active_unit_changed.emit(active_unit)
			print("Switched to unit: ", active_unit.name)
		return

	# Right Click to Turn
	if event is InputEventMouseButton and event.button_index == MOUSE_BUTTON_RIGHT and event.pressed:
		var target_cell = _get_mouse_grid_cell()

		# Make sure we didn't click into the void or on ourselves
		if target_cell != Vector3i.MAX and target_cell != active_unit.current_grid_pos:
			var target_world := grid_map.map_to_local(target_cell)
			var turn_cost := grid_manager.calculate_turn_cost(
				active_unit.global_transform,
				target_world,
			)

			if turn_cost > 0 and active_unit.current_ap >= turn_cost:
				current_state = InputState.ANIMATING
				active_unit.spend_ap(turn_cost)
				print("Turned for ", turn_cost, " AP. Remaining: ", active_unit.current_ap)
				await active_unit.rotate_towards(target_world)
				current_state = InputState.IDLE
				_clear_preview()
				return

	# Left click to move
	if event is InputEventMouseButton and event.button_index == MOUSE_BUTTON_LEFT and event.pressed:
		var target_cell := _get_mouse_grid_cell()

		# Clicked off the map
		if target_cell == Vector3i.MAX:
			_clear_preview()
			return

		match current_state:
			InputState.IDLE:
				_preview_path_to(target_cell)

			InputState.PREVIEW:
				if target_cell == preview_cell:
					var final_steps: Array[MovementStep] = cached_steps.duplicate()

					current_state = InputState.ANIMATING
					_clear_preview(false)

					await active_unit.move_along_steps(final_steps)

					current_state = InputState.IDLE
				else:
					_preview_path_to(target_cell)


func _preview_path_to(target_cell: Vector3i) -> void:
	var path := grid_manager.calculate_path_by_cells(active_unit.current_grid_pos, target_cell)
	var current_facing := -active_unit.global_transform.basis.z
	current_facing.y = 0
	if current_facing.length_squared() > 0.01:
		current_facing = current_facing.normalized()
	else:
		current_facing = Vector3(0, 0, -1)

	var steps := grid_manager.get_path_steps(path, current_facing, grid_map)
	var cost := 0
	for step in steps:
		cost += step.ap_cost

	cached_path = path
	cached_steps = steps
	preview_cell = target_cell
	current_state = InputState.PREVIEW
	_update_path_visuals()
	print("Preview: Costs ", cost, " AP")


func _get_mouse_grid_cell() -> Vector3i:
	var mouse_pos := get_viewport().get_mouse_position()
	var ray_origin := camera.project_ray_origin(mouse_pos)
	var ray_normal := camera.project_ray_normal(mouse_pos)
	var ray_end := ray_origin + ray_normal * 1000.0

	# Call get_world_3d() on the camera instead of self
	var space_state := camera.get_world_3d().direct_space_state

	var query := PhysicsRayQueryParameters3D.create(ray_origin, ray_end)
	var result := space_state.intersect_ray(query)

	if result:
		return grid_map.local_to_map(result.position)
	return Vector3i.MAX


func _update_path_visuals() -> void:
	for dot in path_dots:
		dot.queue_free()
	path_dots.clear()

	if cached_steps.is_empty():
		return

	var simulated_ap := active_unit.current_ap

	for step: MovementStep in cached_steps:
		simulated_ap -= step.ap_cost

		# Render the dot
		var dot := CSGSphere3D.new()
		dot.radius = 0.15
		var mat := StandardMaterial3D.new()

		if simulated_ap >= 0:
			mat.albedo_color = (
				Color(0, 1, 0)
				if current_state == InputState.PREVIEW
				else Color(0, 0.5, 1)
			)
		else:
			mat.albedo_color = Color(1, 0, 0) # Red for unreachable

		mat.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
		dot.material = mat
		# step.world_pos is target_world (Y=1.0). Dot hovers right above floor at Y=0.7:
		dot.position = step.world_pos - TacticalUnit.OFFSET + Vector3(0, 0.2, 0)

		add_child(dot)
		path_dots.append(dot)


func _clear_preview(reset_to_idle: bool = true) -> void:
	if reset_to_idle:
		current_state = InputState.IDLE
	preview_cell = Vector3i.MAX
	cached_path = PackedVector3Array()
	cached_steps.clear()
	for dot in path_dots:
		dot.queue_free()
	path_dots.clear()
