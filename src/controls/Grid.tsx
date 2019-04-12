import * as React from 'react';
import * as styles from '../css/main.scss';
import { Container, IContainer } from './Container';
import { GridColumn } from './GridColumn';
import { GridRow } from './GridRow';

interface IGrid extends IContainer {}

export class Grid extends React.Component<IGrid, any> {
  public static defaultProps: IGrid = {};
  static Row = GridRow;
  static Col = GridColumn;

  public render() {
    let classes: string[] = [styles.grid, this.props.className ? this.props.className : ''];
    return <Container {...this.props} className={classes.join(' ')} />;
  }
}
