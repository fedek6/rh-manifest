"use strict";
exports.__esModule = true;
function concat(text1, text2) {
    if (text2) {
        return text1 + " " + text2;
    }
    else {
        return text1;
    }
}
console.log(concat('Hello'));
