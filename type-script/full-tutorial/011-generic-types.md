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
