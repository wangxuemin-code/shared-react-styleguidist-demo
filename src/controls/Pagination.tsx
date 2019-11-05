import * as React from 'react';
import { Container } from './Container';
import * as styles from '../css/main.scss';
import ReactPagination from 'antd/es/pagination';

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
        <ReactPagination onChange={this.onChange} current={this.props.current} total={this.props.total} />
      </Container>
    );
  }

  private onChange = () => {
    return false;
  };
}
