import * as React from 'react';
import { Container } from './Container';
import * as styles from '../css/main.scss';
import ReactPagination from 'antd/es/pagination';
import ReactIcon from '@ant-design/icons';

interface IProps {
  outline?: boolean;
  defaultCurrent?: number;
  total: number;
  showLessItems?: boolean;
  defaultPageSize?: number;
  pageSizeOptions?: Array<string>;
  showSizeChanger?: boolean;
  showQuickJumper?: any;
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

const horizontalRule: any = () => (
  <svg fill='currentColor' width='1em' height='1em' viewBox='0 0 640 512'>
    <path d='M640 247.5v17a16 16 0 0 1-16 16H16a16 16 0 0 1-16-16v-17a16 16 0 0 1 16-16h608a16 16 0 0 1 16 16z' />
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
          showQuickJumper={
            this.props.showQuickJumper !== undefined ? this.props.showQuickJumper : { goButton: 'Go to page' }
          }
          itemRender={this.itemRender}
        />
      </Container>
    );
  }

  private itemRender = (current: any, type: string, originalElement: any) => {
    if (type === 'jump-prev') {
      return (
        <a className='ant-pagination-item-link'>
          <div className='ant-pagination-item-container'>
            <i aria-label='icon: double-left' className='anticon anticon-double-left ant-pagination-item-link-icon'>
              <svg
                viewBox='64 64 896 896'
                focusable='false'
                className=''
                data-icon='double-left'
                width='1em'
                height='1em'
                fill='currentColor'
                aria-hidden='true'
              >
                <path d='M272.9 512l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L186.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H532c6.7 0 10.4-7.7 6.3-12.9L272.9 512zm304 0l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L490.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H836c6.7 0 10.4-7.7 6.3-12.9L576.9 512z'></path>
              </svg>
            </i>
            <span className='ant-pagination-item-ellipsis'>
              <ReactIcon component={horizontalRule} />
            </span>
          </div>
        </a>
      );
    }
    if (type === 'jump-next') {
      return (
        <a className='ant-pagination-item-link'>
          <div className='ant-pagination-item-container'>
            <i aria-label='icon: double-right' className='anticon anticon-double-right ant-pagination-item-link-icon'>
              <svg
                viewBox='64 64 896 896'
                focusable='false'
                className=''
                data-icon='double-right'
                width='1em'
                height='1em'
                fill='currentColor'
                aria-hidden='true'
              >
                <path d='M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1A7.98 7.98 0 0 0 188 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5zm304 0L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1A7.98 7.98 0 0 0 492 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z'></path>
              </svg>
            </i>
            <span className='ant-pagination-item-ellipsis'>
              <ReactIcon component={horizontalRule} />
            </span>
          </div>
        </a>
      );
    }
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
