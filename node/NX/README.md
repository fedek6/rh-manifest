# NX

NX is build system for monorepos.

> It looks like NX is more Yarn fixed.

## Using without plugins

Global NX CLI installation:

```bash
npm install -g nx
```

### Repo initialization

Initialize an empty repo:

```bash
npx create-nx-workspace@latest --preset=core
```

- `package.json` lists needed dev dependencies.
- `nx.json` contains CLI configuration.

### Creating an empty package

```bash
nx g npm-package simple
```

Will output:

```
packages/
 simple/
   index.js
   package.json
```

Now you can invoke any script from `package.json` using:

```
nx [script] [package]
```

### Connecting packages using Yarn workspaces

Create a second package:

```bash
nx g npm-package complex
```

#### Enable workspace

To enable workspaces edit main `package.json`:

```json
{
  // ...
  "workspaces": ["packages/*"]
}
```

> NX added this automatically!

#### Add dependencies

And in your package's `package.json`:

```json
  "dependencies": {
    "@myorg/simple": "*"
  }
```

Finally, run `yarn install` or `npm install`.

> You might run into trouble using this simple configuration. Set `"type": "module"` in both `package.json` files to resolve this problem.

> Packages can be connected using better way. Check Lerna, PNPM or React plugin.


### Orchestrated tasks

Run scripts in parallel:

```bash
nx run-many --target=test --all
```

Or run selected only:

```bash
nx run-many --target=build --projects=app1,app
```


https://nx.dev/getting-started/nx-and-typescript
https://egghead.io/lessons/react-use-storybook-to-develop-react-components-in-nx