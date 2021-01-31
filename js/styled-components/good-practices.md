# Good practices

Based on [this article](https://www.joshwcomeau.com/css/styled-components/).

## Use CSS variables

To avoid performance hiccups, you should use CSS variables instead of interpolation (because it recreates class names etc.).

This way you can pass variables to component:

```jsx
function Backdrop({ opacity, color, children }) {
  return (
    <Wrapper
      style={{
        '--color': color,
        '--opacity': opacity,
      }}
    >
      {children}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  opacity: var(--opacity);
  background-color: var(--color);
`;
```

Also you can use CSS variables to declare defaults:

```jsx
function Backdrop({ opacity, color, children }) {
  return (
    <Wrapper
      style={{
        '--color': color,
        '--opacity': opacity,
      }}
    >
      {children}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  opacity: var(--opacity, 0.75);
  background-color: var(--color, var(--color-gray-900));
`;
```

If we call <Backdrop> without specifying an opacity or color, we'll default to 75% opaque, and our color theme's dark gray color.

## Single source of styles

Let's look on this simple component:

```jsx
const TextLink = styled.a`
  color: var(--color-primary);
  font-weight: var(--font-weight-medium);
`;
```

But what if you want to change the style of this component by context?

1. You can embed component into wrapper style:

```jsx
// Aside.js
import TextLink from '../TextLink'
const Aside = ({ children }) => { /* Omitted for brevity */ }
const Wrapper = styled.aside`
  /* Base styles */
  ${TextLink} {
    color: var(--color-text);
    font-weight: var(--font-weight-bold);
  }
`;
export default Aside;
```

__Attention:__ It's wrong because it breaks the `React` encapsulation rule! Styles should be contained in a component file.

2. You can put all styles into interested component:

```jsx
// TextLink.js
import { Wrapper as AsideWrapper } from '../Aside'

const TextLink = styled.a`
  color: var(--color-primary);
  font-weight: var(--font-weight-medium);

  ${AsideWrapper} & {
    color: var(--color-text);
    font-weight: var(--font-weight-bold);
  }
`;
```

An ampersand character will be automatically replaced by the class name. Look at generated CSS:

```css
.TextLink-abc123 {
  color: var(--color-primary);
  font-weight: var(--font-weight-medium);
}
.Aside-Wrapper-def789 .TextLink-abc123 {
  color: var(--color-text);
  font-weight: var(--font-weight-bold);
}
```

## Isolated CSS

_“Margin is like putting glue on something before you’ve decided what to stick it to, or if it should be stuck to anything.”_.

You should take into count that the margins of children are leaking through parent container. So you can replace margins by:

* If it's inside a CSS grid, you can use grid-gap to space out each element
* If it's inside a Flex container, the brand-new gap property works wonders (though you may wish to hold off until Safari adds support)
* You can use a Spacer component, a controversial but surprisingly pleasant option
* You can use a dedicated layout component like Stack, from the Braid design system.

### How to avoid layer interlacing

Check the `isolation` attribute: 

```jsx
const Flourish = ({ children }) => {
  return (
    <Wrapper>
      <DecorativeBit />
    </Wrapper>
  );
}
const Wrapper = styled.div`
  position: relative;
  isolation: isolate;
`;
const DecorativeBit = styled.div`
  position: absolute;
  z-index: 2;
`;
```

Read more [about isolation](https://css-tricks.com/almanac/properties/i/isolation/).


## The 'as' prop

By using `as` prop you can keep your code more semantic.

Look at this typical heading problem:

```jsx
// `level` is a number from 1 to 6, mapping to h1-h6
function Heading({ level, children }) {
  const tag = `h${level}`;
  return (
    <Wrapper as={tag}>
      {children}
    </Wrapper>
  );
}
// The `h2` down here doesn't really matter,
// since it'll always get overwritten!
const Wrapper = styled.h2`
  /* Stuff */
`;
```

Or link vs. button:

```jsx
function LinkButton({ href, children, ...delegated }) {
  const tag = typeof href === 'string'
    ? 'a'
    : 'button';
  return (
    <Wrapper as={tag} href={href} {...delegated}>
      {children}
    </Wrapper>
  );
}
```

## Avoid important by using &&

```jsx
const Wrapper = styled.div`
  p {
    color: blue;
  }
`
const Paragraph = styled.p`
  color: red;
  && {
    color: green;
  }
`;
// Somewhere:
<Wraper>
  <Paragraph>I'm green!</Paragraph>
</Wrapper>
```

`&&` - will create .paragraph.paragraph which will overload wrapper style `blue`. 

## Better class names

Using this import...

```js
import styled from 'styled-components/macro';
```

...instead of traditional import will generate nicer class names.
