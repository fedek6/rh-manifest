# Begginers guide to Next.js

This guide will show you step by step how to build a basic app.

## Create a starter app

```bash
npx create-next-app . --use-npm --example "https://github.com/vercel/next-learn-starter/tree/master/learn-starter"
```

## Create a new page

Simply create a category directory and a new file in a `pages` directory:

```bash
mkdir pages/games && touch pages/games/whack-a-zombie-mole.js
```

Put test contents inside this new file:

```js
export default function WhackAZombieMole() {
    return <h1>Whack a zombie mole</h1>
}
```

If you run a development server:

```bash
npm run dev
```

You can get it here: `http://localhost:3000/games/whack-a-zombie-mole`.

## Link component

To create a internal link to other page use `Link` component:

```js
<Link href="/games/whack-a-zombie-mole">
    <a>Whack a zombie mole</a>
</Link>
```

If you want to link an external resource, simply use a tag.

__Notice:__ To insert a space between tags (like HTML nbsp) use `{' '}`.

__Notice:__ Link components works as JS router (no page reload on navigation).

__Notice:__ Link in a production mode is being prefetched when it shows in a viewport. 

## Assets

To host static assets simply use public dir. 


## Using styled-components in Next.js

You need to use a Github example to achieve this, you can find it [here](https://github.com/vercel/next.js/tree/canary/examples/with-styled-components).

## Creating components



## Convert to Typescript

1. Create `tsconfig.json`;
2. Install modules:
```bash
npm install --save-dev typescript @types/react @types/node
```
3. Now run the application in development mode _et voila!_

