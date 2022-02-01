# First application

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

page. 49 (books)