/// <reference types="react" />
import { MyComponent } from '.';
interface IState {
    fixed: boolean;
    originalY: number;
    width: number;
    height: number;
}
interface IProps {
    children?: any;
    offsetY: number;
}
export declare class Sticky extends MyComponent<IProps, IState> {
    static defaultProps: IProps;
    readonly state: IState;
    private container;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    private onResize;
    private onScroll;
}
export {};
