# JavaScript Primer, Part 2

## Understanding JavaScript Object Inheritance

JavaScript's objects have a link to another object, known as the prototype, from which they inherit properties and methods. Since prototypes are objects and have their own prototype, objects form an inheritance chain that allows complex features to be defined once and used consistently.

When an object is created using the literal syntax, its prototype is Object, which is a built-in object provided by JavaScript.

Object is the prototype for most objects, but it also provides some methods that are used directly, rather than through inheritance, and which can be used to get information about prototypes.

## Useful Object Methods

* `getPrototypeOf` — This method returns an object’s prototype.
* `setPrototypeOf` — This method changes the prototype of an object.
* `getOwnPropertyNames` — This method returns the names of an object’s own properties.

```js
let hatPrototype = Object.getPrototypeOf(hat);
console.log(`Hat Prototype: ${hatPrototype}`);
let bootsPrototype = Object.getPrototypeOf(boots);
console.log(`Boots Prototype: ${bootsPrototype}`);

console.log(`Common prototype: ${ hatPrototype === bootsPrototype}`); // true
console.log(`Hat: ${hat.price}, ${hat.getPriceIncTax() }`);
console.log(`toString: ${hat.toString()}`);
```

## Changing prototypes

You can modify objects prototype, but be careful, it's linked to other objects:

```js
let hatPrototype = Object.getPrototypeOf(hat);
hatPrototype.toString = function() {
 return `toString: Name: ${this.name}, Price: ${this.price}`;
}
console.log(hat.toString()); // Name: Hat, Price: 100
console.log(boots.toString()); // Name: Boots, Price: 100
```

Both objects will have new prototypes function!

## Creating custom prototypes

__Warning!__ Do not change original `Object`. Create custom protoype whenever you can do it.

```js
let ProductProto = {
 toString: function() {
 return `toString: Name: ${this.name}, Price: ${this.price}`;
 }
}

Object.setPrototypeOf(hat, ProductProto);
Object.setPrototypeOf(boots, ProductProto);
console.log(hat.toString());
console.log(boots.toString());
```

Inheritance looks like this:

```
hat/boots <-- ProductProto <-- Object
```

## Using constructor functions

A constructor function is used to create a new object, configure its properties, and assign its prototype, all of which is done in a single step with the new keyword. Constructor functions can be used to ensure that objects are created consistently and that the correct prototype is applied.

__Notice__: constructor functions are simplified object definitions.

```
Constructor functions are templates for creating objects. We can use it to create different objects using the same constructor, which has the same instance methods and properties with different values for the nonmethod properties
```

```js
let Product = function(name, price) {
 this.name = name;
 this.price = price;
}
Product.prototype.toString = function() {
 return `toString: Name: ${this.name}, Price: ${this.price}`;
}
let hat = new Product("Hat", 100);
let boots = new Product("Boots", 100);
```

This is little strange, but it looks like this because JS functions are in fact objects.

## Chaining constructor functions

Using the setPrototypeOf method to create a chain of custom prototypes is easy, but doing the same thing with constructor functions requires a little more work to ensure that objects are configured correctly by the functions and get the right prototypes in the chain.

```js
let Product = function(name, price) {
 this.name = name;
 this.price = price;
}
Product.prototype.toString = function() {
 return `toString: Name: ${this.name}, Price: ${this.price}`;
}
let TaxedProduct = function(name, price, taxRate) {
 Product.call(this, name, price);
 this.taxRate = taxRate;
}
Object.setPrototypeOf(TaxedProduct.prototype, Product.prototype);
TaxedProduct.prototype.getPriceIncTax = function() {
 return Number(this.price) * this.taxRate;
}
TaxedProduct.prototype.toTaxString = function() {
 return `${this.toString()}, Tax: ${this.getPriceIncTax()}`;
}
```

### Accessing overridden prototype methods

A prototype can override a property or method by using the same name as one defined further along the chain. This is also known as shadowing in JavaScript, and it takes advantage of the way that the
JavaScript runtime follows the chain. 

Care is required when building on an overridden method, which must be accessed through the prototype that defines it.

```js
TaxedProduct.prototype.toString = function() {
 let chainResult = Product.prototype.toString.call(this);
 return `${chainResult}, Tax: ${this.getPriceIncTax()}`;
}
```

### Prototype types

```js
TaxedProduct.prototype.getPriceIncTax = function() {
 return Number(this.price) * this.taxRate;
}
TaxedProduct.prototype.toTaxString = function() {
 return `${this.toString()}, Tax: ${this.getPriceIncTax()}`;
}
let hat = new TaxedProduct("Hat", 100, 1.2);
let boots = new Product("Boots", 100);

console.log(`hat and TaxedProduct: ${ hat instanceof TaxedProduct}`);
console.log(`hat and Product: ${ hat instanceof Product}`);
console.log(`boots and TaxedProduct: ${ boots instanceof TaxedProduct}`);
console.log(`boots and Product: ${ boots instanceof Product}`);
```

## Defining static properties and methods

p. 82