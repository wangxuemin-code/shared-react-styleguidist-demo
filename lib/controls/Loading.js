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
var react_spinners_1 = require("react-spinners");
var loadingStyles = require("./css/Loading.css");
var Loading = (function (_super) {
    __extends(Loading, _super);
    function Loading() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Loading.prototype.render = function () {
        var style = {};
        if (!this.props.loading) {
            return null;
        }
        if (this.props.backDrop) {
            style.backgroundColor = 'rgba(0, 0, 0, 0.35)';
        }
        return (React.createElement("div", { className: loadingStyles.loadingContainer, style: style },
            React.createElement(react_spinners_1.BounceLoader, { sizeUnit: 'px', size: 30, color: '#1e998c', loading: this.props.loading })));
    };
    Loading.defaultProps = {
        backDrop: true
    };
    return Loading;
}(React.Component));
exports.Loading = Loading;
//# sourceMappingURL=Loading.js.map