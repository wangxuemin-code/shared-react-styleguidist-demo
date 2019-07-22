import * as React from 'react';
import * as styles from '../css/main.scss';
import { Container, IContainer } from './Container';
import ControlsHelper from './common/ControlsHelper';
import { Link } from './Link';
import { ClipLoader } from 'react-spinners';

interface IButton extends IContainer {
  variant?: 'primary' | 'secondary' | 'info' | 'disabled' | 'success' | 'warning' | 'danger';
  outline?: boolean;
  flat?: boolean;
  type?: 'button' | 'submit';
  onPress?: () => void;
  href?: string;
  disabled?: boolean;
  innerClasses?: string;
  size?: 'tiny' | 'small' | 'medium' | 'large';
  fluid?: boolean;
  loading?: boolean;
  subText?: any;
}

export class Button extends React.Component<IButton, any> {
  public static defaultProps: IButton = {
    type: 'button',
    size: 'medium'
  };

  public render() {
    let classes: string[] = [
      styles.button,
      this.props.size ? this.props.size : '',
      this.props.innerClasses || '',
      this.props.variant || '',
      this.props.outline ? styles.outline : '',
      this.props.flat ? styles.flat : '',
      this.props.disabled || this.props.loading ? styles.cursorDefault : styles.cursorPointer,
      this.props.subText ? styles.subText : '',
      this.props.loading ? styles.verticalAlignMiddle : '',
      this.props.loading ? styles.loading : ''
    ];

    classes = classes.filter(function(el) {
      return el != '';
    });

    let style: React.CSSProperties = {};

    if (this.props.padding) {
      style = { ...style, ...ControlsHelper.processPadding(this.props.padding) };
    }

    if (this.props.href && !this.props.disabled) {
      return (
        <Link underline={false} useNormalAnchor href={this.props.href}>
          {this.getButtonDesign(style, classes)}
        </Link>
      );
    } else {
      if (this.props.classNames) {
        classes = classes.concat(this.props.classNames);
      }
      return this.getButtonDesign(style, classes);
    }
  }

  private getButtonDesign(style: React.CSSProperties, classes: string[]) {
    let filteredProps = {
      ...this.props,
      ...{ classNames: undefined },
      ...{ class: undefined },
      ...{ onClick: undefined }
    };
    return (
      <Container {...filteredProps} display='inline-grid' position='relative'>
        <button
          type={this.props.type}
          style={style}
          className={classes.join(' ')}
          onClick={!this.props.disabled ? this.props.onPress || this.props.onClick : undefined}
          disabled={this.props.disabled}
        >
          {this.props.loading && (
            <ClipLoader
              color={'#fff'}
              sizeUnit={'px'}
              size={
                this.props.size == 'large'
                  ? 18
                  : this.props.size == 'medium'
                  ? 16
                  : this.props.size == 'small'
                  ? 14
                  : this.props.size == 'tiny'
                  ? 12
                  : 16
              }
              loading
            />
          )}
          {this.props.children}
        </button>
        {this.props.subText && <Container textAlign={'center'}>{this.props.subText}</Container>}
      </Container>
    );
  }
}
