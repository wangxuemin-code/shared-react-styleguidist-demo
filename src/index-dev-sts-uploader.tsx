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
        access_key_id: 'ASIA5FEPMSFOYXECSXNL',
        secret_access_key: 'v4QESsKsKKikhVFVfI5h6kLr9+PxwlXbOnUrVMeb',
        session_token:
          'FQoGZXIvYXdzEB0aDI6WUUg9sYH6jHlYpiLkA/EuvafX4gb/r38mblg9OXziFtc+DD4vDfrmHeaZXgZxVft0gxylSecorjS9+mmFjNuX9Oi1uJIH1SyGfxJE/y/yMNOzyjTVvDZWN1upZrEpuCEBvQ9cKnr/11VxYGWBsHS8LuKsJ1M3U4bmmdMsn7iWIdlwOeFbLgdNVbknKDwP+d2XOdsYziG1GYfJ5E1+2WZUy33412a1b0W7o/PgH0RHGR3YPTviMsqi+/JxOrQyxGXumAGtNSut25zz7EAQDl/peOXE/mP8CllyOTI/FuFdWlkYXTZkcO0PeB3IQrKQMKG2HxXmCYPt4vBMSZD60bvPfdD2de7PswLtO19nr7/uzh3Db6qf3oQkF9dsHiaudJEahdMPDVRHIRC1y+vTOCGO3ebPuRH99YZal152V/ZG4a1ooWKl7wzK6hlhFakrj9MwTHXnDFc9fX5R33RkkED3ZBS6G8/q1q5lnzjvwuEB5lLkDINfo7UUY5nIVTXdloYLtGycMlteqI3M6GmiBOc2/a7EbiHgToDq7PSO+BozilXHK5Z03Vmlczy8cCNhgWcH3yO0ihhxwHkD/wenGmnoujDJWj2FqbN9pTqo1SdyPsczjV5jAAvn1gJiaWhkG7FXwi/n2RajLgjYI175EaW/l94oyqzQ7AU=',
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
