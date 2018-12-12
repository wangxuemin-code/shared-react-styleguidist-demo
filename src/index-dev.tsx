import * as React from 'react';
import {
  Container,
  Button,
  Icon,
  FormControl,
  Link,
  Modal,
  Message,
  Form,
  Header,
  RootContainer,
  ErrorPage,
  Table,
  Card
} from './controls';
import { Mqtt } from './helpers';
import * as ReactDOM from 'react-dom';
import * as styles from './css/main.scss';
import { Controls } from './index-prod';
import { Transition } from './controls/Transition';
import { faAddressBook, faAdjust } from '@fortawesome/free-solid-svg-icons';
import { Confirm } from './controls/Confirm';

class Main extends React.Component<
  any,
  { success: string[] | string; error: string; loading: boolean }
> {
  form: any;
  formControls: any[];

  public constructor(props: any) {
    super(props);
    this.state = {
      success: ['What'],
      error: '',
      loading: false
    };
  }

  public render() {
    return (
      <RootContainer>
        <Header />

        <Button disabled href='abc'>
          Hello
        </Button>
        <Button margin={{ topRem: 1 }} size={'large'} fontStyle={'italic'}>
          Hello
        </Button>
        <Button margin={{ topRem: 1 }} buttonStyle='info' fontStyle={'italic'}>
          Hello2
        </Button>

        <Button
          margin={{ topRem: 1 }}
          buttonStyle='negative'
          onPress={() => {
            Confirm.show({
              type: 'yesno',
              message: 'hello',
              onResult: (result) => {
                console.log(result);
              }
            });
          }}
        >
          Negative Button
        </Button>
        <Button
          margin={{ topRem: 1 }}
          size={'small'}
          buttonStyle='info'
          fontStyle={'italic'}
          loading={this.state.loading}
          onPress={() => {
            console.log('pressed');
            this.setState({
              loading: true
            });
          }}
        >
          Hello2
        </Button>
        <Icon onClick={() => {}} icon={'plus'} tooltip={'hello'} />
        <Link margin={{ topRem: 1 }} display='block' href='www.google.com' useNormalAnchor>
          www.google.com
        </Link>
        <Form
          horizontal
          error={String(404)}
          ref={(ref) => {
            if (ref) {
              this.form = ref;
              this.form.reset();
            }
          }}
          onSubmit={() => {
            console.log(this.form.reset());
            console.log('FORM SUBMITTED');
            this.setState({
              success: '',
              error: ''
            });
          }}
        >
          <Controls.FormControl
            required
            ref={(ref) => {
              this.form = ref;
            }}
            label={
              <span>
                Amount in <b>USD</b>
              </span>
            }
            append={
              <Button
                textAlign={'center'}
                type={'submit'}
                onPress={() => {
                  console.log(this.form.getFormData());
                }}
              >
                Submit
              </Button>
            }
            name='hi'
            type={'money'}
          />

          <Controls.FormControl required label={'Email'} name='email' type={'email'} value='' />
          <Controls.FormControl required label={'Password'} name='Password' type={'password'} />
          <Controls.FormControl
            required
            label={'Notify me'}
            name='notify'
            type={'switch'}
            defaultValue='0'
          />
          <Controls.FormControl
            required
            label={'Type'}
            name='Type'
            placeholder='aCb'
            type={'select'}
            selectOptions={[
              {
                label: 'helo',
                value: 'hei!'
              },
              {
                label: 'Option2',
                value: 'abcl'
              }
            ]}
          />

          <Container tooltip={'tooltip!'} display='inline-block'>
            <Link href='/wqe' useNormalAnchor>
              dasd
            </Link>
          </Container>
        </Form>
        <Transition>
          <Message error='Hello i am sucesss!' />
        </Transition>
        <Card padding={{ allPx: 10 }}>
          <Table
            headers={[{ title: 'Header1' }, { title: 'Header2' }]}
            rows={[
              {
                rowContents: ['Super Admin', 'This is another not very long content.'],
                rowActions: [
                  {
                    icon: faAddressBook,
                    callback: () => {
                      console.log('heeelop');
                    }
                  },
                  {
                    icon: faAdjust,
                    callback: () => {
                      console.log('heeelop');
                    }
                  }
                ]
              },
              { rowContents: ['Super Admin', 'This is another not very long content.'] },
              { rowContents: ['Super Admin', 'This is another not very long content.'] }
            ]}
          />
        </Card>
      </RootContainer>
    );
  }
}

const render = () => {
  ReactDOM.render(<Main />, document.getElementById('reactContainer'));
};

render();

const mqtt = new Mqtt();
mqtt.start();
