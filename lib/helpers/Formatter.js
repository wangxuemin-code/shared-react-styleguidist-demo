"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var Formatter = (function () {
    function Formatter() {
    }
    Formatter.money = function (input) {
        if (!input) {
            input = 0;
        }
        if (typeof input === 'string') {
            input = parseFloat(input);
        }
        return "$" + input.toLocaleString();
    };
    Formatter.number = function (input) {
        if (!input) {
            input = 0;
        }
        if (typeof input === 'string') {
            input = parseFloat(input);
        }
        return "" + input.toLocaleString();
    };
    Formatter.stripSymbol = function (input) {
        return input.replace('$', '').replace(/,/g, '');
    };
    Formatter.datetime = function (input) {
        return moment(input).format('DD MMMM YYYY hh:mm A');
    };
    Formatter.date = function (input) {
        return moment(input).format('DD MMM');
    };
    Formatter.time = function (input) {
        return moment(input).format('hh:mm A');
    };
    Formatter.datetimeToDate = function (input) {
        return moment(input).toDate();
    };
    Formatter.pluralize = function (input, unit) {
        if (input <= 1) {
            return input + ' ' + unit;
        }
        else {
            return input + ' ' + unit + 's';
        }
    };
    return Formatter;
}());
exports.default = Formatter;
//# sourceMappingURL=Formatter.js.map