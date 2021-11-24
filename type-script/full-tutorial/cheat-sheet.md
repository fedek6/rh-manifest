# Cheat sheet

This is cheat sheet of most important things in TypeScript.

---

## Special chars

---

### Definitive assignment assertion

#### Example

```ts
let taxValue!: string | number | null;
eval("taxValue = calculateTax(100, false)");
```

#### Meaning

Compiler will not break compilation, event if the assignment is invisible. Compiler thinks that variable is assigned “no matter what”.

---

### Not null assertion

#### Example

```ts
let taxValue: string | number = calculateTax(100, false)!;
```

#### Meaning

Your telling compiler that this variable will never be `null`.

---

### Type union

#### Example

```ts
function calculateTax(amount: number, format: boolean): string | number { …
```

#### Meaning

It's like OR, but for TS types.

---

### Index Type

#### Example

```ts
type priceType = Product["price"];
type allTypes = Product[keyof Product]; // Union of all types for eg. string|number

type test = Product[name]; // For example it can be a string

function getValue<T, K extends keyof T>(item: T, keyname: K): T[K] {
  return item[keyname];
}
```

#### Meaning

This way you can access type of interface element. In generic functions this can be used to determine returned value.

---

### Special chars in type mappings

#### Example

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
```

#### Meaning

| Char                       | Meaning         |
| -------------------------- | --------------- |
| `[P in keyof T]?`          | Make optional   |
| `[P in keyof T]-?`         | Make required   |
| `readonly [P in keyof T]`  | Make read only  |
| `-readonly [P in keyof T]` | Make read write |

---

### Ternary operator (?) for conditional types

#### Example

```ts
type resultType<T extends boolean> = T extends true ? string : number;
let firstVal: resultType<true> = "String Value";
let secondVal: resultType<false> = 100;
```

#### Meaning

It's operator based ternary operator for types.

---

## Types

---

### Never

#### Example

```ts
let something: void = null;
let nothing: never = null; // Error: Type 'null' is not assignable to type 'never'
```

#### Meaning

It tells compiler that function will never return any value or variable cannot be assigned.

---

### Void

#### Example

```ts
const test = (): void {
    console.log("test");
}
```

#### Meaning

It tells compiler that function will not return anything.

---

## Functions

---

### Overloading

#### Example

```ts
function calculateTax(amount: number): number;
function calculateTax(amount: null): null;
function calculateTax(amount: number | null): number | null {
  if (amount != null) {
    return amount * 1.2;
  }
  return null;
}

// From official documentation
function add(a: string, b: string): string;

function add(a: number, b: number): number;

function add(a: any, b: any): any {
  return a + b;
}
```

#### Meaning

It creates a clear connection between parameter types and returned values.

---

## Keywords

### keyof

#### Example

```ts
type Point = { x: number; y: number };
type P = keyof Point; //  “x” | “y”
```

#### Meaning

`Keyof` returns a union of interface / type internal types.

---

### typeof

#### Example

```ts
let s = "hello";
let n: typeof s; // string
```

#### Meaning

It returns a type of variable.

---

### extends (in generic type context)

#### Example

```ts
type SelectProperties<T, K extends keyof T> = {
  [P in K]: T[P];
};

let p1: SelectProperties<Product, "name"> = { name: "Kayak" };
```

#### Meaning

It serves as a constraint to pick only `name` from the type (as above).

---

### extends (in ternary context)

#### Example

```ts
type resultType<T extends boolean> = T extends true ? string : number;
let firstVal: resultType<true> = "String Value";
let secondVal: resultType<false> = 100;
```

#### Meaning

It's like `===` operator in JS.

---

### is

#### Example

```ts
function isString(test: any): test is string {
  return typeof test === "string";
}

// OR

function isProduct(item: any): item is Product {
  return item instanceof Product;
}
```

#### Meaning

`is` is used in predicate function to mark what function parameter should be.

---

### infer

#### Example

```ts
type FlattenIfArray<T> = T extends (infer R)[] ? R : T;

// OR

type Unpromisify<T> = T extends Promise<infer R> ? R : T;

// OR

type targetKeys<T> = T extends (infer U)[] ? keyof U : keyof T;
```

#### Meaning

- We check if our generic Type is the array
- If it is an array extract the real type from it
- If it does not leave it as is

> The `infer` keyword is always used within the extends clause of a conditional type.

> Note, that `infer` shadows type references of an equally-named type declarations.

---

## Utility Types

---

### Exclude

`Exclude<Type, ExcludedUnion>`

#### Example

```ts
type T0 = Exclude<"a" | "b" | "c", "a">;
// type T0 = "b" | "c"
```

#### Meaning

Constructs a type by excluding from Type all union members that are assignable to ExcludedUnion.

---

### Extract

`Extract<Type, Union>`

#### Example

```ts
type T0 = Extract<"a" | "b" | "c", "a" | "f">;
// type T0 = "a"
```

#### Meaning

Constructs a type by extracting from Type all union members that are assignable to Union.

---

### NonNullable

`NonNullable<Type>`

#### Example

```ts
type T0 = NonNullable<string | number | undefined>;
// type T0 = string | number
```

#### Meaning

Constructs a type by excluding null and undefined from Type.
