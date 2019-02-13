import { BorderColorProperty, BorderStyleProperty, FontWeightProperty } from 'csstype';
import * as React from 'react';
import Dotdotdot from 'react-dotdotdot';
import { MouseEventHandler } from 'react';
import * as ReactTooltip from 'react-tooltip';
import * as styles from '../css/main.scss';
import ControlsHelper from './common/ControlsHelper';
import { IAllDirection, IDirection, IDirectionShort } from './common/interfaces';

interface IBorder {
  borderRadius?: number;
  borderColor?: BorderColorProperty;
  borderStyle?: BorderStyleProperty;
  borderSize?: number;
}

export interface IContainer {
  margin?: IDirection & IDirectionShort & IAllDirection;
  padding?: IDirection & IDirectionShort & IAllDirection;
  positionPoints?: IDirection; // will only be used when position absolute
  border?: IBorder;
  children?: any;
  textAlign?: 'left' | 'right' | 'center';
  className?: string;
  classNames?: string[];
  lineHeight?: number;
  clearFix?: boolean;
  widthPercent?: number;
  height?: number;
  width?: number;
  backgroundColor?: string;
  display?: 'block' | 'inline-block' | 'inline' | 'flex';
  position?: 'static' | 'absolute' | 'fixed' | 'relative';
  visibility?: 'hidden' | 'visible';
  hidden?: boolean;
  tooltip?: any;
  verticalAlign?: 'center';
  zIndex?: number;
  fontStyle?: 'normal' | 'italic';
  fontColor?: string;
  fontWeight?: FontWeightProperty;
  float?: 'left' | 'right' | 'none';
  textVerticalAlign?: 'sub' | 'top' | 'middle';
  letterSpacing?: number;
  fontSizePx?: number;
  fontSizeRem?: number;
  onMouseEnter?: MouseEventHandler;
  onMouseLeave?: MouseEventHandler;
  style?: React.CSSProperties;
  clamp?: number;
}

export class Container extends React.Component<IContainer, any> {
  public render() {
    if (this.props.hidden) {
      return null;
    }

    let classes: string[] = [this.props.className ? this.props.className : ''];

    if (this.props.classNames) {
      classes = classes.concat(this.props.classNames);
    }

    if (this.props.textAlign === 'center') {
      classes.push(styles.textCenter);
    } else if (this.props.textAlign === 'left') {
      classes.push(styles.textLeft);
    } else if (this.props.textAlign === 'right') {
      classes.push(styles.textRight);
    }

    if (this.props.float === 'right') {
      classes.push(styles.right);
    }

    if (this.props.float === 'left') {
      classes.push(styles.left);
    }

    let style: React.CSSProperties = this.props.style || {};

    style = { ...style, ...ControlsHelper.processMargin(this.props.margin) };

    style = { ...style, ...ControlsHelper.processPadding(this.props.padding) };

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

    if (this.props.visibility) {
      style.visibility = this.props.visibility;
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
          style.top = this.props.positionPoints.topPx;
          style.bottom = this.props.positionPoints.bottomPx;
          style.left = this.props.positionPoints.leftPx;
          style.right = this.props.positionPoints.rightPx;
        }
      }
    }

    if (this.props.fontSizePx) {
      style.fontSize = this.props.fontSizePx;
    }

    if (this.props.fontSizeRem) {
      style.fontSize = this.props.fontSizeRem + 'rem';
    }

    if (this.props.fontStyle) {
      style.fontStyle = this.props.fontStyle;
    }

    if (this.props.fontColor) {
      style.color = this.props.fontColor;
    }

    if (this.props.fontWeight) {
      style.fontWeight = this.props.fontWeight;
    }

    if (this.props.verticalAlign) {
      if (this.props.verticalAlign === 'center') {
        style.display = 'flex';
        style.justifyContent = 'center';
        style.alignItems = 'center';
      }
    }

    if (this.props.textVerticalAlign) {
      if (this.props.textVerticalAlign === 'sub') {
        classes.push(styles.verticalAlignSub);
      } else if (this.props.textVerticalAlign === 'middle') {
        classes.push(styles.verticalAlignMiddle);
      }
    }

    if (this.props.height) {
      style.height = this.props.height;
    }

    if (this.props.width) {
      style.width = this.props.width;
    }

    if (this.props.zIndex) {
      style.zIndex = this.props.zIndex;
    }

    if (this.props.letterSpacing) {
      style.letterSpacing = this.props.letterSpacing;
    }

    return (
      <div
        style={style}
        className={classes.join(' ')}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
      >
        {this.getContent(this.props.children)}
      </div>
    );
  }

  private getContent(children: any) {
    if (this.props.tooltip) {
      return this.wrapWithTooltip(this.wrapWithDotDotIfNeeded(children));
    } else {
      return this.wrapWithDotDotIfNeeded(children);
    }
  }

  private wrapWithDotDotIfNeeded(children: any) {
    // if (this.props.clamp) {
    //   return <Dotdotdot clamp={this.props.clamp}>{children}</Dotdotdot>;
    // } else {
    return children;
    // }
  }

  private wrapWithTooltip(children: any) {
    const randomId = String(Math.random() * 1000);
    return (
      <span>
        <span data-tip data-for={randomId}>
          {children}
        </span>
        <ReactTooltip id={randomId} effect='solid'>
          <span>{this.props.tooltip}</span>
        </ReactTooltip>
      </span>
    );
  }
}
