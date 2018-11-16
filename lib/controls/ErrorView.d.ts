/// <reference types="react" />
import { MyComponent } from './MyComponent';
import { IContainer } from './Container';
interface IProps extends IContainer {
    title?: string;
    content?: string;
    icon?: any;
    type?: '404' | '500' | 'no_results' | 'others';
}
export declare class ErrorView extends MyComponent<IProps, any> {
    static defaultProps: IProps;
    render(): JSX.Element;
}
export {};
