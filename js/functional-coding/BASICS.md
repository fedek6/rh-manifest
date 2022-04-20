# Basics

## Background story

The origins of functional programming go way back to the 1930’s with the invention of Lambda Calculus.

This was an approach to computation that sought to define common tasks and functions not as the structural manipulation of data structures (such as arrays and lists), but rather as mathematical functions performed on them.

## Basic terms

### Pure and impure functions

Pure functions do not mutate data passed to them. They do calculations and return new data without modifying arguments.

### Anonymous functions

Such functions do not have defined names. Instead, they are assigned to variables and invoked via them.

### Recursive functions

To limit loops usage programmers can use recursion.

### First class functions

This means the language supports passing functions as arguments to other functions, returning them as the values from other functions, and assigning them to variables or storing them in data structures.

## What things you shall not use in FP

* Loops
* Variable declarations
* Void functions
* Object mutation `x.o=1`
* Array mutators `pop`, `push` etc.
* Map mutators
* Set mutators

## More on pure functions

```js
function multiply(a, b) {
  return a * b;
}
```

* Always give the same result for the same arguments.
* No side effects (no IO, no logging etc.). 

> 80% of functions should be pure, 20% may be impure.

> Pure function must return something. `void` is not allowed.

### Advantages

* Easier to reason because immutability.
* Value can be cached "memoized".
* Easier to test (no deps).

### Some impure examples

```js
let heightRequirement = 46;

// Impure because it relies on a mutable (reassignable) variable.
function canRide(height) {
  return height >= heightRequirement;
}

// Impure because it causes a side-effect by logging to the console.
function multiply(a, b) {
  console.log('Arguments: ', a, b);
  return a * b;
}
```

### Captured variables

```js
let heightRequirement = 46;

function canRide(height) {
  return height >= heightRequirement; // This captured variable
}
```

> Note: you can use `const` for `heightRequirement` and function will turn pure. 


### Object problems

Impure:

```js
const constants = {
  heightRequirement: 46,
  // ... other constants go here
};

function canRide(height) {
  return height >= constants.heightRequirement;
}
```

> Object freeze might be used to overcome this problem.

```js
// CASE 4: The object is immutable and the variable cannot be reassigned. This is what we want!!!!!!!!
const o4 = Object.freeze({ foo: 'never going to change me' });
```

### Arrays

You can replace any array mutator:

```js
// Instead of: a.push(7, 8, 9);
const b = a.concat(7, 8, 9);

// Instead of: a.pop();
const c = a.slice(0, -1);

// Instead of: a.unshift(1, 2, 3);
const d = [1, 2, 3].concat(a);

// Instead of: a.shift();
const e = a.slice(1);

// Instead of: a.sort(myCompareFunction);
const f = R.sort(myCompareFunction, a); // R = Ramda

// Instead of: a.reverse();
const g = R.reverse(a); // R = Ramda
```

### Maps

```js
const map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three']
]);

// Instead of: map.set(4, 'four');
const map2 = new Map([...map, [4, 'four']]);

// Instead of: map.delete(1);
const map3 = new Map([...map].filter(([key]) => key !== 1));

// Instead of: map.clear();
const map4 = new Map();
```

### Sets

```js
const set = new Set(['A', 'B', 'C']);

// Instead of: set.add('D');
const set2 = new Set([...set, 'D']);

// Instead of: set.delete('B');
const set3 = new Set([...set].filter(key => key !== 'B'));

// Instead of: set.clear();
const set4 = new Set();
```

### TypeScript

In `TS` there are special types for immutability:

* `Readonly<T>` 
* `ReadonlyArray<T>` 
* `ReadonlyMap<K, V>`
* `ReadonlySet<T>` 

> Sometimes it's faster to mutate objects. Test application speed and use`immutable.js` library. 


## Function composition

> `f ∘ g` means `f composed with g`

> `(f ∘ g)(x) = f(g(x))`

* We can compose any number of functions
* The Easiest pattern is to take one output and pass to second functions `f(g(x))`


Easiest example:

```js
// h(x) = x + 1
// number -> number
function h(x) {
  return x + 1;
}

// g(x) = x^2
// number -> number
function g(x) {
  return x * x;
}

// f(x) = convert x to string
// number -> string
function f(x) {
  return x.toString();
}

// y = (f ∘ g ∘ h)(1)
const y = f(g(h(1)));
console.log(y); // '4'
```

### Helper libraries

Use `Ramda` or `lodash`:

```js
// h(x) = x + 1
// number -> number
function h(x) {
  return x + 1;
}

// g(x) = x^2
// number -> number
function g(x) {
  return x * x;
}

// f(x) = convert x to string
// number -> string
function f(x) {
  return x.toString();
}

// R = Ramda
// composite = (f ∘ g ∘ h)
const composite = R.compose(f, g, h);

// Execute single function to get the result.
const y = composite(1);
console.log(y); // '4'
```

## Recursion

Traditional factorial:

```js
function iterativeFactorial(n) {
  let product = 1;
  for (let i = 1; i <= n; i++) {
    product *= i;
  }
  return product;
}
```

Functional factorial:

```js
function recursiveFactorial(n) {
  // Base case -- stop the recursion
  if (n === 0) {
    return 1; // 0! is defined to be 1.
  }
  return n * recursiveFactorial(n - 1);
}
```

> `recursiveFactorial(20000)` would exceed stack size. There's a way to overcome this! Proper tail calls optimization (PTC) is not making stack higher if the last thing function is doing is calling itself and returning result.

Optimized version with PTC in mind:

```js
// Optimized for tail call optimization.
function factorial(n, product = 1) {
  if (n === 0) {
    return product;
  }
  return factorial(n - 1, product * n)
}
```

Stack never goes higher than two frames.

> PTC is only implemented is Safari! Other browsers have STC. It's still a good idea to write your code this way.


## Higher order functions (HOFs)

Function taking other function as an argument.

Basic examples:

* `fiter`
* `map`
* `reduce`

Example:

```js
const averageSUVPrice = vehicles
  .filter(v => v.type === 'suv')
  .map(v => v.price)
  .reduce((sum, price, i, array) => sum + price / array.length, 0);
```

And more functional style:

```js
// Using `pipe` executes the functions from top-to-bottom. 
const averageSUVPrice1 = R.pipe(
  R.filter(v => v.type === 'suv'),
  R.map(v => v.price),
  R.mean
)(vehicles);

// Using `compose` executes the functions from bottom-to-top.
const averageSUVPrice2 = R.compose(
  R.mean,
  R.map(v => v.price),
  R.filter(v => v.type === 'suv')
)(vehicles);
```

## Currying

Is a process of taking a function that accepts `n` arguments and turning it into n functions that accepts a single argument.

> `arity` is a number of function's arguments. There are unary, binary, ternary and n-ary functions.

So currying is a process of turning `n-ary` function into `n` unary functions.

In a plain JS:

```js
function curriedDot(vector1) {
  return function(vector2) {
    return vector1.reduce((sum, element, index) => sum += element * vector2[index], 0);
  }
}

// Taking the dot product of any vector with [1, 1, 1]
// is equivalent to summing up the elements of the other vector.
const sumElements = curriedDot([1, 1, 1]);

console.log(sumElements([1, 3, -5])); // -1
console.log(sumElements([4, -2, -1])); // 
```

Using `Ramda`:

```js
function dot(vector1, vector2) {
  return vector1.reduce((sum, element, index) => sum += element * vector2[index], 0);
}

const v1 = [1, 3, -5];
const v2 = [4, -2, -1];

// Use Ramda to do the currying for us!
const curriedDot = R.curry(dot);

const sumElements = curriedDot([1, 1, 1]);

console.log(sumElements(v1)); // -1
console.log(sumElements(v2)); // 1

// This works! You can still call the curried function with two arguments.
console.log(curriedDot(v1, v2)); // 3
```

Other `Ramda` example:

```js
const giveMe3 = R.curry(function(item1, item2, item3) {
  return `
    1: ${item1}
    2: ${item2}
    3: ${item3}
  `;
});

const giveMe2 = giveMe3(R.__, R.__, 'French Hens');   // Specify the third argument.
const giveMe1 = giveMe2('Partridge in a Pear Tree');  // This will go in the first slot.
const result = giveMe1('Turtle Doves');               // Finally fill in the second argument.

console.log(result);
// 1: Partridge in a Pear Tree
// 2: Turtle Doves
// 3: French Hens
```

This can be also done in plain JS:

```js
function giveMe3(item1, item2, item3) {
  return `
    1: ${item1}
    2: ${item2}
    3: ${item3}
  `;
}

const giveMe2 = giveMe3.bind(null, 'rock');
const giveMe1 = giveMe2.bind(null, 'paper');
const result = giveMe1('scissors');

console.log(result);
// 1: rock
// 2: paper
// 3: scissors
```