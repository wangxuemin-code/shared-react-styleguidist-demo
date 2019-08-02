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
        access_key_id: 'ASIAZ7AHP7WMBRWWSIJC',
        secret_access_key: 'H6HWQK57ZeVyGqHi5lK39kM+rIcdljpYxTGa97v4',
        session_token:
          'FQoGZXIvYXdzEHAaDD/zkhplP0/2BCWmTSKlA0SSLhFxCDh10RPj7mQgXUjP11/oUHA+jkbVTAxhx5NbKzhb2UKflP8OqB4IZ5CPV4h3MpM2/1mEJwsWQ7vPV+9o/fXNDDmkJLJqcH+Q0GbV+E6iaRv3bbFjwHeph/t1mkAbb02JRcLTnhQDx0EmY5hTRgZl7XDJir4t4kye9O0KJrBEue98fGfYEnUVP9s86j8fwYRqvWWb7s9wd3iQiTWM3zBvtpcCRhXZqWtVZF0QXNBGqz/iePuQ6wjDSr2hP4ZFxk8muv46v/aHFBIfBs7pR1UuOJXKmuzJ58yHXYKkVYUBnhIhOvRxKCGkWi6Rtq9vvG3atTQtkRzxAvk6chjfQhK7IzP4OlnWAHTqncKy5/omj7bbOzTXeLqH0ICwzSbeaf/Q1sSZmIkWpNmmF0IuIs8Y405Z0z0gi0LfJMZDrBGujdT88uRtpTF0bIvqWuPSdSdorIngCikamSlqHDB/upkzU2Pss0D9KbXi3yMEgQctZPwnWK1g8aihiOd2cQzu8myJfrG61qwXuMqGDqXa6q1mqq/klZF0IcfN4s1CTax3KLoo9YWR6gU=',
        expiration: '2019-08-02T09:11:42.000Z'
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
