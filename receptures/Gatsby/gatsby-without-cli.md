# Gatsby without cli

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