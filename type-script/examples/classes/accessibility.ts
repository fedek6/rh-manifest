export{}
class HelloWorld {
    private text: string;

    constructor(text: string) {
        this.text = text;
    }

    output() {
        console.log(this.text);
    }
}

let h = new HelloWorld("Hello World");

// Error:
// console.log(h.text);

h.output();