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

https://docs.godotengine.org/en/stable/getting_started/first_2d_game/03.coding_the_player.html#preparing-for-collisions