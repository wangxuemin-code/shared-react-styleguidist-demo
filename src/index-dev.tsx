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
  Header
} from './controls';
import { Mqtt } from './helpers';
import * as ReactDOM from 'react-dom';
import * as styles from './css/main.scss';

const render = () => {
  ReactDOM.render(
    <Container>
      <Header />

      <Button disabled>Hello</Button>
      <Button margin={{ topRem: 1 }} size={'large'} fontStyle={'italic'}>
        Hello
      </Button>
      <Icon icon={'plus'} tooltip={'hello'} />
      <Link margin={{ topRem: 1 }} display='block' href='www.google.com'>
        www.google.com
      </Link>
      <Form horizontal success={'This is a problem!'}>
        <FormControl
          required
          label={'Address:'}
          append={'WHAT'}
          type={'money'}
          defaultValue={'hello'}
        />
        <FormControl
          required
          label={'Address:'}
          append={'WHAT'}
          type={'money'}
          defaultValue={'hello'}
        />
        <FormControl
          required
          label={'Address:'}
          append={'WHAT'}
          type={'money'}
          defaultValue={'hello'}
          validateReturnError={value => {
            const val = value as number;
            if (val > 0) {
              return 'cannot be more than zero';
            }
          }}
        />
        <Button textAlign={'center'} margin={{ topRem: 1.2 }} type={'submit'}>
          Submit
        </Button>
      </Form>
      <Message error='Hello i am sucesss!' />
    </Container>,
    document.getElementById('reactContainer')
  );
};

render();

const mqtt = new Mqtt();
mqtt.start();
