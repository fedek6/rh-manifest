# Node.js basics

## Best practices

Based on [this](https://scoutapm.com/blog/nodejs-architecture-and-12-best-practices-for-nodejs-development).

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

eventEmitter.on("signup", async ({ data }) => {
  // event listener
  // send email
});

// ...
```

```js
// auth.js

// ...

eventEmitter.on("signup", async ({ data }) => {
  // event listener
  // generate auth key
});

// ...
```

### 4. Clean code & readability.

- Linting & formatting — use ESlint with Prettier.

- Choose style guide. Google or Airbnb?

- Add some comments (but not too much).

### 5. Write Asynchronous Code (promises, async/await).

Try not to create a callback hell. For this purpose you can use Promises API (ES6). From ES8 you can also use `async/await` syntax.

Bad example:

```js
function get_data() {
  $.get("https://url.com/one", () => {
    $.get("https://url.com/two", () => {
      $.get("https://url.com/three", (res) => {
        console.log(res);
      });
    });
  });
}
```

Refactored example:

```js
async function get_data() {
  // async function
  await $.get("https://url.com/one");
  await $.get("https://url.com/two");
  let res = await $.get("https://url.com/three");
  console.log(res);
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

require("dotenv").config();

console.log(process.env.DB_HOST);
console.log(process.env.DB_USER);
```

Common .env practice is to import all vars into one object:

```js
// config/database.js

require("dotenv").config();

export default {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
};
```

### 7. Testing, logging & error handling.

#### Test your code

Unit tests form the foundation of most testing setups. Here, individual units/components are tested in isolation from the rest of the code to verify their correctness. This allows your code to be validated at the (logically) lower level to ensure that each of the internal components is working accurately, as expected.

Choose between Mocha, Jest and Jasmine.

```js
// example.test.js

const assert = require("assert");

describe("Basic addition test", () => {
  it("should add up to 3", () => {
    assert.equal(2 + 1, 3);
  });

  it("should equal 8", () => {
    assert.equal(4 * 2, 8);
  });
});
```

#### Log everything

If you are looking for more functionality and convenience for your logging setup, you can consider using third party logging libraries into your code. Some of the most common logging frameworks for Node.js are - Winston, Bunyan, and Morgan.

#### Catching errors

Instead of letting Node.js throw errors, interrupt code execution, even fail at times, we’d rather take charge of our application’s control flow by handling these error conditions. This is what we can achieve through exception handling using try/catch blocks. By empowering developers to programmatically manage such exceptions, it keeps things stable, facilitates easier debugging, and also prevents a poor end-user experience.

### 8. Code compression & file size.

For example GZIP in Express:

```js
var compression = require("compression");
var express = require("express");
var app = express();
app.use(compression());
```

### 9. Dependency injection

Dependency injection is a software design pattern that advocates passing (injecting) dependencies (or services) as parameters to our modules instead of requiring or creating specific ones inside them.

Bad example:

```js
const Emoji = require("./Emoji");
const YellowEmojis = require("./yellow-emojis");

async function getAllEmojis() {
  return YellowEmojis.getAll(); // 🌕 🌟 💛 🎗 🌼
}

async function addEmoji(emojiData) {
  const emoji = new Emoji(emojiData);

  return YellowEmojis.addEmoji(emoji);
}

module.exports = {
  getAllEmojis,
  addEmoji,
};
```

After refactor:

```js
const Emoji = require("./Emoji");

function EmojisService(emojiColor) {
  async function getAllEmojis() {
    return emojiColor.getAll();
  }

  async function addEmoji(emojiData) {
    const emoji = new Emoji(emojiData);

    return emojiColor.addEmoji(emoji);
  }

  return {
    getAllEmojis,
    addEmoji,
  };
}

module.exports = EmojisService;
```

### 10. Third-party solutions. Don’t reinvent the wheel. Don’t be greedy either.

As a developer, it helps to be on the lookout for tools that make your life easier. Here are some popular Node.js libraries that can effectively enhance your coding workflows:

* Nodemon, (automatically restarts application when code files are updated).
* Gulp, Grunt, (automated task runners).
* Winston, (logging framework).
* Agenda (job scheduling). 
* Moment (working with date & time).

While these libraries and tools ease off a lot of the burden, it is important to be intelligent and responsible about every package that we import. We should be aware about the purpose, strengths and weaknesses of each package we import and ensure that we aren’t over-reliant on them.

### 11. General rules.

“Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.” — Martin Golding

* DRY (Don’t Repeat Yourself).
* Single Responsibility Principle (SRP).
* “Keep it simple, stupid” (KISS).
* Separation of Concerns.
* YAGNI (You ain’t gonna need it).
* Avoid premature optimization.
* S.O.L.I.D programming principles.
* Dependency injection.

### 12. Use Application Monitoring Tools.

For large-scale applications in production, one of the main goals is to better understand how users interact with the application: about which routes or features are most commonly used, about the most commonly performed operations, etc. Also, there is a focus on evaluating performance metrics, quality issues, bottlenecks, common errors, etc. and using that information to make the necessary changes and improvements.

This is where application monitoring (APM) tools like ScoutAPM come into the picture. ScoutAPM allows you to constructively analyze and optimize your web app’s performance. 

## Useful links

- [Node Target Mapping](devops/docker/compose-examples/node-tsc-app.md).
