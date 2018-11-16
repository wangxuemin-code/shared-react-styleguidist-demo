import * as React from 'react';
import * as styles from '../css/Global.css';
import * as buttonStyles from './css/Button.css';
import { Container, IContainer } from './Container';

interface IButton extends IContainer {
  fontSize?: number;
  buttonStyle?: 'one' | 'two' | 'three' | 'dummy';
  type?: 'button' | 'submit';
  onPress?: () => void;
  disabled?: boolean;
}

export class Button extends React.Component<IButton, any> {
  public static defaultProps: IButton = {
    fontSize: 14,
    buttonStyle: 'one',
    type: 'button'
  };

  public render() {
    const classes: string[] = [buttonStyles.button, 'btn'];
    if (this.props.buttonStyle === 'one') {
      classes.push(buttonStyles.buttonStyleOne);
    } else if (this.props.buttonStyle === 'two') {
      classes.push(buttonStyles.buttonStyleTwo);
    } else if (this.props.buttonStyle === 'three') {
      classes.push(buttonStyles.buttonStyleThree);
    } else if (this.props.buttonStyle === 'dummy') {
      classes.push(buttonStyles.buttonStyleDummy);
    }

    if (this.props.disabled) {
      classes.push(buttonStyles.buttonStyleDisabled);
    }

    // if (this.props.italic) {
    //   classes.push(styles.italic);
    // }

    const style: React.CSSProperties = {};

    if (this.props.fontSize && this.props.fontSize > 0) {
      style.fontSize = this.props.fontSize;
    }

    return (
      <Container {...this.props}>
        <button
          type={this.props.type}
          style={style}
          className={classes.join(' ')}
          onClick={this.props.onPress}
          disabled={this.props.disabled}
        >
          {this.props.children}
        </button>
      </Container>
    );
  }
}
