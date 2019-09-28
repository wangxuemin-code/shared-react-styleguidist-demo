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
        access_key_id: 'ASIA5FEPMSFO6TKDIGEE',
        secret_access_key: 'XlXXlbAYLaMzCnRAD3TXot7hZ7acQjp85gsG/pep',
        session_token:
          'FQoGZXIvYXdzEMP//////////wEaDB7RTgT2bYDfbp58iiLkAzaRmI41fwLQImvChHSQAUjpvN0t8zDL2p0F3u6LwHBTQUn+QiqzLcGx+Oqa3pYPBOonWYoTw4tjw0kX9b59jJ8V51aKu8lMYb+deF296sM7hk3tUKp+/TAVt82trkk75g0xU7YEfvmRPEt4VMnvQmRimZBXe3X5337tDdHZP3SfyrARSNmNOeAHmSPbHY8FwuOnu18cnywr8nX/mbdsKVsope1+4oEWF7WZKiOv8H5OPxY1qfA5ha8holvnHep3JwcduwN3aMaCXW38RB0kapLJDDrX7HRY5yPP/RJ6M6nupwhJYXm0vVkAeLwy94G2VCFtClH0/9z003N3CygjsWhcM3ni5o0rOpb0ve8GxNxrVXT04Zssd8TIpirm3s2QdWaB66b/C959TM59oPl/G6vQU/N+UPgPbGtfp8JudA7/0a0XR3wzKi00797Br3NGSrz40o2LPE5SG2VlgJn8gPpnB5IP1LPfeuNoWtmwAlVM4OrjUifb20a6/5r+cZL8nFsZyJPf4hidnuRK0EPkybbIOf6rT3IQCkXF3jNrb6/7SukecB986H6uAKk0Aih47YPw2hhLcUy6XOGuJfJp7IAnFP+RYkdlkryugkoIwh2OKepu2ac4Iwryy3GgMs9gaOn8kAMo58+87AU=',
        expiration: '2019-09-24 09:04:53 UTC'
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
                  console.log('done');
                  let antiVirusFiles: any[] = [];
                  let antiVirusReturns: any[] = [];
                  uploads.forEach(async (name: any) => {
                    const value = this.form!.getInputValue(name);
                    antiVirusFiles.push(value);
                    antiVirusReturns.push({
                      key: name,
                      file: name,
                      success: true
                    });
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
                  label={'Uploader'}
                  name='uploader'
                  required={true}
                  uploaderConfigs={{
                    fieldName: 'label1',
                    bucketName: 'istoxkyc-local',
                    path: 'ID42731762M',
                    customAllowFileExtensions: ['.jpg', '.png', '.pdf']
                    // fixedFileName: 'abc'
                  }}
                />
                <Controls.FormControl
                  type='uploader'
                  label={'Uploader'}
                  name='uploader_2'
                  required={true}
                  uploaderConfigs={{
                    fieldName: 'label2',
                    bucketName: 'istoxkyc-local',
                    path: 'ID42731762M',
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
                    path: 'ID42731762M',
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
