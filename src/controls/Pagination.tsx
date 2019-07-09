import * as React from 'react';
import { Container } from './Container';
import * as styles from '../css/main.scss';
import { Pagination as ReactPagination } from 'antd';

interface IProps {
  current: number;
  total: number;
}

export class Pagination extends React.Component<IProps> {
  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    return (
      <Container className={styles.istoxPagination}>
        <ReactPagination current={this.props.current} total={this.props.total} />
      </Container>
    );
  }
}
