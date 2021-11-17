"use strict";
exports.__esModule = true;
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
;
var c = Color.Green;
console.log(c);
var Random;
(function (Random) {
    Random[Random["Kyle"] = 5] = "Kyle";
    Random[Random["Satan"] = 666] = "Satan";
    Random["Mark"] = "aaa";
})(Random || (Random = {}));
;
var n = Random.Satan; // value of 666
console.log(n);
