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


## Using verlok/vanilla-lazyload

```bash
npm install vanilla-lazyload --save
```

```js
import LazyLoad from "vanilla-lazyload";

window.addEventListener('load', event => {
    console.log("Window loaded");

    let lazyLoadInstance = new LazyLoad({
     //   use_native: true // <-- there you go
    });
});
```

### Example using picture tag

__Attention!__ Please remember about the statement order because the first matching source tag will be used!

```html
     <picture class="m-post-cover__bg">
          <source
               media="(min-width: 2000px)"
               data-srcset="https://via.placeholder.com/960 1x, 
               https://via.placeholder.com/1920 2x"
          >
          <source
               media="(min-width: 1200px)"
               data-srcset="https://via.placeholder.com/480 1x, 
               https://via.placeholder.com/960 2x"
          >
          <img
               alt="A lazy image"
               class="lazy"
               src="images/img_placeholder.png"
               data-src="https://via.placeholder.com/500"
          >
     </picture>
```