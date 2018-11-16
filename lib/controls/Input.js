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
var inputStyles = require("./css/Input.css");
var Container_1 = require("./Container");
var react_bootstrap_1 = require("react-bootstrap");
var Formatter_1 = require("../helpers/Formatter");
var Input = (function (_super) {
    __extends(Input, _super);
    function Input(props) {
        var _this = _super.call(this, props) || this;
        _this.onChange = _this.onChange.bind(_this);
        _this.defaultValueChanged(true);
        return _this;
    }
    Input.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.defaultValue !== this.props.defaultValue) {
            this.defaultValueChanged(false);
        }
    };
    Input.prototype.render = function () {
        return (React.createElement(Container_1.Container, __assign({}, this.props, { position: 'relative' }),
            React.createElement(react_bootstrap_1.FormControl, { className: inputStyles.input, type: 'text', placeholder: this.props.placeholder, value: this.state.displayValue, onChange: this.onChange, disabled: this.props.disabled }),
            this.getInputAppendDesign(this.props.append),
            React.createElement("input", { type: 'hidden', name: this.props.name, value: this.state.value })));
    };
    Input.prototype.getValue = function () {
        if (!this.state.value) {
            return '';
        }
        else {
            if (typeof this.state.value === 'number') {
                return String(this.state.value);
            }
            else {
                return this.state.value;
            }
        }
    };
    Input.prototype.onChange = function (event) {
        var value = event.target.value;
        var result = this.processValue(value);
        this.setState({ displayValue: result.displayValue, value: result.value });
        if (this.props.onInputChanged) {
            this.props.onInputChanged(result.value);
        }
    };
    Input.prototype.processValue = function (value) {
        if (this.props.type === 'text') {
            return { displayValue: value, value: value };
        }
        else {
            var originalValue = Formatter_1.default.stripSymbol(value);
            if (originalValue) {
                if (this.props.type === 'money') {
                    return {
                        displayValue: Formatter_1.default.money(parseInt(originalValue, 10)),
                        value: originalValue
                    };
                }
                else if (this.props.type === 'number') {
                    return {
                        displayValue: Formatter_1.default.number(parseInt(originalValue, 10)),
                        value: originalValue
                    };
                }
            }
        }
        return { displayValue: '', value: '' };
    };
    Input.prototype.defaultValueChanged = function (firstCall) {
        var result = { displayValue: '', value: '' };
        if (this.props.defaultValue) {
            result = this.processValue(String(this.props.defaultValue));
        }
        if (firstCall) {
            this.state = { displayValue: result.displayValue, value: result.value };
        }
        else {
            this.setState({ displayValue: result.displayValue, value: result.value });
        }
    };
    Input.prototype.getInputAppendDesign = function (append) {
        if (!append) {
            return null;
        }
        return React.createElement(Container_1.Container, { className: inputStyles.inputAppend }, append);
    };
    return Input;
}(React.Component));
exports.Input = Input;
//# sourceMappingURL=Input.js.map