# First 2D game

Edit `Project -> Project Setting` window resolution to make this game portrait.

`480 x 720` should be OK. 

Also, you can enable stretch 2D and turn on aspect ratio `keep`.

## Organizing the project

Scenes:

* Player
* Mob
* HUD

> In larger projects you can create folders for better maintenance.

## Creating the player

Create `Area2D` node (collision detection) and rename it to `Player`.

> Disable selection of child nodes by using icon near to the paddle lock.

In GDScript naming conventions are:

* Classes (nodes) use `PascalCase`
* variables and functions use `snake_case`
* constants use `ALL_CAPS` (See GDScript style guide).

> You can paste your assets into project directories.

Add `AnimatedSprit` node to the player and choose `SpriteFrames` in the inspector. Click it to edit. In the editor add needed frames and create required animations.

> You can scale down your sprite in the `Inspector` window (transformations).

Finally, let's fix error with Player node. Add a `CapsuleShape2D` child node. Edit collision by adding `capsuleShape` and setting its size.

> You can rename scenes, and make any child its root.

Let's add a script to Player.

> If you export a variable from the script, you will be able to edit its value in an inspector:

```
export var speed = 400 # How fast the player will move (pixels/sec).
```

Virtual function `_ready` is a good place to determine game window size:

```gdscript
func _ready():
	screen_size = get_viewport_rect().size
```

## Let's create an input map

Go to `Project settings -> Input Map` and add `move_right` with mapped keyboard key. Do the same for left.

Code for movement and animation:

```gdscript
func _process(delta):
	var velocity = Vector2.ZERO # The player's movement vector.
	if Input.is_action_pressed("move_right"):
		velocity.x += 1
	if Input.is_action_pressed("move_left"):
		velocity.x -= 1
	if Input.is_action_pressed("move_down"):
		velocity.y += 1
	if Input.is_action_pressed("move_up"):
		velocity.y -= 1

	if velocity.length() > 0:
		velocity = velocity.normalized() * speed
		$AnimatedSprite.play()
	else:
		$AnimatedSprite.stop()
```

> Player movement is normalized. Here you can find brief info about vector math: https://docs.godotengine.org/en/stable/tutorials/math/vector_math.html#doc-vector-math

> `$` is shorthand for `get_node`, so it means `get_node("AnimatedSprite").play()` - kinda jQuery :)

Let's add movement:

```gdscript
position += velocity * delta
position.x = clamp(position.x, 0, screen_size.x)
position.y = clamp(position.y, 0, screen_size.y)
```

> `clamp` is used for restricting a value to given range.

## Choosing an animation

```gdscript
if velocity.x != 0:
    $AnimatedSprite.animation = "walk"
    $AnimatedSprite.flip_v = false
    # See the note below about boolean assignment.
    $AnimatedSprite.flip_h = velocity.x < 0
elif velocity.y != 0:
    $AnimatedSprite.animation = "up"
    $AnimatedSprite.flip_v = velocity.y > 0
```

> Check this `$AnimatedSprite.flip_h = velocity.x < 0` boolean assignment shortcut.

When you're ready hide player on game start:

```gdscript
func _ready():
	screen_size = get_viewport_rect().size
	hide()
```

## Preparing for collisions

Base on [this](https://docs.godotengine.org/en/stable/getting_started/first_2d_game/03.coding_the_player.html#preparing-for-collisions).

Let's define custom `signal` on top of the player script:

```gdscript
extends Area2D
signal hit
```

Now in a `Node` editor click `body_entered(body: Node)`. This will generate function for collision event:

```gdscript
func _on_Player_body_entered(body):
	pass # Replace with function body.
```

Let's arm this function:

```gdscript
func _on_Player_body_entered(body):
    hide() # Player disappears after being hit.
    emit_signal("hit")
    # Must be deferred as we can't change physics properties on a physics callback.
    $CollisionShape2D.set_deferred("disabled", true)
```

> Disabling the area's collision shape can cause an error if it happens in the middle of the engine's collision processing. Using set_deferred() tells Godot to wait to disable the shape until it's safe to do so.

Now let's add a custom function to reset player:

```gdscript
func start(pos):
    position = pos
    show()
    $CollisionShape2D.disabled = false
```

## Let's create an enemy scene

Create a `RigidBody2D` scene and add:

- `AnimatedSprite`
- `CollisionShape2D`
- `VisibilityNotifier2D`

> Disable selection of child nodes!

Set `Gravity Scale` of rigid body to 0 (this way it won't fall down).

* Create frames for sprite (three types). 
* Set `Playing` to On. 
* Set scale to 0.75.
* Add capsule collision (you can rotate in transform tab!).
* Add a script to Enemy

Let's randomize enemy animation:

```gdscript
func _ready():
    $AnimatedSprite.playing = true
    var mob_types = $AnimatedSprite.frames.get_animation_names() // Array
    $AnimatedSprite.animation = mob_types[randi() % mob_types.size()]
```

> `randi() % n` select random integer between 0 and `n-1`.

Now let's connect event `VisibilityNotifier2D_screen_exited`:

```gdscript
func _on_VisibilityNotifier2D_screen_exited():
	queue_free()
```

## Main game scene

Add scene with a type `Node`.

As child nodes add:

* Timer (named MobTimer)
* Timer (named ScoreTimer
* Timer (named StartTimer)

Set `One Shot` to on in `StartTimer` (this means - do not restart).

Set `StartPosition` transformation to 240 and 450.

## Spawning enemies

Add a node called `MobPath` (`Path2D`). Create a path around game level (remember to click close curve at the end).

Add `MobSpawnLocation` (`PathFollow2D`) as child of `MobPath` (this will be spawn location for new enemies).

## Main scene scripting

```gscript
extends Node

export(PackedScene) var mob_scene
var score
```

* Export will allow us to choose the mob scene we want to instance.
* `randomize()` will generate random numbers each time game is run.

In the inspector you can assign `Mob.tscn` to the exported variable.

Connect signal `hit()` to a method called `game_over` in a player scene. 

Add a code:

```gdscript
func game_over():
    $ScoreTimer.stop()
    $MobTimer.stop()
```

> Player must be a child node of main scene!

Connect timeout of `startTimer` and add a code:

```gdscript
func _on_StartTimer_timeout():
    $MobTimer.start()
    $ScoreTimer.start()
```

Connect timeout of `scoreTimer` and add a code:

```gdscript
func _on_ScoreTimer_timeout():
    score += 1
```

And finally mob timer:

```gdscript
func _on_MobTimer_timeout():
	# Choose a random location on Path2D.
	var mob_spawn_location = get_node("MobPath/MobSpawnLocation");
	mob_spawn_location.offset = randi()

	# Create a Mob instance and add it to the scene.
	var mob = mob_scene.instance()
	add_child(mob)

	# Set the mob's direction perpendicular to the path direction.
	var direction = mob_spawn_location.rotation + PI / 2

	# Set the mob's position to a random location.
	mob.position = mob_spawn_location.position

	# Add some randomness to the direction.
	direction += rand_range(-PI / 4, PI / 4)
	mob.rotation = direction

	# Choose the velocity.
	var velocity = Vector2(rand_range(150.0, 250.0), 0.0)
	mob.linear_velocity = velocity.rotated(direction)
```

> Why PI? In functions requiring angles, Godot uses radians, not degrees. Pi represents a half turn in radians, about 3.1415 (there is also TAU which is equal to 2 * PI). If you're more comfortable working with degrees, you'll need to use the deg2rad() and rad2deg() functions to convert between the two.

https://docs.godotengine.org/en/stable/getting_started/first_2d_game/06.heads_up_display.html