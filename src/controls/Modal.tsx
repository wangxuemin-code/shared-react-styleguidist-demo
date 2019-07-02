import * as React from 'react';
import { Modal as BootstrapModal } from 'react-bootstrap';
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

    if (nextProps.width !== this.state.width) {
      this.setState({ width: nextProps.width });
    }
  }

  public render() {
    return (
      <BootstrapModal
        show={this.state.visible && this.props.visible}
        onHide={this.onModalHide}
        className={[styles.myModal, this.props.className || ''].join(' ')}
        onExited={this.props.onExited}
      >
        <span
          ref={(ref) => {
            if (ref && this.state.width) {
              const modalDialog = ref.closest('.modal-dialog');

              if (modalDialog) {
                modalDialog.setAttribute('style', `width: ${this.state.width}px`);
              }
            }
          }}
        />
        <Icon icon={faTimes} className={styles.closeButton} onClick={this.onModalHide} />
        <BootstrapModal.Body className={styles.myModalBody}>
          {this.props.children}
        </BootstrapModal.Body>
      </BootstrapModal>
    );
  }

  private onModalHide() {
    this.setState({ visible: false });
    if (this.props.onModalHide) this.props.onModalHide();
  }
}
