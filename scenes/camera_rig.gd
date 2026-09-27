class_name CameraRig extends Node3D

@export var pan_speed: float = 15.0

# Grab the child camera so we can read its rotation
@onready var camera: Camera3D = $Camera3D

var active_tween: Tween


func _process(delta: float) -> void:
	# Use a Vector2 for input to keep screen X/Y logic clean
	var input_dir = Vector3.ZERO

	# Zero-setup WASD & Arrow Key checks
	if Input.is_physical_key_pressed(KEY_W) or Input.is_physical_key_pressed(KEY_UP):
		input_dir.y += 1 # Up on screen
	if Input.is_physical_key_pressed(KEY_S) or Input.is_physical_key_pressed(KEY_DOWN):
		input_dir.y -= 1 # Down on screen
	if Input.is_physical_key_pressed(KEY_A) or Input.is_physical_key_pressed(KEY_LEFT):
		input_dir.x -= 1 # Left on screen
	if Input.is_physical_key_pressed(KEY_D) or Input.is_physical_key_pressed(KEY_RIGHT):
		input_dir.x += 1 # Right on screen

	if input_dir != Vector3.ZERO:
		input_dir = input_dir.normalized()

		# If the user touches WASD, instantly cancel any automatic TAB panning
		if active_tween and active_tween.is_running():
			active_tween.kill()

		# 1. Get the camera's true forward direction and flatten it
		var forward = -camera.global_transform.basis.z
		forward.y = 0
		forward = forward.normalized()

		# 2. Use the Cross Product to mathematically generate a perfect 90-degree Right vector
		var right = forward.cross(Vector3.UP).normalized()

		# 3. Combine them
		var move_vec = (right * input_dir.x) + (forward * input_dir.y)

		# 4. Move the rig globally along the floor
		global_position += move_vec.normalized() * pan_speed * delta


func pan_to_position(target_world_pos: Vector3) -> void:
	# We only want the camera pivot to slide along the flat X/Z grid, ignoring the unit's height
	var flat_target = Vector3(target_world_pos.x, 0, target_world_pos.z)

	# Kill any existing tween before starting a new one
	if active_tween and active_tween.is_running():
		active_tween.kill()

	active_tween = get_tree().create_tween().set_trans(Tween.TRANS_SINE).set_ease(Tween.EASE_OUT)
	# Pan over 0.4 seconds
	active_tween.tween_property(self, "global_position", flat_target, 0.4)
