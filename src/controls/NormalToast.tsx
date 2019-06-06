import * as React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { IContainer } from './Container';
import { Icon } from '.';
import { disabled } from '../css/main.scss';

interface IProps extends IContainer {
    icon?: any;
    title?: string;
    description?: string;
    variant?: 'primary' | 'secondary' | 'info' | 'disabled' | 'success' | 'warning' | 'danger';
}

export class NormalToast extends React.Component {
  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    return <ToastContainer />;
  }

  private static getToastDesign(props: IProps) {
    const variant = props.variant === undefined ? 'primary' : props.variant;
      return (
        <a href='#' target='_blank'>
          <div className={variant}>
            <div className='row'>
              <div className='column left'>
                <div className='centered'>
                  <Icon icon={props.icon}></Icon>
                </div>
              </div>
              <div className='column right'>
                <p className='title'>{props.title}</p>
                <p className=''>{props.description}</p>
              </div>
            </div>
          </div>
        </a>
      );

  }

  public static show(props: IProps) {
    toast(NormalToast.getToastDesign(props), {
      position: 'bottom-right',
      className: 'istox-normal-toast',
      bodyClassName: 'istox-normal-toast-body',
      progressClassName: 'istox-normal-toast-progress',
      hideProgressBar: false,
      closeOnClick: true,
      autoClose: 5000,
      draggable: false
    });
  }
}
