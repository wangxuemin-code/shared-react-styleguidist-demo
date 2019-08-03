import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Controls } from './index-prod';
import { AwsHelper } from './helpers';

class Main extends Controls.MyComponent {
  private form?: Controls.Form;

  public constructor(props: any) {
    super(props);

    AwsHelper.retrieveSTSCallback = async () => {
      return {
        access_key_id: 'ASIAZ7AHP7WMJMOTH6GF',
        secret_access_key: '8sYxtqKV8MEFJGsv8AVA8rxrufl/8sZtFS/3m68O',
        session_token:
          'FQoGZXIvYXdzEIr//////////wEaDKmrZlgS/MIaNIAF2CKsA4S8x2/83mmDl7BeGHPZtSKBQPCAqLbFpzFkpzMUVWv+0x4zjDnlUxZr/OX4CoXXl29HfIMyDZPT8HyM7nIZUpY8weJJ+GVYgUMdp9zChzyXTkoIaD7Jaf7op9571elrh+fUJx5DkNrFF6sYnRs+9qW7W8WDY8t4Nk2AAcmtPIfkU9s491du29v+xJnH6gyXKImw1FYcISJ8hLcvrD7/EYl9B+9+dov6QGrR19QhVR4ZYZN0xG458FHcHrs9TRShAlxL7PAyIo4rJRjCiWjW65SUrufhOYU8No6d8kjTlF2ODt8qiOeDj4cKNR3r6mzePHKRYsNFEJx+xYN9+F7gY5XdflWb8T0kn1tkb50+EVXp+Ae96gOehgiqxkIFxPAoNuRA8bOVeINVmozwxwUHt4l7J+O52HBpZSJMweoyPyUXQ8dcOCWCzP9mBC+Biyc7nIYssQRt0eiBE/ClI2vvpKnWAYtyNVbKDzEWIsANhOE1wqDQSDCNl8WyJcj0ToFg4W3mirplQAr3wgLox5AF0t4ZPqogKPoPb8xgbOegvJuC0NF8da3iQsa4WwkfKL3sluoF',
        expiration: '2019-08-03T17:28:45.000Z'
      };
    };
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
                  console.log('dssads');
                }}
              >
                <Controls.FormControl
                  type='uploader'
                  label={'Uploader'}
                  name='uploader'
                  required={true}
                  value={
                    'ISTOXBUCKET|istoxkyc|ID35126761M/17eeddd4-b841-48d8-ac6f-47b1a8b0f33f.pdf'
                  }
                  uploaderConfigs={{
                    bucketName: 'istoxkyc',
                    path: 'ID0000001',
                    customAllowFileExtensions: ['.jpg', '.png', '.pdf'],
                    fixedFileName: 'abc'
                  }}
                />

                {/* <Controls.FormControl
                  type='uploader'
                  label={'Uploader'}
                  name='uploader2'
                  required={true}
                  uploaderConfigs={{
                    bucketName: 'istoxkyc',
                    path: 'ID0000001',
                    customAllowFileExtensions: ['.jpg', '.png', '.pdf']
                  }}
                /> */}
                <Controls.Button type='submit'>Submit</Controls.Button>
                <Controls.Button
                  type='button'
                  onClick={() => {
                    console.log(this.form!.getFormJson());
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
