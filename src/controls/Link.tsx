import * as React from 'react';
import { IText, Text } from '.';

interface ILink extends IText {
  href?: string;
  onClick?: () => void;
}

export class Link extends React.Component<ILink, any> {
  public render() {
    if (this.props.href) {
      return (
        <a href={this.props.href} style={{ cursor: 'pointer' }}>
          <Text {...this.props} display={'inline-block'} />
        </a>
      );
    } else if (this.props.onClick) {
      return (
        <a onClick={this.props.onClick} style={{ cursor: 'pointer' }}>
          <Text {...this.props} display={'inline-block'} />
        </a>
      );
    }
  }
}
