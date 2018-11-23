import { IDirection, IDirectionShort, IAllDirection } from './interfaces';

export default class ControlsHelper {
  public static processPadding(
    padding?: IDirection & IDirectionShort & IAllDirection
  ): React.CSSProperties {
    const style: React.CSSProperties = {};

    if (padding) {
      if (padding.topBottomPx) {
        style.paddingTop = padding.topBottomPx;
        style.paddingBottom = padding.topBottomPx;
      }
      if (padding.topBottomRem) {
        style.paddingTop = padding.topBottomRem + 'rem';
        style.paddingBottom = padding.topBottomRem + 'rem';
      }
      if (padding.leftRightPx) {
        style.paddingLeft = padding.leftRightPx;
        style.paddingRight = padding.leftRightPx;
      }
      if (padding.leftRightRem) {
        style.paddingLeft = padding.leftRightRem + 'rem';
        style.paddingRight = padding.leftRightRem + 'rem';
      }
      if (padding.allPx) {
        style.paddingLeft = padding.allPx + 'rem';
        style.paddingRight = padding.allPx + 'rem';
        style.paddingTop = padding.allPx + 'rem';
        style.paddingBottom = padding.allPx + 'rem';
      }
      if (padding.allRem) {
        style.paddingLeft = padding.allRem + 'rem';
        style.paddingRight = padding.allRem + 'rem';
        style.paddingTop = padding.allRem + 'rem';
        style.paddingBottom = padding.allRem + 'rem';
      }

      if (padding.topPx) {
        style.paddingTop = padding.topPx;
      }
      if (padding.topRem) {
        style.paddingTop = padding.topRem + 'rem';
      }
      if (padding.leftPx) {
        style.paddingLeft = padding.leftPx;
      }
      if (padding.leftRem) {
        style.paddingLeft = padding.leftRem + 'rem';
      }
      if (padding.rightPx) {
        style.paddingRight = padding.rightPx;
      }
      if (padding.rightRem) {
        style.paddingRight = padding.rightRem + 'rem';
      }
      if (padding.bottomPx) {
        style.paddingBottom = padding.bottomPx;
      }
      if (padding.bottomRem) {
        style.paddingBottom = padding.bottomRem + 'rem';
      }
    }

    return style;
  }

  public static processMargin(
    margin?: IDirection & IDirectionShort & IAllDirection
  ): React.CSSProperties {
    const style: React.CSSProperties = {};

    if (margin) {
      if (margin.topBottomPx) {
        style.marginTop = margin.topBottomPx;
        style.marginBottom = margin.topBottomPx;
      }
      if (margin.topBottomRem) {
        style.marginTop = margin.topBottomRem + 'rem';
        style.marginBottom = margin.topBottomRem + 'rem';
      }
      if (margin.leftRightPx) {
        style.marginLeft = margin.leftRightPx;
        style.marginRight = margin.leftRightPx;
      }
      if (margin.leftRightRem) {
        style.marginLeft = margin.leftRightRem + 'rem';
        style.marginRight = margin.leftRightRem + 'rem';
      }
      if (margin.allPx) {
        style.marginLeft = margin.allPx + 'rem';
        style.marginRight = margin.allPx + 'rem';
        style.marginTop = margin.allPx + 'rem';
        style.marginBottom = margin.allPx + 'rem';
      }
      if (margin.allRem) {
        style.marginLeft = margin.allRem + 'rem';
        style.marginRight = margin.allRem + 'rem';
        style.marginTop = margin.allRem + 'rem';
        style.marginBottom = margin.allRem + 'rem';
      }

      if (margin.topPx) {
        style.marginTop = margin.topPx;
      }
      if (margin.topRem) {
        style.marginTop = margin.topRem + 'rem';
      }
      if (margin.leftPx) {
        style.marginLeft = margin.leftPx;
      }
      if (margin.leftRem) {
        style.marginLeft = margin.leftRem + 'rem';
      }
      if (margin.rightPx) {
        style.marginRight = margin.rightPx;
      }
      if (margin.rightRem) {
        style.marginRight = margin.rightRem + 'rem';
      }
      if (margin.bottomPx) {
        style.marginBottom = margin.bottomPx;
      }
      if (margin.bottomRem) {
        style.marginBottom = margin.bottomRem + 'rem';
      }
    }

    return style;
  }
}
