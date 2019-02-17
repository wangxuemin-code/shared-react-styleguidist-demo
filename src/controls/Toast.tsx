import * as React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { IContainer } from './Container';
import { Icon } from '.';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

interface IBlockchainTransactionOptions {
  purpose: string;
  txHash: string;
}

interface IProps extends IContainer {
  type: 'transaction_status_ok' | 'transaction_status_fail';
  blockchainTransactionOptions?: IBlockchainTransactionOptions;
}

export class Toast extends React.Component {
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
      txHash: ''
    };
    if (props.blockchainTransactionOptions) {
      blockchainTransactionOptions = props.blockchainTransactionOptions;
    }

    return (
      <a href={`block_transaction/${blockchainTransactionOptions.txHash}`} target='_blank'>
        <div className='block-transaction-receipt'>
          <div className='main-title'>
            <Icon icon={faCheck} /> Blockchain transaction completed
          </div>
          <div className='item'>
            <span className='title'>Purpose</span>
            <span className='value'>{blockchainTransactionOptions.purpose}</span>
          </div>
          <div className='item'>
            <span className='title'>Tx hash</span>
            <span className='value'>{blockchainTransactionOptions.txHash}</span>
          </div>
          <div className='view-more'>Click to view details</div>
        </div>
      </a>
    );
  }

  public static show(props: IProps) {
    toast(Toast.getTransactionDesign(props), {
      position: 'bottom-right',
      className: 'istox-toast',
      bodyClassName: 'istox-toast-body',
      progressClassName: 'istox-toast-progress',
      hideProgressBar: false,
      closeOnClick: true,
      autoClose: 3500
    });
  }
}
