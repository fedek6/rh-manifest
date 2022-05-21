# 2D graphics

> Sprite is a base of 2D engine. Sprite is simply an image that can be drawn on the screen. It can also be changed in various ways. 

> Viewport has coordinates calculated from the top left corner (Y and X axes are going up from there).

## Draw order

Sprites are drawn in a tree order (first from the top will be in the back).

> `Zindex` can also be used to determine sprite order (but it's a lot slower).

> `Sprite region` is a tool to crop sprites. You can find it at the bottom of the screen (you need to enable it in a sprite property also).

> `Animation` is a set of properties for creating sprite sheets (in sprite element).

## Vectors and transforms

> Viewport is a Cartesian plane. Vector (described by x,y) represents distance from point 0,0 called origin. 

`m` - vector magnitude (length).
`d` - is an angle of the horizontal axis.

Vector also has a direction.

You can calculate length of a vector by using Pythagorean Theorem. In `Godot` this might be done by using: `var m = vector.length()`

### Vector operations

* Addition: visually it's like starting a new vector in the end of the first.
* Subtraction: it's like going from the second one to the first. This is useful for measuring distance between vectors.
* Scalar multiplication: resulting vector keeps the same direction but has multiplied length.
* Dot product: is kind of multiplication. This can be used to get the angle between vectors. Godot has helper functions for this. 
* Cross product: useful only in 3D realm. 

### Unit vectors

Unit vector is a vector with magnitude of 1. This is useful to determine direction. It's also useful to calculate dot product of such vector. It's always in the [-1, 1] interval - if the vectors are parallel, the dot product is 1, if they are perpendicular the dot product is 0, if the have opposite direction the dot product is -1. 

The process of getting unit vector from normal vector is called `normalization`. In Godot its:

```
vector.normalized();
```

## Transforms

Matrices are used for object transformation. Each node resides in its local space, and it's affected by the transforms of its ancestor to determine position in the global space.

Transform is a mix of:
* position aka translation
* rotation
* scale

So a 3x2 matrix:

```
transform = [Xx Xy, Yx Yy, Ox Oy]
```

Translates to:
* First two rows X and Y is transformation in local space
* Last one is the translation

```
var transform = Transform2D()
var x = transform.x
var y = transform.y
var o = transform.o // Origin translation vector
```

### The power of transforms

The main use of matrices is to store transform operations. If you multiply two matrices, the result is a matrix that combines both operations. 

> Order matters, mathematically the last transform is applied first, Godot works in a reverse order. 


By default, a transform is defined with the identity matrix `[1 0, 0 1, 0 0]`. This means that no transform is made, and the object keeps its default position, rotation and scale.

For example, you combine rotation and scale transform:

```
var rotate_matrix = Transform2D().rotated(deg2rad(90));
var scale_matrix = Transform2D().scaled(Vector2(2, 2)); # Scale twice in each axis
var translate_matrix = Transform2D().translated(Vector2(0,0)) # This line in book was bugged
var combined_matrix = translated_matrix * rotate_matrix * scale_matrix # combine
$my_node.transform *= combined # Apply
```

> Inverse transform matrices allows to invert the transform. If you apply the inverse matrix, it is the same as reverting the transformation. You can make a node ignore its ancestors` transform. 

## Cameras

World could be a lot bigger than a window. In such case you should use camera to follow your player. 

> Camera2D is a node that you can put as a child of a character root node.

There are some usable camera properties:

* Offset - camera center. It's useful for making animations such as shake effect. 

* Anchor mode - this sets whether the follow node should be on center and respect margins (drag center) or it remains fixed on the top left corner (fixed top left).

* Rotating - this designates whether the camera should rotate with the parent.

* Current - this sets active camera.

* Zoom - larger zoom makes things further away.

* Limits - how far camera can go. It's useful for not letting the camera out of the level boundaries.

* Drag margins - you can make camera stay still if the parent is moving only inside the drag margins. 

* Smoothing - smooth camera movement (easing).

> Cameras are great for split screens (use Viewport nodes).

## Tile maps

Godot has `TileMap` node specifically for this.

### Making a `TileSet`

`TileSet` is a resource with tiles. To create one:

* Create `Node2D` scene
* Add sprite with tiles
* If you need collisitons add `StaticBody2D` as a sprite child. Also you need to `CollisionShape2D`.
* Repeat steps to add all tiles. 
* Save the scene
* Run Scene -> Convert to -> TileSet
* Save as res file

> Each sprite represents one tile.

> Creating tiles is easier when you're using grid & grid snap. You can find it in a top menu of a viewport.

## Using `TileMaps`

p/ 61