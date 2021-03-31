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

p.9