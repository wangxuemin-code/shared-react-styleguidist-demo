import * as React from 'react';
import * as styles from '../css/main.scss';
import { Link as ReactRouterLink } from 'react-router-dom';
import { IContainer, Container } from './Container';

interface ILink extends IContainer {
  variant?: 'primary' | 'secondary' | 'info' | 'disabled' | 'success' | 'warning' | 'danger';
  underline?: boolean;
  href?: string;
  disabled?: boolean;
  useNormalAnchor?: boolean;
  onClick?: () => void;
  target?: '_blank' | '_self' | '_parent' | '_top';
  linkColor?: string;
}

export class Link extends React.Component<ILink> {
  public static defaultProps: ILink = {
    underline: true
  };

  public render() {
    let classes: string[] = [
      styles.link,
      this.props.variant || '',
      this.props.disabled ? styles.disabled : '',
      this.props.underline ? styles.underline : ''
    ];

    classes = classes.filter(function(el) {
      return el != '';
    });

    let style: React.CSSProperties = this.props.style || {};

    if (this.props.linkColor) {
      style.color = this.props.linkColor;
    }

    var { useNormalAnchor, ...linkProps } = this.props;
    if (this.props.href) {
      if (useNormalAnchor) {
        return (
          <a target={this.props.target} href={this.props.href}>
            <Container style={style} className={classes.join(' ')} {...linkProps}>
              {this.props.children}
            </Container>
          </a>
        );
      } else {
        return (
          <ReactRouterLink to={this.props.href}>
            <Container style={style} className={classes.join(' ')} {...linkProps}>
              {this.props.children}
            </Container>
          </ReactRouterLink>
        );
      }
    } else {
      return (
        <a target={this.props.target} onClick={this.props.onClick} style={{ cursor: 'pointer' }}>
          <Container style={style} className={classes.join(' ')} {...linkProps}>
            {this.props.children}
          </Container>
        </a>
      );
    }
  }
}
