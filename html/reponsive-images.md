# Responsive images

## Using srcset

Basig usage depends on pixel density:

```html
<img src="one.png"
     srcset="two.png 2x, three.png 3x, four.png 4x">
```

In this case you cannot use "sizes" attribute. So let's focus on a second method using "w":

```html
<img src="one.png"
     srcset="two.png 100w, three.png 500w, four.png 1000w">
```

This way we declare a pixel width of an image. It's rather simple:

* 100w = 100px, 
* 500w = 500px.

Now when we have image declared this way we can finally use "sizes" attribute:

```html
<img src="one.png"
     srcset="two.png 100w, three.png 500w, four.png 1000w"

     sizes="<media condition> <width>,
            <media condition> <width>,
            <optional default image width>">
```

It uses standard media query syntax. For example:

```html
<img src="one.png"
     srcset="two.png 100w, three.png 500w, four.png 1000w"

     sizes="(min-width: 900px) 1000px,
            (max-width: 900px) and (min-width: 400px) 50em,
            ( not (orientation: portrait) ) 300px,
            ( (orientation: landscape) or (min-width: 1000px) ) 50vw, 
            100vw">
```

An explanation for a first and last size:

* If viewport width equals to 900px or greater than show the image with a width of 1000px,
* If any of these rules didn't match, show the image as wide as the viewport (100vw means 100% of the viewport width).


Examples came from: [bitsofco.de article](https://bitsofco.de/the-srcset-and-sizes-attributes/)