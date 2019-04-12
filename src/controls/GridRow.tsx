import * as React from 'react';
import * as styles from '../css/main.scss';
import { Container, IContainer } from './Container';

interface IGridRow extends IContainer {
  fitted?: boolean;
  equalWidth?: boolean;
}

export class GridRow extends React.Component<IGridRow, any> {
  public static defaultProps: IGridRow = {};

  public render() {
    let classes: string[] = [
      styles.gridRow,
      this.props.className ? this.props.className : '',
      this.props.equalWidth ? styles.equalWidth : '',
      this.props.fitted ? styles.fitted : ''
    ];
    classes = classes.filter(function(el) {
      return el != '';
    });
    return <Container {...this.props} className={classes.join(' ')} />;
  }
}
