import * as React from 'react';
import { ErrorType } from '../enums/ErrorType';
interface IProps {
    loading?: boolean;
    error?: ErrorType | string;
}
export declare class MyComponent<P = {}, S = {}> extends React.Component<P & IProps, S> {
    private offsetBase;
    componentWillUnmount(): void;
    protected getAbsolutePositionOfDOMElement(el: HTMLElement): {
        found: boolean | undefined;
        left: number;
        top: number;
        width: number;
        height: number;
        right: number;
        bottom: number;
    };
    protected shouldRender(component: any): any;
}
export {};
