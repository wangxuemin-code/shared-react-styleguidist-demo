import * as React from 'react';
import { Loading, ErrorView, Container } from '.';

interface IProps {
  loading?: boolean;
  error?: '404' | '500';
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
      return <Loading backDrop={false} loading={this.props.loading} />;
    } else if (this.props.error) {
      if (this.props.error === '404' || this.props.error === '500') {
        return (
          <Container
            position={'absolute'}
            positionPoints={{ topPx: 0, bottomPx: 0, leftPx: 0, rightPx: 0 }}
            verticalAlign={'center'}
          >
            <ErrorView type={this.props.error} />
          </Container>
        );
      }
    }

    return component;
  }
}
