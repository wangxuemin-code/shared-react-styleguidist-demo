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

const render = () => {
  ReactDOM.render(
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
        success={'This is a problem!'}
        ref={(ref) => {
          this.form = ref;
        }}
        onSubmit={() => {
          console.log(this.form.getInputValue('hi'));
          console.log('FORM SUBMITTED');
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
          defaultValue={'hello'}
        />

        <Container tooltip={'tooltip!'} display='inline-block'>
          <Link href='/wqe'>dasd</Link>
        </Container>
      </Form>
      <Message error='Hello i am sucesss!' />
    </RootContainer>,
    document.getElementById('reactContainer')
  );
};

render();

const mqtt = new Mqtt();
mqtt.start();
