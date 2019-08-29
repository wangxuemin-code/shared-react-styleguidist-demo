import * as React from 'react';
import { toast, ToastContainer, cssTransition } from 'react-toastify';
import { IContainer } from './Container';
import { Icon, Transition } from '.';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';
import {
  faCheck,
  faTimes,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import * as styles from '../css/main.scss';
import 'react-toastify/dist/ReactToastify.css';

interface IBlockchainTransactionOptions {
  purpose: string;
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
      purpose: 'Unknown'
    };
    if (props.blockchainTransactionOptions) {
      blockchainTransactionOptions = props.blockchainTransactionOptions;
    }
    if (props.type == 'transaction_status_ok') {
      props.icon = faCheck;
      blockchainTransactionOptions.purpose =
        'You have approved token to be' + blockchainTransactionOptions.purpose;
    }
    if (props.type == 'transaction_status_fail') {
      props.icon = faTimes;
      blockchainTransactionOptions.purpose =
        'You have failed to approve token to be' +
        blockchainTransactionOptions.purpose;
    }

    return (
      <div className='row'>
        <div className='column left'>
          <div className='centered'>
            <Icon icon={props.icon} size={'medium'} />
          </div>
        </div>
        <div className='column right'>
          <p className='purpose'>{blockchainTransactionOptions.purpose}</p>
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
    console.log('classes: ' + classes.toString());
    console.log('classes join: ' + classes.join(' ').toString());

    classes = classes.filter(function(el) {
      return el != '';
    });

    const FadeInAndOut = cssTransition({
      enter: 'fadeIn',
      exit: 'fadeOut',
      duration: 1000
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
