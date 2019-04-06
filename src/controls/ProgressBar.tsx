import * as React from 'react';
import { ProgressBar as ReactProgressBar } from 'react-bootstrap';
import { IContainer, Container } from './Container';
import * as styles from '../css/main.scss';

interface IProgressBar extends IContainer {
  children?: any;
  label?: boolean | string;
  striped?: boolean;
  animated?: boolean;
  value?: any;
  variant?: string;
  order?: number;
  gap?: boolean;
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
    if (this.props.children) {
      return (
        <Container {...this.props} className={styles.istoxProgress}>
          <ReactProgressBar className={this.props.gap ? 'gap' : ''}>
            {this.props.children.map((child: any) => {
              return this.getProgressBarDesign(child.props);
            })}
          </ReactProgressBar>
        </Container>
      );
    } else {
      const { ...props } = this.props;
      return (
        <Container {...this.props} className={styles.istoxProgress}>
          {this.getProgressBarDesign(props)}
        </Container>
      );
    }
  }

  private getProgressBarDesign(IProgressBar: IProgressBar) {
    const classes = [];
    const label = IProgressBar.label
      ? typeof IProgressBar.label === 'string'
        ? IProgressBar.label
        : `${IProgressBar.value}%`
      : '';
    return (
      <ReactProgressBar
        now={IProgressBar.value}
        label={label}
        striped={IProgressBar.striped}
        className={IProgressBar.variant}
        key={IProgressBar.order}
      />
    );
  }
}
