import * as React from 'react';
import * as styles from '../css/main.scss';
import { Container, IContainer } from '.';

interface IProps extends IContainer {
  header?: any;
  footer?: any;
  listItems?: any;
  height?: number;
}

export class List extends React.Component<IProps, any> {
  public render() {
    let classes: string[] = [this.props.className ? this.props.className : '', styles.list];
    classes = classes.filter(function(el) {
      return el != '';
    });
    return (
      <Container {...this.props} className={classes.join(' ')}>
        <Container className={styles.listHeader}>{this.props.header}</Container>
        <Container
          float={'left'}
          fluid
          className={styles.listContent}
          height={this.props.height}
          padding={{ allRem: 2 }}
          overflow={'auto'}
        >
          {this.props.listItems}
        </Container>
        <Container float={'left'} fluid className={styles.listFooter}>
          {this.props.footer}
        </Container>
      </Container>
    );
  }
}
