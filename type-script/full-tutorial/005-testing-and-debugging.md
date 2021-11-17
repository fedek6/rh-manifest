# Testing and debugging

The TypeScript compiler does a good job of reporting syntax errors or problems with data types, but there will be times when you have code that compiles successfully but doesn’t execute in the way you expected.

To know where your error is, you need to enable source map:

```json
{
  "compilerOptions": {
    "sourceMap": true
  }
}
```

## Breakpoints

Built in IDE\` breakpoints might be unreliable. It is better to use a less elegant `debugger` keyword.

```ts
import { sum } from "./calc";
let printMessage = (msg: string): void => console.log(`Message: ${msg}`);
let message = "Hello, TypeScript";
printMessage(message);
debugger;
let total = sum(100, 200, 300);
console.log(`Total: ${total}`);
```

**Notice**: debugger keyword will be ignored in a Node runtime. You need to use external tool like VSC for that.

## Debugging in VSC

Go to `run` → `Add configuration…` → `Node.js`.

Editor will create `./.vscode/launch.json`. You'll need to edit code path:

```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "preLaunchTask": "npm: build",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/dist/index.js"
    }
  ]
}
```

Now, go to `run` → `Start debugging`.

Full example can be found [here](https://gist.github.com/fedek6/29e1992be5233c3ce8466526c046e63c).

## Builtin Node.js debugger

```bash
node inspect dist/index.js
```

Type `help` to list commands.

## Remote Node debugging

```bash
node --inspect-brk dist/index.js
```

You'll get address, now run chrome add go to `chrome://inspect`. Click configure and paste host and port.

**Notice:** Chrome has dedicated Node debugger.

## Note on linting

My advice is to use linting sparingly and focus on the issues that will cause real problems. Leave formatting decisions to the individuals and rely on code editor reformatting when you need to read code written by a team member who has different preferences.

Linting is not so important as you may think!

## Unit testing

Preferred framework for testing TypeScript applications is Jest.

```bash
npm install --save-dev jest @types/jest ts-jest
```

**Important**: focus on writing unit tests for features and functions that you'll know will be hard to write and that are likely to be the source of bugs in deployment. In these situations, unit testing helps
structure thoughts about how to best implement what you need.

## Configuring Jest

`jest.config.js`

```js
module.exports = {
  roots: ["src"],
  transform: { "^.+\\.tsx?$": "ts-jest" },
};
```

`roots` — sources.

`transform` — extensions & package for transformation.

## Creating unit tests

Simply create a test file for your module using `.test.ts` naming convention `src/opinions.ts` → `src/opinions.test.ts`.

With example test:

```ts
import { iLike } from "./opinions";

test("check result", () => {
  const result = iLike("Ninja");
  expect(result).toBe("I like Ninja!");
});
```

Useful matcher functions:

| Name                   | Assertion                   |
| ---------------------- | --------------------------- |
| toBe(value)            | Same value (same object)    |
| toEqual(object)        | Same object                 |
| toMatch(regexp)        | To match regular expression |
| toBeDefined()          | Result is defined           |
| toBeUndefined()        |                             |
| toBeNull()             |                             |
| toBeTruthy()           | Result is truthy            |
| toBeFalsy()            | Result is falsy             |
| toContain(substring)   |                             |
| toBeLessThan(value)    |                             |
| toBeGreaterThan(value) |                             |

## Running tests

Watch method is most useful. Simply keep tests in second console window. 

```bash
npx jest --watchAll
```
