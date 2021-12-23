# Gatsby without cli

Based on [this](https://www.gatsbyjs.com/docs/using-gatsby-professionally/setting-up-gatsby-without-gatsby-new/).

```
npm init -y && \
npm install gatsby react react-dom && \
mkdir src && \
mkdir src/pages && \
touch src/pages/index.js
```

```js
// index.js
import React from "react"

export default function Home() {
  return <h1>Hello Gatsby!</h1>
}
```

Extend scripts:

```json
  "scripts": {
    "develop": "gatsby develop",
    "start": "gatsby develop",
    "build": "gatsby build",
    "serve": "gatsby serve",
    "clean": "gatsby clean",
    "deploy": "gatsby clean && gatsby build --prefix-paths && gh-pages -d public"
  },
```