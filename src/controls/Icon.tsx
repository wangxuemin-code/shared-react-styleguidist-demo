import * as React from 'react';
import { Glyphicon } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, IContainer } from './Container';
import { Button } from '.';
import { Text } from './Text';

interface IProps extends IContainer {
  iconType?: 'glyphicon' | 'fontawesome';
  fontSize?: number;
  /**
   * For bootstrap glyphicon, do omit the glyphicon when setting icon
   * eg. for "glyphicon glyphicon-question-sign", you only need to set "question-sign"
   */
  icon: any;
  color?: string;
  onClick?: () => void;
}

export class Icon extends React.Component<IProps, any> {
  public static defaultProps: IProps = {
    iconType: 'fontawesome',
    icon: '',
    fontSize: -1
  };

  public render() {
    return this.getWrapper();
  }

  private getWrapper() {
    if (this.props.onClick) {
      return (
        <Button
          {...this.props}
          onPress={this.props.onClick}
          buttonStyle={'dummy'}
          display={'inline-block'}
          fontSize={this.props.fontSize}
        >
          {this.getIconDesign()}
        </Button>
      );
    } else {
      return (
        <Text {...this.props} display={'inline-block'} fontSize={this.props.fontSize}>
          {this.getIconDesign()}
        </Text>
      );
    }
  }

  private getIconDesign() {
    const style: React.CSSProperties = {};
    if (this.props.color) {
      style.color = this.props.color;
    }

    if (this.props.iconType === 'glyphicon') {
      return <Glyphicon style={style} glyph={`${this.props.icon}`} />;
    } else if (this.props.iconType === 'fontawesome') {
      return <FontAwesomeIcon style={style} icon={this.props.icon} />;
    }
  }
}
