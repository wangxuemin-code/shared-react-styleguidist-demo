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
var MyComponent_1 = require("./MyComponent");
var Container_1 = require("./Container");
var react_bootstrap_1 = require("react-bootstrap");
var Text_1 = require("./Text");
var Icon_1 = require("./Icon");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var ErrorView = (function (_super) {
    __extends(ErrorView, _super);
    function ErrorView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErrorView.prototype.render = function () {
        var icon = this.props.icon;
        var content = this.props.content;
        var title = this.props.title;
        if (this.props.type === '404') {
            icon = free_solid_svg_icons_1.faFileAlt;
            title = '404 not found';
            content = 'Nothing here...';
        }
        else if (this.props.type === '500') {
            icon = free_solid_svg_icons_1.faExclamationCircle;
            title = 'Whoops!';
            content = 'Something unfortunate happened...';
        }
        else if (this.props.type === 'no_results') {
            icon = free_solid_svg_icons_1.faSearchMinus;
            title = 'No results found';
            content = 'Nothing here...';
        }
        return (React.createElement(Container_1.Container, __assign({}, this.props, { widthPercent: 100, textAlign: 'center' }),
            React.createElement(react_bootstrap_1.Row, null,
                React.createElement(react_bootstrap_1.Col, { sm: 12 },
                    React.createElement(Icon_1.Icon, { fontSize: 200, icon: icon, color: '#858585' }),
                    React.createElement(Text_1.Text, { color: '#9e9e9e', fontSize: 40 }, title),
                    React.createElement(Text_1.Text, { color: '#9e9e9e', fontSize: 20, margin: { top: 10 } }, content)))));
    };
    ErrorView.defaultProps = {
        title: '',
        content: '',
        icon: free_solid_svg_icons_1.faSearchMinus,
        type: 'others'
    };
    return ErrorView;
}(MyComponent_1.MyComponent));
exports.ErrorView = ErrorView;
//# sourceMappingURL=ErrorView.js.map