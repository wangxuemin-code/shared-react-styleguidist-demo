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
        access_key_id: 'ASIA5FEPMSFOTLGQ3XRP',
        secret_access_key: '5aXaezJeWWra30+VZg27J1IN8MIFt8tQYgMJHeLc',
        session_token:
          'FwoGZXIvYXdzEJz//////////wEaDNd3AlBYCyHf/Yz1AyK1A6aNMGPM3UIFPJjuqW8LabEno+T7aMfjDmNdvFaZk7qZEP7G9/+sE20DPhR0ojYNpFFT9l9GzlZNEw0FfYfDSRNGpNZ6xIWZl5690bu3CGiuNJu7N4sAmxFMXEX4KVUV5tDVK/FJ3zBDfNxTxCvSBSCmG/wU4BMPlBnENRtRJ9n5C6DJa85eoPKvAeL0VXYRewJ919HX4Dx13I5+DGuHGURUQw/UKJFKHSeVB+h6PEf2gOOmg+PqquI13bh/Y2/ZhEpLAY7IioQJTuom1+FVpeZhPIWJUMUWrGrzvWVB4QIRt5k2fIQxcvWBVVscxFAmu/rTKpF/0yS1HUIOt1E3sTYjeZHwHiRP5ax77CUU4xkn4ig/X0Gy2ALi1TweRFt6AUMq7nEtkQPkDSiCElPmqXpyOZikdxEv2bMaL1ZHNSjMCEhDIzAmfP9c7CA4DD7/SvjBJ9ANYB6VZoQ2ybL7a8VLC7rC4p3yM0KsD6vpvvB6N9RdRSGDuFleaDF8dq9pyg8XAKuCJ9rTosrBIkNAi1Lqn2BvMWGHRFOf1YqPOSj2HuzciZVZj9Y5j2HhXZDLcwbJeEFKKLXkve8FMi3ClqC6JYBeqiqFrADRMERLdvnRkUZC9bIhhxLUKSk4fdcaGwcoHqxgQjAjbtc=',
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
                {this.state.antiVirusChecks && <Controls.Message variant={'warning'} message={'Dasdsad'} />}
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
