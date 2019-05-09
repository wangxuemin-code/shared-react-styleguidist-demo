import * as React from 'react';
import { Fragment } from 'react';
import {
  Container,
  Grid,
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
  Divider,
  Rating,
  MyComponent
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
  faTimesCircle,
  faCheckCircle,
  faExclamationCircle,
  faInfoCircle,
  faSearch,
  faUser
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
import { Breadcrumbs } from './controls/Breadcrumbs';
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

class Main extends MyComponent<
  any,
  {
    success: string[] | string;
    error: string;
    loading: boolean;
    showModal: boolean;
    selectOptions: any[];
  }
> {
  tabs: Tabs;
  form: any;
  formControls: any[];
  colorStates: string[];

  public constructor(props: any) {
    super(props);
    this.state = {
      success: ['Success'],
      error: '',
      loading: false,
      showModal: false,
      selectOptions: [
        {
          label: 'Primary',
          value: 'primary'
        }
      ]
    };
    this.colorStates = ['primary', 'secondary', 'disabled', 'info', 'success', 'warning', 'danger'];
  }

  public render() {
    const link = (
      <Fragment>
        By visiting the iSTOX platform, I shall be subject to and bound by our&nbsp;
        <Controls.Link href='/' useNormalAnchor={true}>
          Terms of Use
        </Controls.Link>
      </Fragment>
    );
    return (
      <React.Fragment>
        <RootContainer>
          <Header
            logo={true}
            className={'istox-header'}
            mainLinks={[{ title: 'Wallet', path: 'wallet', selected: false, useAnchorTag: false }]}
            subLinks={[{ title: 'Transactions', path: 'transactions', useAnchorTag: true }]}
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
                  <p className='semi-bold'>Semi Bold</p>
                  <b>Bold</b>
                  <p className='extra-bold'>Extra Bold</p>
                  <i>Italic</i>
                  <br />
                  <u>Underline</u>
                  <br />
                  <span className='tiny'>Tiny</span> &nbsp;
                  <span className='small'>Small</span> &nbsp;
                  <span className='medium'>Medium</span> &nbsp;
                  <span className='large'>Large</span>
                </Container>
              </Container>
            </Container>
            <Divider />
            <h4>Tabs</h4>
            <Tabs
              margin={{ topPx: 20 }}
              basic
              orientation={'horizontal'}
              onTabSelected={(tabName) => {
                console.log(tabName);
              }}
              selectedIndex={2}
              ref={(ref) => {
                if (ref) this.tabs = ref;
              }}
              tabs={[
                {
                  title: (
                    <Container>
                      <Icon icon={faCheckCircle} />
                      Account Info
                    </Container>
                  ),
                  tabName: 'Account',
                  contents: 'ABCD'
                },
                {
                  title: (
                    <Container>
                      <Icon icon={faCheckCircle} />
                      Phone Number
                    </Container>
                  ),
                  tabName: 'Phone',
                  contents: 'EFGH'
                },
                {
                  title: (
                    <Container>
                      <Icon icon={faCheckCircle} />
                      Personal Info
                    </Container>
                  ),
                  tabName: 'Personal',
                  contents: 'IJKL'
                },
                {
                  title: (
                    <Container>
                      <Icon icon={faExclamationCircle} />
                      Documents
                    </Container>
                  ),
                  tabName: 'Documents',
                  contents: 'MNOP'
                }
              ]}
            />
            <Controls.Button
              onClick={() => {
                this.tabs.goToPrevious();
              }}
            >
              Go to previous Tab
            </Controls.Button>
            <Controls.Button
              onClick={() => {
                this.tabs.goToNext();
              }}
            >
              Go to next Tab
            </Controls.Button>

            <Tabs
              margin={{ topPx: 20 }}
              orientation={'horizontal'}
              tabs={[
                {
                  title: (
                    <Container>
                      <Icon icon={faCheckCircle} />
                      Account Info
                    </Container>
                  ),
                  contents: 'ABCD'
                },
                {
                  title: (
                    <Container>
                      <Icon icon={faCheckCircle} />
                      Phone Number
                    </Container>
                  ),
                  contents: 'EFGH'
                },
                {
                  title: (
                    <Container>
                      <Icon icon={faCheckCircle} />
                      Personal Info
                    </Container>
                  ),
                  contents: 'IJKL'
                },
                {
                  title: (
                    <Container>
                      <Icon icon={faExclamationCircle} />
                      Documents
                    </Container>
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
                    <Container>
                      <Icon icon={faCheckCircle} />
                      Account Info
                    </Container>
                  ),
                  contents: 'ABCD'
                },
                {
                  title: (
                    <Container>
                      <Icon icon={faCheckCircle} />
                      Phone Number
                    </Container>
                  ),
                  contents: 'EFGH'
                },
                {
                  title: (
                    <Container>
                      <Icon icon={faCheckCircle} />
                      Personal Info
                    </Container>
                  ),
                  contents: 'IJKL'
                },
                {
                  title: (
                    <Container>
                      <Icon icon={faExclamationCircle} />
                      Documents
                    </Container>
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
                    <Container>
                      <Icon icon={faCheckCircle} />
                      <span>Account Info</span>
                    </Container>
                  ),
                  contents: 'ABCD'
                },
                {
                  title: (
                    <Container>
                      <Icon icon={faCheckCircle} />
                      <span>Phone Number</span>
                    </Container>
                  ),
                  contents: 'EFGH'
                },
                {
                  title: (
                    <Container>
                      <Icon icon={faCheckCircle} />
                      <span>Personal Info</span>
                    </Container>
                  ),
                  contents: 'IJKL'
                },
                {
                  title: (
                    <Container>
                      <Icon icon={faExclamationCircle} />
                      <span>Documents</span>
                    </Container>
                  ),
                  contents: 'MNOP'
                }
              ]}
            />
            <Divider />
            <h4>Button</h4>
            <Button size='tiny' variant='primary'>
              Tiny
            </Button>
            <Button size='small' variant='primary'>
              Small
            </Button>
            <Button size='medium' variant='primary'>
              Medium
            </Button>
            <Button
              onClick={() => {
                console.log(1);
              }}
              size='large'
              variant='primary'
            >
              Large
            </Button>
            <Divider visibility={'hidden'} />
            <Button loading={'Tiny Loading'} size='tiny' variant='primary'>
              Tiny Loading
            </Button>
            <Button loading={'Small Loading'} size='small' variant='primary'>
              Small Loading
            </Button>
            <Button loading={'Medium Loading'} size='medium' variant='primary'>
              Medium Loading
            </Button>
            <Button loading={'Large Loading'} size='large' variant='primary'>
              Large Loading
            </Button>
            <Divider visibility={'hidden'} />
            <Icon icon={faUser} onClick={() => {}} />
            <Button size='large' variant='primary'>
              <Icon icon={faPlus} />
              Icon
            </Button>
            <Button size='large' variant='primary' subText={'Back to Residential / Mailing'}>
              SubText
            </Button>
            <Button size='large' float={'right'} fontStyle={'italic'} variant='primary'>
              Italic
            </Button>
            <Divider visibility={'hidden'} />
            <Button fluid variant='primary'>
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
              <Button key={uniqid().toString()} loading flat variant={button}>
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
              <Button key={uniqid().toString()} loading outline variant={button}>
                {button.toUpperCase()}
              </Button>
            ))}
            <Divider />
            <h4>Link</h4>
            <Container display={'flex'}>
              {this.colorStates.map((link: any) => (
                <Container key={uniqid().toString()}>
                  <Link variant={link} useNormalAnchor>
                    {link.toUpperCase()}
                  </Link>
                  &nbsp; &nbsp;
                </Container>
              ))}
            </Container>
            <Container>
              There is a&nbsp;
              <Link href='/' useNormalAnchor>
                Link
              </Link>
              &nbsp;in this sentence
            </Container>
            <br />
            <Container
              padding={{ allRem: 1 }}
              border={{
                borderSize: 1,
                borderColor: '#000',
                borderStyle: 'solid'
              }}
              display={'flex'}
              verticalAlign={'center'}
            >
              <Link href='/' useNormalAnchor>
                Link
              </Link>
            </Container>
            <Divider />
            <h4>ICON</h4>
            <Container display={'flex'}>
              <Icon size='small' icon={faUser} text={'Small'} /> &nbsp; &nbsp;
              <Icon size='medium' icon={faUser} text={'Medium'} /> &nbsp; &nbsp;
              <Icon size='large' icon={faUser} text={'Large'} />
            </Container>
            <Divider visibility={'hidden'} />
            <Container display={'flex'}>
              <Icon icon={faUser} text={'Passing ICON as a variable'} /> &nbsp; &nbsp;
              <Icon icon={'mobile'} text={'Passing ICON as a string'} />
            </Container>
            <Container display={'flex'}>
              <Icon
                badge={{
                  backgroundColor: 'rgba(220, 53, 69, 0.5)',
                  width: 50,
                  height: 50,
                  borderSize: 1,
                  borderRadius: 50,
                  borderColor: '#FFF',
                  borderStyle: 'solid'
                }}
                icon={'arrow-alt-right'}
                text={'Badge'}
                color={'#DC3545'}
                onClick={() => {
                  console.log(1);
                }}
              />
            </Container>
            <Divider />
            <h4>Grid</h4>
            <Grid>
              <Grid.Row>
                <Grid.Col col={3}>
                  <Container height={50} backgroundColor={'#e1e1e1'} />
                </Grid.Col>
                <Grid.Col col={6}>
                  <Container height={50} backgroundColor={'#e1e1e1'} />
                </Grid.Col>
                <Grid.Col col={3}>
                  <Container height={50} backgroundColor={'#e1e1e1'} />
                </Grid.Col>
              </Grid.Row>
              <Grid.Row equalWidth>
                <Grid.Col>
                  <Container height={50} backgroundColor={'#e1e1e1'} />
                </Grid.Col>
                <Grid.Col col={8}>
                  <Container height={50} backgroundColor={'#e1e1e1'} />
                </Grid.Col>
                <Grid.Col>
                  <Container height={50} backgroundColor={'#e1e1e1'} />
                </Grid.Col>
              </Grid.Row>
              <Grid.Row equalWidth>
                <Grid.Col>
                  <Container height={50} backgroundColor={'#e1e1e1'} />
                </Grid.Col>
                <Grid.Col>
                  <Container height={50} backgroundColor={'#e1e1e1'} />
                </Grid.Col>
                <Grid.Col>
                  <Container height={50} backgroundColor={'#e1e1e1'} />
                </Grid.Col>
                <Grid.Col>
                  <Container height={50} backgroundColor={'#e1e1e1'} />
                </Grid.Col>
                <Grid.Col>
                  <Container height={50} backgroundColor={'#e1e1e1'} />
                </Grid.Col>
              </Grid.Row>
              <Grid.Row fitted equalWidth>
                <Grid.Col>
                  <Container height={50} backgroundColor={'#e1e1e1'} />
                </Grid.Col>
                <Grid.Col>
                  <Container height={50} backgroundColor={'#e1e1e1'} />
                </Grid.Col>
                <Grid.Col>
                  <Container height={50} backgroundColor={'#e1e1e1'} />
                </Grid.Col>
                <Grid.Col>
                  <Container height={50} backgroundColor={'#e1e1e1'} />
                </Grid.Col>
                <Grid.Col>
                  <Container height={50} backgroundColor={'#e1e1e1'} />
                </Grid.Col>
              </Grid.Row>
            </Grid>
            <Divider />
            <h4>Image</h4>
            <Container display={'flex'} alignItems={'center'} margin={{ allPx: 15 }}>
              <Image
                backgroundColor={'#000'}
                display={'inline-flex'}
                padding={{ allPx: 15 }}
                variant={'logo'}
              />
              <Image
                display={'inline-flex'}
                margin={{ allPx: 15 }}
                padding={{ allPx: 15 }}
                variant={'logo alt'}
              />
              {/* <Image
                display={'inline-flex'}
                margin={{ allPx: 15 }}
                border={{
                  borderSize: 1,
                  borderRadius: 20,
                  borderColor: '#000',
                  borderStyle: 'solid'
                }}
                width={100}
                height={100}
                backgroundColor={'#000'}
                variant={'logo'}
                padding={{ allPx: 15 }}
              />
              <Image
                display={'inline-flex'}
                margin={{ allPx: 15 }}
                width={100}
                height={100}
                badge
                variant={'logo alt'}
              />
              <Image
                display={'inline-flex'}
                margin={{ allPx: 15 }}
                border={{
                  borderSize: 1,
                  borderRadius: 50,
                  borderColor: '#000',
                  borderStyle: 'solid'
                }}
                width={100}
                height={100}
                badge
                src={'/images/ISTOX_Logo.png'}
              /> */}
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
            <h4>Progress</h4>
            <ProgressBar margin={{ topPx: 20 }} value={20} />
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
            <Divider />
            <h4>Rating</h4>
            <Rating defaultValue={1.5} maxValue={3} />
            <Rating defaultValue={2.5} width={200} maxValue={4} />
            <Divider />
            <h4>Table</h4>
            <Table
              header={'HEADER'}
              footer={
                <Item basic icon={faAdjust}>
                  Footer
                </Item>
              }
              basic
              columnHeaders={[
                { title: 'Code' },
                { title: 'Date Created', min: true },
                { title: 'Request Status' },
                {
                  title: 'Actions'
                }
              ]}
              rows={[
                { rowContents: ['Super Admin', 'This is another not very long content.', ''] },
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
                {
                  rowContents: ['Super Admin', 'This is a table row with a callback', '']
                },
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
            <Divider visibility={'hidden'} />
            <Table
              columnHeaders={[
                { title: 'Code' },
                { title: 'Date Created' },
                { title: 'Request Status' },
                {
                  title: 'Actions'
                }
              ]}
              rows={[
                { rowContents: ['Super Admin', 'This is another not very long content.', ''] },
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
                { rowContents: ['Super Admin', 'This is another not very long content.', ''] },
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
            <Divider />
            <Container padding={{ allPx: 15 }} backgroundColor={'#FFF'}>
              <h4>Form Elements</h4>
              <Form
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
                <Controls.Container className={'form-group'} display={'flex'}>
                  <Controls.FormControl
                    label={'Area Code'}
                    name='areacode'
                    value={'+65'}
                    type={'phonecode'}
                  />
                  <Controls.FormControl
                    required={true}
                    placeholder={'XXXXXXXX'}
                    label={'Phone Number'}
                    append={
                      <Controls.Button
                        float={'left'}
                        width={130}
                        textAlign={'center'}
                        type={'submit'}
                      >
                        Send Code
                      </Controls.Button>
                    }
                    name='numeric'
                    type={'numeric'}
                    decimalPlace={2}
                  />
                </Controls.Container>
                <Controls.Container className={'form-group '} display={'flex'}>
                  <Controls.FormControl
                    required
                    placeholder={'Placeholder'}
                    disabled={true}
                    ref={(ref) => {
                      this.form = ref;
                    }}
                    label={
                      <div>
                        Amount in <b>USD</b>
                      </div>
                    }
                    extraControls={
                      <Link>
                        <Icon icon={faPlus} text={'Extra control'} />
                      </Link>
                    }
                    append={
                      <Button
                        float={'left'}
                        textAlign={'center'}
                        type={'submit'}
                        onPress={() => {
                          console.log(this.form.getFormData());
                          console.log(this.form.getInputValue('areacode'));
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
                  prepend={<Icon icon={faSearch} />}
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
                  inputWidth={'80px'}
                  label={'OTP'}
                  name='numberfields'
                  type={'numberfields'}
                  separator={<span>&nbsp;&nbsp;</span>}
                  onInputChanged={() => {
                    console.log(this.form.getInputValue('numberfields'));
                  }}
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
                  dateOptions={{
                    showTimeSelect: false
                  }}
                  onInputChanged={(value) => {
                    console.log(this.form.getInputValue('daterange'));
                    console.log(value);
                  }}
                />
                <Controls.FormControl
                  required
                  label={'Dropdown'}
                  name='Dropdown'
                  placeholder='Choose'
                  type={'select'}
                  value={'secondary'}
                  selectOptions={this.state.selectOptions}
                  onInputChanged={(value) => {
                    console.log(value);
                  }}
                  // static={true}
                  append={
                    <Button
                      float={'left'}
                      textAlign={'center'}
                      type={'submit'}
                      onPress={() => {
                        this.setState({
                          selectOptions: [
                            {
                              label: 'Primary',
                              value: 'primary'
                            },
                            {
                              label: 'Secondary',
                              value: 'secondary'
                            },
                            {
                              label: 'Disabled',
                              value: 'disabled'
                            }
                          ]
                        });
                      }}
                    >
                      Change Dropdown
                    </Button>
                  }
                />

                <Controls.FormControl
                  required
                  label={'Html Dropdown'}
                  name='Dropdown'
                  placeholder='Choose'
                  type={'customselect'}
                  value={'hei!'}
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
                <Controls.FormControl
                  value={'Singapore'}
                  label={'Country'}
                  name='country'
                  type={'country'}
                />
                <Controls.FormControl
                  label={'Country Code'}
                  name='countrycode'
                  type={'countrycode'}
                  value={'SGP'}
                />
                <Controls.FormControl
                  value={'+65'}
                  label={'Phone Code'}
                  name='phonecode'
                  type={'phonecode'}
                />
                <Controls.FormControl
                  value={'1234567'}
                  label={'Static'}
                  name='test_static'
                  static={true}
                  type='number'
                />

                <Controls.FormControl
                  required
                  label={'Select static'}
                  name='select_static'
                  type={'select'}
                  static={true}
                  value={'hei!'}
                  selectOptions={[
                    {
                      label: 'this is label',
                      value: 'hei!'
                    },
                    {
                      label:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                      value: 'abcl'
                    }
                  ]}
                />
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
            <Item
              basic
              icon={faCheckCircle}
              title={'Title'}
              description={
                'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...'
              }
            />
            <Divider visibility={'hidden'} />
            <Item icon={faCheckCircle}>
              <Container widthPercent={100} verticalAlign={'center'}>
                <Card
                  leftIcon={faInfoCircle}
                  rightIcon={faCheckCircle}
                  icon={faUser}
                  title={'Title'}
                />
                <ProgressBar gap width={200}>
                  <ProgressBar striped variant='success' value={25} order={1} />
                  <ProgressBar variant='info' value={25} order={2} />
                  <ProgressBar striped variant='warning' value={25} order={3} />
                  <ProgressBar striped variant='danger' value={25} order={4} />
                </ProgressBar>
                <Button float={'right'} size='small' variant='primary'>
                  Small
                </Button>
              </Container>
            </Item>
            <Divider />
            <h4>Card</h4>
            <Container display={'flex'}>
              <Card
                leftIcon={faInfoCircle}
                rightIcon={faCheckCircle}
                icon={faUser}
                title={'Title'}
              />
              <Card
                leftIcon={faInfoCircle}
                rightIcon={faCheckCircle}
                image={'/images/ISTOX_Logo.png'}
                title={'Title'}
              />
              <Card leftIcon={faInfoCircle} rightIcon={faCheckCircle}>
                <Button float={'none'} size='small' variant='primary'>
                  Small
                </Button>
              </Card>
            </Container>
            <Divider />
            <h4>Message</h4>
            <Container padding={{ allPx: 15 }} backgroundColor={'#FFF'}>
              <Transition>
                <Message icon={faCheckCircle} message='Hello i am a default!' />
                <Message
                  variant={'success'}
                  icon={faCheckCircle}
                  message={'Hello i am a success!'}
                />
                <Message
                  variant={'warning'}
                  icon={faTimesCircle}
                  message='Hello i am an warning!'
                />
                <Message variant={'info'} icon={faInfoCircle} message='Hello i am a info!' />
                <Message
                  variant={'danger'}
                  icon={faExclamationCircle}
                  message='Hello i am an error!'
                />
                <Divider visibility={'hidden'} />
                <Message outline icon={faInfoCircle} message='Hello i am a default!' />
                <Message
                  outline
                  icon={faInfoCircle}
                  variant={'success'}
                  message='Hello i am a success!'
                />
                <Message
                  outline
                  icon={faInfoCircle}
                  variant={'warning'}
                  message='Hello i am an warning!'
                />
                <Message
                  outline
                  icon={faInfoCircle}
                  variant={'info'}
                  message='Hello i am a info!'
                />
                <Message
                  outline
                  icon={faInfoCircle}
                  variant={'danger'}
                  message='Hello i am an error!'
                />
                <Divider visibility={'hidden'} />
                <Message message='Hello i am a default!' />
                <Message variant={'success'} message='Hello i am a success!' />
                <Message variant={'warning'} message='Hello i am an warning!' />
                <Message variant={'info'} message='Hello i am a info!' />
                <Message variant={'danger'} message='Hello i am an error!' />
                <Divider visibility={'hidden'} />
                <Message outline message='Hello i am a default!' />
                <Message outline variant={'success'} message='Hello i am a success!' />
                <Message outline variant={'warning'} message='Hello i am an warning!' />
                <Message outline variant={'info'} message='Hello i am a info!' />
                <Message outline variant={'danger'} message='Hello i am an error!' />
              </Transition>
            </Container>
            <Divider />
            <h4>Breadcrumbs</h4>
            <Breadcrumbs links={[{ title: 'User', href: '#' }, { title: 'Admin', href: '#' }]} />
            <Divider />
            <h4>Custom tooltip</h4>
            <Controls.Container
              width={200}
              height={200}
              tooltip={
                <Controls.Container backgroundColor={'#BBBBBB'}>
                  I am tooltip content!
                </Controls.Container>
              }
              tooltipOptions={{
                place: 'left',
                clickable: true,
                delayShow: 500,
                delayHide: 500,
                delayUpdate: 500,
                className: 'abc'
              }}
            >
              Sample tooltip open on hover
            </Controls.Container>

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

  private function = () => {
    console.log('this is a callback');
  };
}

const render = () => {
  ReactDOM.render(<Main />, document.getElementById('reactContainer'));
};

render();
