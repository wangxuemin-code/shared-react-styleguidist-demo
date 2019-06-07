/// <reference types="react" />
import { IDirection, IDirectionShort, IAllDirection } from './Interfaces';
export default class ControlsHelper {
    static processPadding(padding?: IDirection & IDirectionShort & IAllDirection): React.CSSProperties;
    static processMargin(margin?: IDirection & IDirectionShort & IAllDirection): React.CSSProperties;
}
