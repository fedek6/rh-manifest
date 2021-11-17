# Working with classes

When working with TypeScript you should use class notation. Using JS prototypes is not well-supported within TS.

## Using classes

```ts
type Person = {
  id: string;
  name: string;
  city: string;
};

class Employee {
  id: string;
  name: string;
  dept: string;
  city: string;
  constructor(id: string, name: string, dept: string, city: string) {
    this.id = id;
    this.name = name;
    this.dept = dept;
    this.city = city;
  }
  writeDept() {
    console.log(`${this.name} works in ${this.dept}`);
  }
}

let salesEmployee = new Employee("fvega", "Fidel Vega", "Sales", "Paris");

let data: (Person | Employee)[] = [
  { id: "bsmith", name: "Bob Smith", city: "London" },
  { id: "ajones", name: "Alice Jones", city: "Paris" },
  { id: "dpeters", name: "Dora Peters", city: "New York" },
  salesEmployee,
];

data.forEach((item) => {
  if (item instanceof Employee) {
    item.writeDept();
  } else {
    console.log(`${item.id} ${item.name}, ${item.city}`);
  }
});
```

As you can see, you can create union of type and class in TS. Using `insteanceof` you can guard your set from using non-existent methods.

> A ∪ B — means union (you can read it as `OR`).

> A ∩ B — means intersection (which has only common elements, you can read it as `AND`).

## Using access control keywords

Thanks to TypeScript JS supports access keywords similar to other languages.

`public` — default, allowed access.

`private` — This keyword restricts access to the class that defines the property or method it is applied to.

`protected` — This keyword restricts access to the class that defines the property or method it is applied to and its subclasses.

**Notice:** public is default access of a properties and methods, but you should add it for better readability.

```ts
class Employee {
  public id: string;
  public name: string;
  private dept: string;
  public city: string;
  constructor(id: string, name: string, dept: string, city: string) {
    this.id = id;
    this.name = name;
    this.dept = dept;
    this.city = city;
  }
  writeDept() {
    console.log(`${this.name} works in ${this.dept}`);
  }
}
```

**Attention!** Access keywords are purely virtual. In JavaScript runtime everything will be available to environment.

> If you want to protect your variables from not being initialized, use `strictPropertyInitialization` option in `tsconfig.json`.

## Read-only properties

`readonly` allows you to protect properties. They can to be initialized only in constructor.

```ts
class Employee {
  public readonly id: string;
  constructor(id: string, name: string, dept: string, city: string) {
    this.id = id;
  }
}

let salesEmployee = new Employee("fvega", "Fidel Vega", "Sales", "Paris");
salesEmployee.writeDept();
salesEmployee.id = "fidel"; // src/index.ts(27,15): error TS2540: Cannot assign to 'id' because it is a read-only property.
```

**Attention!** This feature is also synthetic and also enforced only by TypeScript.

## Simplifying class constructors

TypeScript can populate class properties automatically:

```ts
class Employee {
  constructor(
    public readonly id: string,
    public name: string,
    private dept: string,
    public city: string
  ) {
    // no statements required
  }
  writeDept() {
    console.log(`${this.name} works in ${this.dept}`);
  }
}
```

The compiler automatically creates an instance property for each of the constructor arguments to which an access control keyword has been applied and assigns the parameter value. The use of the access control keywords doesn’t change the way the constructor is invoked and is required only to tell the compiler that corresponding instance variables are required.

## Class inheritance

TypeScript builds on the standard class inheritance features to make them more consistent and familiar,
with some useful additions for commonly required tasks and for restricting some JavaScript characteristics that can cause problems.

```ts
class Person {
  constructor(public id: string, public name: string, public city: string) {}
}

class Employee extends Person {
  constructor(
    public readonly id: string,
    public name: string,
    private dept: string,
    public city: string
  ) {
    super(id, name, city);
  }

  writeDept() {
    console.log(`${this.name} works in ${this.dept}`);
  }
}
let data = [
  new Person("bsmith", "Bob Smith", "London"),
  new Employee("fvega", "Fidel Vega", "Sales", "Paris"),
];
data.forEach((item) => {
  console.log(`Person: ${item.name}, ${item.city}`);
  if (item instanceof Employee) {
    item.writeDept();
  }
});
```

**Notice:** When using `extends` keyword you must pass properties to higher order class using `super` keyword.

## Understanding type inference for subclasses

Caution is required when letting the compiler infer types from classes because it is easy to produce unexpected results by assuming the compiler has insight into the hierarchy of classes.

To avoid this kind of error you should annotate type of your data:

```ts
class Customer extends Person {}
class Supplier extends Person {}

let data: Person[] = [
  new Employee("fvega", "Fidel Vega", "Sales", "Paris"),
  new Customer("ajones", "Alice Jones", "London", 500),
];

data.push(new Supplier("dpeters", "Dora Peters", "New York", "Acme"));
```

## Abstract classes

Abstract classes cannot be instantiated directly. They can be used as skeletons for other classes.

```ts
abstract class Person {
  constructor(public id: string, public name: string, public city: string) {}
  getDetails(): string {
    return `${this.name}, ${this.getSpecificDetails()}`;
  }
  abstract getSpecificDetails(): string;
}

class Employee extends Person {
  constructor(
    public readonly id: string,
    public name: string,
    private dept: string,
    public city: string
  ) {
    super(id, name, city);
  }
  getSpecificDetails() {
    return `works in ${this.dept}`;
  }
}
```

**Attention!** The abstract keyword is also applied to individual methods, which are defined without a body, as shown in Figure.

## Type guarding abstract classes

Abstract classes are purely TypeScript construct. They can be instantiated in JS by mistake.

```ts
data.forEach((item) => {
  if (item instanceof Person) {
    console.log(item.getDetails());
  } else {
    console.log(`Customer: ${item.name}`);
  }
});
```

## Using interfaces

Interfaces are used to shape an object. Class of such object must conform to used interface.

> Note: Interfaces are similar to shape types. There are no big differences between them. However, they provide experience that is similar to other programming languages. So you should use them to define class shapes.

```ts
interface Person {
  name: string;
  getDetails(): string;
}

class Employee implements Person {
  constructor(
    public readonly id: string,
    public name: string,
    private dept: string,
    public city: string
  ) {
    // no statements required
  }
  getDetails() {
    return `${this.name} works in ${this.dept}`;
  }
}

let data: Person[] = [
  new Employee("fvega", "Fidel Vega", "Sales", "Paris"),
  new Customer("ajones", "Alice Jones", "London", 500),
];
```

Unlike abstract classes, interfaces don’t implement methods or define a constructor and just define a
shape. Interfaces are implemented by classes through the `implements` keyword.

The data array can contain any object created from a class that implements the Product array, although
the function passed to the `forEach` method is able to access only the features defined by the interface unless objects are narrowed to a more specific type.

**Notice** Interfaces can be merged together. The declarations must be made in the same code file, and they must all be exported (defined with the
export keyword) or defined locally (defined without the export keyword).

## Implementing multiple interfaces

A class can implement more than one interface, meaning it must define the methods and properties defined by all of them.

```ts
interface Person {
  name: string;
  getDetails(): string;
}
interface DogOwner {
  dogName: string;
  getDogDetails(): string;
}
class Customer implements Person, DogOwner {
  constructor(
    public readonly id: string,
    public name: string,
    public city: string,
    public creditLimit: number,
    public dogName
  ) {
    // no statements required
  }
  getDetails() {
    return `${this.name} has ${this.creditLimit} limit`;
  }
  getDogDetails() {
    return `${this.name} has a dog named ${this.dogName}`;
  }
}
```

> Note: class can implement multiple interfaces only if there are no overlapping properties with conflicting
> types.

## Extending interfaces

Interfaces can be extended similar to classes.

```ts
interface Person {
  name: string;
  getDetails(): string;
}
interface DogOwner extends Person {
  dogName: string;
  getDogDetails(): string;
}
class Customer implements DogOwner {
  // Both interfaces methods & properties
}
```

> Objects created from the Customer class can be treated as both DogOwner and
> Person objects, since they always define the shapes required by each interface.

The `extend` keyword is used to extend an interface. In the listing, the `DogOwner` interface extends the Person interface, which means that classes that implement `DogOwner` must define the properties and methods from both interfaces.

## Shapes and interfaces

As noted at the start of this section, shape types and interfaces can often be used interchangeably. Classes can, for example, use the implements keyword with a shape type to indicate they implement the properties in the shape, like this:

```ts
type Person = {
  name: string;
  getDetails(): string;
};

class Employee implements Person {
  constructor(
    public readonly id: string,
    public name: string,
    private dept: string,
    public city: string
  ) {
    // no statements required
  }
  getDetails() {
    return `${this.name} works in ${this.dept}`;
  }
}
```

Also interface can extend type:

```ts
type NamedObject = {
  name: string;
};
interface Person extends NamedObject {
  getDetails(): string;
}
```

**Conclusion**: type shapes and interfaces can be mixed together in various ways.

## Optional interface properties and methods

```ts
interface Person {
  name: string;
  getDetails(): string;
  dogName?: string;
  getDogDetails?(): string;
}
class Customer implements Person {}

let data: Person[] = [
  new Employee("fvega", "Fidel Vega", "Sales", "Paris"),
  alice,
];

data.forEach((item) => {
  console.log(item.getDetails());
  if (item.getDogDetails) {
    console.log(item.getDogDetails());
  }
});
```

> You must check for optional interfaces in JS.

## Defining abstract interface implementation

This can reduce code duplication when some of the classes that implement an interface would do so, in the same way, using the same code.

```ts
abstract class AbstractDogOwner implements Person {
  abstract name: string;
  abstract dogName?: string;
  abstract getDetails();
  getDogDetails() {
    if (this.dogName) {
      return `${this.name} has a dog called ${this.dogName}`;
    }
  }
}

class DogOwningCustomer extends AbstractDogOwner {
  constructor(
    public readonly id: string,
    public name: string,
    public city: string,
    public creditLimit: number,
    public dogName
  ) {
    super();
  }
  getDetails() {
    return `${this.name} has ${this.creditLimit} limit`;
  }
}
```

## Type guarding an interface

> There is no JavaScript equivalent to interfaces, and no details of interfaces are included in the JavaScript code generated by the TypeScript compiler. Type guarding can be done only by checking for one or more properties that are defined by the interface.

```ts
let data: (Person | Product)[] = [
  new Employee("Bob Smith", "Acme"),
  new SportsProduct("Running Shoes", "Running", 90.5),
  new Employee("Dora Peters", "BigCo"),
];

data.forEach((item) => {
  if ("getDetails" in item) {
    console.log(`Person: ${item.getDetails()}`);
  } else {
    console.log(`Product: ${item.name}, ${item.price}`);
  }
});
```

## Dynamically creating properties

The TypeScript compiler only allows values to be assigned to properties that are part of an object’s type, which means that interfaces and classes have to define all the properties that the application requires.

```ts
class ProductGroup {
  constructor(...initialProducts: [string, Product][]) {
    initialProducts.forEach((p) => (this[p[0]] = p[1]));
  }
  [propertyName: string]: Product;
}

let group = new ProductGroup([
  "shoes",
  new SportsProduct("Shoes", "Running", 90.5),
]);

group.hat = new SportsProduct("Hat", "Skiing", 20);
Object.keys(group).forEach((k) => console.log(`Property Name: ${k}`));
```

`ProductGroup` receives tuples `[string, Product]` through its constructor. Each of which is used to create a new property. 

Classes can define index signature to prevent `noImplictAny` errors, it looks like this:

```
[propertyName: string]: Product;
```

> An index signature uses square brackets to
specify the type of the property keys, followed by a type annotation that restricts the types that can be used to create dynamic properties. Type of index key can be only defined as number or string.

```ts
// string key & object of Product type
group.hat = new SportsProduct("Hat", "Skiing", 20);
```

