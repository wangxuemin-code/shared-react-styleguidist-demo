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
        access_key_id: 'ASIA5FEPMSFO2VYFN5MBa',
        secret_access_key: 'iu16T683agaXk/HMDvUtEMtJeT/uat7MjmrUpdCC',
        session_token:
          'FQoGZXIvYXdzEN3//////////wEaDN1E2Bs97LGbLhn2rCLjA1Q+/RGbzjYi4CMWYp4jz0ogtkfUYUUKM7cCnUpz1exyDDq3CaQqPkPd/nu/t58Zs7du00zMi7n8p18eU+xMVqB6g51uXMpKyOyCzJWyAR+Ndgz3W+fSFwhKWSn2RTPQS7NjfdNKZ0cy6rL1pV31L+JcKxSUSho+CQXJ+ZXTtTaFFaNT+bJJWKHhT/+uDhseV/TLs9ZDaSJHWVXjKPHTAic4OpknDQbE9h7TU4eMp2HB/ftwrGzkZQBKZ3CkhWzDqAjhfEH+aHBABQhh1u4wQ5eFksgLCaUw4YhAsuRS53zHAf66B6DT4PkLSLgVcJj1uCtS7XxEi5cK1tVQ4+jeG+gtxFNfu+luKd8S2SpqwOhKjWP+dvXLCp43IEbirRORyR/LCfKE9BFxga8bG0o11LmXZRHfKY5XoMjvrnPb9S15Vq1lnLqjEM6q9F/ZkGe61mZ1FQvu4lFRzfjCerJMiQLIzJPV/hhEk+LMJPTjQBxXozFhfaq6WEyt/YRgdf2xRmzYwAmXie8XW0B2o/I4HDDgR9cjyWm357sJ1cRvD8mYqbRhGbZRmr/L6Tmt6RN5aEaVuYmxGzOrQd2gwPmc4bFRA05JwB7gyy9b8CDk+7cYXfrDBCzcT1qb9DH+B9upWDlUySibucLsBQ==',
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
                  uploads.forEach(async (name: any) => {
                    const value = this.form!.getInputValue(name);
                    antiVirusFiles.push(value);
                    antiVirusReturns.push({
                      key: name,
                      file: name,
                      success: false
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
                    path: 'ID42343612M',
                    customAllowFileExtensions: ['.jpg', '.png', '.pdf']
                    // fixedFileName: 'abc'
                  }}
                  value=''
                />
                <Controls.FormControl
                  type='uploader'
                  label={'Uploader'}
                  name='uploader_2'
                  required={true}
                  uploaderConfigs={{
                    fieldName: 'label2',
                    bucketName: 'istoxkyc-local',
                    path: 'ID42343612M',
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
                    path: 'ID42343612M',
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
