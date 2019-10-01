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
        access_key_id: 'ASIA5FEPMSFO4QH34SZV',
        secret_access_key: 'iZ6W8xRkdgDDyXwIpHZ6LcW1rhyZZYaNftPyNqUG',
        session_token:
          'FQoGZXIvYXdzEAwaDKDK6YEKu9YxkNynMSLlA10SItmSwdiqSZ5BUDWDTbf/OXfHgouUFne4NNCiz0XbiXUpnsD3Cubh8PI035Tiqvz8aqOdNvf2rJOpmnyfPGHLjvSTNTe9AE7pDSEoIEeoqCbhX3ZGNZryFqyG1GJBJLv+mv7cBMvjFieBeUXEo2TM5/2oemg0wCUYIYw1RRMWO/2/J5SDBuYFD8ZlA5xe1PMO1wErvAe0Q5tVIQo2WB12O9ffsrv81+cXJt9QGdA9+dmMSGmwkxEWW9ncfCbGwzQkZW1pSU1Gh9O5NJZ0U25uO3EyiH/hMBLEM+otTbsNY3HJkibQduMcYHDyUBgwvmZTQmxogu4xeV/+rZ+xj0vyXtUDdMhaALB+U3+7PoyWv3z3h32t9XoRh2NHgaoe1NqWoCQeg5vNBzhRL8/BskW2R829VSbD46fTGABRgAJkceZ7IcdIA9kFUT7gTlw2IPyVDVN3RxntPmaGzXguGkDCbMxj4BYY+3/FCcaa/hyGNFLHHEuXEmrbqZ0HeuPiAoaE56JuUMFRMOgeC9YBvJgxzWxnp043VPELEhGPPynBU7l/P7AfusC9H5s8+RedHHKP5AEqFiZ0GBM/sEfL4paGrZkSzfvUd+1XVHid8/TkPxbnRN7SO321Jm/gQFLQvFQND5TqKOTdzOwF',
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
                  this.setState({ antiVirusChecks: antiVirusReturns });
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
                    path: 'ID46066150M',
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
                    path: 'ID46066150M',
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
                    path: 'ID46066150M',
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
