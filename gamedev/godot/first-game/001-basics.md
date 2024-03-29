# Basics

## Core concepts

### Scenes

* Scene can be a character, a weapon, a menu, a single map location, a level or anything you can think of.
* You can nest scenes.

> Scenes are like classes but editable in GUI.

### Nodes

* Scene is composed of one or more nodes. Nodes are the smallest building blocks.
* Example scene can be build out of camera, sprite and collision shape etc.


### The scene tree

* A scene tree is where you manage all the scenes.

### Singals

> Signals are Godot's version of observer pattern.

* Nodes emit signals on events. This allows you to communicate without code.
* By using signals you can detect collisions etc.

## Main screens

* 2D here you build UI and 2D games. 
* 3D here you work with meshes lights etc.
* Script screen is a complete IDE with a debugger.
* `AssetLib` is a library of free add-ons, scripts and assets to use in your projects.

## Class reference 

Godot has built in class reference (in a script screen). Use [shortcuts](SHORTCUTS.md) to determine how to use it.

https://docs.godotengine.org/en/stable/getting_started/introduction/learning_new_features.html


## Design philosophy

* Godot is object-oriented. Changing parent scene will update its children.

* Nodes are the smallest parts. Nodes are part of a tree and always inherit from their parents up to the Node class. Although the engine does feature some nodes like collision shapes that a parent physics body will use, most nodes work independently of one another.

* 2D & 3D engines are separate, but you can render 2D in 3D.
