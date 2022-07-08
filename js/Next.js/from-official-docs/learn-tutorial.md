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

https://nextjs.org/learn/basics/create-nextjs-app/setup