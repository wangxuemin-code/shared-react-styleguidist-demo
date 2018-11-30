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
  ErrorPage
} from './controls';
import { Mqtt } from './helpers';
import * as ReactDOM from 'react-dom';
import * as styles from './css/main.scss';
import { Controls } from './index-prod';
import { Transition } from './controls/Transition';

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
            defaultValue={'100'}
          />

          <Container tooltip={'tooltip!'} display='inline-block'>
            <Link href='/wqe'>dasd</Link>
          </Container>
        </Form>
        <Transition>
          <Message error='Hello i am sucesss!' />
        </Transition>
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
