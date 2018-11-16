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
var MyComponent_1 = require("./MyComponent");
var Sticky = (function (_super) {
    __extends(Sticky, _super);
    function Sticky(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            fixed: false,
            originalY: -1,
            width: -1,
            height: -1,
        };
        _this.container = React.createRef();
        _this.onResize = _this.onResize.bind(_this);
        _this.onScroll = _this.onScroll.bind(_this);
        return _this;
    }
    Sticky.prototype.componentDidMount = function () {
        window.addEventListener('resize', this.onResize);
        window.addEventListener('scroll', this.onScroll);
    };
    Sticky.prototype.componentWillUnmount = function () {
        window.removeEventListener('resize', this.onResize);
        window.removeEventListener('scroll', this.onScroll);
    };
    Sticky.prototype.render = function () {
        var style = {};
        style.position = this.state.fixed ? 'fixed' : 'static';
        style.top = this.props.offsetY;
        if (this.state.fixed) {
            style.width = this.state.width;
        }
        return (React.createElement("div", { style: { height: this.state.height } },
            React.createElement("div", { style: style, ref: this.container }, this.props.children)));
    };
    Sticky.prototype.onResize = function () {
        var _this = this;
        this.setState({ originalY: -1, fixed: false }, function () {
            _this.onScroll();
        });
    };
    Sticky.prototype.onScroll = function () {
        var div = this.container.current;
        if (div) {
            if (this.state.originalY < 0) {
                this.setState({ originalY: this.getAbsolutePositionOfDOMElement(div).top });
            }
            if (!this.state.fixed) {
                this.setState({ fixed: (div.getBoundingClientRect().top - this.props.offsetY < 0),
                    width: div.getBoundingClientRect().width,
                    height: div.getBoundingClientRect().height });
            }
            else {
                if (window.scrollY + this.props.offsetY < this.state.originalY) {
                    this.setState({ fixed: false });
                }
            }
        }
    };
    Sticky.defaultProps = {
        offsetY: 0,
    };
    return Sticky;
}(MyComponent_1.MyComponent));
exports.Sticky = Sticky;
//# sourceMappingURL=Sticky.js.map