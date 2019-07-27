import * as React from 'react';
import { Modal as ReactModal } from 'antd';
import * as styles from '../css/main.scss';
import { Icon } from '.';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface IState {
  visible: boolean;
  width?: number;
}

interface IProps {
  children?: any;
  visible: boolean;
  onModalHide?: () => void;
  onExited?: () => void;
  className?: string;
  width?: number;
}

export class Modal extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { visible: this.props.visible, width: this.props.width };
    this.onModalHide = this.onModalHide.bind(this);
  }

  public componentWillReceiveProps(nextProps: IProps) {
    if (nextProps.visible !== this.state.visible) {
      this.setState({ visible: nextProps.visible });
    }

    if (nextProps.width !== this.state.width && this.state.visible) {
      this.setState({ width: nextProps.width });
    }
  }

  public render() {
    return (
      <ReactModal
        visible={this.state.visible && this.props.visible}
        wrapClassName={[styles.myModal, this.props.className || ''].join(' ')}
        afterClose={this.props.onExited}
        destroyOnClose={true}
        footer={null}
        closable={false}
        width={this.state.width}
        maskClosable={true}
      >
        <Icon icon={faTimes} className={styles.closeButton} onClick={this.onModalHide} />
        {this.props.children}
      </ReactModal>
    );
  }

  private onModalHide() {
    this.setState({ visible: false });
  }
}
