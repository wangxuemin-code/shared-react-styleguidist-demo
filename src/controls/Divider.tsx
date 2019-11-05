import * as React from 'react';
import { stylings } from '../css/theme';
import * as styles from '../css/main.scss';
import { IContainer, Container } from '.';

interface IDivider extends IContainer {
  direction?: 'horizontal' | 'vertical';
  size?: number;
  color?: string;
  compact?: boolean;
}

export class Divider extends React.Component<IDivider, any> {
  public static defaultProps: IDivider = {
    direction: 'horizontal',
    size: 1,
    color: stylings.colors.primaryGreyLight
  };

  public render() {
    let classes: string[] = [
      styles.hrDivider,
      this.props.className ? this.props.className : '',
      this.props.compact ? styles.compact : ''
    ];
    classes = classes.filter(function(el) {
      return el != '';
    });
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
      <Container {...this.props} className={classes.join(' ')}>
        <hr style={style} />
      </Container>
    );
  }
}
