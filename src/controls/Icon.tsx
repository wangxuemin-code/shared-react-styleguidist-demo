import * as React from 'react';
// import { Glyphicon } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IContainer, Container } from './Container';
import { Button } from '.';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { library } from '@fortawesome/fontawesome-svg-core';
import * as styles from '../css/main.scss';

interface IProps extends IContainer {
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
      library.add(this.props.icon as any);
    }
  }

  public render() {
    return this.getWrapper();
  }

  private getWrapper() {
    let classes: string[] = [styles.icon, this.props.className ? this.props.className : ''];
    if (this.props.onClick) {
      return (
        <Button
          float={'none'}
          className={classes.join(' ')}
          {...this.props}
          onPress={this.props.onClick}
          display={'inline-flex'}
        >
          {this.getIconDesign()} {this.props.text}
        </Button>
      );
    } else {
      return (
        <Container {...this.props} className={classes.join(' ')}>
          {this.getIconDesign()} {this.props.text}
        </Container>
      );
    }
  }

  private getIconDesign() {
    const string: any = 'adjust';
    if (typeof this.props.icon !== 'string') {
      return <FontAwesomeIcon icon={this.props.icon as IconDefinition} />;
    } else {
      //return <FontAwesomeIcon icon='adjust' />;
      console.log(this.props.icon);
    }

    // if (this.checkIconType() === 'glyphicon') {
    //   return <Glyphicon glyph={`${this.props.icon}`} />;
    // } else if (this.checkIconType() === 'fontawesome') {
    //   return <FontAwesomeIcon icon={this.props.icon as IconDefinition} />;
    //   // return <FontAwesomeIcon icon={faMobileAndroidAlt as IconDefinition} />;
    // }
  }

  private checkIconType(): 'glyphicon' | 'fontawesome' {
    // return 'fontawesome';
    if (typeof this.props.icon !== 'string') {
      return 'fontawesome';
    } else {
      return 'glyphicon';
    }
  }
}
