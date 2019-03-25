import * as React from 'react';
interface IState {
    visible: boolean;
}
interface IProps {
    children?: any;
    visible: boolean;
    onModalHide?: () => void;
    onExited?: () => void;
    className?: string;
}
export declare class Modal extends React.Component<IProps, IState> {
    constructor(props: IProps);
    componentWillReceiveProps(nextProps: IProps): void;
    render(): JSX.Element;
    private onModalHide;
}
export {};
