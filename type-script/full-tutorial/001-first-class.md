# First class

```ts
export class TodoItem {
    public id: number;
    public task: string;
    public complete: boolean = false;

    public constructor(id: number, task: string, complete: boolean = false) { 
        this.id = id;
        this.task = task;
        this.complete = complete; 
    }

    public printDetails() : void {
        console.log(`${this.id}\t${this.task} ${this.complete? "\t(complete)": ""}`);
    } 
}
```

Classes are templates that describe a data type. 

__Notice:__ Access control keywords are provided by the `TypeScript`.

Using `TS` you can also build your classes more concisely:

```ts
export class TodoItem {
    constructor(public id: number,
                public task: string,
                public complete: boolean = false) {
        // no statements required
    }
        printDetails() : void { console.log(`${this.id}\t${this.task} ${this.complete? "\t(complete)": ""}`);
    }
}
```

## Let's create a collection class

```ts
import { TodoItem } from "./todoItem";

export class TodoCollection { 
    private nextId: number = 1;
    constructor(public userName: string, public todoItems: TodoItem[] = []) { // no statements required
    }

    addTodo(task: string): number {
        while (this.getTodoById(this.nextId)) {
            this.nextId++; 
        }
        
        this.todoItems.push(new TodoItem(this.nextId, task));
        return this.nextId; 
    }

    getTodoById(id: number) : TodoItem {
        return this.todoItems.find(item => item.id === id);
    }

    markComplete(id: number, complete: boolean) { 
        const todoItem = this.getTodoById(id);
        
        if (todoItem) {
            todoItem.complete = complete; }
        } 
    }
}
```

## Let's use map

```ts
import { TodoItem } from "./todoItem";

export class TodoCollection {
    private nextId: number = 1;
    private itemMap = new Map<number, TodoItem>();

    constructor(public userName: string, todoItems: TodoItem[] = []) { 
        todoItems.forEach(item => this.itemMap.set(item.id, item));
    }

    addTodo(task: string): number {
        while (this.getTodoById(this.nextId)) {
            this.nextId++; 
        }
        this.itemMap.set(this.nextId, new TodoItem(this.nextId, task));

        return this.nextId; 
    }
        
    getTodoById(id: number) : TodoItem {
        return this.itemMap.get(id);
    }

    markComplete(id: number, complete: boolean) { 
        const todoItem = this.getTodoById(id);

        if (todoItem) {
            todoItem.complete = complete; 
        }
    } 
}
```

__Notice:__ TypeScript supports generic types, which are placeholders for types that are resolved when an object is created. The JavaScript Map, for example, is a general-purpose collection that stores key/value pairs. Because JavaScript has such a dynamic type system, a Map can be used to store any mix of data types using any mix of keys. 

`private itemMap = new Map<number, TodoItem>();`

### Generic type arguments

This map uses generic type arguments. The generic type arguments are enclosed in angle brackets (the < and > characters), and the Map here is given generic type arguments that tell the compiler that the Map will store `TodoItem` objects using number values as keys. 

p. 14

Check this method for accessing to-do objects:

```js
getTodoItems(includeComplete: boolean): TodoItem[] { 
    return [...this.itemMap.values()].filter(item => includeComplete || !item.complete);
}
```

The TypeScript compiler uses the information it has been given to follow the types through each step. The generic type arguments used to create the Map tell the compiler that it contains TodoItem objects, so the compiler knows that the values method will return TodoItem objects and that this will also be the type of the objects in the array. Following this through, the compiler knows that the function passed to the filter method will be processing TodoItem objects and knows that each object will define a complete property.

If I try to read a property or method not defined by the TodoItem class, the TypeScript compiler will report an error.

__Notice:__ For building interactive console tools like to-do list from this chapter use the [inquirer](https://www.npmjs.com/package/inquirer) library.

## Interactive command tool example

Check this example of Inquirer prompt in TS:

```ts
import { TodoItem } from "./todoItem";
import { TodoCollection } from "./todoCollection"; import * as inquirer from 'inquirer';
let todos: TodoItem[] = [
    new TodoItem(1, "Buy Flowers"), new TodoItem(2, "Get Shoes"),
    new TodoItem(3, "Collect Tickets"), new TodoItem(4, "Call Joe", true)];

let collection: TodoCollection = new TodoCollection("Adam", todos);

function displayTodoList(): void { 
    console.log(`${collection.userName}'s Todo List `
+ `(${ collection.getItemCounts().incomplete } items to do)`); 
    collection.getTodoItems(true).forEach(item => item.printDetails());
}
enum Commands { Quit = "Quit" }

function promptUser(): void { 
    console.clear();
    displayTodoList(); 
    
    inquirer.prompt({
        type: "list",
        name: "command",
        message: "Choose option", 
        choices: Object.values(Commands)
    }).then(answers => {
        if (answers["command"] !== Commands.Quit) { promptUser();
    } })
}

promptUser();
```

__Notice:__ Enum is used here like a normal JS object. Look at this code `Object.values(Commands)`. This is quite nifty way to extract values from TS's enum.

## Adding Type Declarations for the JavaScript Package

There are two ways to add declaration to used package:

1. Install them using `npm install --save-dev @types/inquirer` etc.
2. Type them yourself. 

If you want to publish your types go [here](https://github.com/DefinitelyTyped/DefinitelyTyped).

## Type assertion 

```ts
let completedTasks = answers["complete"] as number[];
```

Even with type definitions, there are times when TypeScript isn’t able to correctly assess the types that are being used. In this case, the Inquirer.js package allows any data type to be used in the prompts shown to the user, and the compiler isn’t able to determine that I have used only number values, which means that only number values can be received as answers. I used a type assertion to address this problem, which allows me to tell the compiler to use the type that I specify, even if it has identified a different data type (or no data type at all). When a type assertion is used, it overrides the compiler, which means that I am responsible
for ensuring that the type I assert is correct.