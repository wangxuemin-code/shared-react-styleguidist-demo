import * as React from 'react';
import { Modal as BootstrapModal } from 'react-bootstrap';
import * as styles from './css/Modal.css';
import { Icon } from '.';

interface IState {
  visible: boolean;
}

interface IProps {
  children?: any;
  visible: boolean;
}

export class Modal extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { visible: false };
    this.onModalHide = this.onModalHide.bind(this);
  }

  public componentWillReceiveProps(nextProps: IProps) {
    if (nextProps.visible !== this.state.visible) {
      this.setState({ visible: nextProps.visible });
    }
  }

  public render() {
    return (
      <BootstrapModal
        show={this.state.visible && this.props.visible}
        onHide={this.onModalHide}
        className={styles.myModal}
      >
        <Icon
          iconType={'glyphicon'}
          icon={'remove'}
          className={styles.closeButton}
          onClick={this.onModalHide}
          fontSize={20}
        />
        <BootstrapModal.Body className={styles.myModalBody}>
          {this.props.children}
        </BootstrapModal.Body>
      </BootstrapModal>
    );
  }

  private onModalHide() {
    this.setState({ visible: false });
  }
}
