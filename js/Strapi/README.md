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

### Strapi vanilla (back) 

Use `docker-compose`:

```yaml
version: '3'

services:
  strapi:
    container_name: strapi
    image: strapi/strapi
    environment:
      - DATABASE_CLIENT=postgres
      - DATABASE_HOST=db
      - DATABASE_PORT=5432
      - DATABASE_NAME=strapi
      - DATABASE_USERNAME=strapi
      - DATABASE_PASSWORD=strapi
    ports:
      - 1337:1337
    volumes:
      - ./app:/srv/app
    depends_on:
      - db

  db:
    container_name: postgres
    image: postgres
    restart: always
    volumes:
      - ./db:/var/lib/postgresql/data
    environment:
      POSTGRES_USER: strapi
      POSTGRES_PASSWORD: strapi
      POSTGRES_DB: strapi
```

Add GraphQL:

```bash
docker -ps
docker exec -it [id] bash
yarn strapi install graphql
```

And you got playground: http://localhost:1337/graphql

#### Slug system

Simply add a text field (slug) and set it up to be non-editable.

Add Strapi function `config/functions/slugify.js`.

Also edit model code:

```js
module.exports = {
  lifecycles: {
    beforeCreate: async (data) => {
      if (data.title) {
        data.slug = strapi.config.functions['slugify'].slugifyInternational(data.title);
      }
    },
    beforeUpdate: async (params, data) => {
      if (data.title) {
        data.slug = strapi.config.functions['slugify'].slugifyInternational(data.title);
      }
    },
  },
};
```

### Next.js (front)

```bash
yarn create next-app --typescript frontend
```

```bash
yarn add @apollo/client graphql
```