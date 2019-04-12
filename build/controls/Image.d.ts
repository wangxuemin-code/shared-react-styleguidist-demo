import * as React from 'react';
import { IContainer } from './Container';
interface IImage extends IContainer {
    badge?: boolean;
    fullWidth?: boolean;
    src?: string;
    alt?: any;
    variant?: 'logo' | 'logo alt';
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
