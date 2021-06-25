# Working with TS

Built-in types:

| Name | Description |
| ---- | ----------- |
| number| |
| string | |
| boolean | |
| symbol | Unique constant value, such as keys in collections |
| null | nonexistent or invalid reference |
| undefined | variable defined without value |
| object | |

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
