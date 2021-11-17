# Tailwindcss

## First example

```html
<div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
  <div class="flex-shrink-0">
    <img class="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo">
  </div>
  <div>
    <div class="text-xl font-medium text-black">ChitChat</div>
    <p class="text-gray-500">You have a new message!</p>
  </div>
</div>
```

* Tailwind's flexbox and padding utilities (flex, flex-shrink-0, and p-6) to control the overall card layout
* The max-width and margin utilities (max-w-sm and mx-auto) to constrain the card width and center it horizontally
* The background color, border radius, and box-shadow utilities (bg-white, rounded-xl, and shadow-md) to style the card's appearance
* The width and height utilities (w-12 and h-12) to size the logo image
* The space-between utilities (space-x-4) to handle the spacing between the logo and the text
* The font size, text color, and font-weight utilities (text-xl, text-black, font-medium, etc.) to style the card text


## Maintainability concerns

This is easily solved by extracting components, usually as template partials or components.

You can also use Tailwind's @apply feature to create CSS abstractions around common utility patterns.

```css
.btn-green {
    @apply text-white bg-green-500 hover:bg-green-700;
}
```

## Resposnive design

Standard breakpoints:

* sm	640px	@media (min-width: 640px) { ... }
* md	768px	@media (min-width: 768px) { ... }
* lg	1024px	@media (min-width: 1024px) { ... }
* xl	1280px	@media (min-width: 1280px) { ... }
* 2xl	1536px	

```html
<!-- Width of 16 by default, 32 on medium screens, and 48 on large screens -->
<img class="w-16 md:w-32 lg:w-48" src="...">
```

### More advanced example

```html
<div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
  <div class="md:flex">
    <div class="md:flex-shrink-0">
      <img class="h-48 w-full object-cover md:w-48" src="/img/store.jpg" alt="Man looking at item at a store">
    </div>
    <div class="p-8">
      <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Case study</div>
      <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Finding customers for your new business</a>
      <p class="mt-2 text-gray-500">Getting a new business off the ground is a lot of hard work. Here are five ideas you can use to find your first customers.</p>
    </div>
  </div>
</div>
```

* By default, the outer div is display: block, but by adding the md:flex utility, it becomes display: flex on medium screens and larger.
* When the parent is a flex container, we want to make sure the image never shrinks, so we've added md:flex-shrink-0 to prevent shrinking on medium screens and larger. Technically we could have just used flex-shrink-0 since it would do nothing on smaller screens, but since it only matters on md screens, it's a good idea to make that clear in the class name.
* On small screens the image is automatically full width by default. On medium screens and up, we've constrained that width to a fixed size using md:w-48.

### Mobile first

By default, Tailwind uses a mobile first breakpoint system, similar to what you might be used to in other frameworks like Bootstrap.

What this means is that unprefixed utilities (like uppercase) take effect on all screen sizes, while prefixed utilities (like md:uppercase) only take effect at the specified breakpoint and above.

__Warning!__ Do not use `sm` to target mobile, use unpreffixed classes.

For this reason, it's often a good idea to implement the mobile layout for a design first, then layer on any changes that make sense for sm screens, followed by md screens, etc

### Targeting a single breakpoint

Here is an example where the background color is red at the md breakpoint, but teal at every other breakpoint:

```html
<div class="bg-teal-500 md:bg-red-500 lg:bg-teal-500">
  <!-- ... -->
</div>
```

### Customizing breakpoints

```js
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
  }
}
```

## Hover, Focus, & Other States

```html
<form>
  <input class="border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent ...">
  <button class="bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 ...">
    Sign up
  </button>
</form>
```

```html
<button class="bg-red-500 hover:bg-red-700 ...">
  Hover me
</button>
```

```html
<div class="group border-indigo-500 hover:bg-white hover:shadow-lg hover:border-transparent ...">
  <p class="text-indigo-600 group-hover:text-gray-900 ...">New Project</p>
  <p class="text-indigo-500 group-hover:text-gray-500 ...">Create a new project from a variety of starting templates.</p>
</div>
```

__Attention:__ Check [docs](https://tailwindcss.com/docs/hover-focus-and-other-states) for more.

### First, last etc.

```html
<div class="...">
  <div v-for="item in items" class="transform first:rotate-45 ...">
    {{ item }}
  </div>
</div>
```

```html
<div class="...">
  <div v-for="item in items" class="transform last:rotate-45 ...">
    {{ item }}
  </div>
</div>
```

## Global styles

```html
<!doctype html>
<html lang="en" class="text-gray-900 leading-tight">
  <!-- ... -->
  <body class="min-h-screen bg-gray-100">
    <!-- ... -->
  </body>
</html>
```

or:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  h1 {
    @apply text-2xl;
  }
  h2 {
    @apply text-xl;
  }
}
```

Or using plugin:

```js
// tailwind.config.js
const plugin = require('tailwindcss/plugin')

module.exports = {
  plugins: [
    plugin(function({ addBase, theme }) {
      addBase({
        'h1': { fontSize: theme('fontSize.2xl') },
        'h2': { fontSize: theme('fontSize.xl') },
        'h3': { fontSize: theme('fontSize.lg') },
      })
    })
  ]
}
```

### @font-face

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  @font-face {
    font-family: Proxima Nova;
    font-weight: 400;
    src: url(/fonts/proxima-nova/400-regular.woff) format("woff");
  }
  @font-face {
    font-family: Proxima Nova;
    font-weight: 500;
    src: url(/fonts/proxima-nova/500-medium.woff) format("woff");
  }
}
```

## Extracting components

```html
<button class="btn-indigo">
  Click me
</button>

<style>
  .btn-indigo {
    @apply py-2 px-4 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75;
  }
</style>
```

## Adding utilites

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .scroll-snap-none {
    scroll-snap-type: none;
  }
  .scroll-snap-x {
    scroll-snap-type: x;
  }
  .scroll-snap-y {
    scroll-snap-type: y;
  }
}
```

and if you want responsive variants:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  @variants responsive {
    .scroll-snap-none {
      scroll-snap-type: none;
    }
    .scroll-snap-x {
      scroll-snap-type: x;
    }
    .scroll-snap-y {
      scroll-snap-type: y;
    }
  }
}
```

and dark mode:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  @variants dark {
    .filter-none {
      filter: none;
    }
    .filter-grayscale {
      filter: grayscale(100%);
    }
  }
}
```

```html
<div class="filter-grayscale dark:filter-none"></div>
```

### State variants

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  @variants hover, focus {
    .filter-none {
      filter: none;
    }
    .filter-grayscale {
      filter: grayscale(100%);
    }
  }
}
```

```html
<div class="filter-grayscale hover:filter-none"></div>
```