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
var _1 = require(".");
var Link = (function (_super) {
    __extends(Link, _super);
    function Link() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Link.prototype.render = function () {
        if (this.props.href) {
            return (React.createElement("a", { href: this.props.href, style: { cursor: 'pointer' } },
                React.createElement(_1.Text, __assign({}, this.props, { display: 'inline-block' }))));
        }
        else if (this.props.onClick) {
            return (React.createElement("a", { onClick: this.props.onClick, style: { cursor: 'pointer' } },
                React.createElement(_1.Text, __assign({}, this.props, { display: 'inline-block' }))));
        }
    };
    return Link;
}(React.Component));
exports.Link = Link;
//# sourceMappingURL=Link.js.map