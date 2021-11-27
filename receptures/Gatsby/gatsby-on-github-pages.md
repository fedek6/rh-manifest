# Gatsby on GitHub pages

This is the easiest way to deploy your Gatsby to GitHub pages.

## Branch

You'll need to create empty branch `gh-pages`:

```bash
git checkout --orphan gh-pages
git rm -rf --dry-run .
git rm -rf .
git commit --allow-empty -m "initial commit"
git push -u origin gh-pages
```

## Install `gh-pages`

```bash
Copycopy code to clipboard
npm install gh-pages --save-dev
```

### Configure it

```js
module.exports = {
  siteMetadata: {
    siteUrl: "https:/fedek6.github.io",
    title: "Snippets",
  },
  pathPrefix: "/snippets",
  plugins: [],
};
```

### Add deploy script

```json
{
  "scripts": {
    ...
    "deploy": "gatsby build --prefix-paths && gh-pages -d public"
  }
}
```
