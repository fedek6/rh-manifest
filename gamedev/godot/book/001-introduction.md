# Introduction

Creating basic scene:

* Create 2D scene (node will be added automatically)
* Rename root node to "MyFirstScene"
* Add a sprite (you can drag image to texture field in the inspector)
* Add a button
* Select root note and click `add script` (you can change inherits param to fit your needs)
* Click button and connect signal to our new script

```
func _on_Button_pressed():
	$Sprite.visible = not $Sprite.visible
```

* In `project settings` you can change main scene

> Root path for assets is `res://`

## Tabs in project configuration

* `general` game presentation and behavior
* `input map` keys and buttons
* `localization` translation files
* `AutoLoad` scene singletons available in all scenes
* `plugins` editor plugins

> Each node can have only one script attached