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
        access_key_id: 'ASIAZ7AHP7WMFYPLD6GM',
        secret_access_key: 'TRQIvK1MN9jZGCg02LfKfvMcsV7olTglJTg4YgvK',
        session_token:
          'FQoGZXIvYXdzEIj//////////wEaDKQQUSs3DnStepHABSKsAz2n9chy2oRcF5whFKyQUkeXUKv1Ccv7OIq59kDreqIyYzMWpH4jajkV4dHsm+3PP09MaXJlOF7O83KafDwGylj/6RlPyo+XuXOg6FivRZ7O8DO3yyubI2fD9Z5Og6yNk1BnX1yBKn/QfOkIErkIS4leGMHq/2FWWqgX4901Ax2B3ZgpeKh2ujSxR99urMzu34abGw+qNun8jGMc8m3IMQ0lql92QZe63LOI4aWyH90QMkSNPjtEC9Bfn8h79WMJ3nrtf8thZNlcAT+lyuhtO3j5i8IAkV4BlYLpETOK5raFBlLVnf9d2HSakKenY/9o4N69EUqyN9bEMJJa5xKQulBR5+86S/oN7W+0eMDEuBTPJZaf2glXjFNSKNpCUqqWxwKyDHQ4Ftwr2tfuHXOdGRdDIlcpFjqWNWjo7Vt2kLg5Psv/0ohNn7CzZfGuK3O6e6SWbHQSYz4jfc2wRYQYURX//4z8ksxwZAR8XtTIPkpfqJeIsc5jc1oydzM0K9ckuPK4O7Lo1CBn6LssqJEkUeBWQXsnMn5+hBycrp8AVpvkAutSvMqhWHejgejdKKqzluoF',
        expiration: '2019-08-03T15:26:50.000Z'
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
                  console.log('dssads');
                }}
              >
                <Controls.FormControl
                  type='uploader'
                  label={'Uploader'}
                  name='uploader'
                  required={true}
                  value={
                    'ISTOXBUCKET|istoxkyc|ID35126761M/93a9dd4a-2e9f-4536-9ab3-3ba5552f397b.png'
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
