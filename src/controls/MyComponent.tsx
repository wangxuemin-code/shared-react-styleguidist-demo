import * as React from 'react';
import { Loading } from '.';
import { ErrorPage } from './ErrorPage';
import { ErrorHandle } from '../helpers';

interface IProps {
  loading?: boolean;
  error?: any;
}

export class MyComponent<P = {}, S = {}> extends React.Component<P & IProps, S> {
  private offsetBase: any;

  public componentWillUnmount() {
    if (this.offsetBase) {
      document.body.removeChild(this.offsetBase);
    }
  }

  protected getAbsolutePositionOfDOMElement(el: HTMLElement) {
    let found;
    let left = 0;
    let top = 0;
    let width = 0;
    let height = 0;
    let offsetBase = this.offsetBase;
    if (!offsetBase && document.body) {
      offsetBase = this.offsetBase = document.createElement('div');
      offsetBase.style.cssText = 'position:absolute;left:0;top:0';
      document.body.appendChild(offsetBase);
    }
    if (el && el.ownerDocument === document && 'getBoundingClientRect' in el && offsetBase) {
      const boundingRect = el.getBoundingClientRect();
      const baseRect = offsetBase.getBoundingClientRect();
      found = true;
      left = boundingRect.left - baseRect.left;
      top = boundingRect.top - baseRect.top;
      width = boundingRect.right - boundingRect.left;
      height = boundingRect.bottom - boundingRect.top;
    }
    return {
      found,
      left,
      top,
      width,
      height,
      right: left + width,
      bottom: top + height
    };
  }

  protected shouldRender(component: any, loading?: boolean, error?: any, data?: any): any {
    const dataHasProperty = data && Object.keys(data).length > 0;

    if ((this.props.loading || loading) && !dataHasProperty) {
      return <Loading backDrop={false} loading={true} />;
    } else if (this.props.error || error) {
      return <ErrorPage type={'500'} message={ErrorHandle.formatError(error).message} />;
    }

    if (typeof component === 'function') {
      return component();
    } else {
      return component;
    }
  }
}
