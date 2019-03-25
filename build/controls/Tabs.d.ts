import * as React from 'react';
import { IContainer } from './Container';
interface ITab {
    title: string;
    contents?: any;
}
interface IProps extends IContainer {
    defaultSelectedIndex?: number;
    tabs: ITab[];
}
interface IState {
    selectedIndex: number;
}
export declare class Tabs extends React.Component<IProps, IState> {
    static defaultProps: {
        defaultSelectedIndex: number;
    };
    constructor(props: IProps);
    render(): JSX.Element;
}
export {};
