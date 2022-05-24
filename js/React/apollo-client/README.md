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
      id
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <h1>{data.page.title}</h1>
      <p>{data.page.slug}</p>
    </>
  )
};
```

### Updating cached query results

https://www.apollographql.com/docs/react/data/queries#updating-cached-query-results