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

> Code `Input.[method]` means it is from the other object. In this case it's `Input Singleton`.

> Prevent complex computations in `_process` virtual method. This will limit frame rate.

**Attention!** It would be match better to use `_input` with event `param`. Because waiting for input in process is a waste of CPU cycles.

This way code is much more optimized:

```
func _process(delta):
    self.position.x += input_direction * speed * delta

func _input(event):
	if event.is_action_pressed("ui_left"):
		input_direction = -1
	elif event.is_action_pressed("ui_right"):
		input_direction = 1

	if event.is_action_released("ui_left") || event.is_action_released("ui_right"):
		input_direction = 0
```

> When you prefix variables with `export` key word, this setting will be available in node's inspector. This is a cool way to make something configurable.


## Interfacing with other Nodes

To get a reference to a node inside the tree, you can use `get_node` method. It takes relative path to the current node.

This example will take a node from one level up (button to player):

```
func _on_Button_pressed():
	var jesus = get_node("../Jesus")
	jesus.speed += 100;
	self.text = button_txt + ": " + str(jesus.speed)
```

And an example from the book:

```
extends Node2D
const MOVEMENT_SPEED = 50 # pixels per second
var sprite_node

func _ready():
    sprite_node = get_node("Sprite")

func _process(delta):
    var input_direction = 0 # 0 is no movement, 1 is right, -1 is left
    
    if Input.is_action_pressed("ui_left"):
        input_direction = -1
    elif Input.is_action_pressed("ui_right"):
        input_direction = 1

    # notice that the child is moved here
    sprite_node.position.x += input_direction * MOVEMENT_SPEED * delta
```

> There is an alternative syntax for getting nodes `get_node("../Jesus")` -> `$"../Jesus"`.

You can also call methods from other nodes:

```
$"../B".test_method("This is a test.")
get_node("../B").test_method("Hello from A")
```

### Signals and groups

Signals and grouping are meant for coupling reducing. 

Signal premise is based on the observer design pattern. Object notifies other objects tar are interested in some action. The coder doesn't know when or where those actions might be of interest. 

An object can emit multiple signals. When signal is emitted, all listeners will be notified. 

To listen for a signal you need to code it like this:

```
extends Label

func _on_Button_pressed():
	print("Button got pressed")
	self.text = "BOOOOOOOOOOOOOOOOOOOOOOOOOOOOOM!"

# Called when the node enters the scene tree for the first time.
func _ready():
	$"../Button".connect("pressed", self, "_on_Button_pressed")
```

You can also do this by using `Godot` editor. From the `Node` tab of a signal source.

> Note signal listener must have a script connected.

`connect` method expects:

- the name of the signal
- object to which we are connecting
- name of the method
- array of bindings (will be sent to listening methods as args, this is useful to identify a sender)

> It's possible to connect signal to object other than self:

```
$VisibilityNotifier2D.connect("exit_screen", some_bullet, "queue_free")
```

This will automatically destroy `bullet` when it leaves a screen.

### Emitting signals and custom ones

To define a custom signal there are two ways:

- Using `signal` keyword (preffered)
- By using `Object.add_user_signal`

1. First you need to declare custom signal (with possible arguments):

```
signal test(test_argument)
```

2. Then you need to emit it:

```
func _on_Button_pressed():
	self.emit_signal("test", "Cholibka!")
```

3. Then you need to receive it (either by Gatsby UI or code):

```
func _on_Button_test(test_argument):
	self.text = str(test_argument)
```


```
func _ready():
	$"../Button".connect("test", self, "_on_test")

func _on_test(arg):
	self.text = str(arg)
	print(arg)
```

### Groups

p. 81