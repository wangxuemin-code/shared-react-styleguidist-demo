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
}

export class Button extends React.Component<IButton, any> {
  public static defaultProps: IButton = {
    type: 'button',
    size: 'small',
    float: 'left'
  };

  public render() {
    let containerClasses = [
      this.props.fluid ? 'fluid' : '',
      this.props.float ? (this.props.float == 'left' ? styles.left : styles.right) : ''
    ];
    let classes: string[] = [
      styles.button,
      this.props.size ? this.props.size : '',
      this.props.innerClasses || '',
      this.props.variant || '',
      this.props.outline ? 'outline' : '',
      this.props.basic ? 'basic' : '',
      this.props.flat ? 'flat' : '',
      this.props.disabled ? styles.disabled : ''
    ];

    containerClasses = containerClasses.filter(function(el) {
      return el != '';
    });

    classes = classes.filter(function(el) {
      return el != '';
    });

    let style: React.CSSProperties = {};

    if (this.props.padding) {
      style = { ...style, ...ControlsHelper.processPadding(this.props.padding) };
    }

    if (this.props.href && !this.props.disabled) {
      return (
        <Link href={this.props.href}>{this.getButtonDesign(style, classes, containerClasses)}</Link>
      );
    } else {
      if (this.props.classNames) {
        classes = classes.concat(this.props.classNames);
      }
      return this.getButtonDesign(style, classes, containerClasses);
    }
  }

  private getButtonDesign(
    style: React.CSSProperties,
    classes: string[],
    containerClasses: string[]
  ) {
    // remove padding, so that it won't get passed to Container
    // let filteredProps = { ...this.props, ...{ classNames: undefined }, ...{ class: undefined } };

    return (
      <Container
        className={containerClasses.join(' ')}
        // {...filteredProps}
        display='inline-block'
        position='relative'
      >
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
