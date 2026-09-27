extends Node

# Signals act like a PubSub event bus
signal turn_changed(new_state: TurnState)

enum TurnState {
	PLAYER_TURN,
	ENEMY_TURN,
	RESOLUTION,
}

var current_state: TurnState = TurnState.PLAYER_TURN


func end_player_turn() -> void:
	if current_state != TurnState.PLAYER_TURN:
		return

	current_state = TurnState.ENEMY_TURN
	emit_signal("turn_changed", current_state)
	print("Turn ended. Now it's the Enemy's turn...")

	# Simulate enemy thinking for 1.5 seconds, then hand back to player
	await get_tree().create_timer(1.5).timeout
	start_player_turn()


func start_player_turn() -> void:
	current_state = TurnState.PLAYER_TURN
	emit_signal("turn_changed", current_state)
	print("Player turn started. AP refreshed.")

	# Automatically find any TacticalUnit in the scene and reset its AP
	var units = get_tree().get_nodes_in_group("units")
	for unit in units:
		if unit.has_method("reset_ap"):
			unit.reset_ap()
