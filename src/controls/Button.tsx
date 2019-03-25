import * as React from 'react';
import * as styles from '../css/main.scss';
import { Container, IContainer } from './Container';
import ControlsHelper from './common/ControlsHelper';
import { Link } from './Link';
import { Loading } from '.';

interface IButton extends IContainer {
  buttonStyle?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'info'
    | 'invert'
    | 'success'
    | 'warning'
    | 'danger'
    | 'none';
  outline?: boolean;
  type?: 'button' | 'submit';
  onPress?: () => void;
  href?: string;
  disabled?: boolean;
  innerClasses?: string;
  size?: 'medium' | 'large' | 'small';
  loading?: boolean;
}

export class Button extends React.Component<IButton, any> {
  public static defaultProps: IButton = {
    buttonStyle: 'default',
    type: 'button',
    size: 'medium'
  };

  public render() {
    let classes: string[] = [
      styles.button,
      this.props.size === 'large' ? styles.buttonLg : '',
      this.props.size === 'small' ? styles.buttonSm : '',
      this.props.innerClasses || ''
    ];

    if (this.props.buttonStyle === 'none') {
      classes.push(styles.buttonNone);
    } else if (this.props.buttonStyle === 'info') {
      classes.push(styles.buttonInfo);
    } else if (this.props.buttonStyle === 'primary') {
      classes.push(styles.buttonPrimary);
    } else if (this.props.buttonStyle === 'secondary') {
      classes.push(styles.buttonSecondary);
    } else if (this.props.buttonStyle === 'success') {
      classes.push(styles.buttonSuccess);
    } else if (this.props.buttonStyle === 'warning') {
      classes.push(styles.buttonWarning);
    } else if (this.props.buttonStyle === 'danger') {
      classes.push(styles.buttonDanger);
    }

    if (this.props.outline) {
      classes.push('outline');
    }

    if (this.props.disabled) {
      classes.push(styles.disabled);
    }

    let style: React.CSSProperties = {};

    if (this.props.padding) {
      style = { ...style, ...ControlsHelper.processPadding(this.props.padding) };
    }

    if (this.props.href && !this.props.disabled) {
      return <Link href={this.props.href}>{this.getButtonDesign(style, classes)}</Link>;
    } else {
      if (this.props.classNames) {
        classes = classes.concat(this.props.classNames);
      }

      return this.getButtonDesign(style, classes);
    }
  }

  private getButtonDesign(style: React.CSSProperties, classes: string[]) {
    // remove padding, so that it won't get passed to Container
    let filteredProps = { ...this.props, ...{ classNames: undefined }, ...{ class: undefined } };

    return (
      <Container {...filteredProps} display='inline-block' position='relative'>
        {this.props.loading && (
          <div className={styles.btnLoading}>
            <Loading backDrop={false} loading={this.props.loading} />
          </div>
        )}

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
