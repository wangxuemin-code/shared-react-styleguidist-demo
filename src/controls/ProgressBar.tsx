import * as React from 'react';
import { ProgressBar as ReactProgressBar } from 'react-bootstrap';
import { IContainer, Container } from './Container';
import * as styles from '../css/main.scss';

interface IProgressBar extends IContainer {
  value: number;
}

interface IState {
  value: number;
}

export class ProgressBar extends React.Component<IProgressBar, IState> {
  constructor(props: IProgressBar) {
    super(props);
    this.state = { value: 0 };

    setTimeout(() => {
      this.setState({
        value: this.props.value
      });
    }, 100);
  }

  componentDidUpdate() {
    if (this.state.value !== this.props.value) {
      this.setState({ value: this.props.value });
    }
  }

  public render() {
    return (
      <Container {...this.props} className={styles.istoxProgress}>
        <ReactProgressBar now={this.state.value} />
      </Container>
    );
  }
}