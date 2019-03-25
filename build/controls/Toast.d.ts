import * as React from 'react';
import { IContainer } from './Container';
interface IBlockchainTransactionOptions {
    purpose: string;
    txHash: string;
}
interface IProps extends IContainer {
    type: 'transaction_status_ok' | 'transaction_status_fail';
    blockchainTransactionOptions?: IBlockchainTransactionOptions;
}
export declare class Toast extends React.Component {
    constructor(props: IProps);
    render(): JSX.Element;
    private static getTransactionDesign;
    static show(props: IProps): void;
}
export {};
