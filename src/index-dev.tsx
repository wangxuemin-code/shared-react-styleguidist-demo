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
  faExclamationCircle
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
import DatePicker from 'react-datepicker';

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
    startDate: any;
    endDate: any;
  }
> {
  form: any;
  formControls: any[];

  public constructor(props: any) {
    super(props);
    this.state = {
      success: ['Success'],
      error: '',
      loading: false,
      showModal: false,
      startDate: new Date(),
      endDate: new Date()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date: any) {
    this.setState({
      startDate: date
    });
  }

  public render() {
    return (
      <React.Fragment>
        <RootContainer>
          <Header
            className={'istox-header alt'}
            mainLinks={[{ title: 'Wallet', path: 'wallet', selected: false, useAnchorTag: true }]}
            subLinks={[{ title: 'Transactions', path: 'transactions', useAnchorTag: true }]}
          />
          <Container
            margin={{ topPx: 15 }}
            padding={{ topPx: 15, rightPx: 15, bottomPx: 15, leftPx: 15 }}
            backgroundColor={'#FFF'}
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
            className={'istox-tabs middle horizontal'}
            tabs={[
              {
                title: (
                  <span>
                    <Icon icon={faCheckCircle} padding={{ topPx: 2, rightPx: 15 }} />
                    Account Info
                  </span>
                ),
                contents: 'ABCD'
              },
              {
                title: (
                  <span>
                    <Icon icon={faCheckCircle} padding={{ topPx: 2, rightPx: 15 }} />
                    Phone Number
                  </span>
                ),
                contents: 'EFGH'
              },
              {
                title: (
                  <span>
                    <Icon icon={faCheckCircle} padding={{ topPx: 2, rightPx: 15 }} />
                    Personal Info
                  </span>
                ),
                contents: 'IJKL'
              },
              {
                title: (
                  <span>
                    <Icon icon={faExclamationCircle} padding={{ topPx: 2, rightPx: 15 }} />
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
            className={'istox-tabs middle vertical'}
            tabs={[
              {
                title: (
                  <span>
                    <Icon icon={faCheckCircle} />
                    <br />
                    Account Info
                  </span>
                ),
                contents: 'ABCD'
              },
              {
                title: (
                  <span>
                    <Icon icon={faCheckCircle} />
                    <br />
                    Phone Number
                  </span>
                ),
                contents: 'EFGH'
              },
              {
                title: (
                  <span>
                    <Icon icon={faCheckCircle} />
                    <br />
                    Personal Info
                  </span>
                ),
                contents: 'IJKL'
              },
              {
                title: (
                  <span>
                    <Icon icon={faExclamationCircle} />
                    <br />
                    Documents
                  </span>
                ),
                contents: 'MNOP'
              }
            ]}
          />
          <Divider />
          <h4>Buttons</h4>
          <Button size={'small'} buttonStyle='primary'>
            Small
          </Button>
          <Button size={'medium'} buttonStyle='primary'>
            Medium
          </Button>
          <Button size={'large'} buttonStyle='primary'>
            Large
          </Button>
          <Button size={'large'} fontStyle={'italic'} buttonStyle='primary'>
            Italic
          </Button>
          <Divider visibility={'hidden'} />
          <Button buttonStyle='primary'>Primary / Default</Button>
          <Button
            buttonStyle='secondary'
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
            Secondary
          </Button>
          <Button disabled href='abc'>
            Disabled
          </Button>
          <Button buttonStyle='info'>Info</Button>
          <Button buttonStyle='success'>Success</Button>
          <Button buttonStyle='warning'>Warning</Button>
          <Button buttonStyle='danger'>Danger</Button>
          <Divider visibility={'hidden'} />
          <Button outline buttonStyle='primary'>
            Primary / Default
          </Button>
          <Button
            outline
            buttonStyle='secondary'
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
            Secondary
          </Button>
          <Button outline disabled href='abc'>
            Disabled
          </Button>
          <Button outline buttonStyle='info'>
            Info
          </Button>
          <Button outline buttonStyle='success'>
            Success
          </Button>
          <Button outline buttonStyle='warning'>
            Warning
          </Button>
          <Button
            outline
            buttonStyle='danger'
            onPress={() => {
              this.setState({ showModal: true });
            }}
          >
            Danger
          </Button>
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
            buttonStyle='info'
            loading={this.state.loading}
            onPress={() => {
              this.setState({ showModal: true });
            }}
          >
            Modal
          </Button>
          <Button tooltip={'tooltip!'} display='inline-block'>
            ToolTip
          </Button>
          <Divider />
          <h4>Progress</h4>
          <ProgressBar margin={{ topPx: 20 }} value={20} />
          <Divider />
          <h4>Table</h4>
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
          <Divider />
          <Container
            margin={{ topPx: 15 }}
            padding={{ topPx: 15, rightPx: 15, bottomPx: 15, leftPx: 15 }}
            backgroundColor={'#FFF'}
          >
            <h4>Form Elements</h4>
            <Form
              display={'grid'}
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
              <Controls.FormControl label={'$$$'} name='money' type={'money'} decimalPlace={2} />
              <DatePicker
                selected={this.state.startDate}
                selectsStart
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onChange={this.handleChange}
              />
              <DatePicker
                selected={this.state.endDate}
                selectsEnd
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onChange={this.handleChange}
              />
              <Controls.FormControl
                required
                label={'Date'}
                name='datetime'
                type={'datetime'}
                placeholder={'test'}
                defaultValue={Formatter.dateToUnixTimestamp(new Date())}
                onInputChanged={(value) => {
                  console.log(value);
                }}
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
                label={'Date'}
                name='daterange'
                type={'daterange'}
                placeholder={'test'}
                defaultValue={Formatter.dateToUnixTimestamp(new Date())}
                onInputChanged={(value) => {
                  console.log(value);
                }}
              />
              <Controls.FormControl
                required
                label={'Type'}
                name='Type'
                placeholder='Country'
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
            </Form>
          </Container>

          <Divider />
          {/* <CandleStickChart /> */}
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
          <Link display='block' href='www.google.com' useNormalAnchor>
            www.google.com
          </Link>
          <Transition>
            <Message error='Hello i am sucesss!' />
          </Transition>
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
