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
var typescript_map_1 = require("typescript-map");
var react_bootstrap_1 = require("react-bootstrap");
var _1 = require(".");
var Button_1 = require("./Button");
var Form = (function (_super) {
    __extends(Form, _super);
    function Form() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inputs = new typescript_map_1.TSMap();
        return _this;
    }
    Form.prototype.render = function () {
        var _this = this;
        var labelWidth = this.props.labelWidth;
        return (React.createElement(_1.Container, __assign({}, this.props),
            React.createElement(react_bootstrap_1.Form, { horizontal: true, onSubmit: this.props.onSubmit },
                this.props.formItems.map(function (formItem, i) {
                    _this.initiateFormItemUndefinedProps(formItem);
                    return (React.createElement(react_bootstrap_1.FormGroup, { key: i },
                        React.createElement(react_bootstrap_1.Col, { sm: labelWidth },
                            React.createElement(_1.Text, { fontWeight: 'bold', lineHeight: 33, fontSize: 12 }, formItem.title)),
                        React.createElement(react_bootstrap_1.Col, { sm: formItem.inputWidth && formItem.inputWidth > 0
                                ? formItem.inputWidth
                                : 12 - labelWidth },
                            formItem.type === 'label' && (React.createElement(_1.Text, { lineHeight: 32, fontSize: 12 }, formItem.value)),
                            formItem.type === 'number' && (React.createElement("span", null,
                                React.createElement(_1.Input, { type: 'number', name: formItem.name ? formItem.name : '', placeholder: formItem.placeholder, defaultValue: formItem.value, disabled: formItem.disabled, ref: function (ref) {
                                        if (formItem.name) {
                                            _this.inputs.set(formItem.name, ref);
                                        }
                                    }, append: formItem.inputAppend, onInputChanged: formItem.onChanged }))),
                            formItem.type === 'money' && (React.createElement("span", null,
                                React.createElement(_1.Input, { type: 'money', name: formItem.name ? formItem.name : '', placeholder: formItem.placeholder, defaultValue: formItem.value, disabled: formItem.disabled, ref: function (ref) {
                                        if (formItem.name) {
                                            _this.inputs.set(formItem.name, ref);
                                        }
                                    }, append: formItem.inputAppend, onInputChanged: formItem.onChanged }))),
                            formItem.type === 'submit' && (React.createElement(Button_1.Button, { floatRight: true, buttonStyle: 'two', type: 'submit' }, formItem.value)),
                            formItem.hint && (React.createElement(_1.Text, { fontSize: 11, color: '#9a9a9a' }, formItem.hint)))));
                }),
                this.props.children)));
    };
    Form.prototype.getInputValue = function (name) {
        return this.inputs.get(name).getValue();
    };
    Form.prototype.initiateFormItemUndefinedProps = function (formItem) {
        if (!formItem.type) {
            formItem.type = 'text';
        }
    };
    Form.defaultProps = {
        formItems: [],
        labelWidth: 2
    };
    return Form;
}(React.Component));
exports.Form = Form;
//# sourceMappingURL=Form.js.map