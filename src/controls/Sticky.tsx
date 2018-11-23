import * as React from 'react';
import { MyComponent } from './MyComponent';

interface IState {
  fixed: boolean;
  originalY: number;
  width: number;
  height: number;
}

interface IProps {
  children?: any;
  offsetY: number;
}

export class Sticky extends MyComponent<IProps, IState> {

  public static defaultProps: IProps = {
    offsetY: 0,
  };

  public readonly state: IState = {
    fixed: false,
    originalY: -1,
    width: -1,
    height: -1,
  };

  private container: React.RefObject<HTMLDivElement>;

  constructor(props: any) {
    super(props);
    this.container = React.createRef();
    this.onResize = this.onResize.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }

  public componentDidMount() {
    window.addEventListener('resize', this.onResize);
    window.addEventListener('scroll', this.onScroll);
  }
  public componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('scroll', this.onScroll);
  }

  public render() {

      const style: React.CSSProperties = {};
      style.position = this.state.fixed  ? 'fixed' : 'static';
      style.top = this.props.offsetY;
      if (this.state.fixed) {
        style.width = this.state.width;
      }

      return (
          <div style={{height: this.state.height}}>
            <div style={style} ref={this.container}>
              {this.props.children}
            </div>
          </div>
        );
  }

  private onResize() {
    this.setState({ originalY: -1, fixed: false }, () => {
      this.onScroll();
    });
  }

  private onScroll() {
    const div: HTMLDivElement | null = this.container.current;
    if (div) {
      if (this.state.originalY < 0) {
        this.setState({ originalY: this.getAbsolutePositionOfDOMElement(div).top });
      }

      if (!this.state.fixed) {
        this.setState({ fixed: (div.getBoundingClientRect().top - this.props.offsetY < 0),
                        width: div.getBoundingClientRect().width,
                        height: div.getBoundingClientRect().height });
      } else {
        if (window.scrollY + this.props.offsetY  < this.state.originalY) {
          this.setState({ fixed: false });
        }
      }
    }
  }
}
