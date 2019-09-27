import * as React from 'react';
import { Image } from './Image';
import * as styles from '../css/main.scss';

interface IProps {
  loading?: boolean;
  backDrop?: boolean;
  variant?: 'white' | 'black';
  loadingTime?: number;
}

interface IState {
  showLoading: boolean;
}

export class Loading extends React.Component<IProps, IState> {
  public static defaultProps: IProps = {
    backDrop: true,
    variant: 'black',
    loadingTime: 2000
  };

  constructor(props: IProps) {
    super(props);
    this.state = { showLoading: false };
  }

  public componentDidMount() {
    setTimeout(() => {
      this.setState({ showLoading: true });
    }, this.props.loadingTime);
  }

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
        {this.state.showLoading && (
          <Image width={60} src={'/images/iSTOX-Emblem-Blue-Loading.gif'} />
        )}
      </div>
    );
  }
}
