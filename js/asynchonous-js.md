# Asynchronous JS

Based on [this](https://scoutapm.com/blog/async-javascript).

Callbacks → promises → async/await.

## Fundamentals

JavaScript is a single-threaded programming language. It natively has one call stack and one memory heap at its disposal. This seems to imply that all operations need to pass through that main thread and therefore wait for the preceding ones to have completed before they can get their chance.

JS consists of:

JavaScript Engine.

- Browser Runtime Environment.
- Call Stack, Callback Queue, and Event Loop.

When you call a function like setTimeout that would otherwise have been blocking in nature, after being pushed to the call stack, it is immediately transferred to the browser’s web APIs.

Once your setTimeout function is completed, it is pushed to (what is known as) the callback queue or the task queue. This queue stores the asynchronous tasks that have been completed before they are pushed back to the call stack to be finally executed.

The event loop is the last part of this equation that is responsible for pushing the items waiting in the callback queue to the main call stack. It closely monitors the call stack and the callback queue - when the call stack is empty, it picks the topmost item from the callback queue and pushes it to the call stack for execution.

## JS Promises

To make this easier, with ES 6 (ES 2015), Promises were introduced in JavaScript. They allowed more flexibility, better readability, and more control over how you wanted your asynchronous code to be handled.

```js
function get_data() {
  $.get("https://url.com/one") // chained using .then()
    .then(() => $.get("https://url.com/two"))
    .then(() => $.get("https://url.com/three"))
    .then((res) => console.log(res));
}
```

## Async/Await

With ES 8 (ES 2017), the async/await syntax was introduced to simplify things even more. Async/await serves mostly as syntactic sugar on top of Promises, but has brought about a decent change in how code is written and in a bunch of other things that we’ll discuss later in the post.

```js
async function get_data() {
  // async function
  await $.get("https://url.com/one"); // execution pauses, waiting for request to complete
  await $.get("https://url.com/two");
  let res = await $.get("https://url.com/three");
  console.log(res);
}
```

Adding await before a statement (inside an async function) makes JavaScript pause the execution inside the function and wait until that operation is completed.

## Deep dive into Promises

Promises are JavaScript objects that represent an “eventual completion (or failure)” of some asynchronous code. It stands for an operation that hasn’t completed yet, but ‘promises’ to run asynchronously and return a value (or information about its failure) when it’s done.

- Fulfilled — (i.e. successfully completed).
- Rejected — (i.e. rejected, failed, or threw an error).
- Pending — (i.e. still processing, working on it).

The Promises (or the Futures) API allows you to program your asynchronous behavior corresponding to each of these cases: you can capture the fulfillment case by using the .then() function and handle the rejections and thrown errors using the .catch() function.

You can create your custom promises:

```js
let a = 1;
var myPromise = new Promise((resolve, reject) => {
  if (a > 0) {
    resolve(a);
  } else {
    reject("My error message");
  }
});

myPromise
  .then((res) => {
    // if promise is fulfilled
    console.log("Promise was resolved ✅");
    console.log("Returned value:", res);
  })
  .catch((err) => {
    // if promise fails
    console.log("Some error occured! ⚠️");
    console.error("Error message: ", err);
  });
```

The good thing about .then() and .catch() functions are that they also return promises.

```js
$.get(url1) // get url1
  .then(() => $.get(url2)) // then url2
  .then(() => $.get(url3)) // then url3
  .then((res) => console.log(res)) // print response
  .catch((err) => console.error(err)); // error handling
```

## Deep dive into Async/Await

Async functions are functions that return a promise. You can declare any function as an async function just by adding the ‘async’ keyword before it.

```js
async function f() {
  return "Hello world! 🌎";
}
console.log(f()); // prints the promise
f().then((res) => console.log(res)); // prints returned value
```

### Await statements

**Notice:** We can use the await keyword only inside an async function.

This is more readable than the promise based code:

```js
async function get_data() {
  // using an async function
  let url1 = "https://jsonplaceholder.typicode.com/posts/1";
  let url2 = "https://jsonplaceholder.typicode.com/photos/1";
  let url3 = "https://jsonplaceholder.typicode.com/comments/1";
  await $.get(url1); // get url1
  await $.get(url2); // then url2
  let res3 = await $.get(url3); // then url3

  console.log(res3); // print response
}

get_data();
```

**Notice:** async/await is basically a wrapper on top of the Promises API.

#### You need to decide which is better

```js
$.get(url1)
  .then((res1) => {
    console.log(res1);
    return $.get(doSomethingWithRes(res1, url2));
  })
  .then((res2) => {
    console.log(res2);
    return $.get(doSomethingWithRes(res2, url3));
  })
  .then((res3) => {
    console.log(res3);
  });
```

VS.

```js
async function myFunction() {
  let res1 = await $.get(url);
  console.log(res1);
  let res2 = await $.get(doSomethingWithRes(url, res1));
  console.log(res2);
  let res3 = await $.get(doSomethingWithRes(url, res2));
  console.log(res3);
}
```

Second one has fewer lines, and it's easier to read.

#### Important note on error handling

When using promises you need to add catch to your chain:

```js
try {
  $.get(url1)
    .then(() => $.get(url2))
    .then(function (res) {
      throw new Error("Hello error! ⚠️");
    }); // throwing error to see if it’s caught
  // uncomment below line ⬇️ to handle above thrown error
  // .catch((err) => console.error('Handling error: ', err))
} catch (err) {
  // this won't be able to capture any errors that happen inside promises
  console.error(err);
}
```

When using async/await you can do that:

```js
async function myFunction() {
  try {
    await $.get(url1);
    await $.get(url2);
    throw new Error("Hello error! ⚠️"); // throwing error to see if it’s caught
  } catch (err) {
    // this will be able to capture any errors that happen inside our async function
    console.error(err);
  }
}
```

**As we have seen in the last few sections, the advantages of async/await clearly outweigh those of promises.**
