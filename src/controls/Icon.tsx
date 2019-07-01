import { BorderColorProperty, BorderStyleProperty } from 'csstype';
import * as React from 'react';
// import { Glyphicon } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IContainer, Container } from './Container';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { library } from '@fortawesome/fontawesome-svg-core';
import * as styles from '../css/main.scss';
import SVG from 'react-inlinesvg';
import { countries } from 'country-data';
import ReactCountryFlag from 'react-country-flag';

interface IBadge {
  borderSize?: number;
  borderRadius?: number;
  borderColor?: BorderColorProperty;
  borderStyle?: BorderStyleProperty;
  backgroundColor?: string;
  height?: number;
  width?: number;
  iconBackground?: boolean;
  fontSize?: number;
  topPx?: number;
  leftPx?: number;
}

interface IProps extends IContainer {
  icon: any;
  variant?: 'primary' | 'secondary' | 'info' | 'disabled' | 'success' | 'warning' | 'danger';
  size?: 'tiny' | 'small' | 'medium' | 'large';
  onClick?: () => void;
  text?: string;
  badge?: IBadge;
  flag?: string;
  currency?: string;
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
      this.props.variant || '',
      this.props.size ? this.props.size : '',
      this.props.className ? this.props.className : '',
      this.props.badge ? styles.badge : '',
      this.props.flag ? styles.country : '',
      this.props.currency ? styles.country : '',
      this.props.badge ? (this.props.badge.iconBackground ? styles.iconBackground : '') : ''
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
    let style: React.CSSProperties = this.props.style || {};
    let iconStyle: React.CSSProperties = {};
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
      if (this.props.badge.fontSize) {
        style.fontSize = this.props.badge.fontSize;
      }
      if (this.props.badge.leftPx) {
        iconStyle.left = this.props.badge.leftPx + 'px';
      }
      if (this.props.badge.topPx) {
        iconStyle.top = this.props.badge.topPx + 'px';
      }
    }
    return (
      <Container style={style} className={classes.join(' ')}>
        {this.getIconDesign(iconStyle)}
        {this.props.text && <Container className={styles.iconText}>{this.props.text}</Container>}
      </Container>
    );
    // }
  }

  private getIconDesign(iconStyle: React.CSSProperties) {
    switch (this.checkIconType()) {
      case 'fontawesome':
        return (
          <Container style={iconStyle} className={styles.svg} {...this.props}>
            <FontAwesomeIcon color={this.props.color} icon={this.props.icon as IconDefinition} />
          </Container>
        );
        break;
      case 'fontawesomepro':
        let src = '';
        if (this.props.icon) {
          src = `./images/svgs/solid/${this.props.icon}.svg`;
        }
        return (
          <Container style={iconStyle} className={styles.svg} {...this.props}>
            <SVG style={{ fill: this.props.color }} src={src} />
          </Container>
        );
        break;
      case 'flag':
        const flag = countries.all.filter((obj: any) => obj.alpha2 === this.props.flag)[0];
        return (
          <Container className={styles.flag} {...this.props}>
            {flag && <ReactCountryFlag code={flag.alpha2} svg />}
          </Container>
        );
        break;
      case 'currency':
        const currency = countries.all.filter(
          (obj: any) => obj.currencies[0] === this.props.currency
        )[0];
        return (
          <Container className={styles.flag} {...this.props}>
            {currency && <ReactCountryFlag code={currency.alpha2} svg />}
          </Container>
        );
        break;
    }
  }

  private checkIconType(): 'fontawesomepro' | 'fontawesome' | 'flag' | 'currency' {
    if (this.props.currency) {
      return 'currency';
    } else if (this.props.flag) {
      return 'flag';
    } else if (typeof this.props.icon !== 'string') {
      return 'fontawesome';
    } else {
      return 'fontawesomepro';
    }
  }
}
