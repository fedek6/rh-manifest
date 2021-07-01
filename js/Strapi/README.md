# Strapi Notes

## Creating starter app

### Strapi (back)

Based on [this tutorial](https://strapi.io/blog/build-a-blog-with-next-react-js-strapi).

```bash
yarn create strapi-app backend --quickstart --template https://github.com/strapi/strapi-template-blog
```

Will create backend directory with the Strapi app. 

If you want to use GraphQL in your project:

```bash
yarn strapi install graphql
```

Playground will be automatically added: http://localhost:1337/graphql

### Next.js (front)

```bash
yarn create next-app --typescript frontend
```

```bash
yarn add @apollo/client graphql
```