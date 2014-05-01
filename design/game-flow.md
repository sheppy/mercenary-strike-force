Game Flow
=========

Basic Game Flow
---------------

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
	* > Player clicks Next > Game starts > Move to [MissionStartScene]
* [MissionStartScene]
	* > Move to [PlayerTurnScene]
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


MissionCreateScene
------------------
Menu should pass extra data to us to define which mission type they were after.
Possibly display loading message depending on how long the following will take?

* > Define objectives:
	* Map type
	* Points to spend on squad
	* Objectives
* > Define map to load
	* Based on map type and objectives, generate map (or a seed?)
* > Move to [MissionBriefScene] > passing parameters for the mission


MissionBriefScene
-----------------
* > Details of the mission are displayed to player (passed from previous scene)
	* Mission type (from main menu)
	* Objectives (random based on mission type)
	* Map type (random based on objectives)
	* Points to spend on squad (based on map type/objectives)
* > Player clicks Back > Move to [MainMenuScene]
* > Player clicks Next > Move to [SquadCreateScene] > passing parameters for the mission


SquadCreateScene
----------------
* > Player chooses the squad and equipment based on the available points
* > Player clicks Back > Move to [MissionBriefScene] > passing parameters for the mission
* > Player clicks Next > Game starts > Move to [MissionStartScene] > passing parameters for the mission


MissionStartScene
-----------------
With the given parameters

* Create the map with the given parameters - store in a globally accessible place?
* Create the squad stuff in a globally accessible place?
* Create the AI etc in a globally accessible place?
* Move to [PlayerTurnScene]


PlayerTurnScene
---------------
...





