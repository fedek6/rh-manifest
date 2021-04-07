# JavaScript Primer, Part 1

__Notice__: To use autoreload in a node application use the `nodemon` package. 

For example:

```bash
npx nodemon index.js
```

`JavaScript` type handling is messy, for example:

```js
let a = 100;
let b = "100";

(a == b) ? true : false; // true

let sum = a + b; // 100100
```

## Built-in Types

* `number` — there's no difference between integer and floating-point values, number is a number.
* `string` — text data.
* `boolean`
* `null` — nonexistent or invalid reference.
* `undefined` — variable has been defined without value.
* `object` — compound values, formed from individual properties and values.

__Warning__: Running typeof on null variable will return object! This is prehistoric behavior. 

## Type coercion

JS will try to convert incompatible variable to perform operations on them.

This is example of this:

```js
let a = 100;
let b = "100";

if (a == b)
```
### Avoiding coercion

```js
if (hatPrice === bootsPrice) {
 console.log("Prices are the same");
} else {
 console.log("Prices are different");
}

let totalPrice = Number(hatPrice) + Number(bootsPrice);
```

### This can be useful…

```js
let firstCity;
let secondCity = firstCity || "London";
```

### Functions

Functions may produce different types based on their arguments. 

```js
function sumPrices(first, second, third) {
 return first + second + third;
}
```

You can avoid such problems using default parameters:

```js
function sumPrices(first, second, third = 0) {
 return first + second + third;
}
```

Or, even better, Rest Parameter:

```js
function sumPrices(...numbers) {
 return numbers.reduce(function(total, val) {
    return total + val
 }, 0);
}
```

__Notice__: Rest Parameters is an array containing all the arguments for where parameter are not defined (it must be last in a function statement).

You can also filter out `NaN` values:

```js
function sumPrices(...numbers) {
 return numbers.reduce(function(total, val) {
    return total + (Number.isNaN(Number(val)) ? 0 : Number(val));
 }, 0);
}
```

#### Lambda, arrow or fat arrow functions…

You should use them whenever you pass a function as an argument:

```js
function sumPrices(...numbers) {
 return numbers.reduce((total, val) =>
    total + (Number.isNaN(Number(val)) ? 0 : Number(val)));
}
```

__Notice__: The return keyword and curly braces are required only if the
arrow function needs to execute more than one statement.

More arrow notation!

```js
let sumPrices = (...numbers) => numbers.reduce((total, val) =>
 total + (Number.isNaN(Number(val)) ? 0 : Number(val)));
```

## Working with arrays

p. 54