# Fetching data at request time

This process is called server-side rendering (it is similar to PHP workflow).

__Warning!__ Do not use this until it's needed because it's slow. 

Instead of `getStaticProps` you need to export `getServerSideProps`:

```js
export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    }
  }
}
```
__Notice:__ This method will be called on every request.

## Fetching data client-side (Next.js way)

You can build a solution like this by using Vercel's [SWR React hook](https://swr.vercel.app/).

```js
import useSWR from 'swr'

function Profile() {
  const { data, error } = useSWR('/api/user', fetch)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return <div>hello {data.name}!</div>
}
```
