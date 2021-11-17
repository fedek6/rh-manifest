# Architecture

Based on [this](https://soshace.com/how-to-architect-a-node-js-project-from-ground-up/).

## Folder structure

* api — route controllers.
* config — env vars and configurations.
* models — db models.
* services — business logic.
* subscribers — event handlers.
* app.js — entry point.
* server.js — server config.

## Server

server.js

```js
const http = require('http');
const app = require('./app');
 
const port = process.env.PORT || 3000;
 
const server = http.createServer(app);
 
server.listen(port);
```

*app.js*

```js
const express = require('express');
const app = express();
 
// routes
app.use((req, res, next) => {
    res.status(200).json({
        message: 'Hello world!!!'
    });
});
 
module.exports = app;
```

## Resource routes

*/api/routes/books.js*

```js
/**
 * GET request to /books
 */
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'All Books were fetched'
    });
});
 
/**
 * GET request to /books/:id
 */
router.get('/:id', (req, res, next) => {
    res.status(200).json({
        message: 'Book with id was fetch'
    });
});
```

## Environment variables

As programmers, we often underestimate the importance of organizing and configuring environment variables.  It is important that our apps work in various environments. This could be your colleagues’ computer, in a server, in a docker container, or in some other cloud provider. Therefore, setting up environment variables is crucial while architecting a Node.js application.

Use `dotenv` package for environment management. 

It is a good practice to gather our variables from .env file and map them into well-named variables and export them through a module. Let’s create a file `config/index.js`.

```js
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  endpoint: process.env.API_URL,
  masterKey: process.env.API_KEY,
  port: process.env.PORT
};
```

And use it:

```js
const http = require('http');
const app = require('./app');
const { port } = require('./config');
 
const server = http.createServer(app);
 
server.listen(port);
```

## MVC

* Model components are responsible for application’s data domain. Model objects are responsible for storing, retrieving, and updating data from the database.

* It is the user interface of our application. In most modern web applications, the view layer is usually replaced by another single page application, for example, a React.js or an Angular application.

* Controllers

`models/author.js`

```js
const mongoose = require('mongoose');
const authorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    books: { type: Object, required: false }
});
module.exports = mongoose.model('Author', authorSchema);
```

`api/controller/author.js`

```js
module.exports = {
    createAuthor: async (name) => {
        const author = new Author({
            _id: new mongoose.Types.ObjectId(),
            name: name
        });
        try {
            const newAuthorEntry = await author.save()
            return newAuthorEntry; 
        } catch (error) {
            throw error
        }
    },
 
    getAuthor: async (id) => {
        // ..
    },
 
    getAllAuthors: async() => {
        // ...
    }
}
```

`api/routes/author.js`

```js
/**
 * POST create /author
 */
router.post("/", async (req, res, next) => {
    const author = await authorController.createAuthor(req.body.name)
    res.status(201).json({
        message: "Created successfully",
        author
    })
});
```

__Notice:__ Our components are now following the single responsibility principle.

This is all OK before we need to scale up our application:

`api/controller/author.js`

```js
createAuthor: async (name) => {
        const author = new Author({
            _id: new mongoose.Types.ObjectId(),
            name: name
        });
        try {
            // cehck if author is best-seller
            const isBestSeller = await axios.get('some_third_part_url');
            // if best seller do we have that book in our store 
            if(isBestSeller) {
                // Run Additional Database query to figure our
                //...
                //if not send library admin and email 
                //...
                // other logic and such
            }
            const newAuthorEntry = await author.save()
            return newAuthorEntry; 
        } catch (error) {
            throw error
        }
},
```

It looks messy! Controller is responsible for multiple actions, so it's breaking SRP.

## Layered Architecture for Node.js

We want to apply the separation of concerns principle and move our business logic away from our controllers. We will create small service functions that will be called from our controllers. This architecture is also referred to as a __3-layer-architecture__.

Service function example:

```js
createAuthor: async (name) => {
        const author = new Author({
            _id: new mongoose.Types.ObjectId(),
            name: name
        });
        try {
            await AuthorService.checkauthorSalesStatus();
            await BookService.checkAvailableBooksByAuthor(name);
            const newAuthorEntry = await author.save();
            return newAuthorEntry; 
        } catch (error) {
            throw error
        }
},
```

__Notice__ that service functions are designed to do one specific task. This way, our services are encapsulated, testable, and open to future changes without any major side effects.

### Example

This looks bad:

```js
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { mongoUrl } = require('./config');
const bodyParser = require('body-parser');
 
//routes 
const authorsRoutes = require('./api/routes/authors');
const booksRoutes = require('./api/routes/books');
 
mongoose.connect(mongoUrl, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
});
 
app.use('/authors', authorsRoutes);
app.use('/books', booksRoutes);
 
module.exports = app;
```

So let's extract config functions to external module:

`config/init.js`

```js
const mongoose = require('mongoose');
const { mongoUrl } = require('./index');
 
module.exports = {
    initializeDB: async () => {
        mongoose.connect(mongoUrl, { useNewUrlParser: true });
        mongoose.Promise = global.Promise;
    },
 
    cors: async (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
        if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
        }
        next();
    }
}
```

And voilà:

```js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./config/init')
 
//routes 
const authorsRoutes = require('./api/routes/authors');
const booksRoutes = require('./api/routes/books');
 
 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
app.use(config.cors);
 
app.use('/authors', authorsRoutes);
app.use('/books', booksRoutes);
 
module.exports = app;
```