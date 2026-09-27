extends Node3D

@onready var level = $TestLevel
@onready var grid_map: GridMap = $TestLevel/GridMap
@onready var grid_manager: GridManager = $GridManager
@onready var input_controller = $PlayerInputController
@onready var unit: TacticalUnit = $Unit
@onready var hud = $HUD
@onready var vision_manager: VisionManager = $VisionManager
@onready var camera_rig: CameraRig = $CameraRig


func _ready() -> void:
	# Search inside the Level node for any node of type "GridMap"
	var grid_maps = level.find_children("*", "GridMap")

	if grid_maps.size() > 0:
		var active_grid = grid_maps[0] as GridMap

		# Inject it into the systems
		input_controller.grid_map = active_grid
		grid_manager.build_graph(active_grid)
		# unit.initialize_position(active_grid, Vector3i(0, 0, 0))
		var all_units = get_tree().get_nodes_in_group("units")
		print("Server registered ", all_units.size(), " units.")

		var player_units: Array[TacticalUnit] = []

		for u in all_units:
			# Initialize them on the grid (assuming they are placed visually in the editor)
			var start_cell = active_grid.local_to_map(u.global_position)
			start_cell.y = 0
			u.initialize_position(active_grid, start_cell)

			# Register them with the Vision Manager
			vision_manager.register_unit(u)

			# If they belong to the player, add them to our roster
			if u.team_id == 0:
				player_units.append(u)

		# Hand the roster to the Input Controller
		input_controller.team_units = player_units

		if player_units.size() > 0:
			# Select the first unit by default
			input_controller.active_unit = player_units[0]
			hud.bind_to_unit(player_units[0])
			# Snap camera instantly on game load
			camera_rig.global_position = Vector3(
				player_units[0].global_position.x,
				0,
				player_units[0].global_position.z,
			)

		# Re-bind the HUD dynamically whenever the player presses TAB
		input_controller.active_unit_changed.connect(
			func(new_unit):
				hud.bind_to_unit(new_unit)
				# Pan camera smoothly on TAB
				camera_rig.pan_to_position(new_unit.global_position),
		)

		vision_manager.initialize_all_vision()

	else:
		push_error("No GridMap found in the loaded level!")
