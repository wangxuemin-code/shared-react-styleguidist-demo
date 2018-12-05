import * as React from 'react';
import { Modal as BootstrapModal } from 'react-bootstrap';
import * as styles from '../css/main.scss';
import { Icon } from '.';

interface IState {
  visible: boolean;
}

interface IProps {
  children?: any;
  visible: boolean;
  onModalHide: () => void;
}

export class Modal extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { visible: this.props.visible };
    this.onModalHide = this.onModalHide.bind(this);
  }

  public componentWillReceiveProps(nextProps: IProps) {
    if (nextProps.visible !== this.state.visible) {
      this.setState({ visible: nextProps.visible });
    }
  }

  public render() {
    debugger;
    return (
      <BootstrapModal
        show={this.state.visible && this.props.visible}
        onHide={this.onModalHide}
        className={styles.myModal}
      >
        <Icon
          icon={'remove'}
          className={styles.closeButton}
          onClick={this.onModalHide}
          fontSizeRem={1}
        />
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
