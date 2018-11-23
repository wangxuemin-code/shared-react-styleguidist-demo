export interface IAllDirection {
  allPx?: number;
  allRem?: number;
}

export interface IDirectionShort {
  topBottomPx?: number;
  leftRightPx?: number;
  topBottomRem?: number;
  leftRightRem?: number;
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
}

export interface ISize {
  widthPx?: number;
  heightPx?: number;
  widthRem?: number;
  heightRem?: number;
}
