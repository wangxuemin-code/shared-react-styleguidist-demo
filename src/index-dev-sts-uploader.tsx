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
        access_key_id: 'ASIA5FEPMSFOVOEGMOPA',
        secret_access_key: 'kWusVPE/XTYlklpC7iPndnTkRGslHvn+937d4VZh',
        session_token:
          'FQoGZXIvYXdzEKP//////////wEaDFYv1PlaXIn/cfZnSCLkAyQpyIksTl/BFK2ba1ZBh2pwoEeYNQGLaNhlu8jbRstE4UI1IJzpht8OJCfRG+MHV2i3Fx1pF+SrUAAooaT82AAWntyVhetG8mSeEdlzcTeLf1f4vU+1vC04RZ2XxBD/TiSFUDiaZ6E7VOF2Z0S/G7nO4o8Bd7XtrL6LCd7uJOgEiQ45P24SXLiqATRoty2B0FJ0cT+I06tMuns43ETW2cQzJ7bfEcUjCrV3hdrHynhrSTTOyAOcD6802yb90ps4qpAz+XVch95jpCQ6vs1pMKDBTLsmZGyTLPu21xvHQnpP0XGXezip70QwgJbmZM5YH6UDrNtcfiCwSx75etTKbwc2700ClurcfliWY2S+4qjh45vcuhCvwCJ4NHtmwQ4gdVYhmjmvGJL+EmlFAiIzlkcBUcGJj5a5Wgxh10TWVbEWN3l+iSs/JjsttSIS6vwhPvysOtFQhcbSsra+skhu6MZvbElg7T+4BGjEwPeZiE6uYe1zaMECD9ovTBngO8qr7pSJTyxz8WI8yEk34LyEW17D7nCj7cnrbFv1G9Xzdhzscp5aj5PNZtaWQtOU9Bil4godyLGkFe9zrigs2mRK0hNZaF8qp9OATbe1B+bf94E+Dl1s+Ensa0vT/HzIAgqNlxx9woQo5Ne17AU=',
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
                  value={
                    // 'ISTOXBUCKET|istoxkyc|ID35126761M/6314f04e-76e6-4142-bdac-4a23cbf438ed.pdf'
                    'ISTOXBUCKET|istoxkyc-local|ID42731762M/f0cbc4cc-915a-4a3b-8e43-94a1989a8f15.png'
                  }
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
                  value={
                    // 'ISTOXBUCKET|istoxkyc|ID35126761M/6314f04e-76e6-4142-bdac-4a23cbf438ed.pdf'
                    'ISTOXBUCKET|istoxkyc-local|ID42731762M/f0cbc4cc-915a-4a3b-8e43-94a1989a8f15.png'
                  }
                  uploaderConfigs={{
                    bucketName: 'istoxkyc-local',
                    path: 'ID42731762M',
                    customAllowFileExtensions: ['.jpg', '.png', '.pdf']
                    // fixedFileName: 'abc'
                  }}
                />

                <Controls.FormControl
                  type='uploader'
                  label={'Uploader2'}
                  name='uploader_3'
                  required={true}
                  value={
                    // 'ISTOXBUCKET|istoxkyc|ID35126761M/6314f04e-76e6-4142-bdac-4a23cbf438ed.pdf'
                    'ISTOXBUCKET|istoxkyc-local|ID42731762M/f0cbc4cc-915a-4a3b-8e43-94a1989a8f15.png'
                  }
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
