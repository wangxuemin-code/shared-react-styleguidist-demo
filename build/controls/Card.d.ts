import * as React from 'react';
import { IContainer } from './Container';
interface IProps extends IContainer {
    title?: string;
    image?: string;
    icon?: any;
    leftIcon?: any;
    rightIcon?: any;
    className?: string;
}
export declare class Card extends React.Component<IProps, any> {
    render(): JSX.Element;
}
export {};
