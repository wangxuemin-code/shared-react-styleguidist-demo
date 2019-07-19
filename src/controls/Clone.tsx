import * as React from 'react';
import * as styles from '../css/main.scss';
import { Container, IContainer } from './Container';

interface IProps extends IContainer {
  value?: any[];
  oldValue?: any[];
  defaultCount?: number;
}

interface IState {
  show: boolean;
}

export class Clone extends React.Component<IProps, IState> {
  public static defaultProps = {
    defaultCount: 1
  };

  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    return <>{this.props.children}</>;
  }
}
