import * as React from 'react';
import * as styles from '../css/main.scss';
import { Container, IContainer } from './Container';
import ControlsHelper from './common/ControlsHelper';
import { Link } from './Link';
import { Icon as ReactIcon } from 'antd';

const SpinnerSVG = () => (
  <svg className='rotate icon' viewBox='0 0 1024 1024' fill='currentColor' width='1em' height='1em'>
    <path
      d='M1023.849566 529.032144C1022.533495 457.744999 1007.544916 386.64064 979.907438 321.641387 952.343075 256.605575 912.349158 197.674868 863.252422 148.980264 814.192243 100.249102 755.992686 61.717486 693.004095 36.310016 630.052062 10.792874 562.347552-1.380777 495.483865 0.081523 428.620178 1.470709 362.012394 16.495846 301.144139 44.206439 240.202769 71.807359 185.000928 111.874391 139.377154 161.044242 93.753381 210.177537 57.707676 268.450209 33.945294 331.475357 10.073239 394.463948-1.296147 462.1319 0.166154 529.032144 1.482224 595.968946 15.593423 662.503615 41.549256 723.371871 67.468531 784.240126 105.013094 839.405409 151.075558 884.956067 197.101464 930.579841 251.645269 966.552431 310.612534 990.241698 369.543241 1014.040637 432.860849 1025.336908 495.483865 1023.874608 558.143438 1022.485422 620.291206 1008.337666 677.174693 982.381833 734.094737 956.462558 785.677384 918.954552 828.230327 872.892089 870.819826 826.902741 904.416179 772.395492 926.533473 713.5379 939.986637 677.85777 949.089457 640.605667 953.915048 602.841758 955.194561 602.951431 956.510631 602.987988 957.790144 602.987988 994.27454 602.987988 1023.849566 572.425909 1023.849566 534.735116 1023.849566 532.834125 1023.739893 530.933135 1023.593663 529.032144L1023.849566 529.032144 1023.849566 529.032144ZM918.892953 710.284282C894.691881 767.021538 859.596671 818.421398 816.568481 860.82811 773.540291 903.307938 722.652236 936.75806 667.706298 958.729124 612.760359 980.773303 553.902767 991.192193 495.483865 989.729893 437.064963 988.377265 379.304096 975.106889 326.441936 950.832702 273.543218 926.668187 225.616322 891.682649 186.097653 848.764132 146.542426 805.91873 115.35887 755.176905 94.959779 700.486869 74.451015 645.796833 64.799833 587.195144 66.189018 529.032144 67.541646 470.869145 79.934642 413.437296 102.563741 360.867595 125.119725 308.297895 157.765582 260.663459 197.759499 221.364135 237.716858 182.064811 284.985719 151.137157 335.910331 130.884296 386.834944 110.55832 441.305634 101.01681 495.483865 102.47911 549.662096 103.868296 603.036061 116.261292 651.876895 138.780718 700.754287 161.22703 745.025432 193.690099 781.509828 233.428113 818.067339 273.166127 846.764984 320.142529 865.518987 370.665008 884.346105 421.224045 893.156465 475.256046 891.76728 529.032144L891.986625 529.032144C891.840395 530.933135 891.76728 532.797568 891.76728 534.735116 891.76728 569.939999 917.540325 598.893547 950.66143 602.585856 944.227308 639.728286 933.589072 675.956779 918.892953 710.284282Z'
      p-id='3384'
    />
  </svg>
);

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

    if (this.props.padding || this.props.margin) {
      style = {
        ...style,
        ...ControlsHelper.processPadding(this.props.padding),
        ...ControlsHelper.processMargin(this.props.margin)
      };
    }

    if (this.props.href && !this.props.disabled) {
      return (
        <Link underline={false} href={this.props.href}>
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
      ...{ onClick: undefined },
      ...{ padding: undefined },
      ...{ margin: undefined }
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
            <ReactIcon
              component={SpinnerSVG}
              style={{
                fontSize:
                  this.props.size == 'large'
                    ? 18
                    : this.props.size == 'medium'
                    ? 16
                    : this.props.size == 'small'
                    ? 14
                    : this.props.size == 'tiny'
                    ? 12
                    : 16
              }}
              spin
            />
          )}
          {this.props.children}
        </button>
        {this.props.subText && <Container textAlign={'center'}>{this.props.subText}</Container>}
      </Container>
    );
  }
}
