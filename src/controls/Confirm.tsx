import { faExclamationCircle, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { Button, Icon, Modal } from '.';
import * as styles from '../css/main.scss';
import { Container, IContainer } from './Container';
import { Loading } from './Loading';

interface IProps extends IContainer {
  title?: string;
  message: string;
  type: 'yesno' | 'confirm' | 'okonly' | 'error' | 'blocking-load';
  onResult?: (positive: boolean) => void;
}

interface IState {
  show: boolean;
}

export class Confirm extends React.Component<IProps, IState> {
  private handled: boolean;

  public constructor(props: IProps) {
    super(props);
    this.state = { show: true };
    this.onPositivePressed = this.onPositivePressed.bind(this);
    this.onNegativePressed = this.onNegativePressed.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  public render() {
    if (this.props.type === 'blocking-load') {
      return (
        <Modal visible={this.state.show} onExited={this.onExited} width={500} disableClose={true}>
          <Container className={styles.blockingLoadContainer}>
            <Container className={styles.loadingIconContainer}>
              <Loading loading={true} backDrop={false} />
            </Container>

            <Container>{this.props.message}</Container>
          </Container>
        </Modal>
      );
    } else {
      let defaultMessage = '';
      if (this.props.type === 'yesno' || this.props.type === 'confirm') {
        defaultMessage = 'Are you sure?';
      } else if (this.props.type === 'error') {
        defaultMessage = 'Request failed.';
      } else if (this.props.type === 'okonly') {
        defaultMessage = '';
      }

      return (
        <Modal visible={this.state.show} onExited={this.onExited}>
          <Container className={styles.confirmContainer}>
            <Icon display='block' icon={this.getIcon()} classNames={[styles.iconContainer]} />
            <h2>{this.props.title || defaultMessage}</h2>
            <Container className={styles.contentContainer}>{this.props.message}</Container>
            <Container className={styles.buttonsContainer}>
              {this.props.type === 'confirm' && (
                <div>
                  <Button
                    float={'none'}
                    flat
                    variant={'secondary'}
                    margin={{ rightPx: 30 }}
                    onPress={this.onNegativePressed}
                    className={styles.confirmCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    float={'none'}
                    outline
                    variant={'danger'}
                    onPress={this.onPositivePressed}
                  >
                    Confirm
                  </Button>
                </div>
              )}
              {this.props.type === 'yesno' && (
                <div>
                  <Button
                    float={'none'}
                    flat
                    variant={'secondary'}
                    margin={{ rightPx: 30 }}
                    onPress={this.onNegativePressed}
                    className={styles.confirmCancel}
                  >
                    No
                  </Button>
                  <Button
                    float={'none'}
                    outline
                    variant={'danger'}
                    onPress={this.onPositivePressed}
                  >
                    Yes
                  </Button>
                </div>
              )}
              {this.props.type === 'okonly' && (
                <div>
                  <Button float={'none'} variant={'primary'} onPress={this.onPositivePressed}>
                    OK
                  </Button>
                </div>
              )}
            </Container>
          </Container>
        </Modal>
      );
    }
  }

  public getIcon() {
    if (this.props.type === 'confirm' || this.props.type === 'yesno') {
      return faQuestionCircle;
    } else if (this.props.type === 'okonly') {
      return faExclamationCircle;
    } else if (this.props.type === 'error') {
      return faExclamationCircle;
    }
  }

  public onPositivePressed() {
    this.handled = true;
    this.setState({ show: false });
    if (this.props.onResult) this.props.onResult(true);
  }

  public onNegativePressed() {
    this.handled = false;
    this.setState({ show: false });
    if (this.props.onResult) this.props.onResult(false);
  }

  private onExited() {
    if (!this.handled) {
      this.handled = true;
      if (this.props.onResult) this.props.onResult(false);
    }

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

  public static destroy() {
    const target = document.getElementById('istox-confirm');
    if (target && target.parentNode) {
      unmountComponentAtNode(target);
      target.parentNode.removeChild(target);
    }
  }
}
