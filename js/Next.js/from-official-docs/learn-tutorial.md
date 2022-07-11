# Learn tutorial

> Imperative coding is when you write your code in single steps.

> Declarative coding is like ordering pizza without being concerned about steps needed to prepare a Pizza.

You can tell React what you want to happen and library will determine what to do with the DOM.

## Rendering methods

* `Pre-rendering`: server-side rendering (SSR) and static site generation (SSG)
* `Client-side-rendering`: whole rendering happens client side

> You can opt in to CSR by using `useEffect` or `useSWR` (stale-while-revalidate).

`Next.js` pre-renders everything before sending to a browser.

### SSR

* HTML is rendered server side for each request
* Client gets non-interactive page
* Site is hydrated (it becomes interactive)

> You can opt in to SSR by using `getServerSideProps`.

> React 18 & Next 12 adds alpha version of server side components (native React)

### SSG

* Everything is generated on a server and served statically.

> You can opt in to SSG by using `getStaticProps`.

> Your page might be built incrementally.

> In Next.js you can use all methods in one application.

## First app

### Assets

* To load external JS use `next/script`
* Images are served better with `next/image`

> You can use `onLoad` handler for external scripts.

## CSS

Next.js has built-in support for `styled-jsx` library:

```jsx
<style jsx>{`
  …
`}</style>
```

It produces scoped CSS for components. But you can use whatever you want.

### External CSS

By default, Next.js uses CSS modules (CSS & SCSS).

```js
import styles from "./layout.module.css"

export default function Layout({ children }) {
  return <div className={styles.container}>{children}</div>;
}
```

### Global assets

For that create `pages/_app.js`. 

This will wrap whole application:

```jsx
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

If you want something global, simply import it:

```jsx
import '../styles/global.css';
```

### `classname` library 

Library for easy class name switches:

```jsx
import styles from "./foo.module.css";
import cn from 'classnames';

export const Foo = ({ type = "foo", ...params}) => {
    return (
        <h2 className={cn({
            [styles.foo]: type === 'foo',
            [styles.bar]: type === 'bar'
        })} {...params}>Foo</h2>
    )   
}
```

### Fine-tuning PostCSS

You can configure PostCSS by creating a file `postcss.config.js`.

From there you can add Tailwind CSS etc.

### SASS

To add SASS:

```bash
npm install -D sass
```

## Pre-rendering

> Hydration - a process of HTML becoming interactive.

> You can create hybrid website with some static & other dynamic sites.

* SSG
* SSR


### Pages with & without data

Pages without any fetching will be turned static automatically.

In other case you'll need SSG with data.

### SSG with data

For that use `getStaticProps`:

```jsx
export default function Home(props) { ... }

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const data = ...

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: ...
  }
}
```

### Front matter example

For parsing front matter markdowns you can use `gray-matter` package.

Simple function will generate props for your page:

```js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

```

### Using static props

You can use whatever source you like for your static props.

> Notice Next.js polyfills `fetch`, so you can get whatever you want!

```js
export async function getSortedPostsData() {
  // Instead of the file system,
  // fetch post data from an external API endpoint
  const res = await fetch('..');
  return res.json();
}
```

Or db:

```js
import someDatabaseSDK from 'someDatabaseSDK'

const databaseClient = someDatabaseSDK.createClient(...)

export async function getSortedPostsData() {
  // Instead of the file system,
  // fetch post data from a database
  return databaseClient.query('SELECT posts...')
}
```

> If you don't customize 404s you might use [fallback key](https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#fallback-false)

> `getStaticProps` can be used only in pages!

> Because it’s meant to be run at build time, you won’t be able to use data that’s only available during request time, such as query parameters or HTTP headers.

### Fetching data using server side rendering

> context will have request specific data

```jsx
export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    },
  };
}
```


### Client Side Rendering

Use this technique for dashboards:

```js
import useSWR from 'swr';

function Profile() {
  const { data, error } = useSWR('/api/user', fetch);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <div>hello {data.name}!</div>;
}
```

> SWR is a hook that is similar to Apollo client but for REST api's. 


## Dynamic routes

> https://nextjs.org/learn/basics/dynamic-routes