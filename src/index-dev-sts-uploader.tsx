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
        access_key_id: 'ASIA5FEPMSFOROJIDYWB',
        secret_access_key: 'D7pfCLdcg6JT+wc9LreeQNWDmUEinM5UjnebJGvb',
        session_token:
          'FQoGZXIvYXdzEOH//////////wEaDNAjFaLhML8csSCyuSLkA3OsG5Y+ViyiXHQaMlUTbI72Wry9LFOyusD1K7Q2HBRTc4Qw0KYxZTyXyECBAFCEIE9NMuuTUXDYsJh3XVtmWVp5mWFYWRR8iWenG9J8eoh8Sr2VxOIpg8neek+hMJkydhrAarCzI4k5ulogful1rcJ2zt2uLbI5CCw3/AWA3pNW5vJlwdR1sr/vx32r1sZ9y5wA8xYV4zSed16qFHGYTiePNIcUn4r3rN4dFiw2/A2Qj6FjqDKdMmrGTUPAMPvwrCfwIfSmQ9TEa3jHFWAcdRMID/Jb23iiSkikduaLAd7wux8LIEMEao505cG9VcMN3MTyC9b+nR+JPLELbBFBBL5WIIMqP/g5010QME/OjC5ATYuo2U/W0pDDgEbcvXKLd62qhIQdk2JBd0IOruEFI1ex2G3m7MaOoV1PrO7bFKSurJztjgDJ7UqYxyCjWJHMVELTGXoVX0TO/M+qXrT1xDI70N9DkgJouYEdqW9Yug7D4Wn+cnQXRRst4DmLpxFCBn4p6nRUCCkJahtcycY4YCReZBpCMdyw13jQpbDiLWXrCanYL2jJlczrm3WO/3BYOYtYxPJNOjnTlZABG80ov9cmfJ1v+A9eVj45TpeW/3Kbxvq/6UbBe0FmNPU7QagMi22edj0o5cn77AU=',
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
                <Controls.FormControl
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
