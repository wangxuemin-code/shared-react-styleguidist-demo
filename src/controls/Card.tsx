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
      <Container {...this.props} className={styles.card}>
        {this.props.image && <Image fullWidth src={this.props.image} />}
        {this.props.icon && <Icon className={styles.cardMiddleIcon} icon={this.props.icon} />}
        {this.props.leftIcon && (
          <Icon className={styles.cardTopLeftIcon} icon={this.props.leftIcon} />
        )}
        {this.props.rightIcon && (
          <Icon className={styles.cardTopRightIcon} icon={this.props.rightIcon} />
        )}
        {this.props.title && <Container className={styles.cardTitle}>{this.props.title}</Container>}
      </Container>
    );
  }
}
