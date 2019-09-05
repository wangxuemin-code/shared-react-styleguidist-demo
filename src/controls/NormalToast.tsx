import * as React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { IContainer } from './Container';
import { Icon } from '.';
import * as styles from '../css/main.scss';

interface IProps extends IContainer {
  icon?: any;
  title?: string;
  description?: string;
  variant?:
    | 'primary'
    | 'secondary'
    | 'info'
    | 'disabled'
    | 'light'
    | 'dark'
    | 'success'
    | 'warning'
    | 'danger';
}

export class NormalToast extends React.Component {
  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    return <ToastContainer />;
  }

  private static getToastDesign(props: IProps) {
    return (
      <div className='row'>
        <div className='column left'>
          <div className='centered'>
            <Icon icon={props.icon}></Icon>
          </div>
        </div>
        <div className='column right'>
          <p className='title'>{props.title}</p>
          <p>{props.description}</p>
        </div>
      </div>
    );
  }

  public static show(props: IProps) {
    let classes: string[] = [styles.istoxNormalToast, props.variant || 'primary'];

    classes = classes.filter(function(el) {
      return el != '';
    });

    toast(NormalToast.getToastDesign(props), {
      position: 'bottom-right',
      className: classes.join(' '),
      bodyClassName: 'istox-normal-toast-body',
      progressClassName: 'istox-normal-toast-progress',
      hideProgressBar: true,
      closeOnClick: true,
      autoClose: 5000,
      draggable: false
    });
  }
}
