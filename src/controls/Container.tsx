import * as React from 'react';
import { BorderStyleProperty, BorderColorProperty } from 'csstype';
import * as styles from '../css/Global.css';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

interface IDirectionShort {
  topBottom?: number;
  leftRight?: number;
}

interface IDirection {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
}

interface IBorder {
  borderRadius?: number;
  borderColor?: BorderColorProperty;
  borderStyle?: BorderStyleProperty;
  borderSize?: number;
}

export interface IContainer {
  margin?: IDirection & IDirectionShort;
  padding?: IDirection & IDirectionShort;
  positionPoints?: IDirection; // will only be used when position absolute
  border?: IBorder;
  children?: any;
  textAlign?: 'left' | 'right' | 'center';
  className?: string;
  lineHeight?: number;
  floatRight?: boolean;
  floatLeft?: boolean;
  clearFix?: boolean;
  widthPercent?: number;
  height?: number;
  backgroundColor?: string;
  display?: 'block' | 'inline-block' | 'inline';
  position?: 'static' | 'absolute' | 'fixed' | 'relative';
  hidden?: boolean;
  tooltip?: string | undefined | null;
  verticalAlign?: 'center';
  zIndex?: number;
}

export class Container extends React.Component<IContainer, any> {
  public render() {
    if (this.props.hidden) {
      return null;
    }

    const classes: string[] = [this.props.className ? this.props.className : ''];
    if (this.props.textAlign === 'center') {
      classes.push(styles.textCenter);
    } else if (this.props.textAlign === 'left') {
      classes.push(styles.textLeft);
    } else if (this.props.textAlign === 'right') {
      classes.push(styles.textRight);
    }

    if (this.props.floatRight) {
      classes.push(styles.right);
    }

    if (this.props.floatLeft) {
      classes.push(styles.left);
    }

    const style: React.CSSProperties = {};

    if (this.props.lineHeight) {
      style.lineHeight = this.props.lineHeight + 'px';
    }

    if (this.props.margin) {
      if (this.props.margin.topBottom) {
        style.marginTop = this.props.margin.topBottom;
        style.marginBottom = this.props.margin.topBottom;
      }
      if (this.props.margin.leftRight) {
        style.marginLeft = this.props.margin.leftRight;
        style.marginRight = this.props.margin.leftRight;
      }
      if (this.props.margin.top) {
        style.marginTop = this.props.margin.top;
      }
      if (this.props.margin.left) {
        style.marginLeft = this.props.margin.left;
      }
      if (this.props.margin.right) {
        style.marginRight = this.props.margin.right;
      }
      if (this.props.margin.bottom) {
        style.marginBottom = this.props.margin.bottom;
      }
    }

    if (this.props.padding) {
      if (this.props.padding.topBottom) {
        style.paddingTop = this.props.padding.topBottom;
        style.paddingBottom = this.props.padding.topBottom;
      }
      if (this.props.padding.leftRight) {
        style.paddingLeft = this.props.padding.leftRight;
        style.paddingRight = this.props.padding.leftRight;
      }
      if (this.props.padding.top) {
        style.paddingTop = this.props.padding.top;
      }
      if (this.props.padding.left) {
        style.paddingLeft = this.props.padding.left;
      }
      if (this.props.padding.right) {
        style.paddingRight = this.props.padding.right;
      }
      if (this.props.padding.bottom) {
        style.paddingBottom = this.props.padding.bottom;
      }
    }

    if (this.props.border) {
      if (this.props.border.borderColor) {
        style.borderColor = this.props.border.borderColor;
      }
      if (this.props.border.borderRadius) {
        style.borderRadius = this.props.border.borderRadius;
      }
      if (this.props.border.borderSize) {
        style.borderWidth = this.props.border.borderSize;
      }
      if (this.props.border.borderStyle) {
        style.borderStyle = this.props.border.borderStyle;
      }
    }

    if (this.props.clearFix) {
      style.overflow = 'auto';
    }

    if (this.props.display) {
      style.display = this.props.display;
    }

    if (this.props.widthPercent) {
      style.width = this.props.widthPercent + '%';
    }

    if (this.props.backgroundColor) {
      style.background = this.props.backgroundColor;
    }

    if (this.props.position) {
      style.position = this.props.position;
      if (this.props.position === 'absolute') {
        if (this.props.positionPoints) {
          style.top = this.props.positionPoints.top;
          style.bottom = this.props.positionPoints.bottom;
          style.left = this.props.positionPoints.left;
          style.right = this.props.positionPoints.right;
        }
      }
    }

    if (this.props.verticalAlign) {
      if (this.props.verticalAlign === 'center') {
        style.display = 'flex';
        style.justifyContent = 'center';
        style.alignItems = 'center';
      }
    }

    if (this.props.height) {
      style.height = this.props.height;
    }

    if (this.props.zIndex) {
      style.zIndex = this.props.zIndex;
    }

    return (
      <div style={style} className={classes.join(' ')}>
        {this.wrapWithTooltipIfNeeded(this.props.children)}
      </div>
    );
  }

  private wrapWithTooltipIfNeeded(children: any) {
    if (this.props.tooltip) {
      return (
        <OverlayTrigger
          overlay={<Tooltip id='tooltip'>{this.props.tooltip}</Tooltip>}
          placement='top'
          delayShow={10}
          delayHide={10}
        >
          {children}
        </OverlayTrigger>
      );
    } else {
      return children;
    }
  }
}
