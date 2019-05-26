import { IDirection, IDirectionShort, IAllDirection } from './interfaces';

export default class ControlsHelper {
  public static processPadding(
    padding?: IDirection & IDirectionShort & IAllDirection
  ): React.CSSProperties {
    const style: React.CSSProperties = {};

    if (padding) {
      if (padding.allPx) {
        style.paddingLeft = padding.allPx;
        style.paddingRight = padding.allPx;
        style.paddingTop = padding.allPx;
        style.paddingBottom = padding.allPx;
      }
      if (padding.allRem) {
        style.paddingLeft = padding.allRem + 'rem';
        style.paddingRight = padding.allRem + 'rem';
        style.paddingTop = padding.allRem + 'rem';
        style.paddingBottom = padding.allRem + 'rem';
      }
      if (padding.allPercent) {
        style.paddingLeft = padding.allPercent + '%';
        style.paddingRight = padding.allPercent + '%';
        style.paddingTop = padding.allPercent + '%';
        style.paddingBottom = padding.allPercent + '%';
      }

      if (padding.topBottomPx) {
        style.paddingTop = padding.topBottomPx;
        style.paddingBottom = padding.topBottomPx;
      }
      if (padding.topBottomRem) {
        style.paddingTop = padding.topBottomRem + 'rem';
        style.paddingBottom = padding.topBottomRem + 'rem';
      }
      if (padding.topBottomPercent) {
        style.paddingTop = padding.topBottomPercent + '%';
        style.paddingBottom = padding.topBottomPercent + '%';
      }
      if (padding.leftRightPx) {
        style.paddingLeft = padding.leftRightPx;
        style.paddingRight = padding.leftRightPx;
      }
      if (padding.leftRightRem) {
        style.paddingLeft = padding.leftRightRem + 'rem';
        style.paddingRight = padding.leftRightRem + 'rem';
      }
      if (padding.leftRightPercent) {
        style.paddingLeft = padding.leftRightPercent + '%';
        style.paddingRight = padding.leftRightPercent + '%';
      }

      if (padding.topPx) {
        style.paddingTop = padding.topPx;
      }
      if (padding.topRem) {
        style.paddingTop = padding.topRem + 'rem';
      }
      if (padding.topPercent) {
        style.paddingTop = padding.topPercent + '%';
      }
      if (padding.leftPx) {
        style.paddingLeft = padding.leftPx;
      }
      if (padding.leftRem) {
        style.paddingLeft = padding.leftRem + 'rem';
      }
      if (padding.leftRem) {
        style.paddingLeft = padding.leftPercent + '%';
      }
      if (padding.rightPx) {
        style.paddingRight = padding.rightPx;
      }
      if (padding.rightRem) {
        style.paddingRight = padding.rightRem + 'rem';
      }
      if (padding.rightPercent) {
        style.paddingRight = padding.rightPercent + '%';
      }
      if (padding.bottomPx) {
        style.paddingBottom = padding.bottomPx;
      }
      if (padding.bottomRem) {
        style.paddingBottom = padding.bottomRem + 'rem';
      }
      if (padding.bottomPercent) {
        style.paddingBottom = padding.bottomPercent + 'rem';
      }
    }

    return style;
  }

  public static processMargin(
    margin?: IDirection & IDirectionShort & IAllDirection
  ): React.CSSProperties {
    const style: React.CSSProperties = {};

    if (margin) {
      if (margin.allPx) {
        style.marginLeft = margin.allPx;
        style.marginRight = margin.allPx;
        style.marginTop = margin.allPx;
        style.marginBottom = margin.allPx;
      }
      if (margin.allRem) {
        style.marginLeft = margin.allRem + 'rem';
        style.marginRight = margin.allRem + 'rem';
        style.marginTop = margin.allRem + 'rem';
        style.marginBottom = margin.allRem + 'rem';
      }
      if (margin.allPercent) {
        style.marginLeft = margin.allPercent + '%';
        style.marginRight = margin.allPercent + '%';
        style.marginTop = margin.allPercent + '%';
        style.marginBottom = margin.allPercent + '%';
      }

      if (margin.topBottomPx) {
        style.marginTop = margin.topBottomPx;
        style.marginBottom = margin.topBottomPx;
      }
      if (margin.topBottomRem) {
        style.marginTop = margin.topBottomRem + 'rem';
        style.marginBottom = margin.topBottomRem + 'rem';
      }
      if (margin.topBottomPercent) {
        style.marginTop = margin.topBottomPercent + '%';
        style.marginBottom = margin.topBottomPercent + '%';
      }
      if (margin.leftRightPx) {
        style.marginLeft = margin.leftRightPx;
        style.marginRight = margin.leftRightPx;
      }
      if (margin.leftRightRem) {
        style.marginLeft = margin.leftRightRem + 'rem';
        style.marginRight = margin.leftRightRem + 'rem';
      }
      if (margin.leftRightPercent) {
        style.marginLeft = margin.leftRightPercent + '%';
        style.marginRight = margin.leftRightPercent + '%';
      }

      if (margin.topPx) {
        style.marginTop = margin.topPx;
      }
      if (margin.topRem) {
        style.marginTop = margin.topRem + 'rem';
      }
      if (margin.topPercent) {
        style.marginTop = margin.topPercent + '%';
      }
      if (margin.leftPx) {
        style.marginLeft = margin.leftPx;
      }
      if (margin.leftRem) {
        style.marginLeft = margin.leftRem + 'rem';
      }
      if (margin.leftRem) {
        style.marginLeft = margin.leftPercent + '%';
      }
      if (margin.rightPx) {
        style.marginRight = margin.rightPx;
      }
      if (margin.rightRem) {
        style.marginRight = margin.rightRem + 'rem';
      }
      if (margin.rightPercent) {
        style.marginRight = margin.rightPercent + '%';
      }
      if (margin.bottomPx) {
        style.marginBottom = margin.bottomPx;
      }
      if (margin.bottomRem) {
        style.marginBottom = margin.bottomRem + 'rem';
      }
      if (margin.bottomPercent) {
        style.marginBottom = margin.bottomPercent + 'rem';
      }
    }
    return style;
  }
}
