# Working with classes

When working with TypeScript you should use class notation. Using JS prototypes is not well-supported within TS.

## Using classes

```ts
type Person = {
  id: string;
  name: string;
  city: string;
};

class Employee {
  id: string;
  name: string;
  dept: string;
  city: string;
  constructor(id: string, name: string, dept: string, city: string) {
    this.id = id;
    this.name = name;
    this.dept = dept;
    this.city = city;
  }
  writeDept() {
    console.log(`${this.name} works in ${this.dept}`);
  }
}

let salesEmployee = new Employee("fvega", "Fidel Vega", "Sales", "Paris");

let data: (Person | Employee)[] = [
  { id: "bsmith", name: "Bob Smith", city: "London" },
  { id: "ajones", name: "Alice Jones", city: "Paris" },
  { id: "dpeters", name: "Dora Peters", city: "New York" },
  salesEmployee,
];

data.forEach((item) => {
  if (item instanceof Employee) {
    item.writeDept();
  } else {
    console.log(`${item.id} ${item.name}, ${item.city}`);
  }
});
```

As you can see, you can create union of type and class in TS. Using `insteanceof` you can guard your set from using non-existent methods.

> A ∪ B — means union (you can read it as `OR`).

> A ∩ B — means intersection (which has only common elements, you can read it as `AND`).

## Using access control keywords

Thanks to TypeScript JS supports access keywords similar to other languages.

`public` — default, allowed access.

`private` — This keyword restricts access to the class that defines the property or method it is applied to.

`protected` — This keyword restricts access to the class that defines the property or method it is applied to and its subclasses.

**Notice:** public is default access of a properties and methods, but you should add it for better readability.

```ts
class Employee {
  public id: string;
  public name: string;
  private dept: string;
  public city: string;
  constructor(id: string, name: string, dept: string, city: string) {
    this.id = id;
    this.name = name;
    this.dept = dept;
    this.city = city;
  }
  writeDept() {
    console.log(`${this.name} works in ${this.dept}`);
  }
}
```

**Attention!** Access keywords are purely virtual. In JavaScript runtime everything will be available to environment.

> If you want to protect your variables from not being initialized, use `strictPropertyInitialization` option in `tsconfig.json`.

## Read-only properties

`readonly` allows you to protect properties. They can to be initialized only in constructor.

```ts
class Employee {
  public readonly id: string;
  constructor(id: string, name: string, dept: string, city: string) {
    this.id = id;
  }
}

let salesEmployee = new Employee("fvega", "Fidel Vega", "Sales", "Paris");
salesEmployee.writeDept();
salesEmployee.id = "fidel"; // src/index.ts(27,15): error TS2540: Cannot assign to 'id' because it is a read-only property.
```

**Attention!** This feature is also synthetic and also enforced only by TypeScript.

## Simplifying class constructors