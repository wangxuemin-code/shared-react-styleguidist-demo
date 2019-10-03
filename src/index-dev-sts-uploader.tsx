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
        access_key_id: 'ASIA5FEPMSFO2E5777PP',
        secret_access_key: 'FNiQzLeev6esm6GHf9w2uhzzRMasuxldVTrufXLh',
        session_token:
          'FQoGZXIvYXdzEDQaDI0U4U7D91EI77h2GiLkA0a8byKGYznepVrLckgpjA2rNH5XlOOlN9jTe+dzEEF4CRowlsT/TFnqcP7OV7MKm/rapupcJX5OkZpGhxrPiEaIdnlEhoQ4IWB0ZOC7/mJiPQ0aqAW6dYJzUxAuxikDeiTI0uyCpKYNUM/lB4u8Ns9k/5gSJWDqTzCBuFJqLcp3aMI8ES/KIRxpBwmRXo0GBr7fWEHhMuZtQhbdiGLbTFWtAc7fECk1b+sZ9aCUuW3uaqwXbuCp8htMNtn8f/gINjGkfj6Z391uP5jRwRegDGC2FGnKIrkuvqc77kLBfPwPcttKsaXFRne8EyMhY0OmiQ4njEBVnfGsFoTuN/N+nGg4P3F7Mcoy1ohLQjI7qsEwT7FkqZEgaBGdkbf7N2mrQEE5GXgZakPM1wryPxJ9Y9zPm1xDKDpuvs+KzVn7vRf4nmjVmS7YLjCkZMnjbCzYi+a0OxONNNgxWdVMyqldkBRpg3hkExJT/OLajrGQASw8eFrG8HQgja70EPEVlYUD6/0btnyuTe9W5VuWPdy0p5dk7O1RtVHp5wMCIB/GSKDeNDT3M6F7W6ZdzwQs6YDDaMR/jdCYhnj+OEmwZJfmK/S4j5myD5SZpgzMwDdJfT/yIKlid3ToOk7081oD/7IAbCPYgggo18DV7AU=',
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
