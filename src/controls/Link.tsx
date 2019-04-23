import * as React from 'react';
import * as styles from '../css/main.scss';
import { Link as ReactRouterLink } from 'react-router-dom';
import { IContainer, Container } from './Container';

interface ILink extends IContainer {
  variant?: 'primary' | 'secondary' | 'info' | 'disabled' | 'success' | 'warning' | 'danger';
  basic?: boolean;
  size?: 'small' | 'medium' | 'large';
  href?: string;
  disabled?: boolean;
  useNormalAnchor?: boolean;
  onClick?: () => void;
  float?: 'left' | 'right' | 'none';
}

export class Link extends React.Component<ILink, any> {
  public static defaultProps: ILink = {
    size: 'small'
  };
  public render() {
    let classes: string[] = [
      styles.link,
      this.props.size ? this.props.size : '',
      this.props.variant || '',
      this.props.basic ? styles.basic : '',
      this.props.disabled ? styles.disabled : ''
    ];

    classes = classes.filter(function(el) {
      return el != '';
    });

    var { useNormalAnchor, ...linkProps } = this.props;
    if (this.props.href) {
      if (useNormalAnchor) {
        return (
          <a href={this.props.href}>
            <Container className={classes.join(' ')} {...linkProps}>
              {this.props.children}
            </Container>
          </a>
        );
      } else {
        return (
          <ReactRouterLink to={this.props.href}>
            <Container className={classes.join(' ')} {...linkProps}>
              {this.props.children}
            </Container>
          </ReactRouterLink>
        );
      }
    } else {
      return (
        <a href={this.props.href}>
          <Container className={classes.join(' ')} {...linkProps}>
            {this.props.children}
          </Container>
        </a>
      );
    }
  }
}
