class_name MovementStep extends RefCounted

var world_pos: Vector3
var grid_cell: Vector3i
var ap_cost: int


func _init(p_world_pos: Vector3, p_grid_cell: Vector3i, p_ap_cost: int) -> void:
	world_pos = p_world_pos
	grid_cell = p_grid_cell
	ap_cost = p_ap_cost
