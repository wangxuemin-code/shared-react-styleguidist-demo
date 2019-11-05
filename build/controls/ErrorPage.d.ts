/// <reference types="react" />
import { IContainer } from '.';
import { MyComponent } from './MyComponent';
interface IProps extends IContainer {
    type: '404' | '500';
    message?: string;
}
export declare class ErrorPage extends MyComponent<IProps, any> {
    render(): JSX.Element;
}
export {};
