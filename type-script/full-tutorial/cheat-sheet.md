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
```

#### Meaning

It creates a clear connection between parameter types and returned values.

---