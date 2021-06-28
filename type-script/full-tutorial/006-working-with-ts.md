# Working with TS

Built-in types:

| Name      | Description                                        |
| --------- | -------------------------------------------------- |
| number    |                                                    |
| string    |                                                    |
| boolean   |                                                    |
| symbol    | Unique constant value, such as keys in collections |
| null      | nonexistent or invalid reference                   |
| undefined | variable defined without value                     |
| object    |                                                    |

## Type annotations

```ts
function calculateTax(amount: number): number {
  return amount * 1.2;
}
```

1. Parameter type annotation.
2. Result type annotation.

## Implicitly defined types

```ts
function calculateTax(amount: number) {
  return amount * 1.2;
}
```

TypeScript will automatically determine type of returned value.

When you set `declaration` config variable to `true`, compiler will generate file with types used in your code. This might be useful for debugging.

## Using any type

Using `any` will stop compiler from checking type.

Any can be assigned to any other type:

```ts
let newResult: any = calculateTax(200);
let myNumber: number = newResult;
console.log(`Number value: ${myNumber.toFixed(2)}`);
```

**Notice**: any is like a hack to enter the world of JS variables. If TS cannot determine implicitly variable type, it will be one of type any.

You can disable this behavior by using `noImplicityAny` option.

## Type unions

```ts
function calculateTax(amount: number, format: boolean): string | number {
  const calcAmount = amount * 1.2;
  return format ? `$${calcAmount.toFixed(2)}` : calcAmount;
}
let taxNumber = calculateTax(100, false);
let taxString = calculateTax(100, true);
```

`|` — bar character crates union.

## Using type assertions

Using type assertions is like being smarter that TS compiler. In fact, you're telling compiler that returned value us specific type.

```ts
let taxNumber = calculateTax(100, false) as number;
let taxString = calculateTax(100, true) as string;
console.log(`Number Value: ${taxNumber.toFixed(2)}`);
console.log(`String Value: ${taxString.charAt(0)}`);
```

**Attention!** No conversion is used when asserting a type.

Asserted types can be selected from returned union.

If you want to assert forcibly you can use this trick:

```ts
let taxBoolean = calculateTax(100, false) as any as boolean;
```

### Alternative assertion syntax

```ts
let taxString = <string>calculateTax(100, true);
```

**Warning!** This cannot be used in `tsx` files.

## Using a type guard

For testing JS` primitive values:

```ts
if (typeof taxValue === "number") {
  console.log(`Number Value: ${taxValue.toFixed(2)}`);
}
```

Compiler will determine that `taxValue` is in fact a `Number`! It will trust if statement. It also follows `switch` syntax.

```ts
switch (typeof taxValue) {
  case "number":
    console.log(`Number Value: ${taxValue.toFixed(2)}`);
    break;
  case "string":
    console.log(`String Value: ${taxValue.charAt(0)}`);
    break;
}
```

## Understating the never type

```ts
switch (typeof taxValue) {
  case "number":
    console.log(`Number Value: ${taxValue.toFixed(2)}`);
    break;
  case "string":
    console.log(`String Value: ${taxValue.charAt(0)}`);
    break;
  default:
    let value: never = taxValue;
    console.log(`Unexpected type for value: ${value}`);
}
```

Something has gone wrong if execution reaches the default clause of the switch statement, and TypeScript provides the never type to ensure you can’t accidentally use a value once type guards have been used to exhaustively narrow a value to all of its possible types.

## Using unknown type

`unknown` is a safer alternative to `any`. Only `any` and `unknow` can be assigned to such variable (unless type guard is used).

```
src/index.ts(18,5): error TS2322: Type 'unknown' is not assignable to type 'number'.
```

## Nullable types

There is a hole in the TypeScript static type system: the JavaScript null and undefined types. The null type can be assigned only the null value and is used to represent something that doesn’t exist or is invalid. The undefined type can be assigned only the undefined value and is used when a variable has been defined but not yet assigned a value.

---

The problem is that, by default, TypeScript treats null and undefined as legal values for all types.

---

**Attention!** In addition to type inconsistencies, nullable values can lead to runtime errors that are difficult to detect during development and often encountered by users.

## How to disable nullable assignments?

Simply add `strictNullChecks` to your `tsconfig`:

```json
{
  "compilerOptions": {
    "strictNullChecks": true
  }
}
```

With this setting `null` and `undefined` cannot be assigned to other type of values.

```
src/index.ts(3,9): error TS2322: Type 'null' is not assignable to type 'string | number'.
```

You can always expand union with `null`:

```ts
function calculateTax(amount: number, format: boolean): string | number | null {
  if (amount === 0) {
    return null;
  }
  const calcAmount = amount * 1.2;
  return format ? `$${calcAmount.toFixed(2)}` : calcAmount;
}

let taxValue: string | number | null = calculateTax(0, false);

// More advanced type guard
switch (typeof taxValue) {
  case "number":
    console.log(`Number Value: ${taxValue.toFixed(2)}`);
    break;
  case "string":
    console.log(`String Value: ${taxValue.charAt(0)}`);
    break;
  default:
    if (taxValue === null) {
      console.log("Value is null");
    } else {
      console.log(typeof taxValue);
      let value: never = taxValue;
      console.log(`Unexpected type for value: ${value}`);
    }
}
```

**Warning!** Using `typeof` on `null` values returns object.

## Removing null from a union with assertion

**Warning!** A non-null assertion should be used only when you know that a null value cannot occur. A runtime error will be caused if you apply the assertion and a null value does occur. A safer approach is to use a type guard, as described in the next section.

```ts
let taxValue: string | number = calculateTax(100, false)!;

switch (typeof taxValue) {
  case "number":
    console.log(`Number Value: ${taxValue.toFixed(2)}`);
    break;
  case "string":
    console.log(`String Value: ${taxValue.charAt(0)}`);
    break;
  default:
    if (taxValue === null) {
      console.log("Value is null");
    } else {
      console.log(typeof taxValue);
      let value: never = taxValue;
      console.log(`Unexpected type for value: ${value}`);
    }
}
```

To assert `non-null` you need to add exclamation mark on the end of expression.

```ts
let taxValue: string | number = calculateTax(100, false)!;
```

## Removing null from a Union with a Type Guard

An alternative approach is to filter out null or undefined values using a type guard.

```ts
let taxValue: string | number | null = calculateTax(100, false);
if (taxValue !== null) {
  let nonNullTaxValue: string | number = taxValue;
  switch (typeof taxValue) {
    case "number":
      console.log(`Number Value: ${taxValue.toFixed(2)}`);
      break;
    case "string":
      console.log(`String Value: ${taxValue.charAt(0)}`);
      break;
  }
} else {
  console.log("Value is not a string or a number");
}
```
