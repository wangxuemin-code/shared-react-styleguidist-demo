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
    if (this.props.href) {
      if (this.props.useNormalAnchor) {
        return (
          <a style={{ cursor: 'pointer' }} href={this.props.href}>
            <Container {...this.props} display={this.props.display || 'inline-block'} />
          </a>
        );
      } else {
        return (
          <ReactRouterLink to={this.props.href} style={{ cursor: 'pointer' }}>
            <Container {...this.props} display={this.props.display || 'inline-block'} />
          </ReactRouterLink>
        );
      }
    } else {
      return (
        <a onClick={this.props.onClick} style={{ cursor: 'pointer' }}>
          <Container {...this.props} display={this.props.display || 'inline-block'} />
        </a>
      );
    }
  }
}
