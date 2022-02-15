# Lerna

1. Create repo, clone and `yarn init`.
2. `npx lerna init`.
3. Set `"version": "independent"` in `lerna.json` (if you want to keep separate versions for your packages).
4. Basic proposed configuration by Lerna team:

```json
{
  "packages": [
    "packages/*"
  ],
  "version": "independent",
  "npmClient": "yarn",
  "command": {
    "publish": {
      "ignoreChanges": ["ignored-file", "*.md"],
      "message": "chore(release): publish",
      "registry": "https://npm.pkg.github.com"
    },
    "bootstrap": {
      "ignore": "component-*",
      "npmClientArgs": ["--no-package-lock"]
    }
  } 
}
```

5. Enable workspaces in `package.json`:

```json
  "workspaces": [
    "packages/*"
  ],
```

and in `lerna.json`:

```json
"useWorkspaces": true
```

6. Add first package:
  - Create directory and `Yarn init`.

```json
{
  "name": "@rh-ui/hello-world",
  "version": "0.0.0",
  "main": "index.js",
  "author": "Konrad Fedorczyk",
  "license": "MIT",
  "repository": "git://github.com/fedek6/rh-ui.git",
  "main": "dist/index.js",
  "module": "dist/index.js",
  "source": "src/index.ts",
  "types": "dist/index.d.ts",
  "files": [
    "dist",
    "README.md"
  ],
}
```

**Warning!** Packages cannot be private!

**Warning!** Scope `rh-ui` must organization or user in the GitHub!

**Warning!** Ale this package fields must be present!

7. `lerna list` will check if it can find any packages.

8. `lerna bootstrap` will install packages in all packages.

9. `lerna bootstrap --hoist` when you run this command, Lerna installs the dependencies from the packages into the root folder.

## Adding sibling packages

```bash
cd my-design-system-form 
lerna add @my-scope-name/design-system-button --scope=@my-scope-name/my-design-system-form
```

```js
import Button from '@my-scope-name/my-design-system-button';
```

## Common dependency 

```bash
lerna add the-dep-name
```

Dev dependency:

```bash
yarn add husky --dev -W
```

**Attention!** Lerna cannot add multiple packages add once. For example, this is how you can add linaria:

```bash
lerna add @linaria/core && \
lerna add @linaria/react && \
lerna add @linaria/react && \
lerna add @linaria/babel-preset && \
lerna add @linaria/shaker
```

## Add targeted dependency

```bash
lerna add <package/dependecy>
```

Or `lerna add` inside package directory.


## If you want to remove common dependency

```bash
lerna exec -- yarn remove dep-name
```

## Running tests

Lerna provides the run command which will run an npm script in each package that contains that script.

Add script to each package:

```json
"name": "@my-scope-name/my-design-system-form",
"scripts": {
    "test": "jest"
}
```

And run:

```bash
lerna run test --stream
```