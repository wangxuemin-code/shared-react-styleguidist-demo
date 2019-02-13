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
  Card,
  Image,
  Tabs,
  Footer
} from './controls';
import { Mqtt, Formatter } from './helpers';
import * as ReactDOM from 'react-dom';
import * as styles from './css/main.scss';
import { Controls } from './index-prod';
import { Transition } from './controls/Transition';
import {
  faAddressBook,
  faAdjust,
  faPlus,
  faQuestion,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import { Confirm } from './controls/Confirm';
import { BlockchainTransaction } from './controls/BlockchainTransaction';
import { CandleStickChart } from './controls/CandleStickChart';
import { LineChart } from './controls/LineChart';
import Truncate from 'react-truncate';

const mqtt = new Mqtt({
  host: 'localhost',
  username: 'abc',
  password: 'cc',
  port: 35675,
  onConnected: () => {
    console.log('connected!');
  }
});

// mqtt.subscribe({
//   queueName: 'test',
//   topic: '123',
//   callback: () => {
//     console.log('waow');
//   }
// });

// mqtt
//   .waitForMessage({
//     queueName: 'abc',
//     topic: 'jom',
//     filter: {
//       id: '1',
//       type: 'HELLO'
//     }
//   })
//   .then((message) => {
//     console.log('aha');
//     console.log(message);
//   });

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
      <React.Fragment>
        <RootContainer>
          <Header />

          {/* <CandleStickChart /> */}

          <Tabs margin={{ topPx: 20 }} tabs={[{ title: 'Hello', contents: 'ABCD' }]} />

          <LineChart
            title={'Sample Chart'}
            yTitle={'Sample y title'}
            xTitle={'X title'}
            margin={{ topPx: 50 }}
            xLabels={[
              '1',
              '2',
              '3',
              '1',
              '2',
              '3',
              '1',
              '2',
              '3',
              '1',
              '2',
              '3',
              '1',
              '2',
              '3',
              '1'
            ]}
            series={[
              {
                name: 'Hello',
                data: [NaN, NaN, NaN, NaN, NaN, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
              },
              {
                name: 'Beby',
                data: [NaN, NaN, NaN, NaN, NaN, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
              }
            ]}
          />

          <Controls.Container>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </Controls.Container>

          <br />

          <Button disabled href='abc'>
            Hello
          </Button>
          <Button margin={{ topRem: 1 }} size={'large'} fontStyle={'italic'}>
            Hello
          </Button>
          <Button margin={{ topRem: 1 }} buttonStyle='info' fontStyle={'italic'}>
            Hello2
          </Button>
          <Button margin={{ topRem: 1 }} buttonStyle='success' fontStyle={'italic'}>
            Test
          </Button>
          <Button margin={{ topRem: 1 }} buttonStyle='fail' fontStyle={'italic'}>
            Fail
          </Button>

          <Button
            margin={{ topRem: 1 }}
            buttonStyle='negative'
            onPress={() => {
              this.setState({
                loading: true
              });
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

              if (this.form) {
                this.form.getFormControl('notify').setValue('1');
              }
            }}
          >
            Hello2
          </Button>
          <Icon
            onClick={() => {
              BlockchainTransaction.show({
                mqttClient: mqtt,
                waitOptions: {
                  queueName: 'test'
                },
                onSucess: () => {}
              });
            }}
            icon={'plus'}
            tooltip={'hello'}
          />
          <Link margin={{ topRem: 1 }} display='block' href='www.google.com' useNormalAnchor>
            www.google.com
          </Link>

          <Form
            horizontal
            error={String(404)}
            ref={(ref) => {
              if (ref) {
                this.form = ref;
                // this.form.reset();
              }
            }}
            onSubmit={() => {
              // console.log(this.form.reset());
              console.log('FORM SUBMITTED');
              this.setState({
                success: '',
                error: ''
              });
            }}
          >
            <Controls.FormControl
              required
              disabled={true}
              ref={(ref) => {
                this.form = ref;
              }}
              label={
                <span>
                  Amount in <b>USD</b>
                </span>
              }
              extraControls={
                <Link>
                  <Icon icon={faPlus} text={'What'} />
                </Link>
              }
              append={
                <Button
                  textAlign={'center'}
                  type={'submit'}
                  onPress={() => {
                    console.log(this.form.getFormData());
                    console.log(this.form.getInputValue('description'));
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
            <Controls.FormControl label={'Password'} name='Password' type={'password'} />
            <Controls.FormControl
              label={'Description'}
              name='description'
              type={'longtext'}
              alwaysCapitalize={true}
            />
            <Controls.FormControl label={'Number'} name='number' type={'number'} />
            <Controls.FormControl label={'$$$'} name='money' type={'money'} />
            <Controls.FormControl
              required
              label={'Date'}
              name='datetime'
              type={'datetime'}
              placeholder={'test'}
              defaultValue={Formatter.dateToUnixTimestamp(new Date())}
            />
            {() => {
              return (
                <div>
                  <div>
                    <Controls.FormControl
                      required
                      label={'Notify me'}
                      name='notify'
                      type={'switch'}
                      defaultValue='0'
                    />
                  </div>
                </div>
              );
            }}

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
                {
                  rowContents: ['Super Admin', 'This is another not very long content.'],
                  rowActions: [{ loading: true }]
                }
              ]}
            />
          </Card>

          <Container width={1000} height={1000}>
            <ErrorPage type={'500'} message={'omgggg'} />
          </Container>

          <Image src={'abc.png'} alt={<Icon icon={faExclamationTriangle} fontSizeRem={15} />} />
        </RootContainer>
        <Footer />
      </React.Fragment>
    );
  }
}

const render = () => {
  ReactDOM.render(<Main />, document.getElementById('reactContainer'));
};

render();
