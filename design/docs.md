Docs
====

A very brief set of documentation...

Entity Component Systems
------------------------
An ECS makes use of Components to define the behavior of an Entity. The Component itself is just raw data, The entity just a UUID and a list of Components. A System will perform actions on the Entities with the Components it is interested in.

For example a GraphicsSystem will loop over all the Entities that have both a RenderableSprite and a Position component, and then render that sprite at the given position. All the hard work is done in the System and the Components just have the raw data such as colour, size, position etc

Components
----------
Currently these are just raw JS objects that include a "type", and some other properties, e.g:

```coffeescript
exampleComponent =
  type: "RenderableRect"
  width: 10
  height: 10
  colour: "#0f0"
```

Systems
-------
A system performs some tasks in regards to entities. This could be updating all Entities with a Moveable Component, rendering Renderable components, updating AI etc.

Managers
--------
Managers are static classes that do not need to be instanciated. They include things like the GraphicsManager that can create canvas elements with contexts. The InputManager which will keep track of the mouse co-ordinates and the keyboard states. The StateManager which tracks and manages the current application state. The EntityManager which lists all the entities in the game and allows the manipulation of them.

Note that most of the Managers will have hook functions that allow *one* thing at a time to hook in to some extra functionality. These hooks should be initialised when a state is activated and remove once deactivated. For example the InputManager has an onMouseClick function that a state can listen to.

```
class MyState extends State
  activate: -> InputManager.onMouseClick = @onMouseClick.bind @
  deactivate: -> InputManager.onMouseClick = null
  onMouseClick: (e) -> console.log "Mouse clicked! #{e.x},#{e.y}"

```


States
------
States are the main areas of the application, such as the menu, game etc.



