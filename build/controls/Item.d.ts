import * as React from 'react';
import { IContainer } from '.';
interface IItem extends IContainer {
    basic?: boolean;
    title?: string;
    description?: string;
    image?: string;
    icon?: any;
}
export declare class Item extends React.Component<IItem, any> {
    render(): JSX.Element;
}
export {};
