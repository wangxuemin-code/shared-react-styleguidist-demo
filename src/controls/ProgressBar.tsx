import * as React from 'react';
import * as styles from '../css/main.scss';
var uniqid = require('uniqid');
import Progress from 'antd/es/progress';
import { IContainer, Container } from '.';

interface IProps extends IContainer {
  children?: any;
  label?: boolean | string;
  animated?: boolean;
  value?: any;
  variant?: 'primary' | 'secondary' | 'info' | 'disabled' | 'light' | 'dark' | 'success' | 'warning' | 'danger';
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
    }, 1000);
  }

  componentDidUpdate() {
    if (this.state.value !== this.props.value) {
      this.setState({ value: this.props.value });
    }
  }

  public render() {
    let classes: string[] = [
      styles.istoxProgress,
      this.props.compact ? styles.compact : '',
      this.props.gap ? styles.gap : '',
      this.props.children ? styles.multi : ''
    ];
    classes = classes.filter(function(el) {
      return el != '';
    });
    if (this.props.children) {
      return (
        <Container {...this.props} className={classes.join(' ')}>
          {this.props.children.map((child: any) => {
            return this.getProgressBarDesign(child.props);
          })}
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
    let classes: string[] = [this.props.className ? this.props.className : '', IProps.variant ? IProps.variant : ''];
    classes = classes.filter(function(el) {
      return el != '';
    });
    const label = IProps.label ? (typeof IProps.label === 'string' ? IProps.label : `${IProps.value}%`) : '';
    return (
      <Container
        widthPercent={this.props.children ? IProps.value : undefined}
        {...this.props}
        className={classes.join(' ')}
        key={uniqid().toString()}
      >
        <Progress
          status={IProps.animated ? 'active' : undefined}
          percent={this.props.children ? 100 : IProps.value}
          showInfo={IProps.compact ? false : true}
          format={() => (IProps.compact ? '' : label)}
        />
      </Container>
    );
  }
}
