import * as React from 'react';
import { IContainer } from './Container';
import Animate from 'react-move/Animate';

interface IProps extends IContainer {
  type?: 'fade';
  in: boolean;
  duration?: number;
}

export class Transition extends React.Component<IProps, any> {
  public static defaultProps: IProps = {
    type: 'fade',
    in: true,
    duration: 300
  };

  public render() {
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
            <div
              style={{
                opacity: opacity as number
              }}
            >
              {this.props.children}
            </div>
          );
        }}
      </Animate>
    );
  }

  private onEnter() {}

  private onLeave() {}
}
