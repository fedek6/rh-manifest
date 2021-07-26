# GitHub NPM registry

## Add a package

1. Create a token in GitHub` developer settings (personal access tokens).

Remember about `write:packages` and `read:packaged` scopes.

2. Login:

In your package folder

```
npm login --scope=@fedek6 --registry=https://npm.pkg.github.com
```

Provide your access token, user and e-mail!

3. Add publish config to `package.json` (and fix other fields):

```json
  "name": "@fedek6/example-react-design-system",
  "repository": "git://github.com/fedek6/example-react-design-system.git",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com/"
  }
```

4. Run `npm publish` and voilà! You have a package published.

## Use such package

1. For Yarn, create `.yarnrc`:

```
"@fedek6:registry" "https://npm.pkg.github.com
```

2. For NPM, create `.npmrrc`:

```
"@fedek6:registry=https://npm.pkg.github.com"
```

3. Install:

```
yarn add @fedek6/example-react-design-system@0.1.0
```

And import:

```ts
import { Thing } from '@fedek6/example-react-design-system';
```