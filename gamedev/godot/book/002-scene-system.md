# Scene system

> Godot has two types of game loops. Idle means every frame is rendered as fast as possible. Fixed has time step that is synchronized with the physics loop (60 FPS).

Scene is a node that contains other nodes. Nodes can have multiple children but single parent. Scene starts with root. 

* nodes are processed in tree order. Root will receive callback before its children.
* nodes are drawn in tree order. Parents are drawn before children (which means z-index but not in 3D realm).
* nodes inherit transformations of parents. 

Resources are special type of object. While nodes represents interactions and controls etc., resources represent data. For example `AnimationPlayer` is a node that operates on a `resource`. You can create resources by modal, but more often you will drag them.

Resources are shared, but you can make them unique by using inspector.

> You can create custom nodes and resources by writing plugins.

## Combining scenes

Scene can be a level or game player.

### Inheriting scenes

Scenes can be:

* inherited
* instantiated

This behavior is very similar to OOP.

### Instancing scenes

If you put multiple scenes inside other you'll need to edit them separately. The way to do this is to create instances.

> To instance a subscene you can use chain link icon in scene dock.

> You can jump to source scene by clicking icon with the "clap" near scene name.

> You can also make scene local

### Scene managing tip!

It's important to have a design idea before making the scenes of the game. Each component means scene. A player probably will be a scene. 


## Managing subscenes

It's easier to deal with multiple small scenes. However, you need to manage scenes that consists of smaller ones.

1. When you need to edit original scene, use `Open subscene` icon (movie clip).
2. By default, only root scene is visible. You can change that by right clicking and selecting `editable children`.
3. You can unlink inherited scene by right click (`Discard Instancing` or `Make local`).
4. By using right click you can create a new scene from a part of a bigger one (`Save branch as scene`).

> Godot will automatically prevent cycling dependencies!

