import * as React from 'react';
import * as styles from '../css/main.scss';
// import { Link as ReactRouterLink } from 'react-router-dom';
import { IContainer, Container } from './Container';

interface ILink extends IContainer {
  variant?: 'primary' | 'secondary' | 'info' | 'disabled' | 'success' | 'warning' | 'danger';
  basic?: boolean | string;
  size?: 'small' | 'medium' | 'large';
  href?: string;
  disabled?: boolean;
  useNormalAnchor?: boolean;
  onClick?: () => void;
  float?: 'left' | 'right' | 'none';
}

export class Link extends React.Component<ILink, any> {
  public static defaultProps: ILink = {
    size: 'small',
    float: 'left'
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
          <a
            className={classes.join(' ')}
            {...linkProps}
            style={{ cursor: 'pointer' }}
            href={this.props.href}
          >
            <Container {...linkProps} display={this.props.display || 'inline-block'} />
          </a>
        );
      } else {
        return (
          <a
            className={classes.join(' ')}
            {...linkProps}
            style={{ cursor: 'pointer' }}
            href={this.props.href}
          >
            <Container {...linkProps} display={this.props.display || 'inline-block'} />
          </a>
          // <ReactRouterLink {...linkProps} to={this.props.href} style={{ cursor: 'pointer' }}>
          //   <Container {...linkProps} display={this.props.display || 'inline-block'} />
          // </ReactRouterLink>
        );
      }
    } else {
      return (
        <a
          className={classes.join(' ')}
          {...linkProps}
          onClick={this.props.onClick}
          style={{ cursor: 'pointer' }}
        >
          <Container {...linkProps} display={this.props.display || 'inline-block'} />
        </a>
      );
    }
  }
}
