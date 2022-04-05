# First application

**Attention!** This tutorial uses [repo](https://github.com/fedek6/fullstack-react-with-ts).

> There is a research paper¹⁴ showing that just by using typed language you will get 15% fewer bugs in your code. There is also an interesting paper about unit tests¹⁵ stating that products where test-driven development was applied had between 40% and 90% reductions in pre-release bug density.

An example how to mess TypeScript during runtime:

```ts
function messUpTheArray(arr: Array<string | number>): void {
  arr.push(3);
}

const strings: Array<string> = ["foo", "bar"];
messUpTheArray(strings);
const s: string = strings[2];
console.log(s.toLowerCase()); // Uncaught TypeError: s.toLowerCase is not a function
```

**Notice:** all possible fields for `package.json` can be found [here](https://docs.npmjs.com/cli/v8/configuring-npm/package-json).

## Some notes on beginning

- It's good to pack everything into `React.strictMode`, in development mode it will raise warnings if you use something deprecated.

- You need to import `ReactDOM` to render react into HTML element.

- Proper way to import `React` is: ``import * as React from "react"` but modern bundlers and TS (with `allowSyntheticDefaultImports`) will allow to `import React from "react"`.

- There's also a file called `react-app-env.d.ts`. It tells TS to look definitions in other place: `/// <reference types="react-scripts" />`. This changes default types and combines multiple typings into one file (also adds support for static files like .svg etc.).

```
Triple-slash directives are single-line comments containing a single XML tag. The contents of the comment are used as compiler directives.

Triple-slash directives are only valid at the top of their containing file. A triple-slash directive can only be preceded by single or multi-line comments, including other triple-slash directives. If they are encountered following a statement or a declaration they are treated as regular single-line comments, and hold no special meaning.
```

Let's look into the SVG module:

```ts
declare module "*.svg" {
  import * as React from "react";
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
  const src: string;
  export default src;
}
```

- Use named exports because they're better with refactoring tools.

### Styling components

You can use external CSS files.

---

If you want to use style property, it's nice to put style into typed constant:

```ts
import React from "react";
const buttonStyles: React.CSSProperties = {
  backgroundColor: "#5aac44",
  borderRadius: "3px",
  border: "none",
  boxShadow: "none",
};
```

**Notice:** it will give you autocompletion.

---

You can use external styling libraries like `StyledComponents`.

> It's nice to put styled components into one file like `styles.ts`.

If you want to use `StyledComponents` with props:

```ts
export const AddItemButton = styled.button<AddItemButtonProps>`
  background-color: #ffffff3d;
  border-radius: 3px;
  border: none;
  color: ${(props) => (props.dark ? "#000" : "#fff")};
  cursor: pointer;
  max-width: 300px;
  padding: 10px 12px;
  text-align: left;
  transition: background 85ms ease-in;
  width: 100%;

  &:hover {
    background-color: #ffffff52;
  }
`;
```

### How to define props?

You can use `types` or `interfaces` interchangeably (at least most times).

Example props type (alias):

```ts
type ColumnProps = {
  text: string;
};
```

To use it, we need to create a component:

```ts
const Column = ({ text }: ColumnProps) => {
  //...
};
```

You can also define a non-required prop:

```ts
type ExampleProps = {
  someField?: string; // (property) ExampleProps.someField?: string | undefined
};
```

## How to define children prop?

There are few methods to do this:

### FC type

```ts
type ParentProps = {
  someProp: any;
};

const Parent: React.FC<ParentProps> = ({ children, ...props }) => {
  return <>{children}</>;
};
```

`React.FunctionalComponent` == `React.FC`

This is special generic type used to create props with some defaults.

### `PropsWithChildren`

This is more customized way to do this:

```ts
type React.PropsWithChildren<P> = P & {
  children?: React.ReactNode;
}
```

With usage:

```ts
type ColumnProps = React.PropsWithChildren<{
  text: string;
}>;
```

Which means a `intersection`:

```ts
type ColumnProps = {
  text: string;
} & {
  children?: React.ReactNode;
};
```

### Define children prop manually

```ts
type ColumnProps = {
  text: string;
  children?: React.ReactNode;
};
```

## How to type `useState`

If type cannot be inferred use generic ability of `useState`:

```ts
const [showForm, setShowForm] = useState<boolean>(false);
```

## How to differentiate component output (smart way)

```ts
export const AddNewItem = (props: AddNewItemProps) => {
  const [showForm, setShowForm] = useState(false);
  const { onAdd, toggleButtonText, dark } = props;

  // Magic here!
  if (showForm) {
    return (
      <NewItemForm
        onAdd={(text) => {
          onAdd(text);
          setShowForm(false);
        }}
      />
    );
  }

  return (
    <AddItemButton dark={dark} onClick={() => setShowForm(true)}>
      {toggleButtonText}
    </AddItemButton>
  );
};
```

## Writing custom focus hook

```ts
import { useRef, useEffect } from "react";

export const useFocus = () => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return ref;
};
```

> **Notice:** You must type referenced element. If you don't know what type you should choose, you can always check [here](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/global.d.ts).

- `useEffect` with empty array is used to run once when component is mounted.

- `null` is passed to `useRef` because:

```ts
interface RefObject<T> {
  readonly current: T | null;
}
```

You can make ref mutable:

```tsx
const mutableRef = useRef<HTMLInputElement | null>(null);
const mutableRef = useRef<HTMLInputElement>();
```

## Handling enter `keypress`

```ts
export const NewItemForm = ({ onAdd }: NewItemFormProps) => {
  const [text, setText] = useState("");
  const inputRef = useFocus();

  const handleAddText = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onAdd(text);
    }
  };

  return (
    <NewItemFormContainer>
      <NewItemInput
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleAddText}
        ref={inputRef}
      />
      <NewItemButton onClick={() => onAdd(text)}>Create</NewItemButton>
    </NewItemFormContainer>
  );
};
```

## State menagement

`useReducer` is a React hook that allows us to manage complex state-like objects with
multiple fields. Instead of mutating the object we create a new instance.

Reducer is a function that calculates a new state by combining an old state with an action object.

> Reducer is a pure function. It must not create any side effects.

Simplest reducer looks like that:

```js
function exampleReducer(state, action) {
  switch (action.type) {
    case "SOME_ACTION": {
      return { ...state, updatedField: action.payload };
    }
    default:
      return state;
  }
}
```

And usage:

```js
const [state, dispatch] = useReducer(reducer, initialState);
dispatch({ type: "SET_NAME", name: "George" });

// Or by using action creator:
const setName = (name) => ({ type: "SET_NAME", name });
dispatch(setName("George"));
```

Action contains:

- `type` - type of action (mandatory)
- `payload`

## Counter example

```ts
// Union type, it's better this way!
type Action =
  | {
      type: "increment";
    }
  | {
      type: "decrement";
    };

interface State {
  count: number;
}

const counterReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
};
```

> Action type looks strange because union operator in a first line allows to spread a union across multiple lines. Prettier likes that... `type Action = { type: "increment" } | { type: "decrement" }` would be better!

Component using this reducer:

```jsx
const App = () => {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 })
  return (
    <>
    <p>Count: {state.count}</p>
    <button onClick={() => dispatch({ type: "decrement" })}>
      -
    </button>
    <button onClick={() => dispatch({ type: "increment" })}>
        +
      </button>
    </>
  )
}
```

Or even nicer with action creators:

```jsx
// Outside of a component, look at the returned type
const increment = (): Action => ({ type: "increment" })
const decrement = (): Action => ({ type: "decrement" })

const App = () => {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 })
  
  return (
    <>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(increment())}>+</button>
    </>
  )
}
```

## Implement global state

Let's define a data structure and make it available to all the components.

`src/types.ts`

```ts
export interface State {
  count: number;
}

export type Action = { type: "increment" } | { type: "decrement" };

export type Task = {
  id: string
  text: string
}

export type List = {
  id: string
  text: string
  tasks: Task[]
}

// Root type
export type AppState = {
  lists: List[]
}
```

`src/state/AppStateContext.tsx`

```tsx
import { createContext, useContext, FC } from "react";
import type { AppState, List, Task } from "../types";

type AppStateContextProps = {
  lists: List[]
  getTasksByListId(id: string): Task[]
}

const appData: AppState = {
  lists: [
    {
      id: "0",
      text: "To do",
      tasks: [
        {
          id: "c0",
          text: "aaaa"
        }
      ]
    },
    {
      id: "1",
      text: "In progress",
      tasks: [
        {
          id: "c2",
          text: "bbb"
        }
      ]
    }
  ]
}

const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
);

export const AppStateProvider: FC = ({ children }) => {
  const { lists } = appData;

  const getTasksByListId = (id: string) => {
    return lists.find((list) => list.id === id)?.tasks || []
  }

  return (
    <AppStateContext.Provider value={{ lists, getTasksByListId }}>
      {children}
    </AppStateContext.Provider>
  );
}

export const useAppState = () => {
  return useContext(AppStateContext);
}
```

> We're using `createContext` and `useContext` to define a helper hook to access the context easier.

## Get the data from `AppStateContext`

To use state in component:

```tsx
import { ColumnContainer, ColumnTitle } from "./styles";
import { Card } from "./Card";
import { AddNewItem } from "./AddNewItem";
import { useAppState } from "./state/AppStateContext";

type ColumnProps = {
  text: string;
  id: string;
};

export const Column = ({ text, id }: ColumnProps) => {
  const { getTasksByListId } = useAppState();

  const tasks = getTasksByListId(id);

  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      {tasks.map((task) => (
        <Card text={task.text} key={task.id} id={task.id} />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another list"
        onAdd={console.log}
        dark
      />
    </ColumnContainer>
  );
};

```

And in `app`:

```tsx
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { Column } from "./Column";
import { AddNewItem } from "./AddNewItem";
import { AppContainer } from "./styles";
import { useAppState } from "./state/AppStateContext";

function App() {
  const { lists } = useAppState();

  return (
    <AppContainer>
      {lists.map((list) => (
        <Column text={list.text} key={list.id} id={list.id} />
      ))}
      <AddNewItem toggleButtonText="+ Add another list" onAdd={console.log} />
    </AppContainer>
  );
}

export { App };
```