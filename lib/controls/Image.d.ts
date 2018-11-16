import * as React from 'react';
import { IContainer } from './Container';
interface IImage extends IContainer {
    fullWidth?: boolean;
    src: string;
    width?: number;
    height?: number;
}
export declare class Image extends React.Component<IImage, any> {
    render(): JSX.Element;
}
export {};
