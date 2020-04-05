import * as React from 'react';
import { ErrorHandle } from '../helpers';
import { Loading, ErrorPage } from '.';
import { Controls } from '../index-prod';

interface IProps {
  loading?: boolean;
  error?: any;
}

interface IState {
  myComponentOptions?: IOptions;
}

interface IOptions {
  loadingContainerMinHeight?: number;
  loadingContainerVariant?: 'white' | 'black';
  showBackDropWhenLoading?: boolean;
}

export class MyComponent<P = {}, S = {}> extends React.Component<P & IProps, S & IState> {
  private offsetBase: any;

  public componentWillUnmount() {
    if (this.offsetBase) {
      document.body.removeChild(this.offsetBase);
    }
  }

  protected setMyComponentOptions(options: IOptions) {
    this.setState({
      myComponentOptions: options
    });
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

    if (this.state.myComponentOptions) {
      if (this.state.myComponentOptions.showBackDropWhenLoading) {
        return (
          <Controls.Container
            position='relative'
            style={{ minHeight: this.state.myComponentOptions.loadingContainerMinHeight || 200 }}
          >
            <>
              {(this.props.loading || loading) && (
                <Loading
                  backDrop={true}
                  variant={this.state.myComponentOptions.loadingContainerVariant || 'white'}
                  loading={true}
                />
              )}

              {typeof component === 'function' ? component() : component}
            </>
          </Controls.Container>
        );
      }
    }

    return typeof component === 'function' ? component() : component;
  }
}
