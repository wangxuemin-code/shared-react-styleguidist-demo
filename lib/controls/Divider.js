"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var __1 = require("..");
var Divider = (function (_super) {
    __extends(Divider, _super);
    function Divider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Divider.prototype.render = function () {
        var style = {};
        if (this.props.direction === 'vertical') {
            style.width = this.props.size;
            style.height = '100%';
        }
        else if (this.props.direction === 'horizontal') {
            style.height = this.props.size;
            style.width = '100%';
        }
        style.background = this.props.color;
        return (React.createElement(__1.Controls.Container, __assign({}, this.props),
            React.createElement("div", { style: style })));
    };
    Divider.defaultProps = {
        direction: 'horizontal',
        size: 1,
        color: '#DCDEDD'
    };
    return Divider;
}(React.Component));
exports.Divider = Divider;
//# sourceMappingURL=Divider.js.map