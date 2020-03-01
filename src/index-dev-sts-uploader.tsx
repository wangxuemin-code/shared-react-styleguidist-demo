import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'react-toastify/dist/ReactToastify.css';
import { AwsHelper } from './helpers';
import { Controls } from './index-prod';

class Main extends Controls.MyComponent<any, any> {
  private form?: Controls.Form;
  private uploader?: any;

  public constructor(props: any) {
    super(props);

    AwsHelper.retrieveSTSCallback = async () => {
      return {
        access_key_id: 'ASIA5FEPMSFOV3F6BOQT',
        secret_access_key: 'BMb/GdSCKois339DGRgH5rldi+iC9ait4oj0gwvN',
        session_token:
          'FwoGZXIvYXdzEFMaDBThVUesbCUBX+0jviKxA6zKuINE0zG0vhMzw/vBOGTaaPOCjSxQDy/v6pvATcbytS5AVLkW2kIdh5jpiJb9N3lWyeB5+O2ca7Uzuy9UE5MEqsCa7fsg6W3aC70zA7G2HZTxLlEECgCtG0rmMZYaBcrMGMvhupyMPwjBiovV9WldVAk6nhRjdxnXK5sbBM3szkcIvCcaDVsx/aVo9rkB6mnwWnqiuFGV5E08GOpfqdRrE6MblYKOLskVU0kTVCCB7Upp9OKzJDZ507n0DBCAsd4VTPY8xB3NNu+kNp1M6N7udOLCw/X5IoZNjaT8oP/1ilaaOD/3mqwNZwe8XDpd0b5W/0IEDFlDWY/sAQB9hLQcQcJCdyQaTj0r64D1JhN5M/flK0Icgu6inBmgWFhRg/DXU7cwKJK8q7mE0afTW1DsIKKTio1/ycDUR0RAfZzWDGpzyU1BRFLPcn6Zex2yJT4kRQtwFAKTQFA/sT6pQcerYXcMQB319hhe1AySdZ/eYh3VmySE3AAumwThy8I9jXSa7O6t/Qwng4SZ5Nd9tgLhXtoWMwrkcatDg4TF0FHQuAw2UBO6u124dG0KehvwIwEorOjv8gUyLQfVGwhPg7bM4uj+wrgC8KU48fTlBj5XscexV7sG+0NgQrZZlGgXUYvJELlYPA==',
        expiration: '2020-03-01 18:43:08 UTC'
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
                onSubmit={this.onSubmit}
              >
                <Controls.FormControl
                  type='uploader'
                  label='Upload'
                  name='file_upload'
                  required={true}
                  uploaderConfigs={{
                    bucketName: 'istoxkyc-local',
                    path: 'ID00000001C',
                    customAllowFileExtensions: ['.jpg', '.png', '.pdf'],
                    showFileName: true
                  }}
                  value='ISTOXBUCKET|istoxkyc-local|ID46066150M/e0d925c5-47d8-469f-bdb9-be32662ea001.png'
                />
                <Controls.Button type='submit'>Submit</Controls.Button>
                <Controls.Button
                  type='button'
                  onClick={() => {
                    this.startUpload();
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

  private onSubmit = () => {
    this.uploader.cancel();
    console.log(this.form!.getFormObject());
  };

  private startUpload = () => {
    this.uploader = this.form!.uploader()
      .onNothingToUpload(() => {
        console.log('Nothing to upload..');
      })
      .onUploadInitiated((uploadingFiles: string[]) => {
        console.log('On upload initiated, total files: ' + uploadingFiles.length);

        // start upload after 5 seconds later
        setTimeout(() => {
          this.uploader.start();
        }, 5000);
      })
      .onUploadStart(() => {
        console.log('On upload start');
      })
      .onUploadProgress((percent) => {
        console.log('Current upload percent ' + percent);
      })
      .onUploadComplete((uploadedFiles: { [key: string]: string }) => {
        console.log('Upload completed. File url is ', uploadedFiles);
      })
      .onUploadError((e) => {
        console.log('Upload error', e);
      });

    this.uploader.init();
  };
}

const render = () => {
  ReactDOM.render(<Main />, document.getElementById('reactContainer'));
};

render();
