import { BorderColorProperty, BorderStyleProperty } from 'csstype';
import * as React from 'react';
// import { Glyphicon } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IContainer, Container } from './Container';
import { Button } from '.';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { library } from '@fortawesome/fontawesome-svg-core';
import * as styles from '../css/main.scss';
import SVG from 'react-inlinesvg';

interface IBadge {
  backgroundColor?: string;
  borderSize?: number;
  borderRadius?: number;
  borderColor?: BorderColorProperty;
  borderStyle?: BorderStyleProperty;
  height?: number;
  width?: number;
}

interface IProps extends IContainer {
  icon: any;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  text?: string;
  badge?: IBadge;
  color?: string;
}

export class Icon extends React.Component<IProps, any> {
  public static defaultProps: IProps = {
    size: 'small',
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
    let classes: string[] = [
      styles.icon,
      this.props.size ? this.props.size : '',
      this.props.className ? this.props.className : ''
    ];
    classes = classes.filter(function(el) {
      return el != '';
    });
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
    const src = `./images/svgs/solid/${this.props.icon}.svg`;
    if (this.checkIconType() === 'fontawesome') {
      return <FontAwesomeIcon icon={this.props.icon as IconDefinition} />;
    } else {
      return (
        <Container className={styles.svg} {...this.props}>
          <SVG style={{ fill: this.props.color }} src={src} />
        </Container>
      );
    }
    // if (this.checkIconType() === 'glyphicon') {
    //   return <Glyphicon glyph={`${this.props.icon}`} />;
    // } else if (this.checkIconType() === 'fontawesome') {
    //   return <FontAwesomeIcon icon={this.props.icon as IconDefinition} />;
    //   // return <FontAwesomeIcon icon={faMobileAndroidAlt as IconDefinition} />;
    // }
  }

  private checkIconType(): 'fontawesomepro' | 'fontawesome' {
    if (typeof this.props.icon !== 'string') {
      return 'fontawesome';
    } else {
      return 'fontawesomepro';
    }
  }
}
