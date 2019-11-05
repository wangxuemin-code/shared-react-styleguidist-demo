import { faCheck, faTimes, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';
import { cssTransition, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as styles from '../css/main.scss';
import { IContainer, Container, Icon } from '.';

interface IBlockchainTransactionOptions {
  purpose: string;
  message?: string;
}

interface IProps extends IContainer {
  type: 'transaction_status_ok' | 'transaction_status_fail';
  blockchainTransactionOptions?: IBlockchainTransactionOptions;
  icon?: IconDefinition;
  children?: React.ReactNode;
}

export class BlockchainToast extends React.Component {
  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    return <ToastContainer />;
  }

  // can only use html element, not react element
  private static getTransactionDesign(props: IProps) {
    let blockchainTransactionOptions: IBlockchainTransactionOptions = {
      purpose: 'Unknown',
      message: ''
    };
    if (props.blockchainTransactionOptions) {
      blockchainTransactionOptions = props.blockchainTransactionOptions;
    }
    if (props.type == 'transaction_status_ok') {
      props.icon = faCheck;
      blockchainTransactionOptions.purpose =
        'Transaction for ' + blockchainTransactionOptions.purpose + ' has been registered on Blockchain successfully.';
    }
    if (props.type == 'transaction_status_fail') {
      props.icon = faTimes;
      blockchainTransactionOptions.purpose =
        'Transaction for ' + blockchainTransactionOptions.purpose + ' failed to register on Blockchain.';
    }

    return (
      <div className='row'>
        <div className='column left'>
          <div className='centered'>
            <Icon icon={props.icon} size={'medium'} />
          </div>
        </div>
        <div className='column right'>
          <p className='purpose'>
            {blockchainTransactionOptions.purpose}
            {blockchainTransactionOptions.message && (
              <Container margin={{ topPx: 15 }}>{blockchainTransactionOptions.message}</Container>
            )}
          </p>
        </div>
      </div>
    );
  }

  public static show(props: IProps) {
    let variant: string;
    if (props.type == 'transaction_status_ok') {
      variant = 'success';
    } else {
      variant = 'danger';
    }
    let classes: string[] = [styles.istoxBlockchainToast, variant];

    classes = classes.filter(function(el) {
      return el != '';
    });

    const FadeInAndOut = cssTransition({
      enter: 'fadeIn',
      exit: 'fadeOut',
      duration: 500
    });

    toast(BlockchainToast.getTransactionDesign(props), {
      position: 'top-right',
      hideProgressBar: true,
      autoClose: 5000,
      pauseOnHover: true,
      draggable: false,
      closeOnClick: false,
      className: classes.join(' '),
      transition: FadeInAndOut
    });
  }
}
