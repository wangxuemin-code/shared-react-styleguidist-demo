import * as React from 'react';
import Animate from 'react-move/Animate';
import { IContainer, Container } from '.';

interface IProps extends IContainer {
  type?: 'fade' | 'expand';
  in?: boolean;
  duration?: number;
  finalSize?: {
    width: number;
    height: number;
  };
}

export class Transition extends React.Component<IProps> {
  private ref: any;

  public static defaultProps: IProps = {
    type: 'fade',
    in: true,
    duration: 300
  };

  public render() {
    if (this.props.type === 'fade') {
      return (
        <Animate
          show={this.props.in}
          start={{
            opacity: 0
          }}
          enter={{
            opacity: [1],
            timing: { duration: this.props.duration },
            events: { end: this.onEnter }
          }}
          update={{
            // catch interrupts e.g. click button in middle of leave
            opacity: [1],
            timing: { duration: this.props.duration }
          }}
          leave={{
            opacity: [0],
            timing: { duration: this.props.duration },
            events: { end: this.onLeave }
          }}
        >
          {({ opacity }) => {
            return (
              <Container
                {...this.props}
                style={{
                  opacity: opacity as number
                }}
              >
                {this.props.children}
              </Container>
            );
          }}
        </Animate>
      );
    } else if (this.props.type === 'expand') {
      if (!this.props.in) {
        return (
          <div
            style={{
              display: 'none',
              position: 'absolute'
            }}
          >
            {this.props.children}
          </div>
        );
      }

      return (
        <Animate
          show={this.props.in}
          start={{
            width: 0,
            height: 0
          }}
          enter={{
            width: [this.props.finalSize!.width],
            height: [this.props.finalSize!.height],
            timing: { duration: this.props.duration },
            events: { end: this.onEnter }
          }}
          update={{
            // catch interrupts e.g. click button in middle of leave
            width: [this.props.finalSize!.width],
            height: [this.props.finalSize!.height],
            timing: { duration: this.props.duration }
          }}
          leave={{
            width: [0],
            height: [0],
            timing: { duration: this.props.duration },
            events: { end: this.onLeave }
          }}
        >
          {({ width, height }) => {
            return (
              <Container
                {...this.props}
                style={{
                  width: width as string,
                  height: height as string
                }}
              >
                {this.props.children}
              </Container>
            );
          }}
        </Animate>
      );
    }
  }

  private onEnter() {
    if (this.props.type === 'expand') {
    }
  }

  private onLeave() {}
}
