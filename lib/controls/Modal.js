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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var styles = require("./css/Modal.css");
var _1 = require(".");
var Modal = (function (_super) {
    __extends(Modal, _super);
    function Modal(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { visible: false };
        _this.onModalHide = _this.onModalHide.bind(_this);
        return _this;
    }
    Modal.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.visible !== this.state.visible) {
            this.setState({ visible: nextProps.visible });
        }
    };
    Modal.prototype.render = function () {
        return (React.createElement(react_bootstrap_1.Modal, { show: this.state.visible && this.props.visible, onHide: this.onModalHide, className: styles.myModal },
            React.createElement(_1.Icon, { iconType: 'glyphicon', icon: 'remove', className: styles.closeButton, onClick: this.onModalHide, fontSize: 20 }),
            React.createElement(react_bootstrap_1.Modal.Body, { className: styles.myModalBody }, this.props.children)));
    };
    Modal.prototype.onModalHide = function () {
        this.setState({ visible: false });
    };
    return Modal;
}(React.Component));
exports.Modal = Modal;
//# sourceMappingURL=Modal.js.map