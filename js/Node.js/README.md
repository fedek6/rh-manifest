# Node.js basics

## Best practices

### 1. Layered Approach.

You should use “separation of concerns” principle. According to this, we should have different modules for addressing different concerns.

For example:

- Client request.
- Business logic + database manipulation.
- Response.

Which really means:

- Controller → API routes / endpoints.
- Service layer → business logic.
- Data access layer → database operations.

---

#### Controller layer

Here API routes are defined. In the route handler functions, you can deconstruct the request object, pick the important data and pass them to the service layer.

---

#### Service layer

Here your business logic lives. It contains a bunch of classes and methods that take singular responsibility and are reusable (S.O.L.I.D rule). This layer allows you to effectively decouple the processing logic form the routes.

---

#### Data access layer

Here we talk to the database.

### 2. Folder structure.

Common folder structure:

```
   src
      ├── app.js			app entry point
      ├── /api			    controller layer: api routes
      ├── /config			config settings, env variables
      ├── /services		    service layer: business logic
      ├── /models			data access layer: database models
      ├── /scripts		    miscellaneous NPM scripts
      ├── /subscribers		async event handlers
      └── /test             test suites
```

### 3. Publisher Subscriber Models.

The Publisher/Subscriber model is a popular data exchange pattern in which there are two communicating entities - publishers and subscribers. Publishers (message senders) send out messages along specific channels without any knowledge of the receiving entities. Subscribers (message receivers), on the other hand express interest in one or more of these channels without any knowledge about publishing entities.

Bad practice:

```js
export default class UserService() {

      async function signup(user) {

        // 1. Create user record
        // 2. Generate auth key
        // 3. Send confirmation email
        // ...

      }

    }
```

And refactored code:

```js
 var events = require('events');
      var eventEmitter = new events.EventEmitter();

      export default class UserService() {

        async function signup(user) {
          // emit 'signup' event
          eventEmitter.emit('signup', user.data)
        }

      }
```

Multiple subscribers:

```js
// email.js

    // ...

    eventEmitter.on('signup', async ({ data }) => {  // event listener 
      // send email 
    })

    // ...
```

```js
// auth.js

    // ...

    eventEmitter.on('signup', async ({ data }) => {	// event listener
      // generate auth key
    })

    // ...
```

### 4. Clean code & readability.

* Linting & formatting — use ESlint with Prettier.

* Choose style guide. Google or Airbnb?

* Add some comments (but not too much).

### 5. Write Asynchronous Code (promises, async/await).

Try not to create a callback hell. For this purpose you can use Promises API (ES6). From ES8 you can also use `async/await` syntax.

Bad example:

```js
    function get_data() {
        $.get('https://url.com/one', () => {
            $.get('https://url.com/two', () => {
                $.get('https://url.com/three', (res) => {
                    console.log(res)
                })
            })
        })
    }
```

Refactored example:

```js
    async function get_data() { // async function
        await $.get('https://url.com/one')
        await $.get('https://url.com/two')
        let res = await $.get('https://url.com/three')
        console.log(res)
    }
```

### 6. Configuration files and Environment Variables.

Separate your config vars:

```
/config			
        ├── index.js
        ├── module1.js		 
        └── module2.js	
```

Use .env files:

```js
// app.js

require('dotenv').config()      

console.log(process.env.DB_HOST) 
console.log(process.env.DB_USER)
```

Common .env practice is to import all vars into one object:

```js
// config/database.js

      require('dotenv').config()

      export default {
        host: process.env.DB_HOST,		
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
      }
```

## Useful links

- [Node Target Mapping](devops/docker/compose-examples/node-tsc-app.md).
