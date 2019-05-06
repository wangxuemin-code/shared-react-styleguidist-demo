import { BorderColorProperty, BorderStyleProperty } from 'csstype';
import * as React from 'react';
// import { Glyphicon } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IContainer, Container } from './Container';
// import { Button } from '.';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { library } from '@fortawesome/fontawesome-svg-core';
import * as styles from '../css/main.scss';
import SVG from 'react-inlinesvg';

interface IBadge {
  borderSize?: number;
  borderRadius?: number;
  borderColor?: BorderColorProperty;
  borderStyle?: BorderStyleProperty;
  backgroundColor?: string;
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
    // if (this.props.onClick) {
    //   return (
    //     <Button
    //       float={'none'}
    //       className={classes.join(' ')}
    //       {...this.props}
    //       onPress={this.props.onClick}
    //       display={'inline-flex'}
    //     >
    //       {this.getIconDesign()}
    //       {this.props.text && <Container className={styles.iconText}>{this.props.text}</Container>}
    //     </Button>
    //   );
    // } else {
    return (
      <Container className={classes.join(' ')}>
        {this.getIconDesign()}
        {this.props.text && <Container className={styles.iconText}>{this.props.text}</Container>}
      </Container>
    );
    // }
  }

  private getIconDesign() {
    let style: React.CSSProperties = this.props.style || {};
    if (this.props.badge) {
      if (this.props.badge.borderColor) {
        style.borderColor = this.props.badge.borderColor;
      }
      if (this.props.badge.borderRadius) {
        style.borderRadius = this.props.badge.borderRadius;
      }
      if (this.props.badge.borderSize) {
        style.borderWidth = this.props.badge.borderSize;
      }
      if (this.props.badge.borderStyle) {
        style.borderStyle = this.props.badge.borderStyle;
      }
      if (this.props.badge.width) {
        style.width = this.props.badge.width;
      }
      if (this.props.badge.height) {
        style.height = this.props.badge.height;
      }
      if (this.props.badge.backgroundColor) {
        style.backgroundColor = this.props.badge.backgroundColor;
      }
    }
    const src = `./images/svgs/solid/${this.props.icon}.svg`;
    if (this.checkIconType() === 'fontawesome') {
      return (
        <Container style={style} className={styles.svg} {...this.props}>
          <FontAwesomeIcon icon={this.props.icon as IconDefinition} />
        </Container>
      );
    } else {
      return (
        <Container style={style} className={styles.svg} {...this.props}>
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
