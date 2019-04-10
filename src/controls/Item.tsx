import * as React from 'react';
import * as styles from '../css/main.scss';
import { Container, IContainer } from './Container';
import { Image } from './Image';
import { Icon } from './Icon';

interface IProps extends IContainer {
  title: string;
  description: string;
  image?: string;
  icon?: any;
}

export class Item extends React.Component<IProps, any> {
  public render() {
    return (
      <Container {...this.props} padding={{ allRem: 0.9375 }} className={styles.item}>
        {this.props.image && <Image fullWidth src={this.props.image} />}
        {this.props.icon && <Icon icon={this.props.icon} />}
        <Container>
          {this.props.title && (
            <Container fontSizeRem={1.143} fontWeight={500}>
              {this.props.title}
            </Container>
          )}
          {this.props.description && <Container> {this.props.description}</Container>}
        </Container>
      </Container>
    );
  }
}
