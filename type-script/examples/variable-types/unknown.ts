export {}
let myVar: unknown = "Lorem ipsum";
let nothing: undefined = undefined;

console.log((myVar as string).toUpperCase());

function hasName(obj: any): obj is { name: string } {
    return !!obj 
        && typeof obj === "object" &&
        "name" in obj;
}

if (hasName(myVar)) {
    console.log(myVar.name);
}

// True
console.log(!!myVar);

// False
console.log(!!nothing);