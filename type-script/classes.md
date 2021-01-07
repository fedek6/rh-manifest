# Classes

`TypeScript` is more object-oriented than plain `JavasCript`. 

## Class declaration

This is similar to `C#` and `Java`:

```ts
class HelloWorld {
    text: string;

    constructor(text: string) {
        this.text = text;
    }

    output() {
        console.log(this.text);
    }
}
```

You can also extend classes OOP way:

```ts
class TurboHello extends HelloWorld {
    constructor(turbo: string) {
        super(turbo);
    }

    turbo() {
        console.log(this.text);
    }
}
```

__Notice:__ You need to call the `super` method to call the parent's constructor.

## Accessibility modifiers

By default each class member is public. This works like in any other language:

```ts
class HelloWorld {
    private text: string;

    constructor(text: string) {
        this.text = text;
    }

    output() {
        console.log(this.text);
    }
}
```