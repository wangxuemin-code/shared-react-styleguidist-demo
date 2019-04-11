import * as React from 'react';
import * as styles from '../css/main.scss';
import { Container, IContainer } from './Container';
import ControlsHelper from './common/ControlsHelper';
import { Link } from './Link';
import { Loading } from '.';

interface IButton extends IContainer {
  variant?: 'primary' | 'secondary' | 'info' | 'disabled' | 'success' | 'warning' | 'danger';
  outline?: boolean;
  basic?: boolean;
  flat?: boolean;
  type?: 'button' | 'submit';
  onPress?: () => void;
  href?: string;
  disabled?: boolean;
  innerClasses?: string;
  size?: 'small' | 'medium' | 'large';
  fluid?: boolean;
  loading?: boolean;
  float?: 'left' | 'right' | 'none';
  subText?: string;
}

export class Button extends React.Component<IButton, any> {
  public static defaultProps: IButton = {
    type: 'button',
    size: 'small',
    float: 'left'
  };

  public render() {
    let classes: string[] = [
      styles.button,
      this.props.size ? this.props.size : '',
      this.props.innerClasses || '',
      this.props.variant || '',
      this.props.outline ? styles.outline : '',
      this.props.basic ? styles.basic : '',
      this.props.flat ? styles.flat : '',
      this.props.disabled ? styles.disabled : '',
      this.props.subText ? styles.subText : ''
    ];

    classes = classes.filter(function(el) {
      return el != '';
    });

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
      <Container {...filteredProps} display='inline-grid' position='relative'>
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
        <Container textAlign={'center'} padding={{ topRem: 0.3 }}>
          {this.props.subText}
        </Container>
      </Container>
    );
  }
}
