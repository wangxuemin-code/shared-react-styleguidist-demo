import * as React from 'react';
import { IContainer } from './Container';
interface IProps extends IContainer {
  children: any;
}
export declare class Item extends React.Component<IProps, any> {
  render(): JSX.Element;
}
export {};
