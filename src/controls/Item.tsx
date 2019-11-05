import * as React from 'react';
import * as styles from '../css/main.scss';
import { Icon, Image, Container, IContainer } from '.';

interface IItem extends IContainer {
  basic?: boolean;
  title?: string;
  description?: string;
  image?: string;
  icon?: any;
}

export class Item extends React.Component<IItem, any> {
  public render() {
    let classes: string[] = [
      styles.item,
      this.props.className ? this.props.className : '',
      this.props.basic ? styles.basic : ''
    ];
    classes = classes.filter(function(el) {
      return el != '';
    });
    return (
      <Container {...this.props} className={classes.join(' ')}>
        {this.props.image && <Image fullWidth src={this.props.image} />}
        {this.props.icon && <Icon size={'large'} icon={this.props.icon} />}
        <Container className={styles.itemInfo}>
          {this.props.children}
          {!this.props.children && this.props.title && (
            <Container className={styles.itemTitle}>{this.props.title}</Container>
          )}
          {!this.props.children && this.props.description && <Container> {this.props.description}</Container>}
        </Container>
      </Container>
    );
  }
}
