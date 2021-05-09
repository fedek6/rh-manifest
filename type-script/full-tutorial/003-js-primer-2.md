# JavaScript Primer, Part 2

## Understanding JavaScript Object Inheritance

JavaScript's objects have a link to another object, known as the prototype, from which they inherit properties and methods. Since prototypes are objects and have their own prototype, objects form an inheritance chain that allows complex features to be defined once and used consistently.

When an object is created using the literal syntax, its prototype is Object, which is a built-in object provided by JavaScript.

Object is the prototype for most objects, but it also provides some methods that are used directly, rather than through inheritance, and which can be used to get information about prototypes.

## Useful Object Methods

- `getPrototypeOf` — This method returns an object’s prototype.
- `setPrototypeOf` — This method changes the prototype of an object.
- `getOwnPropertyNames` — This method returns the names of an object’s own properties.

```js
let hatPrototype = Object.getPrototypeOf(hat);
console.log(`Hat Prototype: ${hatPrototype}`);
let bootsPrototype = Object.getPrototypeOf(boots);
console.log(`Boots Prototype: ${bootsPrototype}`);

console.log(`Common prototype: ${hatPrototype === bootsPrototype}`); // true
console.log(`Hat: ${hat.price}, ${hat.getPriceIncTax()}`);
console.log(`toString: ${hat.toString()}`);
```

## Changing prototypes

You can modify objects prototype, but be careful, it's linked to other objects:

```js
let hatPrototype = Object.getPrototypeOf(hat);
hatPrototype.toString = function () {
  return `toString: Name: ${this.name}, Price: ${this.price}`;
};
console.log(hat.toString()); // Name: Hat, Price: 100
console.log(boots.toString()); // Name: Boots, Price: 100
```

Both objects will have new prototypes function!

## Creating custom prototypes

**Warning!** Do not change original `Object`. Create custom protoype whenever you can do it.

```js
let ProductProto = {
  toString: function () {
    return `toString: Name: ${this.name}, Price: ${this.price}`;
  },
};

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

**Notice**: constructor functions are simplified object definitions.

```
Constructor functions are templates for creating objects. We can use it to create different objects using the same constructor, which has the same instance methods and properties with different values for the nonmethod properties
```

```js
let Product = function (name, price) {
  this.name = name;
  this.price = price;
};
Product.prototype.toString = function () {
  return `toString: Name: ${this.name}, Price: ${this.price}`;
};
let hat = new Product("Hat", 100);
let boots = new Product("Boots", 100);
```

This is little strange, but it looks like this because JS functions are in fact objects.

## Chaining constructor functions

Using the setPrototypeOf method to create a chain of custom prototypes is easy, but doing the same thing with constructor functions requires a little more work to ensure that objects are configured correctly by the functions and get the right prototypes in the chain.

```js
let Product = function (name, price) {
  this.name = name;
  this.price = price;
};
Product.prototype.toString = function () {
  return `toString: Name: ${this.name}, Price: ${this.price}`;
};
let TaxedProduct = function (name, price, taxRate) {
  Product.call(this, name, price);
  this.taxRate = taxRate;
};
Object.setPrototypeOf(TaxedProduct.prototype, Product.prototype);
TaxedProduct.prototype.getPriceIncTax = function () {
  return Number(this.price) * this.taxRate;
};
TaxedProduct.prototype.toTaxString = function () {
  return `${this.toString()}, Tax: ${this.getPriceIncTax()}`;
};
```

### Accessing overridden prototype methods

A prototype can override a property or method by using the same name as one defined further along the chain. This is also known as shadowing in JavaScript, and it takes advantage of the way that the
JavaScript runtime follows the chain.

Care is required when building on an overridden method, which must be accessed through the prototype that defines it.

```js
TaxedProduct.prototype.toString = function () {
  let chainResult = Product.prototype.toString.call(this);
  return `${chainResult}, Tax: ${this.getPriceIncTax()}`;
};
```

### Prototype types

```js
TaxedProduct.prototype.getPriceIncTax = function () {
  return Number(this.price) * this.taxRate;
};
TaxedProduct.prototype.toTaxString = function () {
  return `${this.toString()}, Tax: ${this.getPriceIncTax()}`;
};
let hat = new TaxedProduct("Hat", 100, 1.2);
let boots = new Product("Boots", 100);

console.log(`hat and TaxedProduct: ${hat instanceof TaxedProduct}`);
console.log(`hat and Product: ${hat instanceof Product}`);
console.log(`boots and TaxedProduct: ${boots instanceof TaxedProduct}`);
console.log(`boots and Product: ${boots instanceof Product}`);
```

## Defining static properties and methods

Properties and methods that are defined on the constructor function are often referred to as static, meaning they are accessed through the constructor and not individual objects created by that constructor (as opposed to instance properties, which are accessed through an object). The `Object.setPrototypeOf` and `Object.getPrototypeOf` methods are good examples of static methods.

### Defining a Static Method:

```js
let Product = function (name, price) {
  this.name = name;
  this.price = price;
};

Product.prototype.toString = function () {
  return `toString: Name: ${this.name}, Price: ${this.price}`;
};

Product.process = (...products) =>
  products.forEach((p) => console.log(p.toString()));

Product.process(new Product("Hat", 100, 1.2), new Product("Boots", 100));
```

The static process method is defined by adding a new property to the Product function object and assigning it a function. Remember that JavaScript functions are objects, and properties can be freely added and removed from objects. The process method defines a rest parameter and uses the `forEach` method to invoke the `toString` method for each object it receives and writes the result to the console.

## Using JavaScript classes

JavaScript' classes were added to the language to ease the transition from other popular programming languages. Behind the scenes, JavaScript classes are implemented using prototypes, which means that JavaScript classes have some differences from those in languages such as C# and Java.

```js
class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
  toString() {
    return `toString: Name: ${this.name}, Price: ${this.price}`;
  }
}
let hat = new Product("Hat", 100);
let boots = new Product("Boots", 100);
```

**Important**: Classes are defined with the class keyword, followed by a name for the class. The class syntax may appear more familiar, but classes are translated into the underlying JavaScript prototype system described in the previous section.

## Using inheritance

Classes can inherit features using the extends keyword and invoke the superclass constructor and methods using the `super` keyword.

```js
class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
  toString() {
    return `toString: Name: ${this.name}, Price: ${this.price}`;
  }
}
class TaxedProduct extends Product {
  constructor(name, price, taxRate = 1.2) {
    super(name, price);
    this.taxRate = taxRate;
  }
  getPriceIncTax() {
    return Number(this.price) * this.taxRate;
  }
  toString() {
    let chainResult = super.toString();
    return `${chainResult}, Tax: ${this.getPriceIncTax()}`;
  }
}
```

**Important**: `super` is JavaScript' equivalent to PHP' `parent::`. It works the same.

The super keyword must be used before the this keyword and is generally used in the first statement in the constructor. The super keyword can also be used to access superclass properties and methods, like `super.toString()`.

## Defining static methods

The static keyword is applied to create static methods that are accessed through the class, rather than the object it creates.

```js
class TaxedProduct extends Product {
  static process(...products) {
    products.forEach((p) => console.log(p.toString()));
  }
}

TaxedProduct.process(
  new TaxedProduct("Hat", 100, 1.2),
  new TaxedProduct("Boots", 100)
);
```

## Using iterators and generators

Iterators are objects that return a sequence of values.

An iterator defines a function named next that returns an object with value and done properties: the value property returns the next value in the sequence,
and the done property is set to true when the sequence is complete

```js
function createProductIterator() {
  const hat = new Product("Hat", 100);
  const boots = new Product("Boots", 100);
  const umbrella = new Product("Umbrella", 23);
  let lastVal;
  return {
    next() {
      switch (lastVal) {
        case undefined:
          lastVal = hat;
          return { value: hat, done: false };
        case hat:
          lastVal = boots;
          return { value: boots, done: false };
        case boots:
          lastVal = umbrella;
          return { value: umbrella, done: false };
        case umbrella:
          return { value: undefined, done: true };
      }
    },
  };
}
let iterator = createProductIterator();
let result = iterator.next();
while (!result.done) {
  console.log(result.value.toString());
  result = iterator.next();
}
```

The `createProductIterator` function returns an object that defines a next function. Each time the next method is called, a different Product object is returned, and then, once the set of objects has been exhausted, an object whose done property is true is returned to indicate the end of the data.

## Using generators

Writing iterators can be awkward because the code has to maintain state data to keep track of the current position in the sequence each time the next function is invoked. A simpler approach is to use a generator, which is a function that is invoked once and uses the yield keyword to produce the values in the sequence.

```js
function* createProductIterator() {
  yield new Product("Hat", 100);
  yield new Product("Boots", 100);
  yield new Product("Umbrella", 23);
}
let iterator = createProductIterator();
let result = iterator.next();
while (!result.done) {
  console.log(result.value.toString());
  result = iterator.next();
}
```

p. 88
