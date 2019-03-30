import * as React from 'react';
import * as styles from '../css/main.scss';
import { Container, IContainer } from './Container';
import ControlsHelper from './common/ControlsHelper';
import { Link } from './Link';
import { Loading } from '.';

interface IButton extends IContainer {
  variant?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'info'
    | 'disabled'
    | 'success'
    | 'warning'
    | 'danger'
    | 'none';
  outline?: boolean;
  basic?: boolean;
  flat?: boolean;
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
    variant: 'default',
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

    if (this.props.variant) {
      classes.push(this.props.variant);
    }
    if (this.props.outline) {
      classes.push('outline');
    }

    if (this.props.basic) {
      classes.push('basic');
    }

    if (this.props.flat) {
      classes.push('flat');
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
