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
var messageStyles = require("./css/Message.css");
var Container_1 = require("./Container");
var react_bootstrap_1 = require("react-bootstrap");
var _1 = require(".");
var Message = (function (_super) {
    __extends(Message, _super);
    function Message() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message.prototype.render = function () {
        var _this = this;
        if (!this.props.danger && !this.props.success && !this.props.info) {
            return null;
        }
        if (Array.isArray(this.props.danger) && this.arrayNotEmpty(this.props.danger)) {
            return this.props.danger.map(function (message) { return _this.getMessage('danger', message); });
        }
        else if (Array.isArray(this.props.success) && this.arrayNotEmpty(this.props.success)) {
            return this.props.success.map(function (message) { return _this.getMessage('success', message); });
        }
        else if (Array.isArray(this.props.info) && this.arrayNotEmpty(this.props.info)) {
            return this.props.info.map(function (message) { return _this.getMessage('info', message); });
        }
        return (React.createElement("div", null,
            this.props.success && this.getMessage('success', this.props.success),
            this.props.danger && this.getMessage('danger', this.props.danger),
            this.props.info && this.getMessage('info', this.props.info)));
    };
    Message.prototype.arrayNotEmpty = function (messages) {
        for (var i in messages) {
            if (messages[i] && 0 !== messages[i].length) {
                return true;
            }
        }
        return false;
    };
    Message.prototype.getMessage = function (type, message) {
        if (!message || 0 === message.length || Array.isArray(message)) {
            return null;
        }
        var icon;
        switch (type) {
            case 'success':
                icon = 'ok-sign';
                break;
            case 'danger':
                icon = 'info-sign';
                break;
            case 'info':
                icon = 'info-sign';
                break;
        }
        return (React.createElement(Container_1.Container, __assign({}, this.props),
            React.createElement(react_bootstrap_1.Alert, { className: messageStyles.message, bsStyle: type },
                React.createElement(_1.Icon, { iconType: 'glyphicon', icon: icon, margin: { right: 10 } }),
                message)));
    };
    return Message;
}(React.Component));
exports.Message = Message;
//# sourceMappingURL=Message.js.map