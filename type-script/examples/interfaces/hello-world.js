"use strict";
exports.__esModule = true;
// Without interface
function fullName(person) {
    console.log(person.firstName + " " + person.lastName);
}
var p = {
    firstName: "Hello",
    lastName: "World"
};
fullName(p);
// Without interface
function fullName2(person) {
    console.log(person.firstName + " " + person.lastName);
}
fullName2(p);
