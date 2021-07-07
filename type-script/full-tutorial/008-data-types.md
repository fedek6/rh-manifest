# Data types

Usage of more complex data types.

## Arrays

TypeScript doesn’t change the flexible sizing of arrays, but it does allow the data types they contain to be restricted through the use of type annotations.

```ts
let prices: number[] = [100, 75, 42];
let names: string[] = ["Hat", "Gloves", "Umbrella"];

prices.forEach((price: number, index: number) => {
  writePrice(names[index], calculateTax(price));
});
```

**Attention!** `forEach` callback is also typed. This is important because inner function needs these types.

**Attention!** You can use unions on arrays like this `(number | string)[]`.

---

There's alternative array syntax:

```ts
let test: Array<number> = [100, 200];
```

It cannot be used in a `tsx` files, so it's better to use standard syntax.

---

### Inferred array typing

You can accomplish exactly the same result without typing arrays. Simply check generated declaration files to see what's inferred.

Example output of a declaration file:

```ts
export declare const mixed: (string | number)[];
export declare const inferred: (string | number)[];
```

### Avoiding problems with inferred array types

The compiler infers array types using the values used to populate the array when it is created. This can lead to type errors if the values used to populate an array are accidentally mixed.

```ts
let prices = [100, 75, 42, "20"];
let names = ["Hat", "Gloves", "Umbrella", "Sunglasses"];
prices.forEach((price, index) => {
  writePrice(names[index], calculateTax(price));
});
```

This code will break because `string | number` is not assignable to `calculateTax` parameter which is a number.

**Attention!** Avoid using inferred array types, always use explicit typing.

### Empty arrays are problems

Another reason for using type annotations for arrays is that the compiler will infer the type any for arrays that are created empty.

If you don't use `noImplicitAny` empty array without typing will be inferred as `any`.

```ts
let prices = [];
prices.push(...[100, 75, 42, "20"]);
```

**Attention!** Always type empty arrays!

### Never array type pitfall

If you're using `noImplicitAny`, empty array will be `Array<never>` and you won't be able to add anything to it.

## Tuples

Tuples are fixed length arrays. They must be type annotated.

```ts
let hat: [string, number] = ["Hat", 100];
let gloves: [string, number] = ["Gloves", 75];
```

### Processing tuples

Tuples are standard JS arrays, so you can process them using array methods.

```ts
let hat: [string, number] = ["Hat", 100];
hat.forEach((h: string | number) => {
  if (typeof h === "string") {
    console.log(`String: ${h}`);
  } else {
    console.log(`Number: ${h.toFixed(2)}`);
  }
});
```

