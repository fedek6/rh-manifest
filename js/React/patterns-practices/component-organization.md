# Component organization

## 10 tips by Chris Achard

Source: [here](https://dev.to/chrisachard/tips-for-organizing-react-projects-191).

1. You need to determine your own (your` team) way.
2. All components in `src` directory (imported images also should be there).
3. Shared components go to `compoenents` directory.
4. Clean it up later. Do not optimize prematurely.
5. Keep entire pages and layouts in separate directories.
6. If the file has component export name it using Pascal Case (`AuthorList.tsx` etc.).
7. If you can use absolute imports `import MyComponent from 'pages/MyComponent'`.

Tsconfig example:

```
{
  "compilerOptions": {
    "baseUrl": "src"
  },
  "include": ["src"]
}
```

More about this functionality in Next.js [here](https://nextjs.org/docs/advanced-features/module-path-aliases).

8. Keep CSS in JS or near your component.
9. Add `lib`, `helpers` or `utils` directory for shared code.
10. If you're using Redux add `actions` and `reducers` or use `ducks` [pattern](https://github.com/erikras/ducks-modular-redux).

### Bonus

Try not to create default exports!

```js
import { React, createRef } from "react";
```

Looks better than:

```js
import React, { createRef } from "react";
```

Group exporting is better:

```js
export { Title } from "./components/title";
export { Navigation } from "./components/Navigation;
```

Vs.

```js
import Title from "./components/title";
import Navigation from "./components/Navigation;
export { Title, Navigation };
```

Possibility of import errors:

```js
import Angular from "react";
export default function Hello() {
  return Angular.createElement("div", null, "Hello World");
}
```

## How to organize app by Konstantin Munster

Source: [here](https://konstantinmuenster.medium.com/how-to-plan-and-organize-a-react-project-by-building-a-weather-app-95175b11bd01).

### Planning

1. Start with a mock-up.
2. Break UI into components. Use SRP rule! It states that every element should have responsibility for a specific, single part of the functionality provided by the application — not more and not less.
3. Arrange all components in a hierarchy (in larger projects it might be the ABEM).
4. Determine where your state lives. In general, it is recommended to have as few stateful components as possible.

### Organizing

Having certain patterns throughout the building procedure really helps you in keeping the app manageable.

Proposed structure:

1. **Elements** — buttons, Icons, Inputs, etc. — all those are elements which are used over and over again. They are low-level items, reused in multiple components.
2. **Components** — there, a component has to fulfill a certain standalone function for the user or the app’s appearance. Therefore, it is not just an element. Elements, in contrast, doesn’t provide standalone functions. So whilst a search bar component allows the user to submit a search query, an input field alone won’t.
3. **Containers** — containers are our state-managing components. They are at the very top of our hierarchy and usually consist of several components.

### Building

Use official React guide:

1. Build a static version of your application.
2. Identify and implement the minimal state your app needs.
3. Add functions to mutate the state and thus make the UI interactive.

#### Static version

As a first step, we build a static version of the frontend which we outlined in the mockup. So do not think about any functionalities or state manipulations. First, we focus on designing the app. For that, we take every component we previously identified and implement it in our app. Since we don’t have any data to use at that point, we can temporarily use placeholders.

#### State principles

In general, the state should be as lean as possible. Only add data to your state that is necessarily needed by your app and compute everything else on-demand.

[Ask yourself React questions!](https://reactjs.org/docs/thinking-in-react.html#step-3-identify-the-minimal-but-complete-representation-of-ui-state)

## About mutations

Never ever modify state directly!

State updates might be asynchronous!

## How to organize large scale apps

Source: [here](https://javascript.plainenglish.io/how-to-organize-large-scale-react-applications-aff84fba07cf).

Organize components thematically. For example, we have a folder named Profile that contains all the components related to the Profile page in an application, a folder named Cart that contains all the components related to the cart in the application.

Use one naming convention. Author of this article likes small letters with dashes (`user-profile.jsx` for e.g.).

Avoid large render methods. For example: let’s say we have a Profile component that renders user’s Profile, and if we add all the small components in our render method with several props then the render requires too much energy from the device and most probably it will perform slowly on several devices.

While building large-scale React applications, you will find yourself writing a lot of code that has nothing to do with React, so at the time you find yourself in a situation like that you can simply move that logic out of your components. And you can create a folder as lib or services full of non-React components.

Introduced by Facebook, the Jest framework has been one of the best options for testing React applications. It’s really quick and good at handling lots of tests, runs in watch mode, and gives fast feedback with some handy functions for testing React applications out of the box.