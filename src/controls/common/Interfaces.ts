export interface IAllDirection {
  allPx?: number;
  allRem?: number;
  allPercent?: number;
}

export interface IDirectionShort {
  topBottomPx?: number;
  leftRightPx?: number;
  topBottomRem?: number;
  leftRightRem?: number;
  topBottomPercent?: number;
  leftRightPercent?: number;
}

export interface IDirection {
  topPx?: number;
  leftPx?: number;
  bottomPx?: number;
  rightPx?: number;
  topRem?: number;
  leftRem?: number;
  bottomRem?: number;
  rightRem?: number;
  topPercent?: number;
  leftPercent?: number;
  bottomPercent?: number;
  rightPercent?: number;
}

export interface ISize {
  widthPx?: number;
  heightPx?: number;
  widthRem?: number;
  heightRem?: number;
  widthPercent?: number;
  heightPercent?: number;
}
