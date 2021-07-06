# Using functions

Example compiler options for Node:

```json
{
  "compilerOptions": {
    "target": "es2018",
    "outDir": "dist",
    "rootDir": "src",
    "module": "commonjs",
    "sourceMap": true,
    "strictNullChecks": true,
    "noImplicitAny": true,
    "declaration": true,
    "noImplicitReturns": true,
    "noUnusedParameters": true
  }
}
```

**Attention**: many languages allow overloading functions if number of parameters is different. This is not a case in JS. TypeScript will protect you from creating functions with the same name.

## Optional parameters

This is easy:

```ts
function calculateTax(amount, discount?) {
  return amount * 1.2 - (discount || 0);
}
```

**Warning!** Please remember to protect your optional parameters by using OR operator.

## Default value parameter

Default-initialized parameter:

```ts
function calculateTax(amount, discount = 0) {
  return amount * 1.2 - discount;
}
```

## Rest parameter

It allows a function to accept a variable number of arguments, which are grouped together and presented together.

```ts
function calculateTax(amount, discount = 0, ...extraFees) {
  return (
    amount * 1.2 - discount + extraFees.reduce((total, val) => total + val, 0)
  );
}
taxValue = calculateTax(100, 10, 20, 30, 50);
```

**Attention!** Rest parameter is always an array!

## Type annotations in parameters

By default, function parameters are type of `any`.

```ts
function calculateTax(
  amount: number,
  discount: number = 0,
  ...extraFees: number[]
) {
  return (
    amount * 1.2 - discount + extraFees.reduce((total, val) => total + val, 0)
  );
}
```

**Attention!** Rest parameters are always arrays.

**Attention!** Optional parameters look like this: `discount?: number`.

## Controlling null parameters

TypeScript allows null and undefined to be used as values for all types by default.

```ts
let taxValue = calculateTax(null, 0);
```

If you don't enable `strictNullChecks` this will work perfectly normal and may cause some mayhem.

If you wish to use nulls in your functions, use unions:

```ts
function calculateTax(
  amount: number | null,
  discount: number = 0,
  ...extraFees: number[]
) {
  if (amount != null) {
    return (
      amount * 1.2 - discount + extraFees.reduce((total, val) => total + val, 0)
    );
  }
}
```

**Attention!** It's important to use type guards in such situations.

## Function result

Compile will try to determine returned type automatic. If you want to see what's been determined, use `declaration` setting and check `d.ts` files in `dist`.

If you want to disable implicit returns use `noImplictReturns`. This way compile will try to catch situations where normally JS function would try to return undefined.

Now to return `undefined` you'll need to:

```ts
function calculateTax(
  amount: number | null,
  discount: number = 0,
  ...extraFees: number[]
) {
  if (amount != null) {
    return (
      amount * 1.2 - discount + extraFees.reduce((total, val) => total + val, 0)
    );
  } else {
    return undefined;
  }
}
```

## Type annotations in function results

It's easy like:

```ts
function calculateTax(
  amount: number,
  discount: number = 0,
  ...extraFees: number[]
): number {
  return (
    amount * 1.2 - discount + extraFees.reduce((total, val) => total + val, 0)
  );
}
```

## Void functions

```ts
function writeValue(label: string, value: number): void {
  console.log(`${label}: ${value}`);
}
```

__Attention!__ The never type can be used as the result type for functions that will never complete, such as functions that will always throw an exception, for example.