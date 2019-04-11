import * as React from 'react';
import * as styles from '../css/main.scss';
import { Container, IContainer } from './Container';
import { Image } from './Image';
import { Icon } from './Icon';

interface IProps extends IContainer {
  basic?: boolean;
  title?: string;
  description?: string;
  image?: string;
  icon?: any;
}

export class Item extends React.Component<IProps, any> {
  public render() {
    let classes: string[] = [
      styles.item,
      this.props.className ? this.props.className : '',
      this.props.basic ? styles.basic : ''
    ];
    return (
      <Container {...this.props} className={classes.join(' ')}>
        {this.props.image && <Image fullWidth src={this.props.image} />}
        {this.props.icon && <Icon icon={this.props.icon} />}
        <Container className={styles.itemInfo}>
          {this.props.children}
          {!this.props.children && this.props.title && (
            <Container className={styles.itemTitle}>{this.props.title}</Container>
          )}
          {!this.props.children && this.props.description && (
            <Container> {this.props.description}</Container>
          )}
        </Container>
      </Container>
    );
  }
}
