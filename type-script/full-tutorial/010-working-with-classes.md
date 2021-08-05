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