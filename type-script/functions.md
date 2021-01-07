# Functions in TypeScript

You can declare types in param list, as well as return type, of a function:

```ts
function concat(text1: string, text2: string): string {
    return `${text1} ${text2}`;
}
```

## Optional & default parameters

Declaring optional params is as easy as that (add question mark after parameter name):

```ts
function concat(text1: string, text2?: string): string {
    if (text2) {
        return `${text1} ${text2}`;
    } else {
        return text1;
    }
}
```

Using default params looks like this:

```ts
function concat(text1: string, text2: string = "World"): string {
    return `${text1} ${text2}`;
}
```