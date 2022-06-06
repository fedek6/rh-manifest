# Space shooter

This game will use static screen with moving objects. Everything will be communicating with each other scenes.

## Scenes

- Player: `Area2D`, `CollisionShape2D`, `AnimatedSprite` and a `Timer` for limiting shooting rate. Script contains movement, shooting and destruction.

- Shot: `Area2D`, `CollisionShape2D`, `AnimatedSprite`. Script contains movement and collisions.

- Asteroid: `Area2D`, `CollisionShape2D`, `AnimatedSprite`. Script of this node handles collisions and movement.

- Explosion: `Srpite`, `Timer`. Instanced scene when asteroid or player is getting destroyed.

- Stage: main scene that contains instances of all other scenes. Script of this scene controls UI, spawning of elements, it detects player collisions and shows game over message.

## Making the scenes

Resolution for this game is 320x180 (16:9). And it will be displayed in test resolution of 720p.

## Add player node

Set `Area2D` as root. Add `CollisionShape2D` and `AnimatedSprite`. In inspector create new animation.

> There's a trick to make sprites crisp. In `Import` tab you need to select preset called `2D pixel` and then click `Reimport` at the bottom.

Add timer node. Set it to 0.2. Set it to `one shot` for custom refiring on demand.

> Rename all nodes accordingly.


Adding other scenes p. 94

> Duplicate logic of other scenes but without any timers.

p. 95

> Use `queue_free()` function in root node of scene to destroy it.

```
func _on_qeue_free_timer_timeout():
	queue_free()
```


Movement code for simple game may look light this:

```
extends Area2D

const MOVE_SPEED = 150.0
var stage = load("res://stage.gd")

func _process(delta):
	var input_dir = Vector2()
	
	# Up & down movement
	if Input.is_key_pressed(KEY_UP):
		input_dir.y -= 1.0
		
	if Input.is_key_pressed(KEY_DOWN):
		input_dir.y += 1.0
		
	position += (delta * MOVE_SPEED) * input_dir
	
	# Limit movement in Y axis
	if position.y < 0.0:
		position.y = 0.0
	elif position.y > stage.SCREEN_HEIGHT:
		position.y = stage.SCREEN_HEIGHT
```

> It uses vars from other scene to limit movement.

### Code for projectile

```
extends Area2D

export var MOVE_SPEED = 500
var stage = load("res://stage.gd")

func _process(delta):
	self.position += Vector2(MOVE_SPEED * delta, 0.0);
	
	if position.x >= stage.SCREEN_WIDTH + 8:
		queue_free()
```

### Code for instancing shots

```
var shot_scene = preload("res://javelin.tscn")

func _process(delta):
	# Shoting
	if Input.is_key_pressed(KEY_SPACE):
		var stage_node = get_parent()
		
		var shot_instance = shot_scene.instance()
		shot_instance.position = position
		stage_node.add_child(shot_instance)
```


### Code for limiting shots

```
var can_shoot = true
...
	# Shoting
	if Input.is_key_pressed(KEY_SPACE) and can_shoot:
		can_shoot = false
		
		var stage_node = get_parent()
		
		var shot_instance = shot_scene.instance()
		shot_instance.position = position
		stage_node.add_child(shot_instance)


func _on_reload_timer_timeout():
	can_shoot = true
```

### Enemy script (root node)

```
extends Area2D

var explosion_scene = preload("res://explosion.tscn")

export var MOVE_SPEED = 100.0
var score_emitted = false

signal score

func _process(delta):
	position -= Vector2(MOVE_SPEED * delta, 0.0);
	
	if position.x <= -100:
		queue_free()


func _on_enemy_tank_area_entered(area):
	if area.is_in_group("shot"):
		if not  score_emitted:
			score_emitted = true
			emit_signal("score")
			queue_free()
			
			var stage_node = get_parent()
			var explosion_instance = explosion_scene.instance()
			explosion_instance.position = position
			stage_node.add_child(explosion_instance)
```

### Projectile script

```
extends Area2D

export var MOVE_SPEED = 500
var stage = load("res://stage.gd")

func _process(delta):
	self.position += Vector2(MOVE_SPEED * delta, 0.0);
	
	if position.x >= stage.SCREEN_WIDTH + 8:
		queue_free()


func _on_javelin_area_entered(area):
	if area.is_in_group("enemy"):
		queue_free()

```

p. 106