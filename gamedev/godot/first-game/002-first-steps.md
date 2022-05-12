# First steps

## Creating instances

Once you've saved a scene you can use it multiple times. This process is called instancing. 

You can modify each instance of the scene separately.

> To add an instance to the `Main` scene click `link` icon over scene tree.

> To duplicate a scene use `Ctrl + D`.

> You can make all scenes inherit new settings by editing original `tscn` file. It works automatically.

> If you change physics material in any of the instances, it will affect all of them. That's because it's a resource, you must click "make unique" to change that.

## Design language

![instancing 3d shooter](instancing_diagram_shooter.png)

Instead of learning programming patterns, describe your game as diagram. Create a scene for each diagram rectangle (each one is entity visible to the player).

Instancing, the process of producing an object from a blueprint has many handy uses. With scenes, it gives you:

* The ability to divide your game into reusable components.

* A tool to structure and encapsulate complex systems.

* A language to think about your game project's structure in a natural way.


## Scripting languages

Scripts are attached to a node and extend its behavior, so they inherit all functions and properties of the node.

> You can use multiple languages in one project.

> There are more resources concerning GDScript than C#.

> VisualScript should be used only for parts of games (like quest designs etc.)

> You can write parts of your game in C or C++ (if performance is required).

## First script

For example create a `sprite` scene. 

> You can create sprite nodes by dragging image files on workspace.

In a tree view select `attach script` from the right click menu.

Select `empty` template. 

> Every script is a class by default. There's `extends` keyword on the top. 

> Property names are transformed to snake case by default. 

```gdscript
func _init():
    print("Hello, world!")
```

This way you'll output words in a `Output` window.

> `_init` is a class constructor.

### Let's make sprite turning around

```gdscript
extends Sprite

var speed = 400
var angular_speed = PI
```

These are member variables. Every node instance will have these copied.

> Angles in Godot are radian based.

> `update` function in Godot is called `_process()` and it runs every frame. This function has `delta` delta argument which is a time since last frame. This allows you to animate independent of frame rate.

> Godot's virtual functions are underscored. 

```gdscript
extends Sprite
var speed = 400
var angular_speed = PI

func _process(delta):
	rotation += angular_speed * delta
```

This code will rotate sprite. `roatation` is inherited from `Node2D`.

```gdscript
extends Sprite
var speed = 400
var angular_speed = PI

func _process(delta):
	rotation += angular_speed * delta
	var velocity = Vector2.UP.rotated(rotation) * speed
	position += velocity * delta
```

This code will rotate object with different pivot.

To make the node move forward, we start from the Vector2 class's constant `Vector2.UP`, a vector pointing up, and rotate it by calling the `Vector2.rotated()` method. This expression, `Vector2.UP.rotated(rotation)`, is a vector pointing forward relative to our icon. Multiplied by our speed property, it gives us a velocity we can use to move the node forward.

## Player input

There are two main ways to listen for inputs:

1. `_unhandled_input()` virtual function for listening for key presses. For things that don't happen every frame (like jump).
2. `Input` singleton for every frame inputs.

This code allows you to rotate sprite by arrow key press:

### Rotation

```gdscript
func _process(delta):
    var direction = 0
    if Input.is_action_pressed("ui_left"):
        direction = -1
    if Input.is_action_pressed("ui_right"):
        direction = 1

    rotation += angular_speed * direction * delta
```

> `ui_left` & `ui_right` are predefined project' inputs. You can edit inputs by going to `Project -> Project Settings` and editing settings in the `Input Map` tab.

Example of custom input:

```gdscript
	if Input.is_action_pressed("ui_cholibka"):
		print("CHOOOOLIBKA!")
```

### Forward

```gdscript
var velocity = Vector2.ZERO
if Input.is_action_pressed("ui_up"):
    velocity = Vector2.UP.rotated(rotation) * speed

position += velocity * delta
```

> `Vector2.ZERO` is a special type of vector with length of 0.

### Summary

* Every script in Godot is a class
* You have access to properties like `rotation` and `position`
* Variables on top of a file are class properties
* Functions are class methods
* Godot provides "virtual functions" to connect your class with the engine. 
* `Input` singleton allows you to receive input events like key and button presses (mainly in `_process` function)

https://docs.godotengine.org/en/stable/getting_started/step_by_step/signals.html


## Using signals

Signals are messages that node emits on events.

For example, you might have a life bar on the screen that represents the player’s health. When the player takes damage or uses a healing potion, you want the bar to reflect the change. To do so, in Godot, you would use signals.

> This is observer pattern known from other game engines.

* To test it add child node, specifically a button. 
* Go to `Node` tab to list available signals
* Click `pressed` to connect with other node
* Godot will generate a receiver function in other node (`_on_Button_pressed`).

You can pause processing when button is pressed (only for receiver class):

```gdscript
func _on_Button_pressed():
    set_process(not is_processing())
```

> There's an advanced signal window for more advanced signals.

### Connecting a signal through code

Add a timer node as child node to sprite and set it to autostart.

To connect with timer we'll need:
1. Get a ref. to the timer.
2. Call the Timer's `connect()` method.

To get a reference we'll use virtual method:

```gdscript
func _ready():
    var timer = get_node("Timer")
	timer.connect("timeout", self, "_on_Timer_timeout")
```

Third argument to `connect` is a function in current class:

```gdscript
func _on_Timer_timeout():
    visible = not visible
```

This toggles Sprite` visibility.

### Custom signals

> As signals represent events that just occurred, we generally use an action verb in the past tense in their names (health_depleted).

To emit a signal you'll need to declare it first:

```gdscript
extends Sprite

signal turbo_on(last_speed, current_speed)
```

And emit whenever you need it:

```gdscript
func _process(delta):
	if Input.is_action_pressed("ui_cholibka"):
		emit_signal("turbo_on", 100, 500)
```

### Summary

* Any node emits signals on events.
* Signals can be used for multiple things like collisions, interfaces etc.
* `Area2D` emits `body_entered` whenever player body enters.

https://docs.godotengine.org/en/stable/getting_started/first_2d_game/index.html