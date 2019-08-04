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
        access_key_id: 'ASIAZ7AHP7WMDSM76IUQ',
        secret_access_key: 'mRX5hQmXg91opBlZ8hRTNFRUP0tnLPlZNj3BBg5R',
        session_token:
          'FQoGZXIvYXdzEJf//////////wEaDHWXlHqzvi4SY9QHgCKsA4uoZn+KQiB1ddQQDDqIBxmC4Pcf2hIeB6Jq0IZqlK7781n5UXKp71SP9IoIB7pKkeWp+oxhOnwJjkPX7VT/PXObyN0Js8SQtSAT6u28cbqDgZHs9Cxg57SGzIG56fdnYL7+nhGFZ5dz0Jrr/GrMxIN2DB+WzuFu3kN3Tgs2oXVzoHUbS5aj/EOUxEJ8PtLJqFJg+3fC1fwY6c0QbyZp0JpZ/seftmFVU9S7LJJfmRsq8NMWsf8QBSYxZqW4UmlEzYLmP66toTzE/tSW7TtCo15A/vSZ3GsEQrR82cwEkuUrWlEyruddcnp7ZKKenWaawcklLSyS+YSe36ztATul/4tBjcVDAraLO8R2RjHEkot8DO4pRExwwBjHIST5+pucO88zA8HtcuVAYqywIAi1mj0o71Jc3IxKhdHs/hHiIgyHzSFabG5jyKS6khSuEq9Fz1N5E3OL/0qKBS/oSDzZKQddWJILqn/MEh/fz/JweIYwSsN9tOFiNzkPwpO8aABvXzMn7t9PGDUVu7JgLlxFSN2cnhGEeO01NpwkNdXZGyxXgzKyCkprbGn2uRpCKIDUmeoF',
        expiration: '2019-08-04T06:15:44.000Z'
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
