extends CanvasLayer

@onready var tu_label: Label = $Label
@onready var end_button: Button = $Button


func _ready() -> void:
	# Connect the button click to our function
	end_button.pressed.connect(_on_end_turn_pressed)


func bind_to_unit(unit: TacticalUnit) -> void:
	# Listen for the unit's AP changes
	unit.ap_changed.connect(_on_unit_ap_changed)
	# Set the initial text
	tu_label.text = "TUs: " + str(unit.current_ap)


func _on_unit_ap_changed(new_ap: int) -> void:
	tu_label.text = "TUs: " + str(new_ap)


func _on_end_turn_pressed() -> void:
	TurnManager.end_player_turn()
