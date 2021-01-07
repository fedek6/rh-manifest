# Type Script basics

TS is just an extension to JS. You can change a `js` extension to `ts` and it will work. Using variable types is optional in `js` so it's compatible with JS out of the box.

To install `TypeScript` globally:

```bash
npm install -g typescript
tsc -v
```

## Compilation

To compile from the command line:

```bash
tsc main.ts 
node main.js
```

To watch changes in `ts` file use:

```bash
tsc main --watch
```

__Notice:__ Adding an empty export declaration on top of the `ts` file will prevent VSV from displaying variable redeclaration errors. A file with such a declaration is treated as a module instead of a plain script.

https://www.youtube.com/watch?v=BwuLxPH8IDs