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