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
var __1 = require("..");
var ErrorType_1 = require("../enums/ErrorType");
var MyComponent = (function (_super) {
    __extends(MyComponent, _super);
    function MyComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MyComponent.prototype.componentWillUnmount = function () {
        if (this.offsetBase) {
            document.body.removeChild(this.offsetBase);
        }
    };
    MyComponent.prototype.getAbsolutePositionOfDOMElement = function (el) {
        var found;
        var left = 0;
        var top = 0;
        var width = 0;
        var height = 0;
        var offsetBase = this.offsetBase;
        if (!offsetBase && document.body) {
            offsetBase = this.offsetBase = document.createElement('div');
            offsetBase.style.cssText = 'position:absolute;left:0;top:0';
            document.body.appendChild(offsetBase);
        }
        if (el && el.ownerDocument === document && 'getBoundingClientRect' in el && offsetBase) {
            var boundingRect = el.getBoundingClientRect();
            var baseRect = offsetBase.getBoundingClientRect();
            found = true;
            left = boundingRect.left - baseRect.left;
            top = boundingRect.top - baseRect.top;
            width = boundingRect.right - boundingRect.left;
            height = boundingRect.bottom - boundingRect.top;
        }
        return {
            found: found,
            left: left,
            top: top,
            width: width,
            height: height,
            right: left + width,
            bottom: top + height
        };
    };
    MyComponent.prototype.shouldRender = function (component) {
        if (this.props.loading) {
            return React.createElement(__1.Controls.Loading, { backDrop: false, loading: this.props.loading });
        }
        else if (this.props.error) {
            if (this.props.error === ErrorType_1.ErrorType.Error404 || this.props.error === ErrorType_1.ErrorType.Error500) {
                return (React.createElement(__1.Controls.Container, { position: 'absolute', positionPoints: { top: 0, bottom: 0, left: 0, right: 0 }, verticalAlign: 'center' },
                    React.createElement(__1.Controls.ErrorView, { type: this.props.error === ErrorType_1.ErrorType.Error404 ? '404' : '500' })));
            }
        }
        return component;
    };
    return MyComponent;
}(React.Component));
exports.MyComponent = MyComponent;
//# sourceMappingURL=MyComponent.js.map