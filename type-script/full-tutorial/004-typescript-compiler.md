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

The version of the JavaScript language targeted by the compiler is specified by the target setting in the `tsconfig.json` file.

```json
{
  "compilerOptions": {
    "target": "es5",
    "outDir": "./dist",
    "rootDir": "./src",
    "noEmitOnError": true
  }
}
```

| Name   | Description                                                                       |
| ------ | --------------------------------------------------------------------------------- |
| es3    | 1999 JS version (default setting)                                                 |
| es5    | 2009                                                                              |
| es6    | Added ckasses, modules, arrow functions and promises.                             |
| es2015 | Equal to es6                                                                      |
| es2016 | Added includes method for arrays and exponentiation operator.                     |
| es2017 | Keywords for async operations and ability to inspect objects.                     |
| es2018 | Spread and rest operators, improvements for string handling and async operations. |
| esNext | Do not use if you don't know what you're doing (features that might be removed).  |

**Notice**: The biggest changes to the language were introduced in ES6/ES2015, which can be regarded as the start of “modern” JavaScript.

## Setting the Library Files for Compilation

The compiler defaults to the type information it requires based on the target property, which means that errors will be generated when features from later versions of JavaScript are used.

You can change compiler definitions using `lib` options:

| Name | Description |
| ---- | ----------- |
| es5, es2015, es2016, es2017, es2018 | Definitions for specific JS versions. |
| esnext | Changing features of JS |
| dom | Browser DOM API (sometimes useful in Node.js) |
| dom.iterable | This value provides type information for the additions to the DOM API that allow iteration over HTML elements. |
| webworker | This value selects type information for the web worker feature, which allows web applications to perform background tasks. |

**Notice**: You can also select specific features from definitions (using object notation like `es2015.generator`).

**Notice**: Node target mappings can be found [here](https://github.com/microsoft/TypeScript/wiki/Node-Target-Mapping).

Example lib configuration:

```json
{
  "compilerOptions": {
    "target": "es5",
    "outDir": "./dist",
    "rootDir": "./src",
    "noEmitOnError": true,
    "lib": ["es5", "dom", "es2015.collection"]
  }
}
```

## Selecting a module format

In TS code you should always use standardized ECMA (from ES2016) modules. Compiler will automatically transpile to working module format. 

__Notice__: You can change module format by using `module` setting in `tsconfig.json` but once again, you don't need to do it, if you're using proper target.

__Notice__: External package can add compatibility with different module formats (esm).

### Working example with Node 15

```json
{
    "compilerOptions": {
        "target": "es2018",
        "outDir": "./dist",
        "rootDir": "./src",
        "noEmitOnError": true,
        "module": "commonjs"
    }
}
```

### Types of module resolution

`moduleResolution` can be set to `classic` or `node`. Classic will search in a local project. Node will also check in `node_modules` directory.

## Useful compiler options

| Name | Description |
| ---- | ----------- |
| allowJs | Include JS files in compilation process. |
| allowSyntheticDefaultImports |  This option allows imports from modules that do not declare a default export. This option is used to increase code compatibility. |
| baseUrl | root location for modules resolution |
| checkJs | Look for common JS errors |
| declaration | Produe type declaration files for JS code. |
| downlevelIteration | Allow iterators in older versions of JS |
| esModuleInterop | Add helper code for non exporting modules |
| experimentalDecorators | Enable decorators (TS specific) |
| forceConsistentCasingInFileNames | This option ensures that names in import statements match the case used by the imported file. |
| importHelpers | This option determines whether helper code is added to the
JavaScript to reduce the amount of code that is produced
overall. |
| isolatedModules | This option treats each file as a separate module, which increases compatibility with the Babel tool. |
| jsx | This option specifies how HTML elements in JSX/TSX files are processed. |
| jsxFactory | This option specifies the name of the factory function that is
used to replace HTML elements in JSX/TSX files. |
| noEmit | This option prevents the compiler from emitting JavaScript
code, with the result that it only checks code for errors. |
| noImplicitAny | This option prevents the implicit use of the any type, which the
compiler uses when it can’t infer a more specific type. |
| noImplicitReturns | This option requires all paths in a function to return a result. |
| paths | This option specifies the locations used to resolve module
dependencies. |
| resolveJsonModule | This option allows JSON files to be imported as though they
were modules. |
| skipLibCheck | This option speeds up compilation by skipping the normal
checking of declaration files. |
| sourceMap | This option determines whether the compiler generates
source maps for debugging. |
| strict | This option enables stricter checking of TypeScript code. |
| strictNullChecks | This option prevents null and undefined from being accepted
as values for other types. |
| suppressExcessPropertyErrors | This option prevents the compiler from generating errors for  objects that define properties not in a specified shape. |
| typeRoots | This option specifies the root location that the compiler uses
to look for declaration files. |
| types | This option specifies a list of declaration files to include in the
compilation process. |