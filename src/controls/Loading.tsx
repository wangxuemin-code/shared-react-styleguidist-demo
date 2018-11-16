import * as React from 'react';
import { BounceLoader } from 'react-spinners';
import * as loadingStyles from './css/Loading.css';

interface IProps {
  loading?: boolean;
  backDrop?: boolean;
}

export class Loading extends React.Component<IProps, any> {
  public static defaultProps: IProps = {
    backDrop: true
  };

  public render() {
    const style: React.CSSProperties = {};

    if (!this.props.loading) {
      return null;
    }

    if (this.props.backDrop) {
      style.backgroundColor = 'rgba(0, 0, 0, 0.35)';
    }

    return (
      <div className={loadingStyles.loadingContainer} style={style}>
        <BounceLoader sizeUnit={'px'} size={30} color={'#1e998c'} loading={this.props.loading} />
      </div>
    );
  }
}
