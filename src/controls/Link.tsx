import * as React from 'react';
import { IContainer, Container } from './Container';

interface ILink extends IContainer {
  href?: string;
  onClick?: () => void;
}

export class Link extends React.Component<ILink, any> {
  public render() {
    if (this.props.href) {
      return (
        <a href={this.props.href} style={{ cursor: 'pointer' }}>
          <Container {...this.props} display={this.props.display || 'inline-block'} />
        </a>
      );
    } else if (this.props.onClick) {
      return (
        <a onClick={this.props.onClick} style={{ cursor: 'pointer' }}>
          <Container {...this.props} display={this.props.display || 'inline-block'} />
        </a>
      );
    }
  }
}
