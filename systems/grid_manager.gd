class_name GridManager extends Node

var astar = AStar3D.new()


func build_graph(grid_map: GridMap) -> void:
	astar.clear()
	var cells = grid_map.get_used_cells()
	var mesh_lib = grid_map.mesh_library

	# Define our movement costs based on keywords in the tile names
	var terrain_costs = {"mud": 2.0, "water": 3.0, "road": 0.5, "floor": 1.0}

	for cell in cells:
		var item_id = grid_map.get_cell_item(cell)
		var item_name = mesh_lib.get_item_name(item_id).to_lower()

		# Determine the base cost of this tile
		var point_weight = -1.0
		for key in terrain_costs.keys():
			if key in item_name:
				point_weight = terrain_costs[key]
				break

		# If the tile didn't match any terrain keywords, skip it (it's a wall or gap)
		if point_weight < 0:
			continue

		var world_pos = grid_map.map_to_local(cell)

		# Check for dynamic obstacles via raycast (standalone crates, barrels)
		var space_state = grid_map.get_world_3d().direct_space_state
		# Shoot a ray from 1 meter above the tile down to just above the floor
		var ray_start = world_pos + Vector3(0, 1.0, 0)
		var ray_end = world_pos + Vector3(0, 0.1, 0)

		var query = PhysicsRayQueryParameters3D.create(ray_start, ray_end)

		# If the ray hit a physics body, the tile is blocked
		if space_state.intersect_ray(query):
			continue

		# Add the point with its specific terrain weight
		var id = _get_id(cell)
		astar.add_point(id, world_pos, point_weight)

	# Connect edges (Cardinal + Safe Diagonals)
	for cell in cells:
		var id = _get_id(cell)
		if not astar.has_point(id):
			continue

		# 1. Connect Straight (Cardinal) Directions first
		var cardinal_dirs = [
			Vector3i(1, 0, 0),
			Vector3i(-1, 0, 0),
			Vector3i(0, 0, 1),
			Vector3i(0, 0, -1),
		]
		for dir in cardinal_dirs:
			var neighbor_id = _get_id(cell + dir)
			if astar.has_point(neighbor_id):
				astar.connect_points(id, neighbor_id, false)

		# 2. Connect Diagonals safely (Anti-Corner-Cutting)
		var diagonal_dirs = [
			Vector3i(1, 0, 1),
			Vector3i(1, 0, -1),
			Vector3i(-1, 0, 1),
			Vector3i(-1, 0, -1),
		]
		for dir in diagonal_dirs:
			var neighbor_id = _get_id(cell + dir)

			# Figure out the two straight tiles we have to pass between to make this diagonal move
			var side1_id = _get_id(cell + Vector3i(dir.x, 0, 0))
			var side2_id = _get_id(cell + Vector3i(0, 0, dir.z))

			# Only connect the diagonal IF the destination is walkable AND both adjacent sides are walkable
			if (
				astar.has_point(neighbor_id) and astar.has_point(side1_id)
				and astar.has_point(side2_id)
			):
				astar.connect_points(id, neighbor_id, false)


func calculate_path(
	grid_map: GridMap,
	start_world: Vector3,
	target_world: Vector3,
) -> PackedVector3Array:
	# Subtract the 0.5 Y offset so we query the actual floor tile beneath the unit's feet,
	# not the floating capsule center!
	var adjusted_start_world = start_world - Vector3(0, 0.5, 0)

	# Get the grid coordinate the unit is currently standing on
	var start_grid = grid_map.local_to_map(adjusted_start_world)

	# Get the grid coordinate we clicked for example
	var target_grid = grid_map.local_to_map(target_world)

	var start_id = _get_id(start_grid)
	var target_id = _get_id(target_grid)

	# If both points exist in our walkable graph, find a path!
	if astar.has_point(start_id) and astar.has_point(target_id):
		return astar.get_point_path(start_id, target_id)
	return PackedVector3Array()


func calculate_path_by_cells(start_cell: Vector3i, target_cell: Vector3i) -> PackedVector3Array:
	var start_id = _get_id(start_cell)
	var target_id = _get_id(target_cell)

	if astar.has_point(start_id) and astar.has_point(target_id):
		# Optional: slice(1) removes the starting tile you are already standing on,
		# so the path array only contains the destination steps!
		return astar.get_point_path(start_id, target_id)

	return PackedVector3Array()


# Helper function to turn a 3D grid coordinate (X, Y, Z) into a guaranteed positive integer ID
# Robust 64-bit coordinate packing (supports +-1048575 on X/Z, +-2047 on Y)
func _get_id(cell: Vector3i) -> int:
	var px = (cell.x + 0x80000) & 0x1FFFFF
	var py = (cell.y + 0x800) & 0xFFF
	var pz = (cell.z + 0x80000) & 0x1FFFFF
	return px | (py << 21) | (pz << 33)


func calculate_turn_cost(current_transform: Transform3D, target_world_pos: Vector3) -> int:
	var current_pos = current_transform.origin
	var dir = (target_world_pos - current_pos)
	dir.y = 0

	if dir.length_squared() < 0.01:
		return 0

	dir = dir.normalized()
	var current_facing = - current_transform.basis.z
	current_facing.y = 0

	if current_facing.length_squared() > 0.01:
		current_facing = current_facing.normalized()
	else:
		current_facing = Vector3(0, 0, -1)

	# Angle returns radians. PI/4 is 45 degrees.
	var angle = current_facing.angle_to(dir)
	return int(round(angle / (PI / 4.0)))


func calculate_path_cost(
	grid_map: GridMap,
	path: PackedVector3Array,
	initial_transform: Transform3D,
) -> int:
	if path.size() <= 1:
		return 0

	var total_cost = 0

	# Track the unit's simulated facing direction as it walks the path
	var current_facing = - initial_transform.basis.z
	current_facing.y = 0
	if current_facing.length_squared() > 0.01:
		current_facing = current_facing.normalized()
	else:
		current_facing = Vector3(0, 0, -1)

	var current_pos = path[0]

	for i in range(1, path.size()):
		var next_pos = path[i]

		# 1. Add Turn Cost
		var move_dir = (next_pos - current_pos)
		move_dir.y = 0
		if move_dir.length_squared() > 0.01:
			move_dir = move_dir.normalized()
			var angle = current_facing.angle_to(move_dir)
			total_cost += int(round(angle / (PI / 4.0)))
			current_facing = move_dir # Update facing for the next step

		# 2. Add Step Cost (4 for straight, 6 for diagonal)
		var grid_current = grid_map.local_to_map(current_pos)
		var grid_next = grid_map.local_to_map(next_pos)
		var dx = abs(grid_next.x - grid_current.x)
		var dz = abs(grid_next.z - grid_current.z)

		if dx == 1 and dz == 1:
			total_cost += 6
		else:
			total_cost += 4

		current_pos = next_pos

	return total_cost
