# Basics of styled-components

`styled-components` utilizes tagged template literals so it removes the mapping between components and styles. This means that you're creating `React` component when creating styles.

Simple example:

```jsx 
// Create a Title component that'll render an <h1> tag with some styles
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

// Use Title and Wrapper like any other React component – except they're styled!
render(
  <Wrapper>
    <Title>
      Hello World!
    </Title>
  </Wrapper>
);
```

## Adapting based on props

```jsx
const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

render(
  <div>
    <Button>Normal</Button>
    <Button primary>Primary</Button>
  </div>
);
```

## Extending styles

To easily make a new component that inherits the styling of another, just wrap it in the styled() constructor. Here we use the button from the last section and create a special one, extending it with some color-related styling:

```jsx
// The Button from the last section without the interpolations
const Button = styled.button`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

// A new component based on Button, but with some override styles
const TomatoButton = styled(Button)`
  color: tomato;
  border-color: tomato;
`;

render(
  <div>
    <Button>Normal Button</Button>
    <TomatoButton>Tomato Button</TomatoButton>
  </div>
);
```

## Changing HTML tag assigned to the styled component

For that you'll need `as` polymorphic prop:

```jsx
const Button = styled.button`
  display: inline-block;
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  display: block;
`;

const TomatoButton = styled(Button)`
  color: tomato;
  border-color: tomato;
`;

render(
  <div>
    <Button>Normal Button</Button>
    <Button as="a" href="/">Link with Button styles</Button>
    <TomatoButton as="a" href="/">Link with Tomato Button styles</TomatoButton>
  </div>
);
```
This is is some serious mambo-jumbo magic:

```jsx
const Button = styled.button`
  display: inline-block;
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  display: block;
`;

const ReversedButton = props => <Button {...props} children={props.children.split('').reverse()} />

render(
  <div>
    <Button>Normal Button</Button>
    <Button as={ReversedButton}>Custom Button with Normal Button styles</Button>
  </div>
);
```

## Styling any component

You can add styles to any third-party component, as long it passees `classNam` to a DOM element.

```jsx
// This could be react-router-dom's Link for example
const Link = ({ className, children }) => (
  <a className={className}>
    {children}
  </a>
);

const StyledLink = styled(Link)`
  color: palevioletred;
  font-weight: bold;
`;

render(
  <div>
    <Link>Unstyled, boring Link</Link>
    <br />
    <StyledLink>Styled, exciting Link</StyledLink>
  </div>
);
```

__Notice:__ You can also pass tag names into the styled() factory call, like so: styled("div"). In fact, the styled.tagname helpers are just aliases that do the same.

## Passed props

```jsx
// Create an Input component that'll render an <input> tag with some styles
const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: ${props => props.inputColor || "palevioletred"};
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

// Render a styled text input with the standard input color, and one with a custom input color
render(
  <div>
    <Input defaultValue="@probablyup" type="text" />
    <Input defaultValue="@geelen" type="text" inputColor="rebeccapurple" />
  </div>
);
```

__Notice:__ Note how the `inputColor` prop is not passed to the DOM, but type and defaultValue are. That is styled-components being smart enough to filter non-standard attributes automatically for you.

## Bigger example

This shows bigger dive into styling bigger components:

```jsx
import React from 'react'
import styled from 'styled-components'

const StyledCounter = styled.div`
  /* ... */
`
const Paragraph = styled.p`
  /* ... */
`
const Button = styled.button`
  /* ... */
`

export default class Counter extends React.Component {
  state = { count: 0 }

  increment = () => this.setState({ count: this.state.count + 1 })
  decrement = () => this.setState({ count: this.state.count - 1 })

  render() {
    return (
      <StyledCounter>
        <Paragraph>{this.state.count}</Paragraph>
        <Button onClick={this.increment}>+</Button>
        <Button onClick={this.decrement}>-</Button>
      </StyledCounter>
    )
  }
}
```
__Notice:__ Note that we added a "Styled" prefix to StyledCounter so that the React component Counter and the Styled Component StyledCounter don't clash names but remain easily identifiable in the React Developer Tools and Web Inspector.

__Warning!__ Always create your styled-components before the `render` function. This way it will work a lot faster.

## Pseudoelements, pseudoselectors, and nesting

The ampersand (&) can be used to refer back to the main component. Here are some more examples of its potential usage:

```jsx
const Thing = styled.div.attrs((/* props */) => ({ tabIndex: 0 }))`
  color: blue;

  &:hover {
    color: red; // <Thing> when hovered
  }

  & ~ & {
    background: tomato; // <Thing> as a sibling of <Thing>, but maybe not directly next to it
  }

  & + & {
    background: lime; // <Thing> next to <Thing>
  }

  &.something {
    background: orange; // <Thing> tagged with an additional CSS class ".something"
  }

  .something-else & {
    border: 1px solid; // <Thing> inside another element labeled ".something-else"
  }
`

render(
  <React.Fragment>
    <Thing>Hello world!</Thing>
    <Thing>How ya doing?</Thing>
    <Thing className="something">The sun is shining...</Thing>
    <div>Pretty nice day today.</div>
    <Thing>Don't you think?</Thing>
    <div className="something-else">
      <Thing>Splendid.</Thing>
    </div>
  </React.Fragment>
)
```

Finally, the ampersand can be used to increase the specificity of rules on the component; this can be useful if you are dealing with a mixed styled-components and vanilla CSS environment where there might be conflicting styles:

```jsx
const Thing = styled.div`
  && {
    color: blue;
  }
`

const GlobalStyle = createGlobalStyle`
  div${Thing} {
    color: red;
  }
`

render(
  <React.Fragment>
    <GlobalStyle />
    <Thing>
      I'm blue, da ba dee da ba daa
    </Thing>
  </React.Fragment>
)
```

## Attaching additional props

Here we render an Input component and attach some dynamic and static attributes to it:

```jsx
const Input = styled.input.attrs(props => ({
  // we can define static props
  type: "text",

  // or we can define dynamic ones
  size: props.size || "1em",
}))`
  color: palevioletred;
  font-size: 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;

  /* here we use the dynamically computed prop */
  margin: ${props => props.size};
  padding: ${props => props.size};
`;

render(
  <div>
    <Input placeholder="A small text input" />
    <br />
    <Input placeholder="A bigger text input" size="2em" />
  </div>
);
```

### Overriding .attrs

```jsx
const Input = styled.input.attrs(props => ({
  type: "text",
  size: props.size || "1em",
}))`
  border: 2px solid palevioletred;
  margin: ${props => props.size};
  padding: ${props => props.size};
`;

// Input's attrs will be applied first, and then this attrs obj
const PasswordInput = styled(Input).attrs({
  type: "password",
})`
  // similarly, border will override Input's border
  border: 2px solid aqua;
`;

render(
  <div>
    <Input placeholder="A bigger text input" size="2em" />
    <br />
    {/* Notice we can still use the size attr from Input */}
    <PasswordInput placeholder="A bigger password input" size="2em" />
  </div>
);
```

## Animations

CSS animations with @keyframes aren't scoped to a single component but you still don't want them to be global to avoid name collisions. This is why we export a keyframes helper which will generate a unique instance that you can use throughout your app:

```jsx
// Create the keyframes
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

// Here we create a component that will rotate everything we pass in over two seconds
const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`;

render(
  <Rotate>&lt; 💅🏾 &gt;</Rotate>
);
```

### CSS helper

Keyframes are lazily injected when they're used, which is how they can be code-splitted, so you have to use the css helper for shared style fragments:

```jsx
const rotate = keyframes``

// ❌ This will throw an error!
const styles = `
  animation: ${rotate} 2s linear infinite;
`

// ✅ This will work as intended
const styles = css`
  animation: ${rotate} 2s linear infinite;
`
```

