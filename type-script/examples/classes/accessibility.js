"use strict";
exports.__esModule = true;
var HelloWorld = /** @class */ (function () {
    function HelloWorld(text) {
        this.text = text;
    }
    HelloWorld.prototype.output = function () {
        console.log(this.text);
    };
    return HelloWorld;
}());
var h = new HelloWorld("Hello World");
// Error:
// console.log(h.text);
h.output();
