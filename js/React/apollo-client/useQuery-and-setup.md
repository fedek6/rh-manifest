# Apollo (based on an official doc)

Core library `@apollo\client` provides built-in integration with React.

## Setup

```
npm install @apollo/client graphql
```

Simplest client:

```ts
import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_API,
  cache: new InMemoryCache(),
});
```

### Simplest hello world query (without React):

```ts

  client
    .query({
      query: gql`
        query MyQuery {
          pages {
            nodes {
              slug
            }
          }
        }
      `,
    })
    .then((result) => {
      console.log(result.data.pages.nodes);
    })
    .catch((e) => {
      console.error(e);
    });
}, []);
```

### Using hook `useQuery`:

```tsx
import React from "react";
import { useQuery } from "@apollo/client";
import { PAGE_TITLES } from "./apollo/queries";

export const PageTitles = () => {
  const { loading, error, data } = useQuery(PAGE_TITLES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.pages.nodes.map(({ title }: { title: string }) => (
    <ul key={title}>
      <li>{title}</li>
    </ul>
  ));
};
```

### Caching query results

Apollo Client caches results locally. You can check that by using plugin with multiple parametrized queries:

```ts
export const GET_PAGE = gql`
  query Page($id: ID!) {
    page(id: $id) {
      title
      slug
    }
  }
`;
```

```tsx
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_PAGE } from "../apollo/queries";

export const Page = ({ id }: { id: string }) => {
  const { loading, error, data } = useQuery(GET_PAGE, {
    variables: {
      id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <h1>{data.page.title}</h1>
      <p>{data.page.slug}</p>
    </>
  );
};
```

### Updating cached query results

#### Polling

This way you can fetch data any `n` seconds.

Working example:

```tsx
import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_NEWEST_POST } from "../apollo/queries";

export const PollingQuery = () => {
  const { loading, error, data, startPolling } = useQuery(GET_NEWEST_POST);

  useEffect(() => {
    startPolling(1000);
  }, []);

  if (loading) return null;
  if (error) return <>`Error! ${error}`</>;

  return (
    <>
      <p>The newest post is (polling every second):</p>
      <p>
        {data.posts.nodes[0].slug}: {data.posts.nodes[0].title}
      </p>
    </>
  );
};
```

#### Refetching

Ability to update data on user action.

You can import `refetch` from `useQuery` hook:

```tsx
<button
  onClick={() => {
    refetch({ order: orderState });
  }}
>
  Refetch!
</button>
```

> You can pass different values when refetching.


#### Inspecting loading states

You can inspect loading states:

```tsx
export const RefetchingState = () => {
  const { loading, error, data, refetch, networkStatus } = useQuery(
    GET_NEWEST_POST_ORDERED,
    {
      notifyOnNetworkStatusChange: true,
    }
  );

  if (networkStatus === NetworkStatus.refetch) return <>'Refetching!'</>;
  if (loading) return null;
  if (error) return <>`Error! ${error}`</>;

  return (
    <>
      <button
        onClick={() => {
          refetch();
        }}
      >
        Refetch!
      </button>

      <p>Post data:</p>
      <p>
        {data.posts.nodes[0].slug}: {data.posts.nodes[0].title}
      </p>
    </>
  );
};
```

`NetworkStatus` is an `enum` with all statuses:

```
    loading = 1,
    setVariables = 2,
    fetchMore = 3,
    refetch = 4,
    poll = 6,
    ready = 7,
    error = 8
```

#### Handling errors

You can handle errors with detailed client info:

```jsx
export const BadQueryHandling = () => {
  const { loading, error, data } = useQuery(GET_NEWEST_POST_BAD, {
    errorPolicy: "all",
  });

  if (loading) return null;

  return (
    <>
      <div>
        <h2>Good: {data?.page.title}</h2>
        <pre>
          Bad:{" "}
          {error?.graphQLErrors.map(({ message }, i) => (
            <span key={i}>{message}</span>
          ))}
        </pre>
      </div>
    </>
  );
};
```

#### `useLazyQuery` for on-demand fetching

```tsx
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_NEWEST_POST_BAD } from "../apollo/queries";

export const BadQueryHandling = () => {
  const { loading, error, data } = useQuery(GET_NEWEST_POST_BAD, {
    errorPolicy: "all",
  });

  if (loading) return null;

  return (
    <>
      <div>
        <h2>Good: {data?.page.title}</h2>
        <pre>
          Bad:{" "}
          {error?.graphQLErrors.map(({ message }, i) => (
            <span key={i}>{message}</span>
          ))}
        </pre>
        <pre>
          { JSON.stringify(data, null, "") }
        </pre>
      </div>
    </>
  );
};
```

#### Fetch policy

You can set a policy, if you want to fetch always fresh data etc.

> By default, `Apollo` uses `cache-first` policy.


Example, do not use cache:

```ts
const { loading, error, data } = useQuery(GET_DOGS, {
  fetchPolicy: 'network-only', // Doesn't check cache before making a network request
});
```

Or you if you want to use network at first and cache second time:

```ts
const { loading, error, data } = useQuery(GET_DOGS, {
  fetchPolicy: 'network-only', // Used for first execution
  nextFetchPolicy: 'cache-first', // Used for subsequent executions
});
```

> You can configure fetch policy globally in Apollo client. There you can also use functions to fine tune your setup.

Docs are [here](https://www.apollographql.com/docs/react/data/queries/#nextfetchpolicy).