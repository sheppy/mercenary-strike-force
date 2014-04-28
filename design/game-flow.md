Basic Game Flow
===============

* [MainMenuScene]
	* > Player chooses mission type
	* > Move to [MissionCreateScene]
* [MissionCreateScene]
	* > Objectives are defined
	* > Map is loaded
	* > Move to [MissionBriefScene]
* [MissionBriefScene]
	* > Details of the mission are displayed to player
	* > Player clicks Back > Move to [MainMenuScene]
	* > Player clicks Next > Move to [SquadCreateScene]
* [SquadCreateScene]
	* > Player chooses the squad and equipment
	* > Player clicks Back > Move to [MissionBriefScene]
	* > Player clicks Next > Game starts > Move to [PlayerTurnScene]
* [PlayerTurnScene]
	* > Player takes their turn
	* > All enenemy dead, Move to [MissionDeBriefScene]
	* > Player clicks End Turn > Move to [AiTurnScene]
* [AiTurnScene]
	* > AI takes their turn
	* > If all players dead > Move to [MissionDeBriefScene]
	* > If AI out of moves > Move to [PlayerTurnScene]
* [MissionDeBriefScene]
	* > Display game stats, win / lose and score etc
	* > Player clicks Finish > Move to [MainMenu]
