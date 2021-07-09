# Responsive React

There are three approaches to implement responsiveness in React:

1. Media queries.
2. Inline styles.
3. Higher order components.

## Media queries in CSS

Pros

- Relatively simple to apply.
- Anyone with basic CSS skills can create and implement Media Queries.

Cons

- React will render extra DOM elements, hidden by CSS, that are never used.
- CSS is external to the Component.
- An additional import needed for the CSS file.

## Inline styles

```js
import React, { useState, useEffect } from 'react'
function App() {
  const [width, setWindowWidth] = useState(0)
   useEffect(() => {

     updateDimensions();

     window.addEventListener(“resize”, updateDimensions);
     return () =>
       window.removeEventListener(“resize”,updateDimensions);
    }, [])
    const updateDimensions = () => {
      const width = window.innerWidth
      setWindowWidth(width)
    }
   //…rest of App.js below…
}
```

Inline style logic:

```js
const showNav = {
  display: showTopNavMenu ? "flex" : "none",
};
const showMenuIcon = {
  display: showTopNavMenu ? "none" : "flex",
};
return (
  <>
    <div id="nav_container" style={showNav}>
      <nav id="navigation">{navMenuItems}</nav>
    </div>
    <span className="menu-icon" style={showMenuIcon} />
  </>
);
```

Pros

- Responsive design no longer depends on an external CSS file.
- The Component is more self contained and reusable.
- CSS is scoped to this Component with less chance of conflicting CSS.

Cons

- Considerably more work to implement than Media Queries.
- Media Queries are more easily and intuitively read.

## Higher order components

For example, you can use [React-Socks](https://www.npmjs.com/package/react-socks) or [react-responsive](https://github.com/contra/react-responsive).

```js
import { Breakpoint, BreakpointProvider } from ‘react-socks’;
function App() {
//...rest of App.js above....
return (
  <BreakpointProvider>
    <Header />
    <Main />
  </BreakpointProvider>
}
```

And the logic:

```jsx
<Breakpoint large up>
  <div id="nav_container" ></div>
</Breakpoint>
<Breakpoint medium down>
  <div className="menu-icon"></div>
</Breakpoint>
```

Pros

- Easy to implement and configure
- Class names in Dev Tools are semantic and reflect the changes

Cons

- Noticed a small delay in removing/adding the nav elements
- Didn’t work on inline elements, such as spans, but that might be just a limitation for this library
- Required changing inline elements to block or using divs instead of spans
