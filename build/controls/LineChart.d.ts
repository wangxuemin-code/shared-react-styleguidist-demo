import React = require('react');
import { IContainer } from '.';
interface ILineChart extends IContainer {
    title?: string;
    subTitle?: string;
    yTitle?: string;
    xTitle?: string;
    series: {
        name?: string;
        data: number[];
    }[];
    xLabels: string[];
    colors?: string[];
}
export declare class LineChart extends React.Component<ILineChart, any> {
    static defaultProps: {
        colors: string[];
    };
    componentDidMount(): void;
    render(): JSX.Element;
}
export {};
