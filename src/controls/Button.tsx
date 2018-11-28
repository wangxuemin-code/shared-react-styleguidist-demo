import * as React from 'react';
import * as styles from '../css/main.scss';
import { Container, IContainer } from './Container';
import ControlsHelper from './common/ControlsHelper';
import { Link } from './Link';

interface IButton extends IContainer {
  buttonStyle?: 'normal' | 'invert' | 'none';
  type?: 'button' | 'submit';
  onPress?: () => void;
  href?: string;
  disabled?: boolean;
  innerClasses?: string;
  size?: 'medium' | 'large';
}

export class Button extends React.Component<IButton, any> {
  public static defaultProps: IButton = {
    buttonStyle: 'normal',
    type: 'button',
    size: 'medium'
  };

  public render() {
    const classes: string[] = [
      styles.button,
      this.props.size === 'large' ? styles.buttonLg : '',
      this.props.innerClasses || ''
    ];

    if (this.props.buttonStyle === 'none') {
      classes.push(styles.buttonNone);
    }

    if (this.props.disabled) {
      classes.push(styles.disabled);
    }

    let style: React.CSSProperties = {};

    if (this.props.padding) {
      style = { ...style, ...ControlsHelper.processPadding(this.props.padding) };
    }

    // remove padding, so that it won't get passed to Container
    let filteredProps = { ...this.props, ...{ padding: undefined } };

    return (
      <Container {...filteredProps}>
        {this.props.href && !this.props.disabled && (
          <Link href={this.props.href}>{this.getButtonDesign(style, classes)}</Link>
        )}
        {(!this.props.href || this.props.disabled) && this.getButtonDesign(style, classes)}
      </Container>
    );
  }

  private getButtonDesign(style: React.CSSProperties, classes: string[]) {
    return (
      <button
        type={this.props.type}
        style={style}
        className={classes.join(' ')}
        onClick={this.props.onPress}
        disabled={this.props.disabled}
      >
        {this.props.children}
      </button>
    );
  }
}
