import { Message } from 'paho-mqtt';
import * as React from 'react';
import { IFilterTypes, Mqtt } from '../helpers';
import { RabbitMQMessage } from '../models/RabbitMQMessage';
interface IProps {
    mqttClient: Mqtt;
    waitOptions: {
        queueName: string;
        topicName?: string;
        filter?: IFilterTypes;
    };
    onSucess?: (rabbitMqMessage: RabbitMQMessage, message: Message) => void;
    onError?: (error: string, rabbitMqMessage: RabbitMQMessage, message: Message) => void;
}
interface IState {
    hiding: boolean;
    showing: boolean;
    succeed: boolean;
    completed: boolean;
    txId?: string;
}
export declare class BlockchainTransaction extends React.Component<IProps, IState> {
    private timeout;
    constructor(props: IProps);
    componentWillMount(): void;
    componentDidUpdate(_: IProps, prevState: IState): void;
    componentDidMount(): void;
    render(): JSX.Element;
    private onMouseEnter;
    private onMouseLeave;
    private startExitCountdown;
    private cancelExitCountdown;
    private startExit;
    private onExited;
    private static createElementReconfirm;
    static show(props: IProps): void;
}
export {};
