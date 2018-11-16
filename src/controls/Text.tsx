import * as React from 'react';
import * as styles from '../css/Global.css';
import * as textStyles from './css/Text.css';
import { Container, IContainer } from './Container';

export interface IText extends IContainer {
  color?: string;
  fontSize?: number;
  fontWeight?: 'normal' | 'bold' | 'light-bold';
  italic?: boolean;
  letterSpacing?: number;
  textVerticalAlign?: 'sub' | 'top' | 'middle';
}

export class Text extends React.Component<IText, any> {
  public static defaultProps: IText = {
    letterSpacing: 0,
    fontWeight: 'normal'
  };

  public render() {
    const classes: string[] = [textStyles.text];

    if (this.props.textVerticalAlign) {
      if (this.props.textVerticalAlign === 'sub') {
        classes.push(styles.verticalAlignSub);
      } else if (this.props.textVerticalAlign === 'middle') {
        classes.push(styles.verticalAlignMiddle);
      }
    }

    if (this.props.fontWeight) {
      if (this.props.fontWeight === 'normal') {
        classes.push(styles.normalText);
      }
      if (this.props.fontWeight === 'bold') {
        classes.push(styles.bold);
      }
      if (this.props.fontWeight === 'light-bold') {
        classes.push(styles.lightBold);
      }
    }

    if (this.props.italic) {
      classes.push(styles.italic);
    }

    const style: React.CSSProperties = {};
    if (this.props.color) {
      style.color = this.props.color;
    }

    if (this.props.fontSize) {
      style.fontSize = this.props.fontSize;
    }

    if (this.props.letterSpacing) {
      style.letterSpacing = this.props.letterSpacing;
    }

    return (
      <Container {...this.props}>
        <span style={style} className={classes.join(' ')}>
          {this.props.children}
        </span>
      </Container>
    );
  }
}
