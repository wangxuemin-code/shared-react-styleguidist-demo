import * as React from 'react';
import { Container } from './Container';
import * as styles from '../css/main.scss';
import ReactPagination from 'antd/es/pagination';
import ReactIcon from 'antd/es/icon';

interface IProps {
  outline?: boolean;
  defaultCurrent?: number;
  total: number;
  showLessItems?: boolean;
  defaultPageSize?: number;
  pageSizeOptions?: Array<string>;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  onShowSizeChange?: (current: number, pageSize: number) => void;
  onChange?: (page: number, pageSize: number) => void;
  prevButtonText?: string;
  nextButtonText?: string;
}

const leftArrow: any = () => (
  <svg fill='currentColor' width='1em' height='1em' viewBox='0 0 256 512'>
    <path d='M231.293 473.899l19.799-19.799c4.686-4.686 4.686-12.284 0-16.971L70.393 256 251.092 74.87c4.686-4.686 4.686-12.284 0-16.971L231.293 38.1c-4.686-4.686-12.284-4.686-16.971 0L4.908 247.515c-4.686 4.686-4.686 12.284 0 16.971L214.322 473.9c4.687 4.686 12.285 4.686 16.971-.001z' />
  </svg>
);

const rightArrow: any = () => (
  <svg fill='currentColor' width='1em' height='1em' viewBox='0 0 256 512'>
    <path d='M24.707 38.101L4.908 57.899c-4.686 4.686-4.686 12.284 0 16.971L185.607 256 4.908 437.13c-4.686 4.686-4.686 12.284 0 16.971L24.707 473.9c4.686 4.686 12.284 4.686 16.971 0l209.414-209.414c4.686-4.686 4.686-12.284 0-16.971L41.678 38.101c-4.687-4.687-12.285-4.687-16.971 0z' />
  </svg>
);

export class Pagination extends React.Component<IProps> {
  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    let classes: string[] = [styles.pagination, this.props.outline ? styles.outline : ''];

    classes = classes.filter(function(el) {
      return el != '';
    });

    return (
      <Container className={classes.join(' ')}>
        <ReactPagination
          showSizeChanger={this.props.showSizeChanger !== undefined ? this.props.showSizeChanger : true}
          onShowSizeChange={this.props.onShowSizeChange}
          defaultCurrent={this.props.defaultCurrent || 1}
          total={this.props.total}
          showLessItems={this.props.showLessItems !== undefined ? this.props.showLessItems : false}
          defaultPageSize={this.props.defaultPageSize || 10}
          pageSizeOptions={this.props.pageSizeOptions || ['10', '25', '50', '100']}
          onChange={this.props.onChange}
          showQuickJumper={this.props.showQuickJumper !== undefined ? this.props.showQuickJumper : true}
          itemRender={this.itemRender}
        />
      </Container>
    );
  }

  private itemRender = (current: any, type: string, originalElement: any) => {
    if (type === 'prev') {
      return (
        <a>
          {this.props.prevButtonText !== undefined ? this.props.prevButtonText : <ReactIcon component={leftArrow} />}{' '}
        </a>
      );
    }
    if (type === 'next') {
      return (
        <a>
          {this.props.nextButtonText !== undefined ? this.props.nextButtonText : <ReactIcon component={rightArrow} />}{' '}
        </a>
      );
    }
    return originalElement;
  };
}
