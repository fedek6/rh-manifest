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

### Using an index type of collection class

Using an index type allows me to change the `Collection<T>` class so that it can store any type of objects and not just those that define a name property.

```ts
class Collection<T, K extends keyof T> implements Iterable<T> {
  private items: Map<T[K], T>;
  constructor(initialItems: T[] = [], private propertyName: K) {
    this.items = new Map<T[K], T>();
    this.add(...initialItems);
  }
  add(...newItems: T[]): void {
    newItems.forEach((newItem) =>
      this.items.set(newItem[this.propertyName], newItem)
    );
  }
  get(key: T[K]): T {
    return this.items.get(key);
  }
  get count(): number {
    return this.items.size;
  }
  [Symbol.iterator](): Iterator<T> {
    return this.items.values();
  }
}
let productCollection: Collection<Product, "name"> = new Collection(
  products,
  "name"
);
console.log(`There are ${productCollection.count} products`);
let itemByKey = productCollection.get("Hat");
console.log(`Item: ${itemByKey.name}, ${itemByKey.price}`);
```

The class has been rewritten with an additional generic type parameter, K, that is restricted to `keyof T`, which is the data type of the objects stored by the collection.

#### Cheat sheet for above code

| Name           | Description                                 |
| -------------- | ------------------------------------------- |
| T              | Type of objects stored in the collection    |
| K              | Key property name (restricted by `keyof T`) |
| T[K]           | Type of the key property                    |
| `propertyName` | Key property name in JS` realm              |

### Type Mapping

Mapped types are created by applying a transformation to the properties of an existing type.

```ts
type MappedProduct = {
  [P in keyof Product]: Product[P];
};
let p: MappedProduct = { name: "Kayak", price: 275 };
console.log(`Mapped type: ${p.name}, ${p.price}`);
```

> Type mapping works like a for in loop. It selects property names to be included in the mapped types and the type for each of them. In the example above it simply duplicates `Product` type.

### Using generics in type mapping

```ts
type Mapped<T> = {
  [P in keyof T]: T[P];
};
let p: Mapped<Product> = { name: "Kayak", price: 275 };
console.log(`Mapped type: ${p.name}, ${p.price}`);
let c: Mapped<City> = { name: "London", population: 8136000 };
console.log(`Mapped type: ${c.name}, ${c.population}`);
```

> Attention: Mapping operates only on properties. When applied to a class, a type mapping produces a shape type
> that contains properties but omits the constructor and the implementation of methods.

```ts
class MyClass {
  constructor(public name: string) {}
  getName(): string {
    return this.name;
  }
}

const MappedClass: Mapped<Myclass> = new MyClass("gitarra");
```

Would generate following type:

```ts
{
  name: string;
  getName: () => string;
}
```

Type mapping produces shapes that can be used for object literals, implemented by classes, or extended by interfaces. Type mapping does not produce a class, however.

### Changing properties and mutability

Mapped types can change properties.

```ts
type MakeOptional<T> = {
  [P in keyof T]?: T[P];
};
type MakeRequired<T> = {
  [P in keyof T]-?: T[P];
};
type MakeReadOnly<T> = {
  readonly [P in keyof T]: T[P];
};
type MakeReadWrite<T> = {
  -readonly [P in keyof T]: T[P];
};

type optionalType = MakeOptional<Product>;
type requiredType = MakeRequired<optionalType>;
type readOnlyType = MakeReadOnly<requiredType>;
type readWriteType = MakeReadWrite<readOnlyType>;
```

So they can be treated as helpers for creating new types.

There are built-in type mappings:

| Name           | Description                                                      |
| -------------- | ---------------------------------------------------------------- |
| `Partial<T>`   | This mapping makes properties optional.                          |
| `Required<T>`  | This mapping makes properties required.                          |
| `Readonly<T>`  | This mapping adds the read only keyword to properties.           |
| `Pick<T, K>`   | This mapping selects specific properties to create a new type    |
| `Record<T, K>` | This mapping creates a type without transforming an existing one |

### Mapping Specific Properties

```ts
type SelectProperties<T, K extends keyof T> = {
  [P in K]: T[P];
};
let p1: SelectProperties<Product, "name"> = { name: "Kayak" };
let p2: Pick<Product, "name" | "price"> = { name: "Lifejacket", price: 48.95 };
```

> Attention! In generic parameters' word `extends` means "constrain" not extend as it might be thought.

> Note: Type `K` can be expressed as a union.

## Combining Transformations in a Single Mapping

Mappings can apply multiple changes to properties.

```ts
type CustomMapped<T, K extends keyof T> = {
  readonly [P in K]?: T[P];
};
type BuiltInMapped<T, K extends keyof T> = Readonly<Partial<Pick<T, K>>>;
let p1: CustomMapped<Product, "name"> = { name: "Kayak" };
let p2: BuiltInMapped<Product, "name" | "price"> = {
  name: "Lifejacket",
  price: 48.95,
};
```

Mappings can also be chained together, as shown by the combination of the `Pick`, `Partial`, and `Readonly` mappings.

### Creating types with a type mapping

You can create a new type.

```ts
type CustomMapped<K extends keyof any, T> = {
  [P in K]: T;
};
let p1: CustomMapped<"name" | "city", string> = { name: "Bob", city: "London" };
let p2: Record<"name" | "city", string> = { name: "Alice", city: "Paris" };
```

Both method are serving the same purpose.

## Conditional types

Conditional types are expressions containing generic type parameters that are evaluated to select new types.

```ts
type resultType<T extends boolean> = T extends true ? string : number;
let firstVal: resultType<true> = "String Value";
let secondVal: resultType<false> = 100;
let mismatchCheck: resultType<false> = "String Value";
```

> Attention! You should avoid complicated conditional types. If conditional type becomes more complex and encompasses more combinations, you should take a moment to consider if there is a simpler way to achieve the same result.

### Nested conditional types

```ts
type references = "London" | "Bob" | "Kayak";
type nestedType<T extends references> = T extends "London"
  ? City
  : T extends "Bob"
  ? Person
  : Product;
let firstVal: nestedType<"London"> = new City("London", 8136000);
let secondVal: nestedType<"Bob"> = new Person("Bob", "London");
let thirdVal: nestedType<"Kayak"> = new Product("Kayak", 275);
```

Note: Wow! This is pretty f\*\*\*d up.

The type `nestedType<T>` is a nested conditional type to select between three result types, based on the value of the generic type parameter. As noted in the sidebar, complex conditional types can be difficult to understand, and this is especially true when they are nested.

### Conditional types in generic classes

Conditional types can be used to express the relationship between a method or function’s parameter types and the results it produces. This is a more concise alternative to the function type overloading.

```ts
type resultType<T extends boolean> = T extends true ? string : number;

class Collection<T> {
  private items: T[];
  constructor(...initialItems: T[]) {
    this.items = initialItems || [];
  }

  total<P extends keyof T, U extends boolean>(
    propName: P,
    format: U
  ): resultType<U> {
    let totalValue = this.items.reduce(
      (t, item) => (t += Number(item[propName])),
      0
    );
    return format ? `$${totalValue.toFixed()}` : (totalValue as any);
  }
}

let data = new Collection<Product>(
  new Product("Kayak", 275),
  new Product("Lifejacket", 48.95)
);

let firstVal: string = data.total("price", true);

console.log(`Formatted value: ${firstVal}`);

let secondVal: number = data.total("price", false);
console.log(`Unformatted value: ${secondVal}`);
```

Look at the `total` method. It has type check in `return` statement. That's because TypeScript cannot determine what type it will return.

### Using Conditional Types with Type Unions

Conditional types can be used to filter type unions, allowing types to be easily selected or excluded from the set that the union contains.

```ts
type Filter<T, U> = T extends U ? never : T;

function FilterArray<T, U>(
  data: T[],
  predicate: (item) => item is U
): Filter<T, U>[] {
  return data.filter((item) => !predicate(item)) as any;
}

let dataArray = [
  new Product("Kayak", 275),
  new Person("Bob", "London"),
  new Product("Lifejacket", 27.5),
];

function isProduct(item: any): item is Product {
  return item instanceof Product;
}

let filteredData: Person[] = FilterArray(dataArray, isProduct);

// Person: Bob
filteredData.forEach((item) => console.log(`Person: ${item.name}`));
```

When a conditional type is provided with a type union, the TypeScript compiler distributes the condition over each type in the union, creating what is known as a distributive conditional type. This effect is applied when a conditional type is used like a type union, like this, for example:

```ts
type filteredUnion = Filter<Product | Person, Product>;
```

The `Filter<T, U>` conditional type evaluates to never when the first type parameter is the same as the second, producing this result:

```ts
type filteredUnion = never | Person;
```

The conditional type filters out any type that cannot be assigned to Person and returns the remaining types in the union. The `FilterArray<T, U>` method does the work of filtering an array using a predicate function and returns the `Filter<T, U>` type.

### Using the Built-in Distributive Conditional Types

| Name             | Description                                                   |
| ---------------- | ------------------------------------------------------------- |
| `Exclude<T, U>`  | This type excludes the types that can be assigned to U from T |
| `Extract<T, U>`  | This type selects the types that can be assigned to U from T  |
| `NonNullable<T>` | This type excludes null and undefined from T.                 |

> More can be found in cheat sheet.

### Using Conditional Types in Type Mappings

```ts
type changeProps<T, U, V> = {
  [P in keyof T]: T[P] extends U ? V : T[P];
};

type modifiedProduct = changeProps<Product, number, string>;

function convertProduct(p: Product): modifiedProduct {
  return { name: p.name, price: `$${p.price.toFixed(2)}` };
}

let kayak = convertProduct(new Product("Kayak", 275));
console.log(`Product: ${kayak.name}, ${kayak.price}`);
```

The `changeProps<T, U, V>` mapping selects the properties of type U and changes them to type V in the mapped type. This statement applies the mapping to the Product class specifying that number properties should be made into string properties.

> Basically you can type a type converter this way.

### Identifying Properties of a Specific Type

A common requirement is to limit a type parameter so that it can be used only to specify a property that has a specific type.

```ts
type unionOfTypeNames<T, U> = {
  [P in keyof T]: T[P] extends U ? P : never;
};

type propertiesOfType<T, U> = unionOfTypeNames<T, U>[keyof T];

function total<T, P extends propertiesOfType<T, number>>(
  data: T[],
  propName: P
): number {
  return data.reduce((t, item) => (t += Number(item[propName])), 0);
}

let products = [new Product("Kayak", 275), new Product("Lifejacket", 48.95)];
console.log(`Total: ${total(products, "price")}`);
// Total: 323.95
```

The conditional statement checks the type of each property. If a property doesn’t have the target type, then its type is changed to never. If a property does have the expected type, then its type is changed to the literal value that is the property name.

For the mapped type created by `unionOfTypeNames<Product, number>`, the indexed access operator `[keyof T]` produces the following union:

```ts
never | "price";
```

> Attention! `Never` is non-existent in union, so it's a clever way to remove something.

### Inferring Additional Types in Conditions

There can be a tension between the need to accept a wide range of types through a generic type parameter and the need to know the details of those types.

```ts
function getValue<T, P extends keyof T>(data: T, propName: P): T[P] {
  if (Array.isArray(data)) {
    return data[0][propName];
  } else {
    return data[propName];
  }
}

let products = [new Product("Kayak", 275), new Product("Lifejacket", 48.95)];
console.log(`Array Value: ${getValue(products, "price")}`);
console.log(`Single Total: ${getValue(products[0], "price")}`);
```

> This won't compile because compiler cannot correctly capture relation between the types.

**What can we do?**

We can use the `infer` word to tell compiler to infer inner objects in an array.

```ts
type targetKeys<T> = T extends (infer U)[] ? keyof U : keyof T;

function getValue<T, P extends targetKeys<T>>(data: T, propName: P): T[P] {
  if (Array.isArray(data)) {
    return data[0][propName];
  } else {
    return data[propName];
  }
}
```

> The effect is that the type of `targetKeys<Product>` and `targetKeys<Product[]>` both produce the `"name" | "price"` union.

### Inferring types of functions

```ts
type Result<T> = T extends (...args: any) => infer R ? R : never;

function processArray<T, Func extends (T) => any>(
  data: T[],
  func: Func
): Result<Func>[] {
  return data.map((item) => func(item));
}

let selectName = (p: Product) => p.name;
let products = [new Product("Kayak", 275), new Product("Lifejacket", 48.95)];
let names: string[] = processArray(products, selectName);
names.forEach((name) => console.log(`Name: ${name}`));
```

The `Result<T>` conditional type uses the `infer` keyword to obtain the result type for a function that accepts an object of type T and produces an any result.

The use of type inference allows functions that process a specific type to be used while ensuring that the result of the `processArray` function is a specific type, based on the result of the function provided for the `func` parameter.

The `selectName` function returns the string value of the name property of a Product object, and the inference means that `Result<(...args:Product) => string)>` is correctly identified as string, allowing the `processArray` function to return a `string[]` result.

#### There are built-in conditional types (with inference)

| Name                       | Description                                                                                              |
| -------------------------- | -------------------------------------------------------------------------------------------------------- |
| `Parameters<T>`            | This conditional type selects the types of each function parameter, expressed as a tuple.                |
| `ReturnType<T>`            | This conditional type selects the function result type.                                                  |
| `ConstructorParameters<T>` | The conditional type selects the types of each parameter of a constructor function, expressed as a tuple |
| `InstanceType<T>`          | This conditional type returns the result type of a constructor function.                                 |

The `ConstructorParameters<T>` and `InstanceType<T>` are most useful when describing factory functions results.

```ts
function makeObject<T extends new (...args: any) => any>(
  constructor: T,
  ...args: ConstructorParameters<T>
): InstanceType<T> {
  return new constructor(...(args as any[]));
}
let prod: Product = makeObject(Product, "Kayak", 275);
let city: City = makeObject(City, "London", 8136000);
[prod, city].forEach((item) => console.log(`Name: ${item.name}`));
```
