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

https://www.apollographql.com/docs/react/data/mutations#resetting-mutation-status