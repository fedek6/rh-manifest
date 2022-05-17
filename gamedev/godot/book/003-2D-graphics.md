# 2D graphics

> Sprite is a base of 2D engine. Sprite is simply an image that can be drawn on the screen. It can also be changed in various ways. 

> Viewport has coordinates calculated from the top left corner (Y and X axes are going up from there).

## Draw order

Sprites are drawn in a tree order (first from the top will be in the back).

> `Zindex` can also be used to determine sprite order (but it's a lot slower).

> `Sprite region` is a tool to crop sprites. You can find it at the bottom of the screen (you need to enable it in a sprite property also).

> `Animation` is a set of properties for creating sprite sheets (in sprite element).

## Vectors and transforms

p. 57