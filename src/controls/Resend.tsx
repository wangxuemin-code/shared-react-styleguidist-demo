import * as React from 'react';
import { Container, IContainer } from './Container';
import { Link } from './Link';

interface IProps extends IContainer {
  initTimer?: boolean;
  onPress?: (processing: boolean) => void;
  duration?: number;
}
interface IState {
  timeRemainingInSeconds?: number;
}

export class Resend extends React.Component<IProps, IState> {
  private timer: any;
  public static defaultProps: IProps = {
    duration: 60,
    initTimer: false
  };

  constructor(props: IProps) {
    super(props);

    this.state = {
      timeRemainingInSeconds: this.props.duration
    };
  }

  public componentDidMount() {
    if (this.props.initTimer) {
      this.resendCode();
    }
  }

  public render() {
    // let classes: string[] = [styles.resend];

    // classes = classes.filter(function(el) {
    //   return el != '';
    // });

    let style: React.CSSProperties = {};

    return (
      <Container className='color-primary-grey-dark'>
        {(this.state.timeRemainingInSeconds === 0 ||
          this.state.timeRemainingInSeconds === this.props.duration) && (
          <>
            Didn’t receive the code?&nbsp;
            <Link onClick={this.resendCode}>Resend Code</Link>
          </>
        )}
        {this.state.timeRemainingInSeconds !== 0 &&
          this.state.timeRemainingInSeconds !== this.props.duration && (
            <span>
              You can resend in {this.state.timeRemainingInSeconds}{' '}
              {this.state.timeRemainingInSeconds == 1 ? 'second' : 'seconds'}
            </span>
          )}
      </Container>
    );
  }

  private resendCode = () => {
    if (
      this.props.duration &&
      (this.state.timeRemainingInSeconds === 0 ||
        this.state.timeRemainingInSeconds === this.props.duration)
    ) {
      clearInterval(this.timer!);
      this.setState({ timeRemainingInSeconds: this.props.duration - 1 });
      this.timer = setInterval(() => {
        this.decrementTimeRemaining();
      }, 1000);
      if (this.props.onPress) {
        this.props.onPress(true);
      }
    }
  };

  private decrementTimeRemaining = () => {
    if (this.state.timeRemainingInSeconds && this.state.timeRemainingInSeconds > 0) {
      this.setState({
        timeRemainingInSeconds: this.state.timeRemainingInSeconds - 1
      });
    } else {
      if (this.props.onPress) {
        this.props.onPress(false);
      }
      clearInterval(this.timer!);
    }
  };
}
