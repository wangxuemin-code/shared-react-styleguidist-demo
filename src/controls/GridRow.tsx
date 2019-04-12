import * as React from 'react';
import * as styles from '../css/main.scss';
import { Container, IContainer } from './Container';

interface IGridRow extends IContainer {}

export class GridRow extends React.Component<IGridRow, any> {
  public static defaultProps: IGridRow = {};

  public render() {
    let classes: string[] = [styles.gridRow, this.props.className ? this.props.className : ''];
    classes = classes.filter(function(el) {
      return el != '';
    });
    return <Container {...this.props} className={classes.join(' ')} />;
  }
}
