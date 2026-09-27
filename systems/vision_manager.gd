class_name VisionManager extends Node

@export var vision_range: float = 15.0
@export var vision_angle: float = 90.0

# Keeps track of all units on the board
var active_units: Array[TacticalUnit] = []

# Dictionary storing what each team can see.
# e.g., { 0: [Alien1, Alien2], 1: [Player1] }
var team_visibility: Dictionary = { }


func register_unit(unit: TacticalUnit) -> void:
	if not active_units.has(unit):
		active_units.append(unit)

		# Ensure the team exists in our dictionary
		if not team_visibility.has(unit.team_id):
			team_visibility[unit.team_id] = []

		# Listen to this unit's footsteps
		unit.step_taken.connect(_on_unit_step_taken)


func initialize_all_vision() -> void:
	print("--- Initializing starting vision ---")
	for team in team_visibility.keys():
		_update_team_vision(team)


func _on_unit_step_taken(
	_moving_unit: TacticalUnit,
	_from_cell: Vector3i,
	_to_cell: Vector3i,
) -> void:
	# When ANY unit moves, sightlines change for EVERYONE.
	# We must recalculate all teams so enemies can spot the player (Overwatch logic).
	for team in team_visibility.keys():
		_update_team_vision(team)


func _update_team_vision(team_id: int) -> void:
	var newly_spotted_enemies = []

	# Get all units belonging to this team
	var friendly_units = active_units.filter(
		func(u):
			return u.team_id == team_id,
	)
	# Get all units NOT belonging to this team
	var enemy_units = active_units.filter(
		func(u):
			return u.team_id != team_id,
	)

	for enemy in enemy_units:
		var is_visible = false

		# Check if ANY friendly unit can see this enemy
		for friendly in friendly_units:
			if _check_line_of_sight(friendly, enemy):
				is_visible = true
				break

		# If the enemy is visible but wasn't in our list before, it's a new spot!
		if is_visible and not team_visibility[team_id].has(enemy):
			team_visibility[team_id].append(enemy)
			newly_spotted_enemies.append(enemy)

		# If they are no longer visible, remove them from the list
		elif not is_visible and team_visibility[team_id].has(enemy):
			team_visibility[team_id].erase(enemy)

	# If the active unit just spotted a new enemy mid-stride, interrupt it!
	if newly_spotted_enemies.size() > 0:
		print("Team ", team_id, " spotted an enemy! Interrupting movement.")
		# For multiplayer, the server would send an RPC here. For now, directly halt the active unit.
		var active_friendly = friendly_units.filter(
			func(u):
				return u.interrupt_movement == false,
		)
		for unit in active_friendly:
			unit.interrupt_movement = true


func _check_line_of_sight(viewer: TacticalUnit, target: TacticalUnit) -> bool:
	# 1. Distance
	var dist = viewer.global_position.distance_to(target.global_position)
	if dist > vision_range:
		return false

	# 2. Angle
	var dir_to_target = (target.global_position - viewer.global_position).normalized()
	dir_to_target.y = 0
	var forward = -viewer.global_transform.basis.z
	forward.y = 0

	if forward.length_squared() > 0.01:
		forward = forward.normalized()
	else:
		forward = Vector3(0, 0, -1)

	var angle = rad_to_deg(forward.angle_to(dir_to_target))
	if angle > vision_angle / 2.0:
		return false

	# 3. Raycast (Obstruction)
	var eye_offset = Vector3(0, 1.0, 0)
	var space_state = viewer.get_world_3d().direct_space_state
	var query = PhysicsRayQueryParameters3D.create(
		viewer.global_position + eye_offset,
		target.global_position + eye_offset,
	)

	query.exclude = [viewer.get_rid(), target.get_rid()]
	var result = space_state.intersect_ray(query)

	if result:
		return false
	return true
