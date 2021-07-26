# Working with objects

TypeScript focuses on an object’s “shape,” which is the combination of its property names and types.

These are object shapes:

```ts
declare let hat: { name: string; price: number };
declare let gloves: { name: string; price: number };
declare let umbrella: { name: string };
declare let products: { name: string }[];
```

(generated through `declaration: true` setting in `tsconfig`).

## Using object shape type annotations

For object literals TS is creating automatic type of each property using its value. Type can be annotated by hand.

```ts
let hat = { name: "Hat", price: 100 };
let gloves = { name: "Gloves", price: 75 };
let umbrella = { name: "Umbrella" };
let products: { name: string; price: number }[] = [hat, gloves, umbrella];
products.forEach((prod) => console.log(`${prod.name}: ${prod.price}`));
```

The type annotation restricts the contents of the products array to objects that have name and price properties that are string and number.

The compiler will report error `Property 'price' is missing in type '{name: string}' but required in type '{name: string; price: number;}'`.

## Understanding how shape types fit

To match type, an objhet must define all the properties in the shape. The compiler will still match an object if it has additional properties by the shape type:

```ts
let hat = { name: "Hat", price: 100 };
let gloves = { name: "Gloves", price: 75 };
let umbrella = { name: "Umbrella", price: 30, waterproof: true };
let products: { name: string; price?: number }[] = [hat, gloves, umbrella];
products.forEach((prod) => console.log(`${prod.name}: ${prod.price}`));
```

`waterproof` property will be ignored in the `products` array.

## Optional properties for irregular shapes

Optional properties make a shape for irregular objects, so it's more flexible.

```ts
let hat = { name: "Hat", price: 100 };
let gloves = { name: "Gloves", price: 75 };
let umbrella = { name: "Umbrella", price: 30, waterproof: true };
let products: { name: string; price?: number; waterproof?: boolean }[] = [
  hat,
  gloves,
  umbrella,
];
```

Now `waterproof` is available in the resulting `products` array. I will be `undefined` in unsupported types.

## Including methods in shape types

```ts
enum Feature {
  Waterproof,
  Insulated,
}

let hat = { name: "Hat", price: 100 };
let gloves = { name: "Gloves", price: 75 };
let umbrella = {
  name: "Umbrella",
  price: 30,
  hasFeature: (feature) => feature === Feature.Waterproof,
};

let products: {
  name: string;
  price?: number;
  hasFeature?(Feature): boolean;
}[] = [hat, gloves, umbrella];

products.forEach((prod) =>
  console.log(
    `${prod.name}: ${prod.price} ` +
      `Waterproof: ${prod.hasFeature(Feature.Waterproof)}`
  )
);
```

This will cause error, because method need to be provided in a such case:

```ts
enum God {
  Satan,
  Jahwe,
}

let believer = { name: "Jan", believesGod: (god: number) => god === God.Satan };
let believer2 = {
  name: "Michal",
  believesGod: (god: number) => god === God.Jahwe,
};

let believers: { name: string; believesGod(god: number): boolean }[] = [
  believer,
  believer2,
];

believers.forEach((believer) =>
  console.log(
    `${believer.name} believes god ${believer.believesGod(God.Jahwe)}`
  )
);
```

**Notice**: `strictNullChecks` may protect you from such errors.

But if you want force it and check if optional method exists, you can use this code:

```ts
products.forEach((prod) =>
  console.log(
    `${prod.name}: ${prod.price} ` +
      `${prod.hasFeature ? prod.hasFeature(Feature.Waterproof) : "false"}`
  )
);
```

## Type aliases for shape types

A type alias can be used to give a name to a specific shape, making it easier to refer to the shape in code
consistently.

```ts
enum Feature {
  Waterproof,
  Insulated,
}

type Product = {
  name: string;
  price?: number;
  hasFeature?(Feature): boolean;
};

let hat = { name: "Hat", price: 100 };
let gloves = { name: "Gloves", price: 75 };
let umbrella = {
  name: "Umbrella",
  price: 30,
  hasFeature: (feature) => feature === Feature.Waterproof,
};
let products: Product[] = [hat, gloves, umbrella];
```

## Dealing with excess properties

There are times when it's better to provide compiler with more information because it might change its behavior.

```ts
enum Feature {
  Waterproof,
  Insulated,
}
type Product = {
  name: string;
  price?: number;
  hasFeature?(Feature): boolean;
};

let hat = { name: "Hat", price: 100 };
let gloves = { name: "Gloves", price: 75 };
let umbrella = {
  name: "Umbrella",
  price: 30,
  hasFeature: (feature) => feature === Feature.Waterproof,
};
let mirrorShades = { name: "Sunglasses", price: 54, finish: "mirrored" };
let darkShades: Product = { name: "Sunglasses", price: 54, finish: "flat" };
let products: Product[] = [hat, gloves, umbrella, mirrorShades, darkShades];
```

Will break with following error:

```bash
src/index.ts(16,60): error TS2322: Type '{ name: string; price: number; finish: string; }' is not assignable to type 'Product'
Object literal may only specify known properties, and 'finish' does not exist in type 'Product'.
```

Compiler treats `mirrorShades` and `darkShades` differently because second one is using `Product` type.

You can disable this behavior by using `suppressExcessPropertyErrors` option in the `tsconfig` file.

## Using shape type unions

Type unions are types in their own right and contain the properties that are defined by all of their constituent types. This isn’t a useful feature when dealing with unions of primitive data types because there are few common properties.

```ts
type Product = {
  id: number;
  name: string;
  price?: number;
};

type Person = {
  id: string;
  name: string;
  city: string;
};

let hat = { id: 1, name: "Hat", price: 100 };
let gloves = { id: 2, name: "Gloves", price: 75 };
let umbrella = { id: 3, name: "Umbrella", price: 30 };
let bob = { id: "bsmith", name: "Bob", city: "London" };
let dataItems: (Product | Person)[] = [hat, gloves, umbrella, bob];
```

**Attention**: type union is a cross between two types. Only properties shared by them can be used. In fact type union is a new type with shared properties only.

## Union property types

This shows effect of a union of two types:

```ts
type Product = {
  id: number;
  name: string;
  price?: number;
};

type Person = {
  id: string;
  name: string;
  city: string;
};

type UnionType = {
  id: number | string;
  name: string;
};

let dataItems: UnionType[] = [hat, gloves, umbrella, bob];
```

The conclusion is that union types must be compatible.

## Using type guards for objects

Type guards are still required to get to a specific type to access all the features it defines.

`typeof` will return `object` for all objects, so we need to check if specific properties exist.

```ts
dataItems.forEach((item) => {
  if ("city" in item) {
    console.log(`Person: ${item.name}: ${item.city}`);
  } else {
    console.log(`Product: ${item.name}: ${item.price}`);
  }
});
```

**Attention**: the `in` operator returns true if the specified property is in the specified object or its prototype chain. It is a part of standard JS language.

### Avoiding common type guard problems

It is important to create accurate type guard tests. There two common problems ahead:

1. Inaccurate tests:

```ts
// Both types have id and name
if ("id" in item && "name" in item) {
  console.log(`Person: ${item.name}: ${item.city}`);
} else {
  console.log(`Product: ${item.name}: ${item.price}`);
}
```

2. Testing for optional property:

```ts
if ("price" in item) {
  console.log(`Product: ${item.name}: ${item.price}`);
} else {
  console.log(`Person: ${item.name}: ${item.city}`);
}
```

`price` is optional, so type might be mistaken.

## Type guarding with a type predicate function

The in keyword is a useful way to identify whether an object conforms to a shape, but it requires the same checks to be written each time types need to be identified. TypeScript also supports guarding object types using a function.

```ts
function isPerson(testObj: any): testObj is Person {
  return testObj.city !== undefined;
}
dataItems.forEach((item) => {
  if (isPerson(item)) {
    console.log(`Person: ${item.name}: ${item.city}`);
  } else {
    console.log(`Product: ${item.name}: ${item.price}`);
  }
});
```

As you for this purpose `is` keyword was used.

> If the result of the function is true, then the TypeScript compiler will treat the object as the specified type.

Using a function for type guarding can be more flexible because the parameter type is any, allowing properties to be tested for without having to use string literals and the in keyword.

**Important!** You should prefix your type checking functions using `is`.

This way you can create helper methods for advanced type checking.

## Type intersections

**Warning!** Type intersections combine features of multiple types, not like in unions case, where you can use only common things.

```ts
type Person = {
  id: string;
  name: string;
  city: string;
};

type Employee = {
  company: string;
  dept: string;
};

let bob = {
  id: "bsmith",
  name: "Bob",
  city: "London",
  company: "Acme Co",
  dept: "Sales",
};

let dataItems: (Person & Employee)[] = [bob];
```

In simple words intersection is a combination of two types.

### Using intersections for data correlation

Intersections are useful when you receive objects from one source and need to introduce new functionality, so they can be used elsewhere in the application or when objects from two data sources need to be correlated and combined.

```ts
type Person = {
  id: string;
  name: string;
  city: string;
};
type Employee = {
  id: string;
  company: string;
  dept: string;
};
type EmployedPerson = Person & Employee;

function correlateData(
  peopleData: Person[],
  staff: Employee[]
): EmployedPerson[] {
  const defaults = { company: "None", dept: "None" };
  return peopleData.map((p) => ({
    ...p,
    ...(staff.find((e) => e.id === p.id) || { ...defaults, id: p.id }),
  }));
}

let dataItems: EmployedPerson[] = correlateData(people, employees);
```

As you can see you can merge both types ant corresponding objects into one.

### Understanding intersection merging

TypeScript` types fit objects when they have all needed properties. Excess properties will be ignored.

```ts
function writePerson(per: Person): void {
  console.log(`Person: ${per.id}, ${per.name}, ${per.city}`);
}
function writeEmployee(emp: Employee): void {
  console.log(`Employee: ${emp.id}, ${emp.company}, ${emp.dept}`);
}
dataItems.forEach((item) => {
  writePerson(item);
  writeEmployee(item);
});
```

So types can be interchanged. 

> **Important!** It may seem obvious that an intersection type is compatible with each of its constituents, but it has an important effect when the types in the intersection define properties with the same name: the type of the property in the intersection is an intersection of the individual property types.

### Merging properties with the same type