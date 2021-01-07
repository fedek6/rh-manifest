export {}

class HelloWorld {
    text: string;

    constructor(text: string) {
        this.text = text;
    }

    output() {
        console.log(this.text);
    }
}

let hello1 = new HelloWorld('Hello World');
console.log(hello1.text);
hello1.output();

class TurboHello extends HelloWorld {
    constructor(turbo: string) {
        super(turbo);
    }

    turbo() {
        console.log(this.text);
    }
}

let hello2 = new TurboHello('Hello World but turbo!');
hello2.turbo();