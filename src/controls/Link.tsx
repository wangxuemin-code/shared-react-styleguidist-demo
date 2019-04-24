import * as React from 'react';
import * as styles from '../css/main.scss';
import { Link as ReactRouterLink } from 'react-router-dom';
import { IContainer, Container } from './Container';

interface ILink extends IContainer {
  variant?: 'primary' | 'secondary' | 'info' | 'disabled' | 'success' | 'warning' | 'danger';
  href?: string;
  disabled?: boolean;
  useNormalAnchor?: boolean;
  onClick?: () => void;
}

export class Link extends React.Component<ILink, any> {
  public static defaultProps: ILink = {};

  public render() {
    let classes: string[] = [
      styles.link,
      this.props.variant || '',
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
