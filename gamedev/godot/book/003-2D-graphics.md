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

p. 58