import * as React from 'react';
import { IContainer } from './Container';
interface IProps extends IContainer {
    icon: any;
    onClick?: () => void;
    text?: string;
}
export declare class Icon extends React.Component<IProps, any> {
    static defaultProps: IProps;
    constructor(props: IProps);
    render(): JSX.Element;
    private getWrapper;
    private getIconDesign;
    private checkIconType;
}
export {};
