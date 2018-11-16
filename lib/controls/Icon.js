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
var react_bootstrap_1 = require("react-bootstrap");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var _1 = require(".");
var Text_1 = require("./Text");
var Icon = (function (_super) {
    __extends(Icon, _super);
    function Icon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Icon.prototype.render = function () {
        return this.getWrapper();
    };
    Icon.prototype.getWrapper = function () {
        if (this.props.onClick) {
            return (React.createElement(_1.Button, __assign({}, this.props, { onPress: this.props.onClick, buttonStyle: 'dummy', display: 'inline-block', fontSize: this.props.fontSize }), this.getIconDesign()));
        }
        else {
            return (React.createElement(Text_1.Text, __assign({}, this.props, { display: 'inline-block', fontSize: this.props.fontSize }), this.getIconDesign()));
        }
    };
    Icon.prototype.getIconDesign = function () {
        var style = {};
        if (this.props.color) {
            style.color = this.props.color;
        }
        if (this.props.iconType === 'glyphicon') {
            return React.createElement(react_bootstrap_1.Glyphicon, { style: style, glyph: "" + this.props.icon });
        }
        else if (this.props.iconType === 'fontawesome') {
            return React.createElement(react_fontawesome_1.FontAwesomeIcon, { style: style, icon: this.props.icon });
        }
    };
    Icon.defaultProps = {
        iconType: 'fontawesome',
        icon: '',
        fontSize: -1
    };
    return Icon;
}(React.Component));
exports.Icon = Icon;
//# sourceMappingURL=Icon.js.map