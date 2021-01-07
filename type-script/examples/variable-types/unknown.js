"use strict";
exports.__esModule = true;
var myVar = "Lorem ipsum";
var nothing = undefined;
console.log(myVar.toUpperCase());
function hasName(obj) {
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
