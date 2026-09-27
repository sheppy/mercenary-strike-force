extends CanvasLayer

@onready var tu_label: Label = $Label
@onready var end_button: Button = $Button

var current_bound_unit: TacticalUnit


func _ready() -> void:
	# Connect the button click to our function
	end_button.pressed.connect(_on_end_turn_pressed)


func bind_to_unit(unit: TacticalUnit) -> void:
	# Disconnect the old unit so its AP changes don't overwrite the HUD
	if current_bound_unit and current_bound_unit.ap_changed.is_connected(_on_unit_ap_changed):
		current_bound_unit.ap_changed.disconnect(_on_unit_ap_changed)

	current_bound_unit = unit

	# Connect the new unit safely
	if not current_bound_unit.ap_changed.is_connected(_on_unit_ap_changed):
		current_bound_unit.ap_changed.connect(_on_unit_ap_changed)

	# Set the initial text
	tu_label.text = "TUs: " + str(unit.current_ap)


func _on_unit_ap_changed(new_ap: int) -> void:
	tu_label.text = "TUs: " + str(new_ap)


func _on_end_turn_pressed() -> void:
	TurnManager.end_player_turn()
