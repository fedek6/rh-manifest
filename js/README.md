# JS

## Good practices

* Do not use magic numbers, always put them in vars o constants:

```js
const SECONDS_IN_A_DAY = 86400;

for (let i=0; i<SECONDS_IN_A_DAY; i += 1) {
    // ...
}
```

* Avoid deep nesting:

```js
const exampleArray = [[['value']]];

// Use recurrency
const retrieveValue = (element) => {
    if (Array.isArray(element)) {
        return retrieveValue(element[0]);
    }
}
```

* Stop writing comments — this will force you to write readable code.

* Avoid writing large functions, break them into smaller ones.

* Code repetition, simply create “do one thing” functions:

```js
const add = (a, b, c) => a + b + c;
const multiply = (a, b, c) => a * b * c;
const subtract = (a, b, c) => a - b - c;
```

* Use meaningful names:

```js
getUserData; // We dont really know what's data....

getUserPosts; // Now we're talking!
```

* Favor descriptive over concise:

```js
findUser; // Yes, but what terms are used?

findUserByNameOrEmail; // Now we're talking!
```

* Use consistent verbs per concept:

```js
// Functions will do something, so use verbs!
// create, read, update or delete
getQuestions;
getUsers;
getManuals;
```

* Make booleans that read well in if-then statements:

```js
const car = {
    isSedan: true,
    isGreen: false
}

if (car.isSedan) {
    // yay it's sedan!
}
```

__Info__: try to talk by your code! It's more natural.

* Use nouns fore class names:

```js
// Pascal case for classes
class Car = {
    // ...
}
```

* Use pascal case for class names.

* Capitalize constant values:

```js
// Snake upper case.
const SECOND_IN_A_DAY = 86400;
```

* Use `const` only for values that are always the same (for e.g. you should not use it if it's a result of an API call).

* Avoid one-letter variable names (you should only use them only in a loop indexes).

*


## Useful links

* [JSDoc explained](https://jsdoc.app/);