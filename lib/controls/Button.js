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
var buttonStyles = require("./css/Button.css");
var Container_1 = require("./Container");
var Button = (function (_super) {
    __extends(Button, _super);
    function Button() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Button.prototype.render = function () {
        var classes = [buttonStyles.button, 'btn'];
        if (this.props.buttonStyle === 'one') {
            classes.push(buttonStyles.buttonStyleOne);
        }
        else if (this.props.buttonStyle === 'two') {
            classes.push(buttonStyles.buttonStyleTwo);
        }
        else if (this.props.buttonStyle === 'three') {
            classes.push(buttonStyles.buttonStyleThree);
        }
        else if (this.props.buttonStyle === 'dummy') {
            classes.push(buttonStyles.buttonStyleDummy);
        }
        if (this.props.disabled) {
            classes.push(buttonStyles.buttonStyleDisabled);
        }
        var style = {};
        if (this.props.fontSize && this.props.fontSize > 0) {
            style.fontSize = this.props.fontSize;
        }
        return (React.createElement(Container_1.Container, __assign({}, this.props),
            React.createElement("button", { type: this.props.type, style: style, className: classes.join(' '), onClick: this.props.onPress, disabled: this.props.disabled }, this.props.children)));
    };
    Button.defaultProps = {
        fontSize: 14,
        buttonStyle: 'one',
        type: 'button'
    };
    return Button;
}(React.Component));
exports.Button = Button;
//# sourceMappingURL=Button.js.map