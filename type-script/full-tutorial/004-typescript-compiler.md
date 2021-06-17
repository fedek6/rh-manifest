# Typescript compiler

Prepare test app:

```bash
npm init --yes
npm install --save-dev typescript@3.5.1
npm install --save-dev tsc-watch@2.1.2
```

You'll need also a typescript config file:

`tsconfig.js`

```json
{
  "compilerOptions": {
    "target": "es2018",
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
```

Add hello world application:

`src/index.ts`

```ts
function printMessage(msg: string): void {
  console.log(`Message: ${msg}`);
}
printMessage("Hello, TypeScript");
```

Remember to add script to your `package.json`:

```json
  "scripts": {
    "start": "tsc-watch --onSuccess \"node ./dist/index.js\""
  },
```

## NPM version control

| Format | desc |
|--------|------|
| 3.5.1 | Exact version |
| * | Any version|
| >3.5.1 >=3.5.1 | Greater or greater and equal |
| <3.5.1 <=3.5.1 | Less or less and equal |
| ~3.5.1 | 3.5.2, 3.5.3 etc. |
| ^3.5.1 | 3.5.2, 3.6.3 etc. |

Commands:

| Command | desc |
|--------|------|
| npm install | install packags from package.json |
| npm install package@version | install specific version, save it in dependencies |
| npm install --save-dev package@version | install specific version, save it in devDependencies  |
| npm list | list packages |
| npm run | run script |
| npx package | run specific package |

## TypeScript config file

p. 108

