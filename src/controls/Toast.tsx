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

    let hashes = blockchainTransactionOptions.txHash.split(',');
    hashes = hashes.map((hash) => {
      return hash.trim();
    });

    return (
      <a href={`tx/${hashes[0]}`} target='_blank'>
        <div className='block-transaction-receipt'>
          <div className='main-title'>
            <Icon icon={faCheck} /> Blockchain transaction completed
          </div>
          <div className='item'>
            <span className='title'>Purpose</span>
            <span className='value'>{blockchainTransactionOptions.purpose}</span>
          </div>
          <div className='single-row'>
            <div className='title'>Tx hash</div>
            {hashes.map((hash) => {
              return (
                <div className='hash' key={hash}>
                  {hash}
                </div>
              );
            })}
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
      autoClose: 5000,
      draggable: false
    });
  }
}
