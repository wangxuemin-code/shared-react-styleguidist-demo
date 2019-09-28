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
        access_key_id: 'ASIA5FEPMSFOVRCR7USQ',
        secret_access_key: '/HHXpm+s6iwtKwwoici+0y/YCSxgeQl4hivAH5zr',
        session_token:
          'FQoGZXIvYXdzEMf//////////wEaDDO3VAqL9l3PhnavXSLkA0db89Y2SSZl+yruCUdQFi1FnW9YFlr4t9SSfOtM28uItm8QF6kPZZTPlH56JFrhYtle+I2Ujo994wmIRBh0/vcBRl618Mb0CaL0pC1YFglxosJwp0GtRl+CC9aHrZcxHqWLqGGGLPYoQaZb9Y+DGHGtYrsy/Gr/9IREwR/HkCYMLqXWYsl1lrv6f+luRmcggiIn5W6NHlaRsOCeqDD4QQlQxy0maJCM0XBAcxxBExAlUuugvxtAf7J58+UN0svHngIKVBRRzVd85+n1TDttFhSOrQ6Vs/JOuq9pqbHj5aikAwjy6JkEuN4KSBue7h/3Yu9TRWChLLg17WogZ7jyJHfETREQaNU6hoafsFKCfjQAOzmATFS9OHcWNArZx751OYDJTo8VlqKzHXDvH4deTs5JhB+8T7d4dJxDcU0rYeBF2oJ+tWQTk86rsIQrePTqLaOw9HBTfebToru7C/e2VSE6f2LbX/9I9VJKz9tElj+1ATYTxQrTcwaUdG70HW6gHmY54Ndgwk8pFuvMQn2ppBeXOD1k1GMU8Ngh+2jjH8KuXo7UKPof2eckc5vk8Zc3dbfeWyeLdp6Nv38gmJN/LnTHj0iwT/GRJRo5MXEttjognvWCTvMRbRdQQmO2mE+n1XEidago7rS97AU=',
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
                // onUploadComplete={(uploads: any[]) => {
                //   console.log('done');
                //   let antiVirusFiles: any[] = [];
                //   let antiVirusReturns: any[] = [];
                //   uploads.forEach(async (name: any) => {
                //     const value = this.form!.getInputValue(name);
                //     antiVirusFiles.push(value);
                //     antiVirusReturns.push({
                //       key: name,
                //       file: name,
                //       success: true
                //     });
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
