import * as React from 'react';
import { Controls } from '..';
import { ErrorType } from '../enums/ErrorType';

interface IProps {
  loading?: boolean;
  error?: ErrorType | string;
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

  protected shouldRender(component: any): any {
    if (this.props.loading) {
      return <Controls.Loading backDrop={false} loading={this.props.loading} />;
    } else if (this.props.error) {
      if (this.props.error === ErrorType.Error404 || this.props.error === ErrorType.Error500) {
        return (
          <Controls.Container
            position={'absolute'}
            positionPoints={{ top: 0, bottom: 0, left: 0, right: 0 }}
            verticalAlign={'center'}
          >
            <Controls.ErrorView type={this.props.error === ErrorType.Error404 ? '404' : '500'} />
          </Controls.Container>
        );
      }
    }

    return component;
  }
}
