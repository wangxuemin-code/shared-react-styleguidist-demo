import * as React from 'react';
interface IProps {
    loading?: boolean;
    error?: any;
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
    protected shouldRender(component: any, loading?: boolean, error?: any): any;
}
export {};
