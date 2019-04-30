import * as React from 'react';
import { BounceLoader } from 'react-spinners';
import * as styles from '../css/main.scss';
import { stylings } from '../css/theme';

interface IProps {
  loading?: boolean;
  backDrop?: boolean;
  variant?: 'white' | 'black';
}

export class Loading extends React.Component<IProps, any> {
  public static defaultProps: IProps = {
    backDrop: true,
    variant: 'black'
  };

  public render() {
    const style: React.CSSProperties = {};

    if (!this.props.loading) {
      return null;
    }

    if (this.props.backDrop && this.props.variant === 'black') {
      style.backgroundColor = 'rgba(0, 0, 0, 0.35)';
    }
    if (this.props.backDrop && this.props.variant === 'white') {
      style.backgroundColor = 'rgba(1, 1, 1, 0.35)';
    }

    return (
      <div className={styles.loadingContainer} style={style}>
        <BounceLoader
          sizeUnit={'px'}
          size={30}
          color={stylings.colors.primary}
          loading={this.props.loading}
        />
      </div>
    );
  }
}
