extends Node3D

@onready var level = $TestLevel
@onready var grid_map: GridMap = $TestLevel/GridMap
@onready var grid_manager: GridManager = $GridManager
@onready var input_controller = $PlayerInputController
@onready var unit: TacticalUnit = $Unit
@onready var hud = $HUD
@onready var vision_manager: VisionManager = $VisionManager

@onready var camera: Camera3D = $Camera3D
@export var camera_speed: float = 15.0
@export var edge_margin: int = 20 # pixels from edge to trigger scroll


func _ready() -> void:
	# Search inside the Level node for any node of type "GridMap"
	var grid_maps = level.find_children("*", "GridMap")

	if grid_maps.size() > 0:
		var active_grid = grid_maps[0] as GridMap

		# Inject it into the systems
		input_controller.grid_map = active_grid
		grid_manager.build_graph(active_grid)
		# unit.initialize_position(active_grid, Vector3i(0, 0, 0))

		# Find ALL units in the level and register them
		var all_units = find_children("*", "TacticalUnit")
		for u in all_units:
			print("Initialising unit", u)
			# Initialize them on the grid (assuming they are placed visually in the editor)
			var start_cell = active_grid.local_to_map(u.global_position)
			u.initialize_position(active_grid, start_cell)

			# Register them with the Vision Manager
			vision_manager.register_unit(u)

			# For now, just assign the first Team 0 unit as the active player unit
			if u.team_id == 0 and input_controller.active_unit == null:
				input_controller.active_unit = u
				hud.bind_to_unit(u)

		vision_manager.initialize_all_vision()

	else:
		push_error("No GridMap found in the loaded level!")

	# Build the graph on startup via our manager
	grid_manager.build_graph(grid_map)

	# Snap unit to its starting grid coordinate cleanly
	unit.initialize_position(grid_map, Vector3i(0, 0, 0))

	hud.bind_to_unit(unit)


func _process(delta: float) -> void:
	var input_dir = Vector3.ZERO

	# 1. Keyboard Controls (WASD or Arrow Keys)
	if Input.is_action_pressed("ui_right") or Input.is_key_pressed(KEY_D):
		input_dir.x += 1
	if Input.is_action_pressed("ui_left") or Input.is_key_pressed(KEY_A):
		input_dir.x -= 1
	if Input.is_action_pressed("ui_down") or Input.is_key_pressed(KEY_S):
		input_dir.z += 1
	if Input.is_action_pressed("ui_up") or Input.is_key_pressed(KEY_W):
		input_dir.z -= 1

	# 2. Mouse Edge Panning
	var mouse_pos = get_viewport().get_mouse_position()
	var window_size = get_viewport().get_visible_rect().size

	# 	if mouse_pos.x < edge_margin:
	# 		input_dir.x -= 1
	# 	elif mouse_pos.x > window_size.x - edge_margin:
	# 		input_dir.x += 1
	#
	# 	if mouse_pos.y < edge_margin:
	# 		input_dir.z -= 1
	# 	elif mouse_pos.y > window_size.y - edge_margin:
	# 		input_dir.z += 1

	# 3. Apply movement relative to the camera's rotation
	# (so 'Up' always moves "north" on the isometric grid rather than global screen up)
	if input_dir != Vector3.ZERO:
		input_dir = input_dir.normalized()

		# Project movement onto the isometric plane
		var motion = Vector3(input_dir.x, 0, input_dir.z)
		# Rotate motion by 45 degrees to match your isometric camera yaw
		motion = motion.rotated(Vector3.UP, deg_to_rad(45))

		camera.global_position += motion * camera_speed * delta
