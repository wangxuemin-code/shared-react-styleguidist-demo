/// <reference types="react" />
import { MyComponent } from './MyComponent';
import { IContainer } from './Container';
interface IProps extends IContainer {
    type: '404' | '500';
    message?: string;
}
export declare class ErrorPage extends MyComponent<IProps, any> {
    render(): JSX.Element;
}
export {};
