import * as React from 'react';
import { Image } from './Image';
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
      style.backgroundColor = 'rgba(255, 255, 255, 0.45)';
    }

    return (
      <div className={styles.loadingContainer} style={style}>
        <Image width={125} src={'/images/iSTOX_Loading-black.gif'} />
      </div>
    );
  }
}
