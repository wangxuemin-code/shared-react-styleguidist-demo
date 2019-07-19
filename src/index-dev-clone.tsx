import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Controls } from './index-prod';

class Main extends Controls.MyComponent {
  public constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <React.Fragment>
        <Controls.RootContainer>
          <Controls.Header
            logo={true}
            className={'istox-header'}
            mainLinks={[
              { title: 'STO', path: 'sto', selected: false, useAnchorTag: true },
              { title: 'Wallet', path: 'wallet', selected: true, useAnchorTag: true }
            ]}
            subLinks={[{ title: 'Transactions', path: 'transactions', useAnchorTag: true }]}
          />
          <Controls.WrapperContainer>
            <Controls.Container>
              <Controls.Form>
                <Controls.Clone>
                  <Controls.Container>
                    <Controls.FormControl
                      type='text'
                      label={'Hello'}
                      placeholder='This is an sample!'
                    />
                  </Controls.Container>
                </Controls.Clone>
              </Controls.Form>
            </Controls.Container>
          </Controls.WrapperContainer>
        </Controls.RootContainer>
        <Controls.Footer detailed />
      </React.Fragment>
    );
  }

  private function = () => {
    console.log('this is a callback');
  };
}

const render = () => {
  ReactDOM.render(<Main />, document.getElementById('reactContainer'));
};

render();
