# Array

## Random array element

```js
//#Source https://bit.ly/2neWfJ2 
const sample = arr => arr[Math.floor(Math.random() * arr.length)];
console.log(sample([3, 7, 9, 11]));
```