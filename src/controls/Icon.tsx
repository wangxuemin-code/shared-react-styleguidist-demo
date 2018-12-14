import * as React from 'react';
import { Glyphicon } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IContainer, Container } from './Container';
import { Button } from '.';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { library } from '@fortawesome/fontawesome-svg-core';

interface IProps extends IContainer {
  /**
   * For bootstrap glyphicon, do omit the glyphicon when setting icon
   * eg. for "glyphicon glyphicon-question-sign", you only need to set "question-sign"
   */
  icon: any;
  onClick?: () => void;
  text?: string;
}

export class Icon extends React.Component<IProps, any> {
  public static defaultProps: IProps = {
    icon: ''
  };

  constructor(props: IProps) {
    super(props);
    if (this.checkIconType() === 'fontawesome') {
      library.add(this.props.icon as IconDefinition);
    }
  }

  public render() {
    return this.getWrapper();
  }

  private getWrapper() {
    if (this.props.onClick) {
      return (
        <Button
          {...this.props}
          onPress={this.props.onClick}
          buttonStyle={'none'}
          display={'inline-block'}
        >
          {this.getIconDesign()} {this.props.text}
        </Button>
      );
    } else {
      return (
        <Container {...this.props} display={'inline-block'}>
          {this.getIconDesign()} {this.props.text}
        </Container>
      );
    }
  }

  private getIconDesign() {
    if (this.checkIconType() === 'glyphicon') {
      return <Glyphicon glyph={`${this.props.icon}`} style={{ marginRight: 3 }} />;
    } else if (this.checkIconType() === 'fontawesome') {
      return (
        <FontAwesomeIcon icon={this.props.icon as IconDefinition} style={{ marginRight: 3 }} />
      );
    }
  }

  private checkIconType(): 'glyphicon' | 'fontawesome' {
    if (typeof this.props.icon !== 'string') {
      return 'fontawesome';
    } else {
      return 'glyphicon';
    }
  }
}
