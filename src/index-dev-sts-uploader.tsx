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
        access_key_id: 'ASIA5FEPMSFO6F5NAW7U',
        secret_access_key: 'Pwooiu2Mq/6YdU4Z0wxtIyqqLrf4jlV8v38PL+eg',
        session_token:
          'FQoGZXIvYXdzEKn//////////wEaDG2fcZgL7nNHHsGZbyLkAzi6TvUad90RlVJUvDi8M6oJ+gh2R3gaZQzyeK2BtQ4i5hz7wwvJ93wXa/xlpEeQJvkR/o8dSJHOOdKp3bHFQ7WBtRJsFSyU85+a9715mXfWV/5SJnrCUvb2SpNmQLsqjVmd9NvLcd7ZIBqIJkD8FJllRU/8XhYiaFUTXLk9zBefwIvY6kjCVvU5wCxRF4khBb1FwD/ZqmrjMGCVs+icmBR7vDzsn6axJZkAryIrQx7Y7HCkHTUbkD69th8oo8VyEgrJyON9g4BtuD2jM+5P0ClSboRZ24rGoPNIEYzqcQgD1YznNkbcoeW/9kd1eewIgWXq0prIs1p1+5emDXyqkvBdNvHtMG+Pkb6ISyk6EwOS9w9II08UvPIndQvDs/YL/Aa1yYQ369383kR+vss0d08Pg6ATh3il1FTPssu3UVXaPRzv0aRkkia41Y8hf8aL6jwYzEkpdbCrnsFjgORpjOlmx0OhUOCz6yC98U9i/I0kPwF5cekPMhbQ76W7lwh3J8yZBmc0yu3cYyIqISpIyCnKqpBSP7p69Hqj9/RvBFlQk1ihNchgAPiU6DVIcNEnqKXB9cGyXCiAbQSZnHTCZkzg7w1xLFqOEEVs3oytPOwFRE6AJoPodLhjaW4qqS2D6ztXkRAo3fm27AU=',
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
                  uploads.forEach(async (name: any) => {
                    const value = this.form!.getInputValue(name);
                    antiVirusFiles.push(value);
                  });
                  let antiVirusChecks = {
                    bucketName: 'istoxkyc-local',
                    files: antiVirusFiles
                  };
                  console.log('call antivirus', antiVirusChecks);
                  let antiVirusReturns = {
                    uploader: false,
                    uploader_2: true,
                    uploader_3: false
                  };
                  this.setState({ antiVirusChecks: antiVirusReturns });
                }}
                antiVirusChecks={this.state.antiVirusChecks}
                onAntiVirusChecksComplete={() => {
                  console.log('do sthg');
                }}
                uploadBackButtonText={'Back to something'}
              >
                <Controls.FormControl
                  type='uploader'
                  label={'Uploader'}
                  name='uploader'
                  required={true}
                  uploaderConfigs={{
                    // fieldName: 'label1',
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
                    customAllowFileExtensions: ['.jpg', '.png', '.pdf']
                    // fixedFileName: 'abc'
                  }}
                />
                <h6>dsadasd</h6>
                <Controls.Message variant={'warning'} message={'Dasdsad'} />
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

                {/* <Controls.FormControl
                  type='uploader'
                  label={'Uploader'}
                  name='uploader2'
                  required={true}
                  uploaderConfigs={{
                    bucketName: 'istoxkyc',
                    path: 'ID0000001',
                    customAllowFileExtensions: ['.jpg', '.png', '.pdf']
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
