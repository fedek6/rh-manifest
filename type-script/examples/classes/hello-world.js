"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var hello1 = new HelloWorld('Hello World');
console.log(hello1.text);
hello1.output();
var TurboHello = /** @class */ (function (_super) {
    __extends(TurboHello, _super);
    function TurboHello(turbo) {
        return _super.call(this, turbo) || this;
    }
    TurboHello.prototype.turbo = function () {
        console.log(this.text);
    };
    return TurboHello;
}(HelloWorld));
var hello2 = new TurboHello('Hello World but turbo!');
hello2.turbo();
