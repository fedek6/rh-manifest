# Interfaces

Interfaces will allow you to make your code look better. For example, look at this function:

```ts
function fullName(person: {firstName: string, lastName: string}) {
    console.log(`${person.firstName} ${person.lastName}`);
}
```

You need to declare every property of an object. 

So you should create an interface:

```ts
interface Person {
    firstName: string,
    lastName: string
}

// Without interface
function fullName2(person: Person) {
    console.log(`${person.firstName} ${person.lastName}`);
}
```

It will work the same but it looks a lot better!

You can also declare properties of interfaces as optional:

```ts
interface Person {
    firstName: string,
    lastName: string,
    school?: string
}
```

__Notice:__ Interfaces might be useful with forms because some fields are required, others are not.