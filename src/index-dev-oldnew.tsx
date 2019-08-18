import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Controls } from './index-prod';
import { AwsHelper } from './helpers';

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
              <Controls.Form
                ref={(ref) => {
                  if (ref) {
                    this.form = ref;
                  }
                }}
                onSubmit={() => {
                  console.log('submitted');
                }}
                onUploadError={(e) => {
                  console.log(e);
                }}
                comparing={true}
              >
                <Controls.FormControl
                  type='uploader'
                  label={'File Name'}
                  name='file'
                  required={true}
                  value={'https://oc2.ocstatic.com/images/logo_small.png'}
                />

                <Controls.FormControl
                  type='number'
                  label={'Name'}
                  name='name'
                  required={true}
                  value={'100'}
                  oldValue={'1000.92929'}
                  unit={'SGD'}
                />

                <Controls.FormControl
                  type='text'
                  label={'Location'}
                  name='location'
                  required={true}
                  value={'hahah'}
                />

                <Controls.FormControl
                  type='date'
                  label={'Date'}
                  name='date'
                  required={true}
                  oldValue={'1566057600'}
                  value={'2019-08-17T16:00:00.000Z'}
                />

                <Controls.FormControl
                  type={'select'}
                  name='gst'
                  label='GST fee'
                  defaultValue='7'
                  selectOptions={[
                    {
                      label: 'Standard Rate 7%',
                      value: '7'
                    },
                    {
                      label: 'No fee 0%',
                      value: '0'
                    }
                  ]}
                  required={true}
                  value={'0'}
                  oldValue={0}
                />

                <Controls.Button type='submit'>Submit</Controls.Button>
                <Controls.Button
                  type='button'
                  onClick={() => {
                    console.log(this.form!.getFormJson());
                    this.form!.onSaved();
                  }}
                >
                  Test
                </Controls.Button>
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
