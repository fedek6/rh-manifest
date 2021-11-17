export {}
function concat(text1: string, text2?: string): string {
    if (text2) {
        return `${text1} ${text2}`;
    } else {
        return text1;
    }

}

console.log(concat('Hello'));
