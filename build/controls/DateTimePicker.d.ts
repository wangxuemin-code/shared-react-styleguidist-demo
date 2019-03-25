import * as React from 'react';
import { IContainer } from './Container';
export interface IDateOption {
    endDate?: Date;
    startDate?: Date;
}
interface IProps extends IContainer {
    placeholder?: string;
    value?: number | string;
    onChange?: (newTimestamp: number, newDate: Date) => void;
    options: IDateOption;
}
interface IState {
    selectedUnixTimestamp?: number;
}
export declare class DateTimePicker extends React.Component<IProps, IState> {
    static defaultProps: IProps;
    constructor(props: IProps);
    componentDidUpdate(prevProps: IProps): void;
    render(): JSX.Element;
    private updateStateWithProps;
    private handleChangeRaw;
    private handleChange;
}
export {};
