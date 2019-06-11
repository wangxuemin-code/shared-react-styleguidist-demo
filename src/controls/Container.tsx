import { BorderColorProperty, BorderStyleProperty, FontWeightProperty } from 'csstype';
import * as React from 'react';
import { MouseEventHandler } from 'react';
import * as ReactTooltip from 'react-tooltip';
import * as styles from '../css/main.scss';
import ControlsHelper from './common/ControlsHelper';
import { IAllDirection, IDirection, IDirectionShort } from './common/Interfaces';
import Truncate from 'react-truncate';
import { number } from 'prop-types';

interface IBorder {
  borderRadius?: number;
  borderColor?: BorderColorProperty;
  borderStyle?: BorderStyleProperty;
  borderSize?: number;
}

interface ITooltipOptions {
  place?: 'top' | 'right' | 'bottom' | 'left';
  event?: string;
  eventOff?: string;
  globalEventOff?: string;
  clickable?: boolean;
  delayHide?: number;
  delayShow?: number;
  delayUpdate?: number;
  className?: string;
}

export interface IContainer {
  margin?: IDirection & IDirectionShort & IAllDirection;
  padding?: IDirection & IDirectionShort & IAllDirection;
  positionPoints?: IDirection; // will only be used when position absolute
  border?: IBorder;
  children?: any;
  textAlign?: 'left' | 'right' | 'center' | 'justify';
  className?: string;
  classNames?: string[];
  lineHeight?: number;
  clearFix?: boolean;
  heightPercent?: number;
  widthPercent?: number;
  height?: number;
  width?: number;
  fluid?: boolean;
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundPosition?: 'center' | 'bottom' | 'left' | 'right' | 'top' | 'initial' | 'inherit';
  backgroundSize?: 'auto' | 'contain' | 'cover' | 'inherit' | 'initial';
  backgroundRepeat?: 'no-repeat' | 'initial' | 'inherit' | 'repeat' | 'repeat-x' | 'repeat-y';
  display?: 'block' | 'inline-block' | 'inline' | 'flex' | 'grid' | 'inline-grid' | 'inline-flex';
  position?: 'static' | 'absolute' | 'fixed' | 'relative';
  visibility?: 'hidden' | 'visible';
  hidden?: boolean;
  tooltip?: any;
  tooltipOptions?: ITooltipOptions;
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
  onClick?: MouseEventHandler;
  style?: React.CSSProperties;
  variant?: any;
  clamp?: number;
  focus?: boolean;
  alignItems?: 'baseline' | 'center' | 'start' | 'end' | 'stretch';
  justifyContent?:
    | 'baseline'
    | 'center'
    | 'start'
    | 'end'
    | 'left'
    | 'right'
    | 'stretch'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  overflow?: 'hidden' | 'auto';
}

export class Container extends React.Component<IContainer, any> {
  public render() {
    if (this.props.hidden) {
      return null;
    }

    let classes: string[] = [
      this.props.className ? this.props.className : '',
      this.props.textAlign === 'center' ? styles.textCenter : '',
      this.props.textAlign === 'left' ? styles.textLeft : '',
      this.props.textAlign === 'right' ? styles.textRight : '',
      this.props.textAlign === 'justify' ? styles.textJustify : '',
      this.props.float
        ? this.props.float == 'none'
          ? styles.none
          : this.props.float == 'left'
          ? styles.left
          : styles.right
        : '',
      this.props.fluid ? styles.fluid : '',
      this.props.overflow
        ? this.props.overflow === 'hidden'
          ? styles.overflowHidden
          : styles.overflowAuto
        : ''
    ];

    classes = classes.filter(function(el) {
      return el != '';
    });

    if (this.props.classNames) {
      classes = classes.concat(this.props.classNames);
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
    if (this.props.heightPercent) {
      style.height = this.props.heightPercent + '%';
    }

    if (this.props.widthPercent) {
      style.width = this.props.widthPercent + '%';
    }

    if (this.props.backgroundColor) {
      style.background = this.props.backgroundColor;
    }

    if (this.props.backgroundImage) {
      style.backgroundImage = this.props.backgroundImage;
    }

    if (this.props.backgroundPosition) {
      style.backgroundPosition = this.props.backgroundPosition;
    }

    if (this.props.backgroundSize) {
      style.backgroundSize = this.props.backgroundSize;
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

    if (this.props.alignItems) {
      style.alignItems = this.props.alignItems;
    }

    if (this.props.justifyContent) {
      style.justifyContent = this.props.justifyContent;
    }

    return (
      <div
        style={style}
        className={classes.join(' ')}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
        onClick={this.props.onClick}
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
    if (this.props.clamp) {
      return <Truncate lines={this.props.clamp}>{children}</Truncate>;
    } else {
      return children;
    }
  }

  private wrapWithTooltip(children: any) {
    const randomId = String(Math.random() * 1000);
    return (
      <Container>
        <span data-tip data-for={randomId}>
          {children}
        </span>
        <ReactTooltip id={randomId} effect='solid' {...this.props.tooltipOptions} isCapture={true}>
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <span>{this.props.tooltip}</span>
          </div>
        </ReactTooltip>
      </Container>
    );
  }
}
