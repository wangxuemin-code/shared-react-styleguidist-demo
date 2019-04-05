import * as React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { IContainer, Container } from './Container';

interface ILink extends IContainer {
  href?: string;
  useNormalAnchor?: boolean;
  onClick?: () => void;
}

export class Link extends React.Component<ILink, any> {
  public render() {
    var { useNormalAnchor, ...linkProps } = this.props;
    if (this.props.href) {
      if (useNormalAnchor) {
        return (
          <a {...linkProps} style={{ cursor: 'pointer' }} href={this.props.href}>
            <Container {...linkProps} display={this.props.display || 'inline-block'} />
          </a>
        );
      } else {
        return (
          <a {...linkProps} style={{ cursor: 'pointer' }} href={this.props.href}>
            <Container {...linkProps} display={this.props.display || 'inline-block'} />
          </a>
          // <ReactRouterLink {...linkProps} to={this.props.href} style={{ cursor: 'pointer' }}>
          //   <Container {...linkProps} display={this.props.display || 'inline-block'} />
          // </ReactRouterLink>
        );
      }
    } else {
      return (
        <a {...linkProps} onClick={this.props.onClick} style={{ cursor: 'pointer' }}>
          <Container {...linkProps} display={this.props.display || 'inline-block'} />
        </a>
      );
    }
  }
}
