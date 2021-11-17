# Custom 404 page

Simply create a file `pages/404.js` and build a component for error display:

```js
import Layout from '../components/layout';

export default function Custom404() {
  return (
    <Layout home>
      <h1>404 Not found</h1>
    </Layout>
  );
}
```
