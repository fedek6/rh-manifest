# Variable types

Primitive variable types:

* Boolean;
* Number;
* String.

Syntax for type declarations is as simple as that:

```ts
let message: string = 'Hello World';
let total: number = 0;
```

## Using template strings

```ts
let sentence: string = `This program is called ${message}.
The value of total variable is ${total}`;
```

Will be compiled to plain old:

```js
var sentence = "This program is called " + message + ".\nThe value of total variable is " + total;
```

## Static type checking

`TypeScript` will show compilation errors when you misuse types:

```bash
error TS2322: Type 'string' is not assignable to type 'number'.
```

## Null & undefined 

`Null` and `undefined` are subtypes of variable types. So this example code won't cause any error:  

```ts
let isNew: boolean = null;
let myName: string = undefined;
```

## Array types

To declare an array with values of the same types:

```ts
// Syntax 1
let list1: number[] = [1, 2, 3, 4];

// Syntax 2
let list2: Array<number> = [1, 2, 3, 4];
```

## Tuple arrays

To declare a mixed array (tuple):

```ts
// Mixed array - tuple
let person1: [string, number] = ['Satan', 666];
```

## Enum

Is an array of predefined values:

```ts
enum Color {Red, Green, Blue};
let c: Color = Color.Green; // value of 1 because it's second element

enum Random {Kyle = 5, Satan = 666, Mark = "Hamilton"};
let n: Random = Random.Satan; // value of 666
```

## Any 

If you can't predict the type of value you can use `any`. It works like in normal JS, you can define any other type of value to a previously declared variable.

```ts
let random: any = 10;
console.log(random);

random = 'ten';
console.log(random);
```

__Notice:__ You should not overuse this type of variable because intellisense won't work with it.

## Unknown

An unknown is a special type of variable type for `TypeScript`. You can assign anything to it, but you can't use intellisense by default on such variables. You need to typecast them first:

```ts
export {}
let myVar: unknown = "Lorem ipsum";

(myVar as string).toUpperCase();
```

### Custom object checking function

By using this function you can check if object of type unknown has a property called name:

```ts
function hasName(obj: any): obj is { name: string } {
    return !!obj 
        && typeof obj === "object" &&
        "name" in obj;
}

if (hasName(myVar)) {
    console.log(myVar.name);
}
```

__Notice:__ `!!` operator is casting a value to boolean. Check this example:

```ts
export {}
let myVar: unknown = "Lorem ipsum";
let nothing: undefined = undefined;

// True
console.log(!!myVar);

// False
console.log(!!nothing);
```

## Union of types

You can declare a variable with multiple possible types.

```ts
let multiType: number | boolean = true;

// true
console.log(multiType);

multiType = 666;

// 666
console.log(multiType);
```