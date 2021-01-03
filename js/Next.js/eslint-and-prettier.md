# Eslint & Prettier in Next.js project

This file is an excerpt from [this](https://dev.to/onygami/eslint-and-prettier-for-react-apps-bonus-next-js-and-typescript-3e46) tutorial.

## Modules

Install nedded modules:

```bash
npm i -D eslint \                       # Eslint itself
         prettier \                     # Prettier itself
         eslint-plugin-react \          # Eslint plugin for react
         eslint-plugin-react-hooks \    # Eslint plugin for react hooks, helps you write modern functional react components
         eslint-config-prettier \       # Eslint config for prettier, it will extend the style guide to match prettier
         eslint-plugin-prettier \       # Eslint plugin for prettier, it will raise eslint errors about formatting
         eslint-plugin-jsx-a11y \        # Eslint plugin to raise accessibility violation errors
         eslint-plugin-simple-import-sort
```

## Config files

Create config files:

```bash
touch .eslintrc.js .prettierrc
```

### Prettier

```json
{
  "semi": true,
  "tabWidth": 4,
  "printWidth": 100,
  "singleQuote": true,
  "trailingComma": "none",
  "jsxBracketSameLine": true
}
```

### Eslint

```js
module.exports = {
  root: true, // Make sure eslint picks up the config at the root of the directory
  parserOptions: {
    ecmaVersion: 2020, // Use the latest ecmascript standard
    sourceType: "module", // Allows using import/export statements
    ecmaFeatures: {
      jsx: true, // Enable JSX since we're using React
    },
  },
  settings: {
    react: {
      version: "detect", // Automatically detect the react version
    },
  },
  env: {
    browser: true, // Enables browser globals like window and document
    amd: true, // Enables require() and define() as global variables as per the amd spec.
    node: true, // Enables Node.js global variables and Node.js scoping.
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended", // Make this the last element so prettier config overrides other formatting rules
  ],
  rules: {
    "prettier/prettier": ["error", {}, { usePrettierrc: true }], // Use our .prettierrc file as source
  },
};
```

## Ignore files

Create ignore files:

```bash
touch .eslintignore .prettierignore
echo "node_modules" | tee -a .eslintignore .prettierignore
```
