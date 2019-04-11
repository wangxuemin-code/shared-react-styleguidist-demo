import * as React from 'react';
import { IContainer, Container } from './Container';
import * as styles from '../css/main.scss';

interface IRating extends IContainer {
  value?: any;
  variant?: string;
  defaultValue?: number;
  maxValue?: number;
}

interface IState {
  value: number;
}

export class Rating extends React.Component<IRating, IState> {
  constructor(props: IRating) {
    super(props);
  }

  renderInputs = () => {
    const { maxValue, defaultValue } = this.props;
    let { variant } = this.props;
    const value = defaultValue || 0;
    const ratings = [];
    if (maxValue) {
      for (let i = 1; i <= maxValue; i++) {
        if (value > i) {
          variant = 'success';
        } else {
          if (value == i - 0.5) {
            variant = 'warning';
          } else {
            variant = '';
          }
        }
        let classes: string[] = [
          styles.ratingSignal,
          this.props.className ? this.props.className : '',
          variant || ''
        ];
        ratings.push(<Container key={i} className={classes.join(' ')} />);
      }
    }
    return ratings;
  };

  public render() {
    const { ...props } = this.props;
    return (
      <Container {...this.props} className={styles.rating}>
        {this.renderInputs()}
      </Container>
    );
  }
}
