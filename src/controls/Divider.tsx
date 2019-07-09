import * as React from 'react';
import { IContainer, Container } from './Container';
import { stylings } from '../css/theme';

interface IDivider extends IContainer {
  direction?: 'horizontal' | 'vertical';
  size?: number;
  color?: string;
}

export class Divider extends React.Component<IDivider, any> {
  public static defaultProps: IDivider = {
    direction: 'horizontal',
    size: 0,
    color: stylings.colors.primaryGreyLighter
  };

  public render() {
    const style: React.CSSProperties = {};
    if (this.props.direction === 'vertical') {
      style.width = this.props.size;
      style.height = '100%';
    } else if (this.props.direction === 'horizontal') {
      style.height = this.props.size;
      style.width = '100%';
    }
    style.background = this.props.color;
    return (
      <Container {...this.props}>
        <hr style={style} />
      </Container>
    );
  }
}
