# Scripting

`Node2D` inherits `Node`. Every `Node2D` can be used when a `node` can be used.

```
Node2D < Node
```

Going further `Sprite` inherits `Node2D`:

```
Sprite < Node2D < Node
```

> This notation is used in Godot documentation.

Almost everything inherits from an object. Every object can have a script attached to it. A script is some kind of object that can give additional behaviors to its owner.

It works like that:

* Object get asked to do task X.

* If the object has script attached to it, it asks the script about this task.

* If so, script does the task.

* If not object tries to handle task on its own.

## Introduction to GD

GDScript is similar to Python. Every object has a type, and these types have hierarchies. One script represents one subclass. Every variable and method is part of this subclass. Variables in the scope are called `members` and functions `methods`. 

Example:

```
# button_counter.gd
extends Node2D
signal count_updated(count)

# a variable to hold the number of times the button has been pressed
# since this is declared in the file scope it becomes a class member
var press_count = 0

# The maximum number of button presses allowed
const MAX_PRESSES = 42

# connect the "pressed" signal to a user defined method
func _ready():
    $Button.connect("pressed", self, "on_button_pressed")
    # this gets called when Button gets pressed

func on_button_pressed():
    if press_count + 1 <= MAX_PRESSES:
        press_count += 1
        emit_signal("count_updated", press_count)
        $Button.text = str(press_count)
    else:
        $Button.text = "No more presses allowed."
```

> GDScript like Python uses offside-rules instead of braces.

You can attach script to any node by clicking `attach script` in the right context menu.

### Virtual methods

Virtual method are specific to node types. Life cycle methods are prefixed with underscore. They are called automatically by engine. 

* `_ready` when a node enters scene tree. 
* `_process` called every frame. It takes `delta` argument, it's the time in seconds since the last frame was drawn. This is useful for implementing frame rate independent behaviors. 

Example of `delta` usage:

```
extends Node2D
const SPEED = 200

func _process(delta):
	var input_direction = 0
	if Input.is_action_pressed("ui_left"):
		input_direction = -1
	elif Input.is_action_pressed("ui_right"):
		input_direction = 1
	position.x += input_direction * SPEED * delta
```

p. 71