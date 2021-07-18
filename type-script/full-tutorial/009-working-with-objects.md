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