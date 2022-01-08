# Working with JS

Some useful compiler options:

| Option        | Description                           |
| ------------- | ------------------------------------- |
| `allowJs`     | Allow JS in compilation process       |
| `baseUrl`     | Root location used to resolve modules |
| `checkJs`     | Check JS files for common errors      |
| `declaration` | Produce type declarations             |
| `outDir`      | Output directory                      |
| `paths`       | Locations used to resolve module deps |
| `rootDir`     | Root directory to locate TS files     |
| `target`      | Targeted version of JS                |

## Using JS with TS

```js
export function sizeFormatter(thing, count) {
  writeMessage(`The ${thing} has ${count} items`);
}
export function costFormatter(thing, cost) {
  writeMessage(`The ${thing} costs $${cost.toFixed(2)}`, true);
}
function writeMessage(message) {
  console.log(message);
}
```

And import:

```ts
import { sizeFormatter, costFormatter } from "./formatters";

sizeFormatter("Cart", cart.itemCount);
costFormatter("Cart", cart.totalPrice);
```

This will throw an error:

```
internal/modules/cjs/loader.js:613
throw err;
^
Error: Cannot find module 'dist\index.js'
```

So, you need to enable `allowJs` in your `tsconfig.json`.

### `checkJs` enabled

It will find error:

```
src/formatters.js(6,60): error TS2554: Expected 0-1 arguments, but got 2.
```

> This feature is useful only if you are able to modify the JavaScript files to address the problems the compiler reports.

You can enable or disable this feature per file using:

```js
// @ts-nocheck
// @ts-check
```

## Describing types used in JS code

Compiler will try to infer types from JS but in most cases it will use `any`.

```ts
export function costFormatter(thing: any, cost: any): any {
```

This might also bring an error:

```ts
costFormatter("Cart", `${cart.totalPrice}`);
```

```
formatters.js:9: writeMessage(`The ${thing} costs $${cost.toFixed(2)}`, true);
TypeError: cost.toFixed is not a function
```

### Using comments

TypeScript can obtain types through JSDoc.

```js
/**
* Format something that has a money value
* @param { string } thing - the name of the item
* @param { number} cost - the value associated with the item
*/
export function costFormatter(thing, cost) {
writeMessage(`The ${thing} costs $${cost.toFixed(2)}`, true);
}
```

You can check how TS works with JSDoc [here](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html).

### Using type declaration files

To describe types for `formatters.js` you must create a file `formatters.d.ts`.

```ts
export declare function sizeFormatter(thing: string, count: number): void;
export declare function costFormatter(thing: string, cost: number | string ): void;
```

> Declaration files are more important than JSDoc comments.

**Attention!** If `d.ts` file is used it must describe all features of a module. That's because it's only source of type information. TypeScript will see only described features of a module.

```
src/index.ts(3,40): error TS2305: Module '"/usingjs/src/formatters"' has no exported
member 'writeMessage'.
```

### Describing third-party JS code