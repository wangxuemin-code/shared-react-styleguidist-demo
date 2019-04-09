import * as React from 'react';
import { Fragment } from 'react';
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
  WrapperContainer,
  ErrorPage,
  Table,
  Card,
  Item,
  Image,
  Tabs,
  Footer,
  Toast,
  Divider
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
  faExclamationTriangle,
  faTicketAlt,
  faCheckCircle,
  faExclamationCircle,
  faSearch
} from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';
import { Confirm } from './controls/Confirm';
import { BlockchainTransaction } from './controls/BlockchainTransaction';
import { CandleStickChart } from './controls/CandleStickChart';
import { LineChart } from './controls/LineChart';
import Truncate from 'react-truncate';
import { ProgressBar } from './controls/ProgressBar';
import { Router, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import FileUploader from './controls/FileUploader';
var uniqid = require('uniqid');

const mqtt = new Mqtt({
  host: 'localhost',
  port: 35675,
  onConnected: () => {
    console.log('connected!');
  }
});

// const mqtt = new Mqtt({
//   host: 'diligent-goat.rmq.cloudamqp.com',
//   username: 'jxlsbgfq:jxlsbgfq',
//   password: 'vFnE4Qqza6oNiu_o_oVynVj_E5GF3Yjf',
//   port: 443,
//   onConnected: () => {
//     console.log('connected!');
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
  {
    success: string[] | string;
    error: string;
    loading: boolean;
    showModal: boolean;
  }
> {
  form: any;
  formControls: any[];
  colorStates: string[];

  public constructor(props: any) {
    super(props);
    this.state = {
      success: ['Success'],
      error: '',
      loading: false,
      showModal: false
    };
    this.colorStates = ['primary', 'secondary', 'disabled', 'info', 'success', 'warning', 'danger'];
  }

  public render() {
    const link = (
      <Fragment>
        <a href='google.com'>Test Link</a>
      </Fragment>
    );
    return (
      <React.Fragment>
        <RootContainer>
          <Header
            logo={true}
            className={'istox-header'}
            mainLinks={[{ title: 'Wallet', path: 'wallet', selected: false, useAnchorTag: false }]}
            subLinks={[{ title: 'Transactions', path: 'transactions', useAnchorTag: false }]}
            userAction
          />
          <WrapperContainer>
            <Container
              padding={{ allPx: 15 }}
              backgroundColor={'#FFF'}
              border={{
                borderSize: 1,
                borderRadius: 10,
                borderColor: '#E9E9E9',
                borderStyle: 'solid'
              }}
            >
              <h4>Typography</h4>
              <Container display={'flex'}>
                <Container padding={{ leftPx: 15 }} className={'flex-50'}>
                  <h1>H1</h1>
                  <h2>H2</h2>
                  <h3>H3</h3>
                  <h4>H4</h4>
                  <h5>H5</h5>
                  <h6>H6</h6>
                </Container>
                <Divider direction={'vertical'} />
                <Container padding={{ leftPx: 15 }} className={'flex-50'}>
                  <p>Paragraph</p>
                  <b>Bold</b>
                  <br />
                  <i>Italic</i>
                  <br />
                  <Link href='/' useNormalAnchor>
                    Links
                  </Link>
                  <br />
                  <u>Underline</u>
                </Container>
              </Container>
            </Container>
            <Divider />
            <h4>Tabs</h4>
            <Tabs
              margin={{ topPx: 20 }}
              basic={true}
              orientation={'horizontal'}
              tabs={[
                {
                  title: (
                    <span>
                      <Icon icon={faCheckCircle} padding={{ rightPx: 15 }} />
                      Account Info
                    </span>
                  ),
                  contents: 'ABCD',
                  active: true
                },
                {
                  title: (
                    <span>
                      <Icon icon={faCheckCircle} padding={{ rightPx: 15 }} />
                      Phone Number
                    </span>
                  ),
                  contents: 'EFGH'
                },
                {
                  title: (
                    <span>
                      <Icon icon={faCheckCircle} padding={{ rightPx: 15 }} />
                      Personal Info
                    </span>
                  ),
                  contents: 'IJKL'
                },
                {
                  title: (
                    <span>
                      <Icon icon={faExclamationCircle} padding={{ rightPx: 15 }} />
                      Documents
                    </span>
                  ),
                  contents: 'MNOP'
                }
              ]}
            />
            <Tabs
              margin={{ topPx: 20 }}
              orientation={'horizontal'}
              tabs={[
                {
                  title: (
                    <span>
                      <Icon icon={faCheckCircle} padding={{ rightPx: 15 }} />
                      Account Info
                    </span>
                  ),
                  contents: 'ABCD'
                },
                {
                  title: (
                    <span>
                      <Icon icon={faCheckCircle} padding={{ rightPx: 15 }} />
                      Phone Number
                    </span>
                  ),
                  contents: 'EFGH'
                },
                {
                  title: (
                    <span>
                      <Icon icon={faCheckCircle} padding={{ rightPx: 15 }} />
                      Personal Info
                    </span>
                  ),
                  contents: 'IJKL'
                },
                {
                  title: (
                    <span>
                      <Icon icon={faExclamationCircle} padding={{ rightPx: 15 }} />
                      Documents
                    </span>
                  ),
                  contents: 'MNOP'
                }
              ]}
            />
            <Tabs
              margin={{ topPx: 20 }}
              orientation={'horizontal'}
              align={'middle'}
              tabs={[
                {
                  title: (
                    <span>
                      <Icon icon={faCheckCircle} padding={{ rightPx: 15 }} />
                      Account Info
                    </span>
                  ),
                  contents: 'ABCD'
                },
                {
                  title: (
                    <span>
                      <Icon icon={faCheckCircle} padding={{ rightPx: 15 }} />
                      Phone Number
                    </span>
                  ),
                  contents: 'EFGH'
                },
                {
                  title: (
                    <span>
                      <Icon icon={faCheckCircle} padding={{ rightPx: 15 }} />
                      Personal Info
                    </span>
                  ),
                  contents: 'IJKL'
                },
                {
                  title: (
                    <span>
                      <Icon icon={faExclamationCircle} padding={{ rightPx: 15 }} />
                      Documents
                    </span>
                  ),
                  contents: 'MNOP'
                }
              ]}
            />
            <Divider hidden />
            <Tabs
              margin={{ topPx: 20 }}
              className={'istox-tabs'}
              orientation={'vertical'}
              align={'middle'}
              tabs={[
                {
                  title: (
                    <span>
                      <Icon icon={faCheckCircle} />
                      Account Info
                    </span>
                  ),
                  contents: 'ABCD'
                },
                {
                  title: (
                    <span>
                      <Icon icon={faCheckCircle} />
                      Phone Number
                    </span>
                  ),
                  contents: 'EFGH'
                },
                {
                  title: (
                    <span>
                      <Icon icon={faCheckCircle} />
                      Personal Info
                    </span>
                  ),
                  contents: 'IJKL'
                },
                {
                  title: (
                    <span>
                      <Icon icon={faExclamationCircle} />
                      Documents
                    </span>
                  ),
                  contents: 'MNOP'
                }
              ]}
            />
            <Divider />
            <h4>Button</h4>
            <Button size='small' variant='primary'>
              Small
            </Button>
            <Button size='medium' variant='primary'>
              Medium
            </Button>
            <Button size='large' variant='primary'>
              Large
            </Button>
            <Button size='large' fontStyle={'italic'} variant='primary'>
              Italic
            </Button>
            <Divider visibility={'hidden'} />
            <Button fluid fontStyle={'italic'} variant='primary'>
              Fluid
            </Button>
            <Divider visibility={'hidden'} />
            {this.colorStates.map((button: any) => (
              <Button key={uniqid().toString()} variant={button}>
                {button.toUpperCase()}
              </Button>
            ))}
            <Divider visibility={'hidden'} />
            {this.colorStates.map((button: any) => (
              <Button key={uniqid().toString()} flat variant={button}>
                {button.toUpperCase()}
              </Button>
            ))}
            <Divider visibility={'hidden'} />
            {this.colorStates.map((button: any) => (
              <Button key={uniqid().toString()} outline variant={button}>
                {button.toUpperCase()}
              </Button>
            ))}
            <Divider visibility={'hidden'} />
            {this.colorStates.map((button: any) => (
              <Button key={uniqid().toString()} outline basic variant={button}>
                {button.toUpperCase()}
              </Button>
            ))}
            <Divider />
            <Container display={'grid'} padding={{ allPx: 15 }}>
              <h4>Image</h4>
              <Container padding={{ allPx: 15 }}>
                <Image variant={'logo'} />
              </Container>
              <Container padding={{ allPx: 15 }} backgroundColor={'#000'}>
                <Image variant={'logo alt'} />
              </Container>
            </Container>
            <Divider />
            <h4>PopUps</h4>
            <Toast />
            <Button
              onPress={() => {
                Toast.show({
                  type: 'transaction_status_ok',
                  blockchainTransactionOptions: {
                    purpose: 'Hello',
                    txHash: '0x5b35c2a75cc21af4573990e3b469fd3a6bea353d7f59839e0827415994b46fe2'
                  }
                });
              }}
            >
              Toast
            </Button>
            <Modal className={'abc'} visible={this.state.showModal}>
              Modal
            </Modal>
            <Button
              variant='danger'
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
              Confirmation
            </Button>
            <Button
              variant='info'
              loading={this.state.loading}
              onPress={() => {
                this.setState({ showModal: true });
              }}
            >
              Modal
            </Button>
            <Button outline variant='primary' tooltip={'tooltip!'} display='inline-block'>
              ToolTip
            </Button>
            <Button
              variant='success'
              onPress={() => {
                BlockchainTransaction.show({
                  mqttClient: mqtt,
                  waitOptions: {
                    queueName: 'test'
                  },
                  onSucess: () => {}
                });
              }}
            >
              Bottom Toast
            </Button>
            <Divider />
            <Container display={'grid'} padding={{ allPx: 15 }}>
              <h4>Progress</h4>
              <ProgressBar margin={{ topPx: 20 }} value={20} variant={'success'} />
              <ProgressBar margin={{ topPx: 20 }} value={20} label variant={'info'} />
              <ProgressBar margin={{ topPx: 20 }} value={20} striped variant={'warning'} />
              <ProgressBar margin={{ topPx: 20 }} value={20} variant={'danger'} />
              <ProgressBar
                margin={{ topPx: 20 }}
                value={20}
                label={'Strong Password'}
                variant={'success'}
              />
              <ProgressBar margin={{ topPx: 20 }}>
                <ProgressBar striped variant='success' value={25} order={1} />
                <ProgressBar variant='info' value={25} order={2} />
                <ProgressBar striped variant='warning' value={25} order={3} />
                <ProgressBar striped variant='danger' value={25} order={4} />
              </ProgressBar>
              <ProgressBar width={200} margin={{ topPx: 20 }}>
                <ProgressBar striped variant='success' value={25} order={1} />
                <ProgressBar variant='info' value={25} order={2} />
                <ProgressBar striped variant='warning' value={25} order={3} />
                <ProgressBar striped variant='danger' value={25} order={4} />
              </ProgressBar>
              <ProgressBar gap width={200} margin={{ topPx: 20 }}>
                <ProgressBar striped variant='success' value={25} order={1} />
                <ProgressBar variant='info' value={25} order={2} />
                <ProgressBar striped variant='warning' value={25} order={3} />
                <ProgressBar striped variant='danger' value={25} order={4} />
              </ProgressBar>
            </Container>
            <Divider />
            <h4>Table</h4>
            <Container backgroundColor={'#FFF'} margin={{ topPx: 15 }} padding={{ allPx: 15 }}>
              <Table
                headers={[
                  { title: 'Code' },
                  { title: 'Date Created' },
                  { title: 'Request Status' },
                  {
                    title: 'Actions'
                  }
                ]}
                rows={[
                  { rowContents: ['Super Admin', 'This is another not very long content.'] },
                  {
                    rowContents: [
                      'Super Admin',
                      'This is another not very long content.',
                      'DDMMYYYY'
                    ],
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
                    rowContents: [
                      'Super Admin',
                      'This is another not very long content.',
                      'DDMMYYYY'
                    ],
                    rowActions: [{ loading: true }]
                  }
                ]}
              />
            </Container>
            <Divider />
            <Container margin={{ topPx: 15 }} padding={{ allPx: 15 }} backgroundColor={'#FFF'}>
              <h4>Form Elements</h4>
              <Form
                horizontal
                display={'grid'}
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
                <Controls.Container className={styles.formGroup} display={'flex'}>
                  <Controls.FormControl label={'Area Code'} name='phonecode' type={'phonecode'} />
                  <Controls.FormControl
                    required={true}
                    placeholder={'XXXXXXXX'}
                    label={'Phone Number'}
                    append={
                      <Controls.Button textAlign={'center'} type={'submit'}>
                        Send Code
                      </Controls.Button>
                    }
                    name='numeric'
                    type={'numeric'}
                    decimalPlace={2}
                  />
                </Controls.Container>
                <Controls.Container className={styles.formGroup} display={'flex'}>
                  <Controls.FormControl
                    required
                    placeholder={'Placeholder'}
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
                        <Icon icon={faPlus} text={'Extra control'} />
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
                    decimalPlace={2}
                  />
                </Controls.Container>
                <Controls.FormControl
                  required
                  label='Image'
                  name='image'
                  type='uploader'
                  s3Settings={{
                    bucketName: 'istox-stos-test',
                    region: 'ap-southeast-1',
                    accessKeyId: 'secret',
                    secretAccessKey: 'secret'
                  }}
                  value='https://istox-stos.s3-ap-southeast-1.amazonaws.com/0.inqnqs9knpo_1550406707310.jpeg'
                />
                <Controls.FormControl
                  required
                  label={'Search'}
                  name='search'
                  type={'text'}
                  placeholder={'Search'}
                  value=''
                  prepend={<Icon icon={faSearch} padding={{ topPx: 5 }} />}
                />
                <Controls.FormControl
                  required
                  label={'Email'}
                  name='email'
                  type={'email'}
                  value=''
                />
                <Controls.Container className={'form-group'} display={'flex'}>
                  <Controls.FormControl
                    required
                    label={'Password'}
                    name='Password'
                    type={'password'}
                  />
                  <Controls.FormControl label={'Password'} name='Password' type={'password'} />
                </Controls.Container>
                <Controls.FormControl
                  label={'Description'}
                  name='description'
                  type={'longtext'}
                  alwaysCapitalize={true}
                />
                <Controls.FormControl label={'Number'} name='number' type={'number'} />
                <Controls.FormControl label={'Phone'} name='numeric' type={'numeric'} />
                <Controls.FormControl
                  numInputs={5}
                  inputWidth={'95px'}
                  label={'OTP'}
                  name='numberfields'
                  type={'numberfields'}
                  separator={'  ·  '}
                />
                <Controls.FormControl label={'$$$'} name='money' type={'money'} decimalPlace={2} />
                <Controls.FormControl
                  required
                  label={'Date'}
                  name='datetime'
                  type={'datetime'}
                  defaultValue={Formatter.dateToUnixTimestamp(new Date())}
                  onInputChanged={(value) => {
                    console.log(value);
                  }}
                />
                <Controls.FormControl
                  required
                  label={'Notify me'}
                  name='notify'
                  type={'switch'}
                  defaultValue='0'
                />
                <Controls.FormControl
                  required
                  label={'H Checkbox'}
                  name='checkbox'
                  type={'checkbox'}
                  variant={'horizontal'}
                  selectOptions={[
                    {
                      label: link,
                      value: 'hei!'
                    },
                    {
                      label:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                      value: 'abcl'
                    }
                  ]}
                />
                <Controls.FormControl
                  required
                  label={'V Checkbox'}
                  name='checkbox'
                  type={'checkbox'}
                  selectOptions={[
                    {
                      label: 'Option1',
                      value: 'hei!'
                    },
                    {
                      label: 'Option2',
                      value: 'abcl'
                    }
                  ]}
                />
                <Controls.FormControl
                  required
                  label={'DateRange'}
                  name='daterange'
                  type={'daterange'}
                  placeholder={''}
                  defaultValue={Formatter.dateToUnixTimestamp(new Date())}
                  onInputChanged={(value) => {
                    console.log(value);
                  }}
                />
                <Controls.FormControl
                  required
                  label={'Dropdown'}
                  name='Dropdown'
                  placeholder='Choose'
                  type={'select'}
                  selectOptions={[
                    {
                      label: 'Option1',
                      value: 'hei!'
                    },
                    {
                      label: 'Option2',
                      value: 'abcl'
                    }
                  ]}
                />
                <Controls.FormControl
                  required
                  label={'Html Dropdown'}
                  name='Dropdown'
                  placeholder='Choose'
                  type={'customselect'}
                  selectCustomOptions={[
                    {
                      label: 'Option1',
                      value: 'hei!',
                      image: '/images/ISTOX_Logo.png'
                    },
                    {
                      label: 'Option2',
                      value: 'abcl',
                      image: '/images/ISTOX_Logo.png'
                    }
                  ]}
                />
                <Controls.FormControl label={'Country'} name='country' type={'country'} />
                <Controls.FormControl
                  label={'Country Code'}
                  name='countrycode'
                  type={'countrycode'}
                />
                <Controls.FormControl label={'Phone Code'} name='phonecode' type={'phonecode'} />
              </Form>
            </Container>
            <Divider />
            <h4>Item</h4>
            <Item
              icon={faCheckCircle}
              title={'Title'}
              description={
                'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...'
              }
            />
            <Item
              icon={faCheckCircle}
              image={'/images/ISTOX_Logo.png'}
              title={'Title'}
              description={
                'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...'
              }
            />
            <Divider />
            <h4>Card</h4>
            <Card
              leftIcon={faCheckCircle}
              rightIcon={faCheckCircle}
              icon={faCheckCircle}
              image={'/images/ISTOX_Logo.png'}
              title={'Title'}
            />
            <Divider />
            <h4>Message</h4>
            <Container margin={{ topPx: 15 }} padding={{ allPx: 15 }} backgroundColor={'#FFF'}>
              <Transition>
                <Message success='Hello i am a success!' />
                <Message info='Hello i am an info!' />
                <Message warning='Hello i am a waning!' />
                <Message error='Hello i am an error!' />
              </Transition>
            </Container>
            <Divider />
            {/* <Container width={1000} height={1000}>
            <ErrorPage type={'500'} message={'omgggg'} />
          </Container>
          <Image src={'abc.png'} alt={<Icon icon={faExclamationTriangle} fontSizeRem={15} />} /> */}
          </WrapperContainer>
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
