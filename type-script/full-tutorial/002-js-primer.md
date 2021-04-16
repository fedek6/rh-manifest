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
## Working with Objects

JavaScript's objects are collections of properties, each of which has a name and a value.

Literal syntax:

```js
let hat = {
 name: "Hat",
 price: 100
};
```

Manipulating dynamic objects:

```js
gloves.name = gloves.productName;
delete gloves.productName;
gloves.price = 20;
```

### Guarding Against Undefined Objects and Properties

```js
let propertyCheck = hat.price || 0;
let objectAndPropertyCheck = (hat || {}).price || 0;
```

### Using the Spread and Rest Operators on Objects

The spread operator can be used to expand the properties and values defined by an object.

```js
let hat = {
 name: "Hat",
 price: 100
};

let otherHat = { ...hat };
let additionalProperties = { ...hat, discounted: true};
```

__Notice__: If a property name is used twice in the object literal syntax, then the second value is the one that will be
used.

### Decomposition

```js
let { price , ...someProperties } = hat;
```

### Defining Getters and Setters

Getters and setters are functions that are invoked when a property value is read or assigned.

```js
let hat = {
 name: "Hat",
 _price: 100,
 priceIncTax: 100 * 1.2,
 
 set price(newPrice) {
   this._price = newPrice;
   this.priceIncTax = this._price * 1.2;
 },

 get price() {
   return this._price;
 }
};

hat.price = 120;
console.log(`Hat: ${hat.price}, ${hat.priceIncTax}`);
```

__Notice__: There are no private properties in the JavaScript. You can emulate this, but it's complicated. The best practice for pure JS code is to prefix variables with underscore `_`. 

## Defining methods

A method is a property whose value is a function, which means that all the features and behaviors that
functions provide, such as default and rest parameters, can be used for methods. 

```js
let hat = {
 name: "Hat",
 _price: 100,
 priceIncTax: 100 * 1.2,
 writeDetails: function() {
 console.log(`${this.name}: ${this.price}, ${this.priceIncTax}`);
 }
}
```

You can also use a concise method's syntax:

```js
writeDetails() {
 console.log(`${this.name}: ${this.price}, ${this.priceIncTax}`);
}
```

## Understanding the this Keyword

The this keyword can be confusing to even experienced JavaScript programmers. In other programming languages, this is used to refer to the current instance of an object created from a class. In JavaScript, the this keyword can often to appear to work the same way—right up until the moment a change breaks the application and undefined values start to appear.

```js
let hat = {
 name: "Hat",
 _price: 100,
 priceIncTax: 100 * 1.2,

 set price(newPrice) {
   this._price = newPrice;
   this.priceIncTax = this._price * 1.2;
 },

 get price() {
   return this._price;
 },

 writeDetails: () =>
   console.log(`${this.name}: ${this.price}, ${this.priceIncTax}`)
};

hat.writeDetails(); // undefined: undefined, undefined
```

## Understating this in stand-alone functions

```js
function writeMessage(message) {
 console.log(`${this.greeting}, ${message}`);
}
greeting = "Hello";
writeMessage("It is sunny today"); // Hello, It is sunny today
```

JavaScript defines a global object, which can be assigned values that are available throughout an application. The global object is used to provide access to the essential features in the execution environment, such as the document object in browsers that allows interaction with the Document Object Model API.

In fact statement above is translated to:

```js
writeMessage.call(window, "It is sunny today");
```

As explained earlier, functions are objects, which means they define methods, including the call method. It is this method that is used to invoke a function behind the scenes. The first argument to the call method is the value for this, which is set to the global object. This is the reason that this can be used in any function and why it returns the global object by default.

__Notice__: The name of the global object changes based on the execution environment. In code executed by Node.js, global is used, but window or self will be required in browsers. At the time of writing, there is a proposal to standardize on the name global, but it has yet to be adopted as part of the JavaScript specification.

__Important__: JavaScript supports “strict mode,” which disables or restricts features that have historically caused poor-quality software or that prevent the runtime from executing code efficiently. When strict mode is enabled, the default value for this is undefined in order to prevent accidental use of the global object, and values with global scope must be explicitly defined as properties on the global object.

In fact, below code won't work:

```js
'use strict';
function writeMessage(message) {
 console.log(`${this.greeting}, ${message}`);
}
greeting = "Hello";
writeMessage("It is sunny today");
writeMessage.call(window, "It is sunny today");
```

## This in methods

```js
let myObject = {
 greeting: "Hi, there",
 writeMessage(message) {
 console.log(`${this.greeting}, ${message}`);
 }
}
greeting = "Hello";
myObject.writeMessage("It is sunny today");
```

This, is in fact this:

```js
myObject.writeMessage.call(myObject, "It is sunny today");
```

Beware methods in variables:

```js
greeting = "Hello";
let myFunction = myObject.writeMessage;
myFunction("It is sunny today");
```

Local object context will be replaced by global aka window!

In fact there's a way to fix this:

```js
myObject.writeMessage = myObject.writeMessage.bind(myObject);
greeting = "Hello";
myObject.writeMessage("It is sunny today");
let myFunction = myObject.writeMessage;
myFunction("It is sunny today");
```

This looks bad, but it works!

## Understanding this in Arrow Functions

To add to the complexity of this, arrow functions don’t work in the same way as regular functions. Arrow functions don’t have their own this value and inherit the closest value of this they can find when they are executed.

p. 87