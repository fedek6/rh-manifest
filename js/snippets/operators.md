# Operators

## Logical Assignment Operator

### &&=

```js
a &&= b;

// Equals to
if (a) {
  a = b
}
```

### ||=

```js
a ||= b;

// Equals to
a || (a = b);
```

### ??=

```js
a ??= b;

// the above statement is equivalent to
if (a === null || a === undefined) {
  a = b;
}
```