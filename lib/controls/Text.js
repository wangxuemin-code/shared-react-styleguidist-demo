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
var styles = require("../css/Global.css");
var textStyles = require("./css/Text.css");
var Container_1 = require("./Container");
var Text = (function (_super) {
    __extends(Text, _super);
    function Text() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Text.prototype.render = function () {
        var classes = [textStyles.text];
        if (this.props.textVerticalAlign) {
            if (this.props.textVerticalAlign === 'sub') {
                classes.push(styles.verticalAlignSub);
            }
            else if (this.props.textVerticalAlign === 'middle') {
                classes.push(styles.verticalAlignMiddle);
            }
        }
        if (this.props.fontWeight) {
            if (this.props.fontWeight === 'normal') {
                classes.push(styles.normalText);
            }
            if (this.props.fontWeight === 'bold') {
                classes.push(styles.bold);
            }
            if (this.props.fontWeight === 'light-bold') {
                classes.push(styles.lightBold);
            }
        }
        if (this.props.italic) {
            classes.push(styles.italic);
        }
        var style = {};
        if (this.props.color) {
            style.color = this.props.color;
        }
        if (this.props.fontSize) {
            style.fontSize = this.props.fontSize;
        }
        if (this.props.letterSpacing) {
            style.letterSpacing = this.props.letterSpacing;
        }
        return (React.createElement(Container_1.Container, __assign({}, this.props),
            React.createElement("span", { style: style, className: classes.join(' ') }, this.props.children)));
    };
    Text.defaultProps = {
        letterSpacing: 0,
        fontWeight: 'normal'
    };
    return Text;
}(React.Component));
exports.Text = Text;
//# sourceMappingURL=Text.js.map