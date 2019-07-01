import * as React from 'react';
import { ProgressBar as ReactProgressBar } from 'react-bootstrap';
import { IContainer, Container } from './Container';
import * as styles from '../css/main.scss';

interface IProps extends IContainer {
  children?: any;
  label?: boolean | string;
  striped?: boolean;
  animated?: boolean;
  value?: any;
  variant?: string;
  order?: number;
  gap?: boolean;
  compact?: boolean;
}

interface IState {
  value: number;
}

export class ProgressBar extends React.Component<IProps, IState> {
  constructor(props: IProps) {
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
    let classes: string[] = [styles.istoxProgress, this.props.compact ? styles.compact : ''];
    classes = classes.filter(function(el) {
      return el != '';
    });
    if (this.props.children) {
      return (
        <Container {...this.props} className={classes.join(' ')}>
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
        <Container {...this.props} className={classes.join(' ')}>
          {this.getProgressBarDesign(props)}
        </Container>
      );
    }
  }

  private getProgressBarDesign(IProps: IProps) {
    let classes: string[] = [
      this.props.className ? this.props.className : '',
      IProps.variant ? IProps.variant : ''
    ];
    classes = classes.filter(function(el) {
      return el != '';
    });
    const label = IProps.label
      ? typeof IProps.label === 'string'
        ? IProps.label
        : `${IProps.value}%`
      : '';
    return (
      <ReactProgressBar
        now={IProps.value}
        label={IProps.compact ? '' : label}
        striped={IProps.striped}
        className={classes.join(' ')}
        key={IProps.order}
      />
    );
  }
}
