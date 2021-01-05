# Dynamic paths

To create a dynamic path you need to create special page file for example `pages/games/[id].js`.

To list all available pages for `getStaticPaths` you need to feed declare it in a page file:

```js
export async function getStaticPaths() {
  const paths = getStaticPageIds();
  return {
    paths,
    fallback: false
  }
}
```

__Notice:__ If you won't declare a fallback option to false Next will load the first page it can find (which is pretty stupid).

__Notice:__ If the id of the page won't be provided in paths var Next.js will just show a nice 404 error.

Then we can use a modified method to set static props:

```js
export async function getStaticProps({ params }) {
  const contentData = getStaticContent(params.id);
  return {
    props: {
      contentData,
    },
  };
}
```

We take this id from URL construction (`[id]`).

## How to provide ids for dynamic routes?

This simple method will create a list of all markdown files in specific directory and create ids from them:

```js
export function getStaticPageIds() {
  const fileNames = fs.readdirSync(contentDirectory);

  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  });
}
```
## Catch all routes

You can route URLs like `/posts/a/b`. You simply need to create a page file using three dots `pages/posts/[...id].js`.

If you want to utilize this using static paths you need to create a list of ids using an array:

```js
export function getStaticPageIds() {
  return [
    {
      params: {
        // Statically Generates /posts/a/b/c
        id: ['a', 'b', 'c']
      }
    }
  ];
}
```

And you can access them in `getStaticProps`:

```js
export async function getStaticProps({ params }) {
  // params.id will be like ['a', 'b', 'c']
}
```