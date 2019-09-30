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
        access_key_id: 'ASIA5FEPMSFOQLWV3CDO',
        secret_access_key: '66QUq5Ery8Z3Mu1XTlAQui0vQp2iJckr5gYmVDHZ',
        session_token:
          'FQoGZXIvYXdzEPr//////////wEaDJljRm6n95Q1ChaZdSLlA2UrfR9ZtZ5FbOHjwpRI7eAz7x2lL87dpTwslX3+A5M5ieaPfuhtl0eK7FPtQRfwIW5Md8N09jrQTi2xtoWqy9tzG8tw1LO/MaHqPOLjgI/wB6x/t856bGJXZW8GXZjNh8iSFV1V1eFC7CLfnpaF/7Rq5dUK5wlejsUTyk9k5eyLM9RDC+XvB41hLpcZbAH98CDk3h911oEO3pHypjq1Cv6XTbA+nW7SO7JqRJOUFNat9ke0p//2Skyvdd3qXKNcn4LhOmxeQqPiHS8VI6Atm9R8nu3F1pnsnjWJ34wUrS1C/y6qxku5DMrfaHbzwOXJFk8QD1PCacYfEz3hzR62OCKCeS6DsQHEMgtyeZUTptDGtxBfpL2oXKAE0VE3K52a5Km/uXraXoBd5SAWOVCuEUFm4HgwneV9gATf2cL20isfGzklERue8FkT3FYgiqIpfzr2ulRoF4ptx5Gti8YbkbYNJnb+l/Y4YrTeNGyJ/fROXIzjp+S8b5WUX4Ms/gJfdp1PUIgqKwf3oWWiftV4YxEWwW8AofFa+SAIGeV+7lIF7vsqct8SrJpFYNAsHd9mXSVtxEMStFvC9WD47MDwJEojCVJB0C5xisLrrxqQMRMYuq+qRNdyiJ9vSIcN9El1O2mzBILxKM/ayOwF',
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
                // onUploadComplete={(uploads: any[]) => {
                //   console.log('done', uploads);
                //   let antiVirusFiles: any[] = [];
                //   let antiVirusReturns: any[] = [];
                //   var flag = false;
                //   uploads.forEach(async (name: any) => {
                //     const value = this.form!.getInputValue(name);
                //     antiVirusFiles.push(value);
                //     antiVirusReturns.push({
                //       key: name,
                //       file: name,
                //       success: !flag
                //     });
                //     // flag = !flag;
                //   });
                //   let antiVirusChecks = {
                //     bucketName: 'istoxkyc-local',
                //     files: antiVirusFiles
                //   };
                //   console.log('call antivirus', antiVirusChecks);
                //   this.setState({ antiVirusChecks: antiVirusReturns });
                // }}
                // antiVirusChecks={this.state.antiVirusChecks}
                // onAntiVirusChecksComplete={() => {
                //   console.log('do sthg');
                // }}
                // uploadBackButtonText={'Back to something'}
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
                  value=''
                />
                {/* <Controls.FormControl
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
