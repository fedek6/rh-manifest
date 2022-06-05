# Mutations

To run a mutation you'll need a `useMutation` hook. It does not run automatically on a component re-render (so it's like `useLazyQuery`).


Log in example:

```tsx
import React from "react";
import { useMutation } from "@apollo/client";
import { LOG_IN } from "../apollo/queries";

export const LogInToWp = () => {
  let login: HTMLInputElement, password: HTMLInputElement;
  const [logIn, { data, loading, error }] = useMutation(LOG_IN, {
    errorPolicy: "all",
    onCompleted: ({login}) => {
      console.log("<LogInToWp />", "setting session token");
      if (login) {
        sessionStorage.setItem("token", login.authToken)
      }
    }
  });

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <pre>
        Bad:{" "}
        {error?.graphQLErrors.map(({ message }, i) => (
          <span key={i}>{message}</span>
        ))}
      </pre>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          logIn({
            variables: {
              username: login.value,
              password: password.value,
              id: "cholibka",
            },
          });
        }}
      >
        <div>
          <input
            ref={(node) => (login = node as HTMLInputElement)}
            placeholder="login"
          />
        </div>
        <div>
          <input
            ref={(node) => (password = node as HTMLInputElement)}
            placeholder="password"
          />
        </div>
        <button type="submit">Log in</button>
      </form>
    </>
  );
};
```

> `onCompleted` callback idea from [here](https://www.howtographql.com/react-apollo/5-authentication/).

## Reset

There's a reset function exported from `useMutation` hook. You can reset `data` by using it (this is only state reset, not cache cleanup).

```tsx
  const [logIn, { data, loading, error, reset }] = useMutation(LOG_IN, {
    errorPolicy: "all",
    onCompleted: ({login}) => {
      console.log("<LogInToWp />", "setting session token");
      if (login) {
        sessionStorage.setItem("token", login.authToken)
      }
    }
  });
```

## Updating data

There are two ways to update local data after mutation:

* Update directly from the mutation data.
* Refetch queries.


### Refetch queries

This is very simple:

```ts
// Refetches two queries after mutation completes
const [addTodo, { data, loading, error }] = useMutation(ADD_TODO, {
  refetchQueries: [
    GET_POST, // DocumentNode object parsed with gql
    'GetComments' // Query name
  ],
});
```

### Automatic cache update

If response has all the data to update local store. Apollo will automatically (?) update cache.

### Update

Update function is a bit more difficult:

```ts
  const [addTodo] = useMutation(ADD_TODO, {
    update(cache, { data: { addTodo } }) {
      cache.modify({
        fields: {
          todos(existingTodos = []) {
            const newTodoRef = cache.writeFragment({
              data: addTodo,
              fragment: gql`
                fragment NewTodo on Todo {
                  id
                  type
                }
              `
            });
            return [...existingTodos, newTodoRef];
          }
        }
      });
    }
  });
```

> This topic is quite complicated, it's better to check docs before coding:

https://www.apollographql.com/docs/react/data/mutations/#updating-local-data