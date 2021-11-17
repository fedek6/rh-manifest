# API routes

To create an API endpoint you need to create a directory `pages/api`. 

Endpoints are based on files that you put into that directory. For example `pages/api/hello.js`:

```js
export default function handler(req, res) {
  res.status(200).json({ text: 'Hello world!' })
}
```

* req is an instance of http.IncomingMessage, plus some pre-built middlewares;
* res is an instance of http.ServerResponse, plus some helper functions.

And you can request it by using URL: `http://localhost:3000/api/hello`.

__Warning!__ Never ever fetch APIs from `getStaticProps` and `getStaticPaths`. These functions run only server-side. 

## Good example

A good example is form handling:

```js
export default function handler(req, res) {
  const email = req.body.email
  // Then save email to your database, etc...
}
```

__Important:__ There is _preview mode_ in Next.js. You can use it to watch draft versions of articles. You can find instructions [here](https://nextjs.org/docs/advanced-features/preview-mode).

## Dynamic API routes

For example you can configure route `pages/api/post/[pid].js` with following code:

```js
export default function handler(req, res) {
  const {
    query: { pid },
  } = req

  res.end(`Post: ${pid}`)
}
```