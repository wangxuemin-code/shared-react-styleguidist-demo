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
        access_key_id: 'ASIA5FEPMSFOVGKC2ONN',
        secret_access_key: 'MSphnbpsDeVM66oc8yngf7HO9OSEdROJPJm9BmuY',
        session_token:
          'FQoGZXIvYXdzEA0aDMIr92JjD5swg37tIiLlA2EDVyGu3z8BHe3JCRI30gCQrm257rcSHsH6ZdwBeDoNmof5AGKyiOGhUCptI45ODqmexqwZlZhbm5dLgtPeq6mlQdvtsorDQ6WEvA5Gxg5aprYGBJLyr2cMP4wr3j9eTL6iaYCo0s1gzdZmsgoBMFuxZ9Ppq8KoT2tE60p/mfVVIMkPjgEfQWYXChzJ2TRtmExE1HTYnVygW0OW33jkhZZ1H/R0mhmGYfsLW+Jnhn5o0Gaw4okPm8uc/zQPJhLssIYAFPPyOFQJEJebVto9groiF2LBJpSuzk64ECVRtUIuePf0x5oBT0X6o3qoqbqp/y6QskQ6OsJkoY/Vs5Yb96mqjgAyGMuQyNhGtpo6jH52YcMPoscVMnULXmS6jo+JduLaq6bwj1qRofaLdvMGd9Zf/xMwCmRyurqL+EbAMw/xfam9uXwDDZjfCw47fZx0QWKGU1s0+wFPaiAeG8VLHAwPT7xEdQRXNByW58JZaT7XxlpZkdyxuifWCJONodtzA+Jpc91rKUbOQAKirXLuOoH3f6Zq5P5iSEyGYidJJrZowhylRlYNvbYQSRMn6GBlSxOuGbDvWpwaCkDf+/N1hqNdb0DxOq68ACi7GZfVchHEv5Wh9aWagjbFQQ3L1RUYo+57j1mtKLT7zOwF',
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
