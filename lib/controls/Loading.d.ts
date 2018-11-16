import * as React from 'react';
interface IProps {
    loading?: boolean;
    backDrop?: boolean;
}
export declare class Loading extends React.Component<IProps, any> {
    static defaultProps: IProps;
    render(): JSX.Element | null;
}
export {};
