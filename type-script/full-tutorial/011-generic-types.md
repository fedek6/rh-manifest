# Generic types

Generic types are placeholders for types that are resolved when a class or function is used, allowing type-safe code to be written that can deal with a range of different types, such as collection classes.

## Understating the problem

```ts
type dataType = Person | Product;

class DataCollection {
  private items: dataType[] = [];
  constructor(initialItems: dataType[]) {
    this.items.push(...initialItems);
  }
}

let peopleData = new DataCollection(people);
```

This class will accept both `Person` and `Product`. What if we want to create `DataCollection` accepting only one or other?

## Creating generic classes

It's as easy as that:

```ts
class DataCollection<T> {
  private items: T[] = [];
  constructor(initialItems: T[]) {
    this.items.push(...initialItems);
  }
  add(newItem: T) {
    this.items.push(newItem);
  }
  // getNames(): string[] {
  // return this.items.map(item => item.name);
  // }
  getItem(index: number): T {
    return this.items[index];
  }
}

let peopleData = new DataCollection<Person>(people);
```

Implementation:

```ts
// T is a generic type parameter
// this creates generic class
class DataCollection<T> {
  constructor(initialItems: T[]) {
    this.items.push(...initialItems);
  }
}
```

## Constraining generic type values

You won't be able to access specific properties using generic types. You'll need some kind of type narrowing.

```ts
class DataCollection<T> {
  constructor(initialItems: T[]) {
    this.items.push(...initialItems);
  }

  // This will give you error
  getNames(): string[] {
    return this.items.map((item) => item.name);
  }
}
```

You can do type narrowing:

```ts
class DataCollection<T extends Person | Product> {
  private items: T[] = [];
  constructor(initialItems: T[]) {
    this.items.push(...initialItems);
  }
  add(newItem: T) {
    this.items.push(newItem);
  }
  getNames(): string[] {
    return this.items.map((item) => item.name);
  }
}
```

This will allow you using specific properties from the types.

> The first restriction constrains the types that can be used as the generic type argument to create a new `DataCollection<Product | Person>` object so that only types that can be assigned to Product | Person can be used as the type parameter value.

## Constraining generic types using shapes

You can use simple inline shape like this one:

```ts
class DataCollection<T extends { name: string }> {
  private items: T[] = [];
  constructor(initialItems: T[]) {
    this.items.push(...initialItems);
  }
  getNames(): string[] {
    return this.items.map((item) => item.name);
  }
}
```

The shape specified in Listing 12-10 tells the compiler that the `DataCollection<T>` class can be instantiated using any type that has a name property that returns a string.

## Multiple type parameters

```ts
class DataCollection<T extends { name: string }, U> {
  private items: T[] = [];
  constructor(initialItems: T[]) {
    this.items.push(...initialItems);
  }
  collate(targetData: U[], itemProp: string, targetProp: string): (T & U)[] {
    let results = [];
    this.items.forEach((item) => {
      let match = targetData.find((d) => d[targetProp] === item[itemProp]);
      if (match !== undefined) {
        results.push({ ...match, ...item });
      }
    });
    return results;
  }
}

let peopleData = new DataCollection<Person, City>(people);
```

> This can be used to create collation of two objects that are intersected by some property.

## Applying a type parameter to a method

```ts
collate<U>(targetData: U[], itemProp: string, targetProp: string): (T & U)[] {
  let results = [];
  this.items.forEach(item => {
    let match = targetData.find(d => d[targetProp] === item[itemProp]);
    if (match !== undefined) {
      results.push({ ...match, ...item });
    }
  });
  return results;
}
```

Type parameter is applied directly to the collate method, allowing a type to be provided when the method is invoked:

```ts
let collatedData = peopleData.collate<City>(cities, "city", "name");
```

## Let the compiler infer type arguments

```ts
export let peopleData = new DataCollection(people);
export let collatedData = peopleData.collate(cities, "city", "name");
collatedData.forEach((c) =>
  console.log(`${c.name}, ${c.city}, ${c.population}`)
);
export let empData = peopleData.collate(employees, "name", "name");
empData.forEach((c) => console.log(`${c.name}, ${c.city}, ${c.role}`));
```

The compiler is able to infer type arguments based on the argument passed to the `DataCollection<T>` constructor. You can check inferred types by looking into `index.d.ts` file.

> Attention: In a project that uses modules, declaration files contain only exported values.

Types inferred by compile should look like these:

```ts
export declare let peopleData: DataCollection<Person>;
export declare let collatedData: (Person & City)[];
export declare let empData: (Person & Employee)[];
```

## Adding extra features to the existing type parameters

### First approach

The first approach is to simply add features to those defined by the `superclass` using the same generic types.

```ts
class DataCollection<T extends { name: string }> {
  protected items: T[] = [];
  constructor(initialItems: T[]) {
    this.items.push(...initialItems);
  }
  collate<U>(targetData: U[], itemProp: string, targetProp: string): (T & U)[] {
    let results = [];
    this.items.forEach((item) => {
      let match = targetData.find((d) => d[targetProp] === item[itemProp]);
      if (match !== undefined) {
        results.push({ ...match, ...item });
      }
    });
    return results;
  }
}

class SearchableCollection<
  T extends { name: string }
> extends DataCollection<T> {
  constructor(initialItems: T[]) {
    super(initialItems);
  }
  find(name: string): T | undefined {
    return this.items.find((item) => item.name === name);
  }
}

let peopleData = new SearchableCollection<Person>(people);
let foundPerson = peopleData.find("Bob Smith");
if (foundPerson !== undefined) {
  console.log(`Person ${foundPerson.name}, ${foundPerson.city}`);
}
```

## Fixing generic type parameter

Some classes need to define functionality that is only available using a subset of the types that are supported by the `superclass`. In these situations, a subclass can use a fixed type for the `superclass’s` type parameter, such that the subclass is not a generic class.

```ts
class SearchableCollection extends DataCollection<Employee> {
  constructor(initialItems: Employee[]) {
    super(initialItems);
  }
  find(searchTerm: string): Employee[] {
    return this.items.filter(
      (item) => item.name === searchTerm || item.role === searchTerm
    );
  }
}
let employeeData = new SearchableCollection(employees);
employeeData
  .find("Sales")
  .forEach((e) => console.log(`Employee ${e.name}, ${e.role}`));
```

The `SearchableCollection` class extends `DataCollection<Employee>`, which fixes the generic type parameter so that the `SearchableCollection` can deal only with Employee objects.

## Restricting the Generic Type Parameter

The third approach strikes a balance between the previous two examples, providing a generic type variable but restricting it to specific types.

```ts
class SearchableCollection<
  T extends Employee | Person
> extends DataCollection<T> {
  constructor(initialItems: T[]) {
    super(initialItems);
  }
  find(searchTerm: string): T[] {
    return this.items.filter((item) => {
      if (item instanceof Employee) {
        return item.name === searchTerm || item.role === searchTerm;
      } else if (item instanceof Person) {
        return item.name === searchTerm || item.city === searchTerm;
      }
    });
  }
}
let employeeData = new SearchableCollection<Employee>(employees);
```

> Bear in mind that when a union is used to constrain a generic type parameter, the union itself is an acceptable argument for that parameter. This means that the `SearchableCollection` class can be instantiated with a type parameter of Employee, Product, and Employee | Product.

> This code uses `instanceof` operator.

## Type guarding generic types

For classes with type parameters that are not restricted, narrowing to a specific type can be difficult.

```ts
class DataCollection<T> {
  protected items: T[] = [];
  constructor(initialItems: T[]) {
    this.items.push(...initialItems);
  }
  filter<V extends T>(): V[] {
    return this.items.filter((item) => item instanceof V) as V[];
  }
}

let mixedData = new DataCollection<Person | Product>([...people, ...products]);
let filteredProducts = mixedData.filter<Product>();
filteredProducts.forEach((p) => console.log(`Product: ${p.name}, ${p.price}`));
```

> Attention! The filter method’s generic type parameter, named V, is defined with the `extend` keyword, telling the compiler that it can only accept types that can be assigned to the class generic type T, which prevents the compiler from treating V as any.

Above example will output error:

```
error TS2693: 'V' only refers to a type, but is being used as a value here.
```

> `instanceof` operator does not know anything about generic types! That's why you'll get an error.

In such situations you'll need to use type predicate function:

```ts
class DataCollection<T> {
  protected items: T[] = [];
  constructor(initialItems: T[]) {
    this.items.push(...initialItems);
  }
  filter<V extends T>(predicate: (target) => target is V): V[] {
    return this.items.filter((item) => predicate(item)) as V[];
  }
}

function isProduct(target): target is Product {
  return target instanceof Product;
}
let filteredProducts = mixedData.filter<Product>(isProduct);
filteredProducts.forEach((p) => console.log(`Product: ${p.name}, ${p.price}`));
```

The predicate function for the required type is provided as an argument to the filter method using JavaScript features that are available when the code is executed; this provides the method with the means to select the required objects.

## Static methods in a generic classes

Static methods cannot use generic class type parameters.

```ts
class DataCollection<T> {
  protected items: T[] = [];
  constructor(initialItems: T[]) {
    this.items.push(...initialItems);
  }
  filter<V extends T>(predicate: (target) => target is V): V[] {
    return this.items.filter((item) => predicate(item)) as V[];
  }
  static reverse(items: any[]) {
    return items.reverse();
  }
}

let reversedCities: City[] = DataCollection.reverse(cities);
```

As you can see, you must type a variable when using such methods.

Static methods can define their own generic type parameters:

```ts
class DataCollection<T> {
  protected items: T[] = [];
  constructor(initialItems: T[]) {
    this.items.push(...initialItems);
  }
  filter<V extends T>(predicate: (target) => target is V): V[] {
    return this.items.filter((item) => predicate(item)) as V[];
  }
  static reverse<ArrayType>(items: ArrayType[]): ArrayType[] {
    return items.reverse();
  }
}

let reversedCities = DataCollection.reverse<City>(cities);
```

# Generic interfaces

This is quite simple:

```ts
type shapeType = { name: string };
interface Collection<T extends shapeType> {
  add(...newItems: T[]): void;
  get(name: string): T;
  count: number;
}
```

## Extending generic type interfaces

Generic interfaces can be extended just like regular interfaces, and the options for dealing with its type parameters are the same as when extending a generic class.

```ts
type shapeType = { name: string };

interface Collection<T extends shapeType> {
  add(...newItems: T[]): void;
  get(name: string): T;
  count: number;
}
interface SearchableCollection<T extends shapeType> extends Collection<T> {
  find(name: string): T | undefined;
}
interface ProductCollection extends Collection<Product> {
  sumPrices(): number;
}
interface PeopleCollection<T extends Product | Employee> extends Collection<T> {
  getNames(): string[];
}
```

# Implementing a Generic Interface

When a class implements interface, it must implement all of its properties and methods. It has some choices over how to deal with type parameters. 

## Passing on the generic type parameter