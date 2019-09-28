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
        access_key_id: 'ASIA5FEPMSFOWF7VGISTa',
        secret_access_key: 'ZGX4LCVhlKknirIWXJ71W4uQc+FTKVk4x1aH/tcR',
        session_token:
          'FQoGZXIvYXdzEMv//////////wEaDOJNeayqY4k/J8kLrSLkA57nRzmP0W8dMnCcxmaE9Z5Iu0TQ+nAmiOYRuAmuER1udnUfxNTUBh7Zv2Z2ILbyrGlPp23St5qcee5TTqNZVN9VkWeKiEFigFXJrDKx7YgjXcgj6ibrh/TgoBm1O/zIDEIBzviPcVfrM+DAQuCD+8z2OzCDHAKXs1lhVS3PMmAXuQg+xeA4J/ROCfnmGCAjiol79g318DOQHr9iZZJyccXTQ4yARFADSMgiITTeAt8+ehV1JEsMEzGK5pP5zyK59s2GZ89FyE60OJXF7UYv/w3ZtC4GI8IS89LDgUCfZi4aBFj4u9VnRNn3E/eszMH4VSepIySx12FmXFJQV+J+nON889luhzBeS7gA4UvJZlnb6Pl/gopSlUoDZNzznBIoRqy4NrgvinRys5bLlJjgpdlwoRcQ9E3UangQ7Up/8g0R6V7Nf+7KKSux1wM/zQ/SETDUdq4LQJNFkj+Df/wuRO+OvuH4Kx5WQZ2K3B0u3QiJE25D/j6IWLWBdwHiRdJVhmeTkES3K1mUv9PaStVPTLp5QRn8OApvjOvXv0jhcj8rNqDvb9v2kDkYh0vzRL6IrSrKztwPIHOIRVQ962wL/BdjaELqVggQzuNn/ZIuF3iLh79PHTvLlhL3Qq2huOShFy2hYa8oqLa+7AU=',
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
                  console.log('done', uploads);
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
                  value='ISTOXBUCKET|istoxkyc-local|ID42731762M/94c15aa4-92d5-4fcb-b04a-8b2970a5352b.pdf'
                />
                {/* <Controls.FormControl
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
