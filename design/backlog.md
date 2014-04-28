Backlog
=======

Next
----
* #4 [FEATURE] Project re-organise, separate demos from full game
* #1 [ENHANCEMENT] Rename "State" to Scene and "StateManager" to "SceneManager"
* #2 [FEATURE] AssetLoader - Nested groups (scene > type)
* #3 [FEATURE] AssetLoader - Load based on asset type
* [FEATURE] AssetLoader - Load individual groups
* [FEATURE] Sprite / Images
* [QUESTION] Investigate possible eventing library?
* [QUESTION] worth switching promises to use Q?
* [QUESTION] use prototyping for entity methods instead of manager?
* [QUESTION] Work out how maps fit in to the rendering system
* [BUG] fix menu blanking when resizing (event or constant repaint?)
* [BUG] fix bounds errors on Smooth Map Demo

Todo
----
* [FEATURE] Add game UI system
* [FEATURE] Add credits page
* [ENHANCEMENT] States have own pre-loaders?
* [ENHANCEMENT] Get unit tests to coverage > 80%
* [ENHANCEMENT] Refactor menu into re-usable engine code
* [ENHANCEMENT] Refactor pre-loader into re-usable engine code

Ideas
-----
* Move the player around the map, turn based?
* Limit player movement, collisions etc
* Procedural maps
* Add vision distance
* Add lighting
* Selecting units
* Analytics
* ObjectPool?
* Net communications
* grunt task to make assets in to a sprite
  * Use https://github.com/Ensighten/grunt-spritesmith to make the tilemap
* List some renderable types of Components
  * RenderableText
  * RenderableRect
  * RenderableImage
  * RenderableSprite

Done
----
* ~~Basic game loop~~
* ~~Basic entity system~~
* ~~Basic graphics~~
* ~~Basic input~~
* ~~Basic game states~~
* ~~Basic preload system~~
* ~~Basic menu system~~
* ~~Make a rectangle follow cursor demo~~
* ~~Add engine files to the watcher~~
* ~~Make some basic tile assets~~
* ~~Load a map from file~~
* ~~Render a map tile~~
* ~~Render a full map~~
* ~~Render only the viewport area of a map~~
* ~~removing / detaching entities from entity manager~~
* ~~Add full sized canvas rendering / stretch etc~~
* ~~Audio~~
