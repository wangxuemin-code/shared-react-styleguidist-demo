import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Controls } from './index-prod';
import { AwsHelper } from './helpers';

class Main extends Controls.MyComponent {
  private form?: Controls.Form;

  public constructor(props: any) {
    super(props);

    AwsHelper.retrieveSTSCallback = async () => {
      return {
        access_key_id: 'ASIAZ7AHP7WMAWUM4XXK',
        secret_access_key: 'Lbbcc5fMGSgFp6uHA9LrUPWr+MXb7/0eL7onP9gb',
        session_token:
          'FQoGZXIvYXdzEJr//////////wEaDI6Xqwl9TTWgqDqSxyKsA//NWyZehL2Xnq/YmqvJTWdlHw1c4yhiSsBr92sL5NM0w/K64wFUqB6GZdguLKvjzkq7Pk1hBp7Qw8K+YeBau7DXaaKMMDFxAyNo2fme7K4eak9+GH7ddTNoBBFLMXlLL2lH95BF5KjyjqT5EnMo2ZSQQVXezMfY43Vb4wF5F0PEElSQ6DySE5VIpAC1gthhIjr3CNdFkfMUpfDorAMLl4WOgluct4LtathvsQoRKiESEvlDTadOFlpkltNfsXhbeP+T4QTB02U78kRHC8PhNDTxEjgQ3B2HhHYP2e/213xoWciqhzglztz+aYH+c3ro6prNgj9Vim495S3c+ql1cGIe6M6RdAoiEx7kPACFOv2ui7O3ePRG3XBFaMOx+pF/UMtKfPeMisNCqs3yOwNnfKDg5IiAssTYWi/44kEbb8bt070THk1UrDunhUeNN1BQNYhfe6piOepsk2F1C4aebRKmNNnFhnDoNlsbf0NItCn3dVGGfmtCeUGV6nG4u+iw3g/yRRegND0+yodt2IMJMWsx4eGSI+N5tduFQp4smBZkmGXkAvT20LYAkXLbKP2tmuoF',
        expiration: '2019-08-04T09:27:41.000Z'
      };
    };
  }

  public render() {
    return (
      <React.Fragment>
        <Controls.RootContainer>
          <Controls.Header
            logo={true}
            className={'istox-header'}
            mainLinks={[
              { title: 'STO', path: 'sto', selected: false, useAnchorTag: true },
              { title: 'Wallet', path: 'wallet', selected: true, useAnchorTag: true }
            ]}
            subLinks={[{ title: 'Transactions', path: 'transactions', useAnchorTag: true }]}
          />
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
              >
                <Controls.FormControl
                  type='uploader'
                  label={'Uploader'}
                  name='uploader'
                  required={true}
                  value={
                    // 'ISTOXBUCKET|istoxkyc|ID35126761M/6314f04e-76e6-4142-bdac-4a23cbf438ed.pdf'
                    'ISTOXBUCKET|istoxkyc|ID35126761M/0222ce01-6b44-409c-a04f-f589c7189de8.jpg'
                  }
                  uploaderConfigs={{
                    bucketName: 'istoxkyc',
                    path: 'ID0000001',
                    customAllowFileExtensions: ['.jpg', '.png', '.pdf'],
                    fixedFileName: 'abc'
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
