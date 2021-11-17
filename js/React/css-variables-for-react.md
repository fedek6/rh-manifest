# CSS Variables for React Devs

Based on [this article](https://www.joshwcomeau.com/css/css-variables-for-react-devs/).

Basic example of CSS vars:

```css
html {
  --color-text: black;
  --color-background: lightgray;
  --color-primary: rebeccapurple;
  --gutter: 16px;
}
p {
  color: var(--color-text);
  margin-bottom: var(--gutter);
}
.title {
  color: var(--color-primary);
}
```

__Notice:__ This is the same as using the `:root` pseudo-selector.

## Styled-components

In styled components it would be:

```jsx
import { createGlobalStyle } from 'styled-components';
// Create a `GlobalStyles` component.
// I usually already have this, to include a CSS
// reset, set border-box, and other global concerns.
const GlobalStyles = createGlobalStyle`
  html {
    --color-text: black;
    --color-background: white;
    --color-primary: rebeccapurple;
  }
`;
const App = ({ children }) => {
  return (
    <>
      <GlobalStyles />
      {children}
    </>
  );
};

const Button = styled.button`
  background: var(--color-primary);
`;
```

## Global responsiveness 

Check this example:

```jsx
const GlobalStyles = createGlobalStyle`
  html {
    --min-tap-target-height: 48px;
    @media (min-width: ${(props) => props.theme.bp.desktop}) {
      --min-tap-target-height: 32px;
    }
  }
`;
```

```jsx
const Button = styled.button`
  height: var(--min-tap-target-height);
`;
const TextInput = styled.input`
  height: var(--min-tap-target-height);
`;
```

Now you need to declare breakpoints only in one place!

Fonts example:

```jsx
const GlobalStyles = createGlobalStyle`
  html {
    --font-size-small: 16px;
    --font-size-medium: 22px;
    @media (min-width: 1024px) {
      --font-size-small: 21px;
      --font-size-medium: 24px;
    }
  }
`;
// Elsewhere...
const Paragraph = styled.p`
  font-size: var(--font-size-small);
`;
const OpeningParagraph = styled.p`
  font-size: var(--font-size-medium);
`;
```

## Animate any CSS property

If you animate CSS variables, instead of properties, you can animate everything!

## Interoperate with JS

If you need to access your variables in JS, you could store them somewhere and:

```jsx
const GlobalStyles = createGlobalStyle`
  html {
    --color-text: ${COLORS.text};
    --color-background:  ${COLORS.background};
    --color-primary:  ${COLORS.primary};
  }
`;
```

Or read them:

```js
getComputedStyle(document.documentElement).getPropertyValue('--color-primary');
```

Or set them:

```js
// Try changing the value of this CSS variable,
// and check out the blog's logo!
document.documentElement.style.setProperty(
  '--color-primary',
  'hsl(245deg, 100%, 60%)'
);
```

_All of that said: If type-safety is a must-have, you don't have to give it up! You'd just need to keep your styles in a JS object, and interpolate them in. This tweet from Fatih Kalifa shows how he set up his types for CSS variables._
