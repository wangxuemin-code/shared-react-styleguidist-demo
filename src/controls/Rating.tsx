import * as React from 'react';
import { IContainer, Container } from './Container';
import { Icon } from './Icon';
import * as styles from '../css/main.scss';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

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
    let childVariant = '';
    const value = defaultValue || 0;
    const ratings = [];
    if (maxValue) {
      for (let i = 1; i <= maxValue; i++) {
        if (value >= i) {
          childVariant = 'success';
        } else {
          if (value == i - 0.5) {
            childVariant = 'warning';
          } else {
            childVariant = variant ? variant : '';
          }
        }
        let classes: string[] = [
          styles.ratingSignal,
          this.props.className ? this.props.className : '',
          childVariant || ''
        ];
        classes = classes.filter(function(el) {
          return el != '';
        });
        if (childVariant == 'success') {
          ratings.push(
            <Container display={'inherit'} key={i}>
              <Icon size={'tiny'} variant={'success'} icon={faCheckCircle} />
            </Container>
          );
        } else {
          ratings.push(<Container key={i} className={classes.join(' ')} />);
        }
      }
    }
    return ratings;
  };

  public render() {
    return (
      <Container {...this.props} className={styles.rating}>
        {this.renderInputs()}
      </Container>
    );
  }
}
