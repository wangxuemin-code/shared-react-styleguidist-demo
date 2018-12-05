import * as React from 'react';
import * as styles from '../css/main.scss';
import { Container, IContainer } from './Container';
import { Modal, Icon, Button } from '.';
import { faQuestionCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { render, unmountComponentAtNode } from 'react-dom';

interface IProps extends IContainer {
  title?: string;
  message: string;
  type: 'yesno' | 'confirm' | 'okonly';
  onResult?: (positive: boolean) => void;
}

interface IState {
  show: boolean;
}

export class Confirm extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = { show: true };
    this.onModalHide = this.onModalHide.bind(this);
    this.onPositivePressed = this.onPositivePressed.bind(this);
    this.onNegativePressed = this.onNegativePressed.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  public render() {
    return (
      <Modal visible={this.state.show} onModalHide={this.onModalHide} onExited={this.onExited}>
        <Container className={styles.confirmContainer}>
          <Icon display='block' icon={this.getIcon()} classNames={[styles.iconContainer]} />
          <h2>{this.props.title || 'Are you sure?'}</h2>
          <Container className={styles.contentContainer}>{this.props.message}</Container>
          <Container className={styles.buttonsContainer}>
            {this.props.type === 'confirm' && (
              <div>
                <Button
                  buttonStyle={'negative'}
                  margin={{ rightPx: 30 }}
                  onPress={this.onNegativePressed}
                >
                  Cancel
                </Button>
                <Button buttonStyle={'info'} onPress={this.onPositivePressed}>
                  Confirm
                </Button>
              </div>
            )}
            {this.props.type === 'yesno' && (
              <div>
                <Button
                  buttonStyle={'negative'}
                  margin={{ rightPx: 30 }}
                  onPress={this.onNegativePressed}
                >
                  No
                </Button>
                <Button buttonStyle={'info'} onPress={this.onPositivePressed}>
                  Yes
                </Button>
              </div>
            )}
            {this.props.type === 'okonly' && (
              <div>
                <Button buttonStyle={'info'} onPress={this.onPositivePressed}>
                  OK
                </Button>
              </div>
            )}
          </Container>
        </Container>
      </Modal>
    );
  }

  public getIcon() {
    if (this.props.type === 'confirm' || this.props.type === 'yesno') {
      return faQuestionCircle;
    } else if (this.props.type === 'okonly') {
      return faCheckCircle;
    }
  }

  public onModalHide() {
    this.onNegativePressed();
  }

  public onPositivePressed() {
    this.setState({ show: false });
    if (this.props.onResult) this.props.onResult(true);
  }

  public onNegativePressed() {
    this.setState({ show: false });
    if (this.props.onResult) this.props.onResult(false);
  }

  private onExited() {
    const target = document.getElementById('istox-confirm');
    if (target && target.parentNode) {
      unmountComponentAtNode(target);
      target.parentNode.removeChild(target);
    }
  }

  private static createElementReconfirm(props: IProps) {
    let divTarget: HTMLElement = document.createElement('div');
    divTarget.id = 'istox-confirm';
    document.body.appendChild(divTarget);
    render(<Confirm {...props} />, divTarget);
  }

  public static show(props: IProps) {
    this.createElementReconfirm(props);
  }
}