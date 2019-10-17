import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Controls } from './index-prod';
import { AwsHelper } from './helpers';

interface IState {
  antiVirusChecks: any;
}

class Main extends Controls.MyComponent<any, IState> {
  private form?: Controls.Form;

  public constructor(props: any) {
    super(props);

    this.state = {
      antiVirusChecks: {}
    };

    AwsHelper.retrieveSTSCallback = async () => {
      return {
        access_key_id: 'ASIAZGTEABANDA27BMVY',
        secret_access_key: '4vc4RQJFVPdnr1peI0P8XpXiRe5irP2gbXhfMOwq',
        session_token:
          'FQoGZXIvYXdzEIb//////////wEaDAfkS9+xjnPUnimh3SLiA/4eqmgQ3C581LXb15ARLmOslxhGkVZ8IkiKo4L9vq3xjnwU6dm6O+kaT5ButcAoO1IA51sJ9BK6x/kXwJ3tyR3po4EwHRBiDBrjXL1sli7KaZCrjgUSDkN4oNSUDfJg/D25qj6T2jRC3eIbPezAH+E2Xh+XP0bU3vsHeTwdGcHdxnqoLnGg6TJ2UilXCf1G6cvZdZf1rU2g5rmAl2zTTGbSDny0OUgjW1vACO9SzSEhdgNRHNA7jK79BCUv5srsRawqew+Y/1uUeWEyh8lCHaphJ72irSWcRAmIqbmJXZr6VeLu+pYx1NR5Dl+UfgWUiPCn7D0lPWJKymlLSb2V/VrYtQIBNpzBGgE4oGTBkATszbiSX8NaArTNKcJ9iRxG1GO1i9w7KIgrbyT+5KoDd7wh4wIdFmV0GteIHA6vrGPobdweWKPPahQge1S8r+7JvE4J0ksStS9qnhfyhH4MWeLKKcq+aaMtdh7lW9ovLd3jSwFOp2F6HzUSd4nZZqoZ/sK7qxpEZrLbxbSDTz+pkzCgo3IgGvElfMcnnLFhAjGJlUI0T/r1xP+9ftX1N52OnZYu1NIE2tUzaRufLjBcnpIEZue2m3DHfNcSEaEjo7cA40xw4TqOxfBf/ryxlSg0T72VKJrYn+0F',
        expiration: '2019-09-29 12:59:23 UTC'
      };
    };
  }

  public render() {
    return (
      <React.Fragment>
        <Controls.RootContainer>
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
                onUploadComplete={(uploads: any[]) => {
                  console.log('done', uploads);
                  let antiVirusFiles: any[] = [];
                  let antiVirusReturns: any[] = [];
                  var flag = false;
                  uploads.forEach(async (name: any) => {
                    const value = this.form!.getInputValue(name);
                    antiVirusFiles.push(value);
                    antiVirusReturns.push({
                      key: name,
                      file: name,
                      success: !flag
                    });
                    flag = !flag;
                  });
                  let antiVirusChecks = {
                    bucketName: 'istoxkyc-local',
                    files: antiVirusFiles
                  };
                  console.log('call antivirus', antiVirusChecks);
                  setTimeout(() => {
                    this.setState({ antiVirusChecks: antiVirusReturns });
                  }, 2000);
                }}
                antiVirusChecks={this.state.antiVirusChecks}
                onAntiVirusChecksComplete={() => {
                  console.log('do sthg');
                }}
                uploadBackButtonText={'Back to something'}
              >
                {this.state.antiVirusChecks && (
                  <Controls.Message variant={'warning'} message={'Dasdsad'} />
                )}
                <Controls.FormControl
                  type='uploader'
                  label={
                    <p key='paragraph' className='normal-text'>
                      Uploader
                    </p>
                  }
                  name='uploader'
                  required={true}
                  uploaderConfigs={{
                    fieldName: 'label1',
                    bucketName: 'istoxkyc-local',
                    path: 'ID83676276M',
                    customAllowFileExtensions: ['.jpg', '.png', '.pdf'],
                    showFileName: true
                    // fixedFileName: 'abc'
                  }}
                  value='ISTOXBUCKET|istoxkyc-local|ID46066150M/e0d925c5-47d8-469f-bdb9-be32662ea001.png'
                />
                {/* <Controls.FormControl
                  type='uploader'
                  label={'Uploader'}
                  name='uploader_2'
                  required={true}
                  uploaderConfigs={{
                    fieldName: 'label2',
                    bucketName: 'istoxkyc-local',
                    path: 'ID83676276M',
                    customAllowFileExtensions: ['.jpg', '.png']
                    // fixedFileName: 'abc'
                  }}
                />
                <h6>dsadasd</h6>
                <Controls.FormControl
                  type='uploader'
                  label={'Uploader2'}
                  name='uploader_3'
                  required={true}
                  uploaderConfigs={{
                    fieldName: 'label2',
                    bucketName: 'istoxkyc-local',
                    path: 'ID83676276M',
                    customAllowFileExtensions: ['.jpg', '.png', '.pdf']
                    // fixedFileName: 'abc'
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
