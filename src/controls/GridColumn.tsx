import * as React from 'react';
import * as styles from '../css/main.scss';
import { Container, IContainer } from './Container';

interface IGridColumn extends IContainer {
  col?: number;
}

export class GridColumn extends React.Component<IGridColumn, any> {
  public static defaultProps: IGridColumn = {};
  public render() {
    let classes: string[] = [
      styles.gridColumn,
      this.props.className ? this.props.className : '',
      this.props.col === 1 ? styles.col1 : '',
      this.props.col === 2 ? styles.col2 : '',
      this.props.col === 3 ? styles.col3 : '',
      this.props.col === 4 ? styles.col4 : '',
      this.props.col === 5 ? styles.col5 : '',
      this.props.col === 6 ? styles.col6 : '',
      this.props.col === 7 ? styles.col7 : '',
      this.props.col === 8 ? styles.col8 : '',
      this.props.col === 9 ? styles.col9 : '',
      this.props.col === 10 ? styles.col10 : '',
      this.props.col === 11 ? styles.col11 : '',
      this.props.col === 12 ? styles.col12 : ''
    ];
    classes = classes.filter(function(el) {
      return el != '';
    });
    return <Container {...this.props} className={classes.join(' ')} />;
  }
}
