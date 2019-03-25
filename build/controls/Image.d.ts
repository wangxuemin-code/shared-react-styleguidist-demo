import * as React from 'react';
import { IContainer } from './Container';
interface IImage extends IContainer {
    fullWidth?: boolean;
    src: string;
    alt?: any;
}
interface IState {
    showAlt: boolean;
}
export declare class Image extends React.Component<IImage, IState> {
    constructor(props: IImage);
    render(): JSX.Element;
    onError(): void;
}
export {};
