# First application

**Attention!** This tutorial uses [repo](https://github.com/fedek6/fullstack-react-with-ts).

> There is a research paper¹⁴ showing that just by using typed language you will get 15% fewer bugs in your code. There is also an interesting paper about unit tests¹⁵ stating that products where test-driven development was applied had between 40% and 90% reductions in pre-release bug density.

An example how to mess TypeScript during runtime:

```ts
function messUpTheArray(arr: Array<string | number>): void {
  arr.push(3);
}

const strings: Array<string> = ["foo", "bar"];
messUpTheArray(strings);
const s: string = strings[2];
console.log(s.toLowerCase()); // Uncaught TypeError: s.toLowerCase is not a function
```

**Notice:** all possible fields for `package.json` can be found [here](https://docs.npmjs.com/cli/v8/configuring-npm/package-json).

## Some notes on beginning

- It's good to pack everything into `React.strictMode`, in development mode it will raise warnings if you use something deprecated.

- You need to import `ReactDOM` to render react into HTML element.

- Proper way to import `React` is: ``import * as React from "react"` but modern bundlers and TS (with `allowSyntheticDefaultImports`) will allow to `import React from "react"`.

- There's also a file called `react-app-env.d.ts`. It tells TS to look definitions in other place: `/// <reference types="react-scripts" />`. This changes default types and combines multiple typings into one file (also adds support for static files like .svg etc.).

```
Triple-slash directives are single-line comments containing a single XML tag. The contents of the comment are used as compiler directives.

Triple-slash directives are only valid at the top of their containing file. A triple-slash directive can only be preceded by single or multi-line comments, including other triple-slash directives. If they are encountered following a statement or a declaration they are treated as regular single-line comments, and hold no special meaning.
```

Let's look into the SVG module:

```ts
declare module "*.svg" {
  import * as React from "react";
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
  const src: string;
  export default src;
}
```

- Use named exports because they're better with refactoring tools.

### Styling components

You can use external CSS files.

---

If you want to use style property, it's nice to put style into typed constant:

```ts
import React from "react";
const buttonStyles: React.CSSProperties = {
  backgroundColor: "#5aac44",
  borderRadius: "3px",
  border: "none",
  boxShadow: "none",
};
```

**Notice:** it will give you autocompletion.

---

You can use external styling libraries like `StyledComponents`.

> It's nice to put styled components into one file like `styles.ts`.

If you want to use `StyledComponents` with props:

```ts
export const AddItemButton = styled.button<AddItemButtonProps>`
  background-color: #ffffff3d;
  border-radius: 3px;
  border: none;
  color: ${(props) => (props.dark ? "#000" : "#fff")};
  cursor: pointer;
  max-width: 300px;
  padding: 10px 12px;
  text-align: left;
  transition: background 85ms ease-in;
  width: 100%;

  &:hover {
    background-color: #ffffff52;
  }
`;
```

### How to define props?

You can use `types` or `interfaces` interchangeably (at least most times).

Example props type (alias):

```ts
type ColumnProps = {
  text: string;
};
```

To use it, we need to create a component:

```ts
const Column = ({ text }: ColumnProps) => {
  //...
};
```

You can also define a non-required prop:

```ts
type ExampleProps = {
  someField?: string; // (property) ExampleProps.someField?: string | undefined
};
```

## How to define children prop?

There are few methods to do this:

### FC type

```ts
type ParentProps = {
  someProp: any;
};

const Parent: React.FC<ParentProps> = ({ children, ...props }) => {
  return <>{children}</>;
};
```

`React.FunctionalComponent` == `React.FC`

This is special generic type used to create props with some defaults.

### `PropsWithChildren`

This is more customized way to do this:

```ts
type React.PropsWithChildren<P> = P & {
  children?: React.ReactNode;
}
```

With usage:

```ts
type ColumnProps = React.PropsWithChildren<{
  text: string;
}>;
```

Which means a `intersection`:

```ts
type ColumnProps = {
  text: string;
} & {
  children?: React.ReactNode;
}
```

### Define children prop manually

```ts
type ColumnProps = {
  text: string
  children?: React.ReactNode;
}
```

## How to type `useState`

If type cannot be inferred use generic ability of `useState`:

```ts
const [showForm, setShowForm] = useState<boolean>(false);
```

page. 61 "Adding new lists"