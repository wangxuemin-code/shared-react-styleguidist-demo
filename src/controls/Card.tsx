import * as React from 'react';
import * as styles from '../css/main.scss';
import { Icon, Image, Container, IContainer } from '.';

interface IProps extends IContainer {
  title?: string;
  image?: string;
  icon?: any;
  leftIcon?: any;
  rightIcon?: any;
  className?: string;
}

export class Card extends React.Component<IProps, any> {
  public render() {
    let classes: string[] = [this.props.className ? this.props.className : '', styles.card];
    classes = classes.filter(function(el) {
      return el != '';
    });
    return (
      <Container {...this.props} className={classes.join(' ')}>
        {this.props.children}
        {!this.props.children && this.props.image && <Image fullWidth src={this.props.image} />}
        {!this.props.children && this.props.icon && (
          <Icon variant='secondary' className={styles.cardMiddleIcon} icon={this.props.icon} />
        )}
        {this.props.leftIcon && (
          <Icon variant='secondary' className={styles.cardTopLeftIcon} icon={this.props.leftIcon} />
        )}
        {this.props.rightIcon && (
          <Icon variant='secondary' className={styles.cardTopRightIcon} icon={this.props.rightIcon} />
        )}
        {!this.props.children && this.props.title && (
          <Container className={styles.cardTitle}>{this.props.title}</Container>
        )}
      </Container>
    );
  }
}
