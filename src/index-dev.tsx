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
          size={'small'}
          buttonStyle='info'
          fontStyle={'italic'}
          onPress={() => console.log('www')}
        >
          Hello2
        </Button>
        <Icon onClick={() => {}} icon={'plus'} tooltip={'hello'} />
        <Link margin={{ topRem: 1 }} display='block' href='www.google.com'>
          www.google.com
        </Link>
        <Form
          horizontal
          error={this.state.error}
          loading={this.state.loading}
          ref={(ref) => {
            this.form = ref;
          }}
          onSubmit={() => {
            console.log(this.form.reset());
            console.log('FORM SUBMITTED');
            this.setState({
              success: '',
              error: ''
            });

            setTimeout(() => {
              this.setState({ loading: true });
            }, 900);
          }}
        >
          <Controls.FormControl
            required
            label={
              <span>
                Amount in <b>USD</b>
              </span>
            }
            append={
              <Button textAlign={'center'} type={'submit'}>
                Submit
              </Button>
            }
            name='hi'
            type={'money'}
          />

          <Container tooltip={'tooltip!'} display='inline-block'>
            <Link href='/wqe'>dasd</Link>
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
