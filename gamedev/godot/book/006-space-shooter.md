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


p. 99