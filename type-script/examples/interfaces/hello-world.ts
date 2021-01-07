export {}

// Without interface
function fullName(person: {firstName: string, lastName: string}) {
    console.log(`${person.firstName} ${person.lastName}`);
}

let p = {
    firstName: "Hello",
    lastName: "World"
}

fullName(p);

// With interface
interface Person {
    firstName: string,
    lastName: string
}

// Without interface
function fullName2(person: Person) {
    console.log(`${person.firstName} ${person.lastName}`);
}

fullName2(p);