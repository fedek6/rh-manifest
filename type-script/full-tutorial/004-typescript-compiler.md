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

| Format         | desc                         |
| -------------- | ---------------------------- |
| 3.5.1          | Exact version                |
| \*             | Any version                  |
| >3.5.1 >=3.5.1 | Greater or greater and equal |
| <3.5.1 <=3.5.1 | Less or less and equal       |
| ~3.5.1         | 3.5.2, 3.5.3 etc.            |
| ^3.5.1         | 3.5.2, 3.6.3 etc.            |

Commands:

| Command                                | desc                                                 |
| -------------------------------------- | ---------------------------------------------------- |
| npm install                            | install packags from package.json                    |
| npm install package@version            | install specific version, save it in dependencies    |
| npm install --save-dev package@version | install specific version, save it in devDependencies |
| npm list                               | list packages                                        |
| npm run                                | run script                                           |
| npx package                            | run specific package                                 |

## TypeScript config file

`tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "es2018",
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
```

Top level configuration settings:

| Name            | Description                                                                                                                                      |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| compilerOptions | This section groups the settings that the compiler will use                                                                                      |
| files           | This setting specifies the files that will be compiled, which overrides the default behavior where the compiler searches for files to compile.   |
| include         | This setting is used to select files for compilation by pattern. If unspecified, files with the .ts, tsx, and .d.ts extensions will be selected. |
| exclude         | This setting is used to exclude files from compilation by pattern.                                                                               |
| compileOnSave   | it's like watch (not all IDEs uses this)                                                                                                         |

If you want to debug which files will be compiled:

```bash
tsc --listFiles
```

It will output something like:

```
/mnt/data/Documents/Temp/typescript-fun/node_modules/typescript/lib/lib.es2018.promise.d.ts
/mnt/data/Documents/Temp/typescript-fun/node_modules/typescript/lib/lib.es2018.regexp.d.ts
/mnt/data/Documents/Temp/typescript-fun/node_modules/typescript/lib/lib.es2018.full.d.ts
/mnt/data/Documents/Temp/typescript-fun/src/index.ts
```

**Attention!** If you want to run local command always use `npx` for e.g. `npx tsc --listFiles`.

**Attention!** By default, TypeScript will compile faulty code. If you want to brake this behavior add `noEmitOnError` to compiler options.

```json
{
  "compilerOptions": {
    "target": "es2018",
    "outDir": "./dist",
    "rootDir": "./src",
    "noEmitOnError": true
  }
}
```

## Automatically running TS code after compilation

For simple projects use `ts-watch`:

```js
npx tsc-watch --onsuccess "node dist/index.js"
```

## Version targeting

p. 115