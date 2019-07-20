import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Controls } from './index-prod';

class Main extends Controls.MyComponent {
  private form?: Controls.Form;

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
            <Controls.Container margin={{ topPx: 200 }}>
              <Controls.Form ref={(ref) => {
                if (ref) {
                  this.form = ref;
                }
              }}>
                <Controls.Clone name='emails' value={[{
                  email: 'abc@gmail.com',
                  socials: [{
                    social: 'facebook'
                  },
                  {
                    social: 'linkendin'
                  }]
                },
                {
                  email: 'cde@gmail.com',
                  socials: [{
                    social: 'snapchat'
                  }]
                }]}
                  addControlPosition={'top'}
                  deleteControlPosition={'bottom'}>
                  <Controls.Container>
                    <Controls.FormControl
                      type='text'
                      label={'Hello'}
                      placeholder='This is an sample!'
                      name="email"
                      required={true}
                    />
                  </Controls.Container>

                  <Controls.Clone name='socials'
                    addControlPosition={'top'}
                    deleteControlPosition={'bottom'}>
                    <Controls.Container>
                      <Controls.FormControl
                        type='text'
                        label={'Social'}
                        placeholder='This is an sample!'
                        name="social"
                        required={true}
                      />
                    </Controls.Container>
                  </Controls.Clone>
                </Controls.Clone>
                <Controls.Button type='submit'>Submit</Controls.Button>
                <Controls.Button type='button' onClick={() => {
                  console.log(this.form!.getFormJson());
                }}>Test</Controls.Button>
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
