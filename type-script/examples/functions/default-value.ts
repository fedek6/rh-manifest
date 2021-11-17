export {}
function concat(text1: string, text2: string = "World"): string {
    return `${text1} ${text2}`;
}

console.log(concat('Hello'));
