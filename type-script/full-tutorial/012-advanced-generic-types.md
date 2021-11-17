# Advanced generic types

## Generic collections

In TS you can use JavaScript collections with generic type parameters.

- `Map<K, V>` — This describes a Map whose key type is K and whose value type is V.
- `ReadonlyMap<K, V>` — The same as above but read only.
- `Set<T>` — This describes a Set whose value type is T.
- `Set<T>` — The same as above but read only.

```ts
class Collection<T extends shapeType> {
  private items: Set<T>;
  constructor(initialItems: T[] = []) {
    this.items = new Set<T>(initialItems);
  }
  add(...newItems: T[]): void {
    newItems.forEach((newItem) => this.items.add(newItem));
  }
  get(name: string): T {
    return [...this.items.values()].find((item) => item.name === name);
  }
  get count(): number {
    return this.items.size;
  }
}
```

> Attention! Set objects are collections of values. You can iterate through the elements of a set in insertion order. A value in the Set may only occur once; it is unique in the Set's collection.

The TypeScript compiler uses the type parameter to prevent other data types from being added to the set, and no type guarding is required when retrieving objects from the collection.

### Map usage

```ts
class Collection<T extends shapeType> {
  private items: Map<string, T>;
  constructor(initialItems: T[] = []) {
    this.items = new Map<string, T>();
    this.add(...initialItems);
  }
  add(...newItems: T[]): void {
    newItems.forEach((newItem) => this.items.set(newItem.name, newItem));
  }
  get(name: string): T {
    return this.items.get(name);
  }
  get count(): number {
    return this.items.size;
  }
}

let productCollection: Collection<Product> = new Collection(products);
```

Generic classes don’t have to provide generic type parameters for collections and can specify concrete types instead.

## Using generic iterators

Iterators allow a sequence of values to be enumerated, and support for iterators is a common feature for classes that operate on other types, such as collections.

- `Iterator<T>` — This interface describes an iterator whose next method returns `IteratorResult<T>` objects.
- `IteratorResult<T>` — This interface describes a result produced by an iterator, with done and value properties.
- `Iterable<T>` — This interface defines an object that has a `Symbol.iterator` property and that supports iteration directly.
- `IterableIterator<T>` — This interface combines the `Iterator<T>` and `Iterable<T>` interfaces to describe an object that has a `Symbol.iterator` property and that defines a next method and a result property.

Use of the `Iterator<T>` and `IteratorResult<T>` interfaces to provide access to the contents of the `Map<string, T>` used to store objects by the `Collection<T>` class:

```ts
class Collection<T extends shapeType> {
  private items: Map<string, T>;
  constructor(initialItems: T[] = []) {
    this.items = new Map<string, T>();
    this.add(...initialItems);
  }
  add(...newItems: T[]): void {
    newItems.forEach((newItem) => this.items.set(newItem.name, newItem));
  }
  get(name: string): T {
    return this.items.get(name);
  }
  get count(): number {
    return this.items.size;
  }
  values(): Iterator<T> {
    return this.items.values();
  }
}

let productCollection: Collection<Product> = new Collection(products);
console.log(`There are ${productCollection.count} products`);
let iterator: Iterator<Product> = productCollection.values();
let result: IteratorResult<Product> = iterator.next();

while (!result.done) {
  console.log(`Product: ${result.value.name}, ${result.value.price}`);
  result = iterator.next();
}
```

> Attention! Iterators were introduced in the JavaScript ES6 standard. If you use iterators in your project and are targeting earlier versions of JavaScript, then you must set the TypeScript `downlevelIteration` compiler property to true.

## Combination of iterable and iterator

You can iterate objects more elegantly using this interface:

```ts
class Collection<T extends shapeType> {
  private items: Map<string, T>;
  constructor(initialItems: T[] = []) {
    this.items = new Map<string, T>();
    this.add(...initialItems);
  }
  add(...newItems: T[]): void {
    newItems.forEach((newItem) => this.items.set(newItem.name, newItem));
  }
  get(name: string): T {
    return this.items.get(name);
  }
  get count(): number {
    return this.items.size;
  }
  values(): IterableIterator<T> {
    return this.items.values();
  }
}
let productCollection: Collection<Product> = new Collection(products);
console.log(`There are ${productCollection.count} products`);
[...productCollection.values()].forEach((p) =>
  console.log(`Product: ${p.name}, ${p.price}`)
);
```

## Creating an iterable class

Classes that define a Symbol.iterator property can implement the `Iterable<T>` interface, which allows iteration without needing to call a method or read a property:

```ts
class Collection<T extends shapeType> implements Iterable<T> {
  private items: Map<string, T>;
  constructor(initialItems: T[] = []) {
    this.items = new Map<string, T>();
    this.add(...initialItems);
  }
  add(...newItems: T[]): void {
    newItems.forEach((newItem) => this.items.set(newItem.name, newItem));
  }
  get(name: string): T {
    return this.items.get(name);
  }
  get count(): number {
    return this.items.size;
  }
  [Symbol.iterator](): Iterator<T> {
    return this.items.values();
  }
}

let productCollection: Collection<Product> = new Collection(products);
console.log(`There are ${productCollection.count} products`);
[...productCollection].forEach((p) =>
  console.log(`Product: ${p.name}, ${p.price}`)
);
```

## Using index types

TypeScript provides a set of related features that allow any property defined by an object to be used as a key while preserving type safety.

### Index type query

The `keyof` keyword, known as index type query, returns a union of the property names of a type.

```ts
let myVar: keyof Product = "name";
myVar = "price";
myVar = "someOtherName";
```

Will result in:

```
src/index.ts(34,1): error TS2322: Type '"someOtherName"' is not assignable to type '"name" |
"price"'.
```

How you can use it?

```ts
function getValue<T, K extends keyof T>(item: T, keyname: K) {
  console.log(`Value: ${item[keyname]}`);
}
let p = new Product("Running Shoes", 100);
getValue(p, "name");
getValue(p, "price");
let e = new Employee("Bob Smith", "Sales");
getValue(e, "name");
getValue(e, "role");
```

Now `getValue` second parameter is protected from entering non-existing keys!

### Explicitly providing generic type parameters for index types

Explicitly stating the type arguments reveals an aspect of using the index type query operator that can be confusing:

```ts
function getValue<T, K extends keyof T>(item: T, keyname: K) {
  console.log(`Value: ${item[keyname]}`);
}
let p = new Product("Running Shoes", 100);
getValue<Product, "name">(p, "name");
getValue(p, "price");
```

```ts
getValue<Product, "name">(p, "name");
```

                    ^ Literal value type
                                ^ value

### Using the indexed access operator

The indexed access operator is used to get the type for one or more properties:

```ts
type priceType = Product["price"];
type allTypes = Product[keyof Product]; // Union of all types for eg. string|number
```

You can get specific type by using square brackets `[]`. For example, price might return a `number` type. When using a `keyof` inside such expression you'll get a union of all types `string|number` etc.

> Attention! The types returned by the indexed access operator are known as lookup types.

The indexed access operator is most commonly used with generic types, which allows property types to be handled safely even though the specific types that will be used are unknown:

```ts
function getValue<T, K extends keyof T>(item: T, keyname: K): T[K] {
  return item[keyname];
}
console.log(getValue<Product, "name">(p, "name"));
console.log(getValue(p, "price"));
```

This way you can dynamically tell what type will be returned from the function!

