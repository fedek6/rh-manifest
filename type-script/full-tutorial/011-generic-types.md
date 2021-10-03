# Generic types

Generic types are placeholders for types that are resolved when a class or function is used, allowing type-safe code to be written that can deal with a range of different types, such as collection classes.

## Understating the problem

```ts
type dataType = Person | Product;

class DataCollection {
  private items: dataType[] = [];
  constructor(initialItems: dataType[]) {
    this.items.push(...initialItems);
  }
}

let peopleData = new DataCollection(people);
```

This class will accept both `Person` and `Product`. What if we want to create `DataCollection` accepting only one or other?

## Creating generic classes

It's as easy as that:

```ts
class DataCollection<T> {
  private items: T[] = [];
  constructor(initialItems: T[]) {
    this.items.push(...initialItems);
  }
  add(newItem: T) {
    this.items.push(newItem);
  }
  // getNames(): string[] {
  // return this.items.map(item => item.name);
  // }
  getItem(index: number): T {
    return this.items[index];
  }
}

let peopleData = new DataCollection<Person>(people);
```

Implementation:

```ts
// T is a generic type parameter
// this creates generic class
class DataCollection<T> {
  constructor(initialItems: T[]) {
    this.items.push(...initialItems);
  }
}
```

## Constraining generic type values

You won't be able to access specific properties using generic types. You'll need some kind of type narrowing.

```ts
class DataCollection<T> {
  constructor(initialItems: T[]) {
    this.items.push(...initialItems);
  }

  // This will give you error
  getNames(): string[] {
    return this.items.map((item) => item.name);
  }
}
```

You can do type narrowing:

```ts
class DataCollection<T extends Person | Product> {
  private items: T[] = [];
  constructor(initialItems: T[]) {
    this.items.push(...initialItems);
  }
  add(newItem: T) {
    this.items.push(newItem);
  }
  getNames(): string[] {
    return this.items.map((item) => item.name);
  }
}
```

This will allow you using specific properties from the types.

> The first restriction constrains the types that can be used as the generic type argument to create a new `DataCollection<Product | Person>` object so that only types that can be assigned to Product | Person can be used as the type parameter value.

## Constraining generic types using shapes

You can use simple inline shape like this one:

```ts
class DataCollection<T extends { name: string }> {
  private items: T[] = [];
  constructor(initialItems: T[]) {
    this.items.push(...initialItems);
  }
  getNames(): string[] {
    return this.items.map((item) => item.name);
  }
}
```

The shape specified in Listing 12-10 tells the compiler that the `DataCollection<T>` class can be instantiated using any type that has a name property that returns a string.

## Multiple type parameters

```ts
class DataCollection<T extends { name: string }, U> {
  private items: T[] = [];
  constructor(initialItems: T[]) {
    this.items.push(...initialItems);
  }
  collate(targetData: U[], itemProp: string, targetProp: string): (T & U)[] {
    let results = [];
    this.items.forEach((item) => {
      let match = targetData.find((d) => d[targetProp] === item[itemProp]);
      if (match !== undefined) {
        results.push({ ...match, ...item });
      }
    });
    return results;
  }
}

let peopleData = new DataCollection<Person, City>(people);
```

> This can be used to create collation of two objects that are intersected by some property.

