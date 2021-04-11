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

JavaScript arrays follow the approach taken by most programming languages, except they are dynamically resized and can contain any combination of values and, therefore, any combination of types. 

### Useful array methods

* concat(otherArray) — This method returns a new array that concatenates the array on which it has been called with the array specified as the argument. Multiple arrays can be specified

* join(separator) — This method joins all the elements in the array to form a string. The argument specifies the character used to delimit the items.

* pop() — This method removes and returns the last item in the array.

* shift() — This method removes and returns the first element in the array.

* push(item) — This method appends the specified item to the end of the array.

* unshift(item) — This method inserts a new item at the start of the array.

* reverse() — This method returns a new array that contains the items in reverse order.

* slice(start,end) — This method returns a section of the array.

* sort() — This method sorts the array. An optional comparison function can be used to perform custom comparisons.
 
* splice(index, count) — This method removes count items from the array, starting at the specified index. The removed items are returned as the result of the method.

* every(test) — This method calls the test function for each item in the array and returnstrue if the function returns true for all of them and false otherwise.

* some(test) — This method returns true if calling the test function for each item in the array returns true at least once.

* filter(test) — This method returns a new array containing the items for which the test function returns true.

* find(test) — This method returns the first item in the array for which the test function returns true.

* findIndex(test) — This method returns the index of the first item in the array for which the test function returns true.

* forEach(callback) — This method invokes the callback function for each item in the array, as described in the previous section.

* includes(value) — This method returns true if the array contains the specified value.

* map(callback) — This method returns a new array containing the result of invoking the callback function for every item in the array.

* reduce(callback) — This method returns the accumulated value produced by invoking the callback function for every item in the array.

## Spread operator

The spread operator can be used to expand the contents of an array so that its elements can be used as
arguments to a function.

```js
let totalPrice = sumPrices(...prices);
```

The operator is used before the array name. The spread operator can also be used to expand the contents of an array for easy concatenation.

```js
let combinedArray = [...names, ...prices];
combinedArray.forEach(element => console.log(`Combined Array Element: ${element}`));
```

