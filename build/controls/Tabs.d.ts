import * as React from 'react';
import { IContainer } from './Container';
interface ITab {
    title: any;
    contents?: any;
    className?: string;
    icon?: string;
    active?: boolean;
}
interface IProps extends IContainer {
    defaultSelectedIndex?: number;
    tabs: ITab[];
    orientation?: 'vertical' | 'horizontal';
    align?: 'left' | 'middle' | 'right';
    basic?: boolean;
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
