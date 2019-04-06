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
        padding={{ topRem: 0.9375, bottomRem: 0.9375, leftRem: 1.875, rightRem: 1.875 }}
        className={styles.card}
      >
        {this.props.image && <Image fullWidth src={this.props.image} />}
        {this.props.icon && <Icon icon={this.props.icon} />}
        {this.props.leftIcon && <Icon className={'leftIcon'} icon={this.props.leftIcon} />}
        {this.props.rightIcon && <Icon className={'rightIcon'} icon={this.props.rightIcon} />}
        <Container>
          {this.props.title && (
            <Container fontSizeRem={1.125} fontWeight={600}>
              {this.props.title}
            </Container>
          )}
        </Container>
      </Container>
    );
  }
}
