import * as React from 'react';
import * as styles from '../css/main.scss';
import { Container, IContainer } from './Container';
import { Image } from './Image';
import { Icon } from './Icon';

interface IProps extends IContainer {
  title: string;
  image?: string;
  icon?: any;
  leftIcon?: any;
  rightIcon?: any;
  className?: string;
}

export class Card extends React.Component<IProps, any> {
  public render() {
    return (
      <Container
        {...this.props}
        width={225}
        padding={{ topRem: 2.5, bottomRem: 1, leftRem: 1.875, rightRem: 1.875 }}
        className={styles.card}
      >
        {this.props.image && <Image fullWidth src={this.props.image} />}
        {this.props.icon && <Icon className={styles.cardMiddleIcon} icon={this.props.icon} />}
        {this.props.leftIcon && (
          <Icon className={styles.cardTopLeftIcon} icon={this.props.leftIcon} />
        )}
        {this.props.rightIcon && (
          <Icon className={styles.cardTopRightIcon} icon={this.props.rightIcon} />
        )}
        {this.props.title && (
          <Container padding={{ topRem: 1 }} fontSizeRem={1.143} fontWeight={500}>
            {this.props.title}
          </Container>
        )}
      </Container>
    );
  }
}
