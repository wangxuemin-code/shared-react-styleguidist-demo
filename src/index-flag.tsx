import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Controls } from './index-prod';
import CurrencyFlag from '../src/controls/CurrencyFlag';

export class Main extends Controls.MyComponent<any, any> {
  public render() {
    return (
      <React.Fragment>
        <Controls.RootContainer>
          Alpha2
          <CurrencyFlag country={'my'} type={'alpha2'} />
          <CurrencyFlag country={'sg'} type={'alpha2'} />
          <CurrencyFlag country={'in'} type={'alpha2'} />
          <CurrencyFlag country={'jp'} type={'alpha2'} />
          <CurrencyFlag country={'eu'} type={'alpha2'} />
          <CurrencyFlag country={'us'} type={'alpha2'} />
          Name
          <CurrencyFlag country={'malaysia'} type={'name'} />
          <CurrencyFlag country={'singapore'} type={'name'} />
          <CurrencyFlag country={'india'} type={'name'} />
          <CurrencyFlag country={'japan'} type={'name'} />
          <CurrencyFlag country={'european union'} type={'name'} />
          <CurrencyFlag country={'united states'} type={'name'} />
          Currencies
          <CurrencyFlag country={'myr'} type={'currencies'} />
          <CurrencyFlag country={'sgd'} type={'currencies'} />
          <CurrencyFlag country={'inr'} type={'currencies'} />
          <CurrencyFlag country={'jpy'} type={'currencies'} />
          <CurrencyFlag country={'eur'} type={'currencies'} />
          <CurrencyFlag country={'usd'} type={'currencies'} />
        </Controls.RootContainer>
      </React.Fragment>
    );
  }
}

const render = () => {
  ReactDOM.render(<Main />, document.getElementById('reactContainer'));
};

render();
