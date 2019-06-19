import * as React from 'react';
import { Fragment } from 'react';
import { Mqtt, Formatter } from './helpers';
import * as ReactDOM from 'react-dom';
import { Controls } from './index-prod';
import {
  faAddressBook,
  faAdjust,
  faPlus,
  faCheckCircle,
  faExclamationCircle,
  faInfoCircle,
  faSearch,
  faUser,
  faChevronCircleRight,
  faCheck
} from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';

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
//     console.log(message);
//   });

class Main extends Controls.MyComponent<
  any,
  {
    success: string[] | string;
    error: string;
    loading: boolean;
    showModal: boolean;
    value?: string | number;
    selectOptions: any[];
    email: string;
    imageUrl: string;
  }
> {
  tabs: Controls.Tabs;
  form: any;
  imageForm: any;
  formControls: any[];
  variantStates: string[];
  tabsContent: any[];

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
      ],
      value: '',
      email: '',
      imageUrl: ''
    };
    this.variantStates = [
      'primary',
      'secondary',
      'disabled',
      'info',
      'success',
      'warning',
      'danger'
    ];
    this.tabsContent = [
      {
        title: (
          <Controls.Container>
            <Controls.Icon variant={'success'} icon={faCheckCircle} />
            Account Info
          </Controls.Container>
        ),
        contents: 'ABCD'
      },
      {
        title: (
          <Controls.Container>
            <Controls.Icon icon={faCheckCircle} />
            Phone Number
          </Controls.Container>
        ),
        contents: 'EFGHsa'
      },
      {
        title: (
          <Controls.Container>
            <Controls.Icon icon={faCheckCircle} />
            Personal Info
          </Controls.Container>
        ),
        contents: 'IJKL'
      },
      {
        title: (
          <Controls.Container>
            <Controls.Icon icon={faExclamationCircle} />
            Documents
          </Controls.Container>
        ),
        contents: 'MNOP'
      }
    ];
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
        <Controls.RootContainer>
          <Controls.Header
            logo={true}
            className={'istox-header'}
            mainLinks={[
              { title: 'STO', path: 'sto', selected: false, useAnchorTag: false },
              { title: 'Wallet', path: 'wallet', selected: true, useAnchorTag: false }
            ]}
            subLinks={[{ title: 'Transactions', path: 'transactions', useAnchorTag: false }]}
            username={this.state.email}
            userAction
          />
          <Controls.WrapperContainer>
            <Controls.Container
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
              <Controls.Container display={'flex'}>
                <Controls.Container padding={{ leftPx: 15 }} className={'flex-50'}>
                  <h1>H1</h1>
                  <h2>H2</h2>
                  <h3>H3</h3>
                  <h4>H4</h4>
                  <h5>H5</h5>
                  <h6>H6</h6>
                </Controls.Container>
                <Controls.Divider direction={'vertical'} />
                <Controls.Container padding={{ leftPx: 15 }} className={'flex-50'}>
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
                </Controls.Container>
              </Controls.Container>
            </Controls.Container>
            <Controls.Divider />
            <h4>Tabs</h4>
            <Controls.Tabs
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
              tabs={this.tabsContent}
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

            <Controls.Tabs
              margin={{ topPx: 20 }}
              orientation={'horizontal'}
              tabs={this.tabsContent}
            />
            <Controls.Tabs
              margin={{ topPx: 20 }}
              orientation={'horizontal'}
              align={'middle'}
              tabs={this.tabsContent}
            />
            <Controls.Divider hidden />
            <Controls.Tabs
              margin={{ topPx: 20 }}
              className={'istox-tabs'}
              variant={'stacked'}
              tabsContentOrientation={'stacked'}
              align={'middle'}
              tabs={this.tabsContent}
            />
            <Controls.Divider />
            <Controls.Tabs
              margin={{ topPx: 20 }}
              className={'istox-tabs'}
              orientation={'vertical'}
              align={'middle'}
              tabs={this.tabsContent}
            />
            <Controls.Divider />
            <Controls.Tabs
              basic
              margin={{ topPx: 20 }}
              className={'istox-tabs'}
              orientation={'vertical'}
              align={'middle'}
              tabs={this.tabsContent}
            >
              <>
                <Controls.Container padding={{ topRem: 0, leftRem: 0.5, rightRem: 0.5 }}>
                  <Controls.Form>
                    <Controls.FormControl
                      fluid
                      label={''}
                      name='search'
                      type={'text'}
                      placeholder={'Search'}
                      value=''
                      prepend={<Controls.Icon icon={faSearch} />}
                    />
                  </Controls.Form>
                </Controls.Container>
                <Controls.Container padding={{ leftRem: 1, rightRem: 2 }}>
                  <h6>All Transactions</h6>
                </Controls.Container>
              </>
            </Controls.Tabs>
            <Controls.Divider />
            <h4>Button</h4>
            <Controls.Button size='tiny' variant='primary'>
              Tiny
            </Controls.Button>
            <Controls.Button size='small' variant='primary'>
              Small
            </Controls.Button>
            <Controls.Button size='medium' variant='primary'>
              Medium
            </Controls.Button>
            <Controls.Button
              onClick={() => {
                console.log(1);
              }}
              size='large'
              variant='primary'
            >
              Large
            </Controls.Button>
            <Controls.Divider visibility={'hidden'} />
            <Controls.Button loading size='tiny' variant='primary'>
              Tiny Loading
            </Controls.Button>
            <Controls.Button loading size='small' variant='primary'>
              Small Loading
            </Controls.Button>
            <Controls.Button loading size='medium' variant='primary'>
              Medium Loading
            </Controls.Button>
            <Controls.Button loading size='large' variant='primary'>
              Large Loading
            </Controls.Button>
            <Controls.Divider visibility={'hidden'} />
            <Controls.Icon icon={faUser} onClick={() => {}} />
            <Controls.Button size='large' variant='primary'>
              <Controls.Icon icon={faPlus} />
              Icon
            </Controls.Button>
            <Controls.Button
              size='large'
              variant='primary'
              subText={'Back to Residential / Mailing'}
            >
              SubText
            </Controls.Button>
            <Controls.Button size='large' float={'right'} fontStyle={'italic'} variant='primary'>
              Italic
            </Controls.Button>
            <Controls.Divider visibility={'hidden'} />
            <Controls.Button fluid variant='primary'>
              Fluid
            </Controls.Button>
            <Controls.Divider visibility={'hidden'} />
            {this.variantStates.map((button: any) => (
              <Controls.Button key={uniqid().toString()} variant={button}>
                {button.toUpperCase()}
              </Controls.Button>
            ))}
            <Controls.Divider visibility={'hidden'} />
            {this.variantStates.map((button: any) => (
              <Controls.Button key={uniqid().toString()} flat variant={button}>
                {button.toUpperCase()}
              </Controls.Button>
            ))}
            <Controls.Divider visibility={'hidden'} />
            {this.variantStates.map((button: any) => (
              <Controls.Button key={uniqid().toString()} loading flat variant={button}>
                {button.toUpperCase()}
              </Controls.Button>
            ))}
            <Controls.Divider visibility={'hidden'} />
            {this.variantStates.map((button: any) => (
              <Controls.Button key={uniqid().toString()} outline variant={button}>
                {button.toUpperCase()}
              </Controls.Button>
            ))}
            <Controls.Divider visibility={'hidden'} />
            {this.variantStates.map((button: any) => (
              <Controls.Button key={uniqid().toString()} loading outline variant={button}>
                {button.toUpperCase()}
              </Controls.Button>
            ))}
            <Controls.Divider />
            <h4>Link</h4>
            <Controls.Container display={'flex'}>
              {this.variantStates.map((link: any) => (
                <Controls.Container key={uniqid().toString()}>
                  <Controls.Link variant={link} useNormalAnchor>
                    {link.toUpperCase()}
                  </Controls.Link>
                  &nbsp; &nbsp;
                </Controls.Container>
              ))}
            </Controls.Container>
            <Controls.Container display={'flex'}>
              {this.variantStates.map((link: any) => (
                <Controls.Container key={uniqid().toString()}>
                  <Controls.Link underline={false} variant={link} useNormalAnchor>
                    {link.toUpperCase()}
                  </Controls.Link>
                  &nbsp; &nbsp;
                </Controls.Container>
              ))}
            </Controls.Container>
            <Controls.Container>
              There is a&nbsp;
              <Controls.Link href='/' useNormalAnchor>
                Link
              </Controls.Link>
              &nbsp;in this sentence
            </Controls.Container>
            <br />
            <Controls.Container
              padding={{ allRem: 1 }}
              border={{
                borderSize: 1,
                borderColor: '#000',
                borderStyle: 'solid'
              }}
              display={'flex'}
              verticalAlign={'center'}
            >
              <Controls.Link href='/' useNormalAnchor>
                Link
              </Controls.Link>
            </Controls.Container>
            <Controls.Divider />
            <h4>Icon</h4>
            <Controls.Container display={'flex'}>
              <Controls.Icon size='small' icon={faUser} text={'Small'} /> &nbsp; &nbsp;
              <Controls.Icon size='medium' icon={faUser} text={'Medium'} /> &nbsp; &nbsp;
              <Controls.Icon
                size='large'
                color={'#3BE4C1'}
                icon={faChevronCircleRight}
                text={'Large'}
              />
            </Controls.Container>
            <Controls.Container display={'flex'}>
              <Controls.Icon icon={faUser} text={'Passing ICON as a variable'} /> &nbsp; &nbsp;
              <Controls.Icon icon={'mobile'} text={'Passing ICON as a string'} />
            </Controls.Container>
            <Controls.Container display={'flex'}>
              <Controls.Icon currency={'SGD'} /> &nbsp; &nbsp;
              <Controls.Icon currency={'MYR'} /> &nbsp; &nbsp;
              <Controls.Icon flag={'SG'} /> &nbsp; &nbsp;
              <Controls.Icon flag={'MY'} /> &nbsp; &nbsp;
            </Controls.Container>
            <Controls.Container display={'flex'}>
              <Controls.Icon
                badge={{
                  backgroundColor: 'rgba(220, 53, 69, 0.5)',
                  width: 40,
                  height: 40,
                  borderSize: 1,
                  borderRadius: 50,
                  borderColor: '#FFF',
                  borderStyle: 'solid'
                }}
                icon={'arrow-alt-right'}
                text={''}
                color={'#DC3545'}
                onClick={() => {
                  console.log(1);
                }}
              />
              <Controls.Icon
                badge={{
                  width: 40,
                  height: 40,
                  borderSize: 1,
                  borderRadius: 50,
                  borderColor: '#FFF',
                  borderStyle: 'solid',
                  iconBackground: false,
                  fontSize: 14
                }}
                currency={'SGD'}
                text={''}
                color={'#DC3545'}
                onClick={() => {
                  console.log(1);
                }}
              />
              <Controls.Icon
                badge={{
                  backgroundColor: 'rgba(220, 53, 69, 0.5)',
                  width: 40,
                  height: 40,
                  borderSize: 1,
                  borderRadius: 50,
                  borderColor: '#FFF',
                  borderStyle: 'solid',
                  fontSize: 60,
                  iconBackground: true
                }}
                currency={'SGD'}
              />
              <Controls.Icon
                badge={{
                  backgroundColor: 'rgba(220, 53, 69, 0.5)',
                  width: 40,
                  height: 40,
                  borderSize: 1,
                  borderRadius: 50,
                  borderColor: '#FFF',
                  borderStyle: 'solid',
                  fontSize: 60,
                  iconBackground: true
                }}
                currency={'MYR'}
              />
              <Controls.Icon
                badge={{
                  backgroundColor: 'rgba(220, 53, 69, 0.5)',
                  width: 40,
                  height: 40,
                  borderSize: 1,
                  borderRadius: 50,
                  borderColor: '#FFF',
                  borderStyle: 'solid',
                  fontSize: 85
                  //iconBackground: true
                }}
                flag={'IND'}
              />
              <Controls.Icon
                badge={{
                  backgroundColor: 'rgba(220, 53, 69, 0.5)',
                  width: 40,
                  height: 40,
                  borderSize: 1,
                  borderRadius: 50,
                  borderColor: '#FFF',
                  borderStyle: 'solid',
                  fontSize: 90,
                  iconBackground: true,
                  topPx: 1
                }}
                currency={'PHP'}
              />
              <Controls.Icon
                badge={{
                  backgroundColor: 'rgba(220, 53, 69, 0.5)',
                  width: 40,
                  height: 40,
                  borderSize: 1,
                  borderRadius: 50,
                  borderColor: '#FFF',
                  borderStyle: 'solid',
                  fontSize: 85,
                  iconBackground: true
                }}
                currency={'CNY'}
              />
              <Controls.Icon
                badge={{
                  backgroundColor: 'rgba(220, 53, 69, 0.5)',
                  width: 40,
                  height: 40,
                  borderSize: 1,
                  borderRadius: 50,
                  borderColor: '#FFF',
                  borderStyle: 'solid',
                  fontSize: 85
                  //iconBackground: true
                }}
                currency={'EUR'}
              />
              <Controls.Icon
                badge={{
                  backgroundColor: 'rgba(220, 53, 69, 0.5)',
                  width: 40,
                  height: 40,
                  borderSize: 1,
                  borderRadius: 50,
                  borderColor: '#FFF',
                  borderStyle: 'solid',
                  fontSize: 85
                  //iconBackground: true
                }}
                currency={'KRW'}
              />
              <Controls.Icon
                badge={{
                  backgroundColor: 'rgba(220, 53, 69, 0.5)',
                  width: 40,
                  height: 40,
                  borderSize: 1,
                  borderRadius: 50,
                  borderColor: '#FFF',
                  borderStyle: 'solid',
                  fontSize: 85,
                  iconBackground: true
                }}
                flag={'MYS'}
              />
              {/* <Flag code={'SG'} /> */}
            </Controls.Container>
            <Controls.Divider />
            <h4>Grid</h4>
            <Controls.Grid>
              <Controls.Grid.Row>
                <Controls.Grid.Col col={3}>
                  <Controls.Container height={50} backgroundColor={'#e1e1e1'} />
                </Controls.Grid.Col>
                <Controls.Grid.Col col={6}>
                  <Controls.Container height={50} backgroundColor={'#e1e1e1'} />
                </Controls.Grid.Col>
                <Controls.Grid.Col col={3}>
                  <Controls.Container height={50} backgroundColor={'#e1e1e1'} />
                </Controls.Grid.Col>
              </Controls.Grid.Row>
              <Controls.Grid.Row equalWidth>
                <Controls.Grid.Col>
                  <Controls.Container height={50} backgroundColor={'#e1e1e1'} />
                </Controls.Grid.Col>
                <Controls.Grid.Col col={8}>
                  <Controls.Container height={50} backgroundColor={'#e1e1e1'} />
                </Controls.Grid.Col>
                <Controls.Grid.Col>
                  <Controls.Container height={50} backgroundColor={'#e1e1e1'} />
                </Controls.Grid.Col>
              </Controls.Grid.Row>
              <Controls.Grid.Row equalWidth>
                <Controls.Grid.Col>
                  <Controls.Container height={50} backgroundColor={'#e1e1e1'} />
                </Controls.Grid.Col>
                <Controls.Grid.Col>
                  <Controls.Container height={50} backgroundColor={'#e1e1e1'} />
                </Controls.Grid.Col>
                <Controls.Grid.Col>
                  <Controls.Container height={50} backgroundColor={'#e1e1e1'} />
                </Controls.Grid.Col>
                <Controls.Grid.Col>
                  <Controls.Container height={50} backgroundColor={'#e1e1e1'} />
                </Controls.Grid.Col>
                <Controls.Grid.Col>
                  <Controls.Container height={50} backgroundColor={'#e1e1e1'} />
                </Controls.Grid.Col>
              </Controls.Grid.Row>
              <Controls.Grid.Row fitted equalWidth>
                <Controls.Grid.Col>
                  <Controls.Container height={50} backgroundColor={'#e1e1e1'} />
                </Controls.Grid.Col>
                <Controls.Grid.Col>
                  <Controls.Container height={50} backgroundColor={'#e1e1e1'} />
                </Controls.Grid.Col>
                <Controls.Grid.Col>
                  <Controls.Container height={50} backgroundColor={'#e1e1e1'} />
                </Controls.Grid.Col>
                <Controls.Grid.Col>
                  <Controls.Container height={50} backgroundColor={'#e1e1e1'} />
                </Controls.Grid.Col>
                <Controls.Grid.Col>
                  <Controls.Container height={50} backgroundColor={'#e1e1e1'} />
                </Controls.Grid.Col>
              </Controls.Grid.Row>
            </Controls.Grid>
            <Controls.Divider />
            <h4>Image</h4>
            <Controls.Container display={'flex'} alignItems={'center'} margin={{ allPx: 15 }}>
              <Controls.Image
                backgroundColor={'#000'}
                display={'inline-flex'}
                padding={{ allPx: 15 }}
                variant={'logo'}
              />
              <Controls.Image
                display={'inline-flex'}
                margin={{ allPx: 15 }}
                padding={{ allPx: 15 }}
                variant={'logo alt'}
              />
              {/*  <Controls.Image
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
            <Controls.Image
            display={'inline-flex'}
            margin={{ allPx: 15 }}
            width={100}
            height={100}
            badge
            variant={'logo alt'}
          />
            <Controls.Image
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
            </Controls.Container>
            <Controls.Container display={'flex'} alignItems={'center'} margin={{ allPx: 15 }}>
              <Controls.Form
                ref={(ref) => {
                  this.imageForm = ref;
                }}
                onSubmit={() => {
                  console.log(this.imageForm.getInputValue('upload'));
                }}
              >
                <Controls.Container className={'form-group'} display={'flex'}>
                  <Controls.FormControl
                    required
                    label='Image uploader'
                    name='upload'
                    type='uploader'
                    value={this.state.imageUrl}
                    uploaderConfigs={{ customAllowFileExtensions: ['.pdf'] }}
                  >
                    <Controls.Container fluid verticalAlign={'center'}>
                      <Controls.Image
                        height={100}
                        margin={{ topPx: -50 }}
                        src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/LACMTA_Square_Orange_Line.svg/1024px-LACMTA_Square_Orange_Line.svg.png'
                      />
                      <span className='normal-text'>
                        Drag and drop or <br />
                        Click here to attached a file
                      </span>
                    </Controls.Container>
                  </Controls.FormControl>
                  <Controls.FormControl
                    required
                    label='Image uploader disabled '
                    name='uploadviewer'
                    type='uploader'
                    disabled
                    value={''}
                    uploaderConfigs={{
                      customAllowFileExtensions: ['.pdf'],
                      viewer: true,
                      label: 'Front'
                    }}
                  >
                    <Controls.Container>
                      <Controls.Container padding={{ leftRem: 1, rightRem: 1 }}>
                        <Controls.Image
                          src='https://v.fastcdn.co/t/fb1fdb8c/ebe0efb9/1559806595-42933764-ghost-shutterstock-1898204.jpg'
                          //src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/LACMTA_Square_Orange_Line.svg/1024px-LACMTA_Square_Orange_Line.svg.png'
                        />
                      </Controls.Container>
                      <Controls.Container fluid verticalAlign={'center'}>
                        <span className='tiny normal-text'>file-name-doc_1.pdf</span>
                      </Controls.Container>
                    </Controls.Container>
                  </Controls.FormControl>
                </Controls.Container>
                <Controls.Button
                  type='submit'
                  onPress={() => {
                    this.setState({
                      // imageUrl:
                      //   'https://ichxouthmanager.s3.amazonaws.com/uploads/document/upload/4/1/1-last-submit-0.png'
                      imageUrl:
                        'https://ichxouthmanager.s3.amazonaws.com/uploads/document/upload/4/1/1-last-submit-0.pdf'
                    });
                  }}
                >
                  Fetch image from S3
                </Controls.Button>
              </Controls.Form>
            </Controls.Container>
            <Controls.Divider />
            <h4>PopUps</h4>
            <Controls.Toast />
            <Controls.Button
              onPress={() => {
                Controls.Toast.show({
                  type: 'transaction_status_ok',
                  blockchainTransactionOptions: {
                    purpose: 'Hello',
                    txHash: '0x5b35c2a75cc21af4573990e3b469fd3a6bea353d7f59839e0827415994b46fe2'
                  }
                });
              }}
            >
              Toast
            </Controls.Button>
            <Controls.Modal visible={this.state.showModal}>Modal</Controls.Modal>
            <Controls.Button
              variant='danger'
              onPress={() => {
                this.setState({
                  loading: true
                });
                Controls.Confirm.show({
                  type: 'yesno',
                  message: 'hello',
                  onResult: (result) => {
                    console.log(result);
                  }
                });
              }}
            >
              Confirmation
            </Controls.Button>
            <Controls.Button
              variant='info'
              loading={this.state.loading}
              onPress={() => {
                this.setState({ showModal: true });
              }}
            >
              Modal
            </Controls.Button>
            <Controls.Button outline variant='primary' tooltip={'tooltip!'} display='inline-block'>
              ToolTip
            </Controls.Button>
            <Controls.Button
              variant='success'
              onPress={() => {
                Controls.BlockchainTransaction.show({
                  mqttClient: mqtt,
                  waitOptions: {
                    queueName: 'test'
                  },
                  onSucess: () => {}
                });
              }}
            >
              Bottom Toast
            </Controls.Button>
            <br />
            <br />
            <h5>Toast with image, title and description</h5>
            <Controls.Button
              onPress={() => {
                Controls.NormalToast.show({
                  //variant: 'primary',
                  icon: faCheck,
                  title: 'normal toast',
                  description: 'description goes here'
                });
              }}
            >
              primary
            </Controls.Button>
            <Controls.Button
              variant={'secondary'}
              onPress={() => {
                Controls.NormalToast.show({
                  icon: faCheck,
                  title: 'normal toast',
                  description: 'description goes here',
                  variant: 'secondary'
                });
              }}
            >
              secondary
            </Controls.Button>
            <Controls.Button
              variant={'disabled'}
              onPress={() => {
                Controls.NormalToast.show({
                  icon: faCheck,
                  title: 'normal toast',
                  description: 'description goes here',
                  variant: 'disabled'
                });
              }}
            >
              disabled
            </Controls.Button>
            <Controls.Button
              variant={'info'}
              onPress={() => {
                Controls.NormalToast.show({
                  icon: faCheck,
                  title: 'normal toast',
                  description: 'description goes here',
                  variant: 'info'
                });
              }}
            >
              info
            </Controls.Button>
            <Controls.Button
              variant={'success'}
              onPress={() => {
                Controls.NormalToast.show({
                  icon: faCheck,
                  title: 'normal toast',
                  description: 'description goes here',
                  variant: 'success'
                });
              }}
            >
              success
            </Controls.Button>
            <Controls.Button
              variant={'warning'}
              onPress={() => {
                Controls.NormalToast.show({
                  icon: faCheck,
                  title: 'normal toast',
                  description: 'description goes here',
                  variant: 'warning'
                });
              }}
            >
              warning
            </Controls.Button>
            <Controls.Button
              variant={'danger'}
              onPress={() => {
                Controls.NormalToast.show({
                  icon: faCheck,
                  title: 'normal toast',
                  description: 'description goes here',
                  variant: 'danger'
                });
              }}
            >
              danger
            </Controls.Button>
            <Controls.Divider />
            <h4>Progress</h4>
            <Controls.ProgressBar margin={{ topPx: 20 }} value={20} />
            <Controls.ProgressBar margin={{ topPx: 20 }} value={20} variant={'success'} />
            <Controls.ProgressBar margin={{ topPx: 20 }} value={20} label variant={'info'} />
            <Controls.ProgressBar margin={{ topPx: 20 }} value={20} striped variant={'warning'} />
            <Controls.ProgressBar margin={{ topPx: 20 }} value={20} variant={'danger'} />
            <Controls.ProgressBar
              margin={{ topPx: 20 }}
              value={20}
              label={'Strong Password'}
              variant={'success'}
            />
            <Controls.ProgressBar margin={{ topPx: 20 }}>
              <Controls.ProgressBar striped variant='success' value={25} order={1} />
              <Controls.ProgressBar variant='info' value={25} order={2} />
              <Controls.ProgressBar striped variant='warning' value={25} order={3} />
              <Controls.ProgressBar striped variant='danger' value={25} order={4} />
            </Controls.ProgressBar>
            <Controls.ProgressBar width={200} margin={{ topPx: 20 }}>
              <Controls.ProgressBar striped variant='success' value={25} order={1} />
              <Controls.ProgressBar variant='info' value={25} order={2} />
              <Controls.ProgressBar striped variant='warning' value={25} order={3} />
              <Controls.ProgressBar striped variant='danger' value={25} order={4} />
            </Controls.ProgressBar>
            <Controls.ProgressBar gap width={200} margin={{ topPx: 20 }}>
              <Controls.ProgressBar striped variant='success' value={25} order={1} />
              <Controls.ProgressBar variant='info' value={25} order={2} />
              <Controls.ProgressBar striped variant='warning' value={25} order={3} />
              <Controls.ProgressBar striped variant='danger' value={25} order={4} />
            </Controls.ProgressBar>
            <Controls.Divider />
            <h4>Rating</h4>
            <Controls.Rating defaultValue={2} maxValue={4} />
            <Controls.Rating defaultValue={3} maxValue={4} />
            <Controls.Rating defaultValue={4} maxValue={4} />
            <Controls.Rating defaultValue={3} maxValue={3} />
            <Controls.Rating defaultValue={2.5} width={200} maxValue={4} />
            {this.variantStates.map((rating: any) => (
              <Controls.Container key={uniqid().toString()} display={'flex'} alignItems={'center'}>
                <Controls.Rating variant={rating} defaultValue={0} maxValue={1} />
                &nbsp;&nbsp; {rating}
              </Controls.Container>
            ))}
            <Controls.Divider />
            <h4>List</h4>
            <Controls.List
              height={100}
              header={<h6>List Title</h6>}
              listItems={
                <>
                  <p>13 May 2019 • 10:00 pm</p>
                  <Controls.Divider visibility={'hidden'} />
                  <Controls.Message
                    padding={{ bottomRem: 0.3 }}
                    fluid
                    justifyContent={'left'}
                    variant={'danger'}
                    icon={faCheckCircle}
                    messageColor={'#000'}
                    message={
                      <Controls.Container>
                        <p className='large bold '>Title</p>
                        <p>2 Fake document</p>
                      </Controls.Container>
                    }
                  />
                  <Controls.Message
                    padding={{ bottomRem: 0.3 }}
                    fluid
                    justifyContent={'left'}
                    variant={'danger'}
                    icon={faCheckCircle}
                    messageColor={'#000'}
                    message={
                      <Controls.Container>
                        <p className='large bold '>Title</p>
                        <p>2 Fake document</p>
                      </Controls.Container>
                    }
                  />
                </>
              }
              footer={
                <Controls.Container verticalAlign={'center'} fluid>
                  <Controls.Link href='/' useNormalAnchor>
                    Link
                  </Controls.Link>
                </Controls.Container>
              }
            />
            <Controls.Divider />
            <h4>Table</h4>
            <Controls.Table
              header={'HEADER'}
              footer={
                <Controls.Item basic icon={faAdjust}>
                  Footer
                </Controls.Item>
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
                        console.log('1');
                      }
                    },
                    {
                      icon: faAdjust,
                      callback: () => {
                        console.log('1');
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
            <Controls.Divider visibility={'hidden'} />
            <Controls.Table
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
                        console.log('1');
                      }
                    },
                    {
                      icon: faAdjust,
                      callback: () => {
                        console.log('1');
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
            <Controls.Divider />
            <Controls.Container padding={{ allPx: 15 }} backgroundColor={'#FFF'}>
              <h4>Form Elements</h4>
              <Controls.Form
                // display={'grid'}
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
                <Controls.Container className={'form-group '} display={'flex'}>
                  <Controls.FormControl
                    // required
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
                      this.state.error === 'yes' ? (
                        <Controls.Transition>
                          <Controls.Message
                            variant='danger'
                            message='Hello i am a extra controls'
                          />
                        </Controls.Transition>
                      ) : (
                        <Controls.Link>
                          <Controls.Icon icon={faPlus} text={'Extra control'} />
                        </Controls.Link>
                      )
                    }
                    append={
                      <Controls.Button
                        float={'left'}
                        textAlign={'center'}
                        type={'submit'}
                        onPress={() => {
                          console.log(this.form.getInputValue('dropdown'));
                          console.log(this.form.getFormData());
                          console.log(this.form.getInputValue('areacode'));
                          this.setState({
                            error: 'yes'
                          });
                        }}
                      >
                        Submit
                      </Controls.Button>
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
                  uploaderConfigs={{ customAllowFileExtensions: ['.pdf'] }}
                />
                <Controls.FormControl
                  required
                  label={'Search'}
                  name='search'
                  type={'text'}
                  placeholder={'Search'}
                  value=''
                  prepend={<Controls.Icon icon={faSearch} />}
                />
                <Controls.FormControl
                  required
                  label={'Email'}
                  name='email'
                  type={'email'}
                  value={this.state.email}
                  onBlur={() => {
                    console.log(this.form.getInputValue('email'));
                  }}
                />
                <Controls.Container className={'form-group'} display={'flex'}>
                  <Controls.FormControl
                    required
                    label={'Password'}
                    name='Password'
                    type={'password'}
                  />
                  <Controls.FormControl
                    label={'Password'}
                    name='Password'
                    type={'password'}
                    value={'haha'}
                  />
                </Controls.Container>
                <Controls.FormControl
                  label={'Description'}
                  name='description'
                  type={'longtext'}
                  alwaysCapitalize={true}
                />
                <Controls.FormControl label={'Numbers only'} name='numeric' type={'numeric'} />
                <Controls.FormControl label={'Numbers with commas'} name='number' type={'number'} />
                <Controls.FormControl label={'$$$'} name='money' type={'money'} decimalPlace={2} />
                <Controls.FormControl
                  required
                  label={'Alpha only'}
                  name='alphabet'
                  placeholder={'Only alphbet allowed'}
                  type={'alphabet'}
                />
                <Controls.FormControl
                  numInputs={6}
                  inputWidth={'80px'}
                  label={'OTP'}
                  name='numberfields'
                  type={'numberfields'}
                  separator={<span>&nbsp;&nbsp;</span>}
                  onInputChanged={() => {
                    console.log(this.form.getInputValue('numberfields'));
                  }}
                />
                <Controls.FormControl
                  numInputs={6}
                  inputWidth={'80px'}
                  label={'OTP with verification'}
                  verificationNumber={'+65-88234124'}
                  name='numberfields'
                  type={'numberfields'}
                  separator={<span>&nbsp;&nbsp;</span>}
                  required
                  loading={this.state.loading}
                  onSendCode={(processing: boolean) => {
                    if (processing) {
                      this.setState({ loading: true });
                    } else {
                      this.setState({ loading: false });
                    }
                  }}
                  validateReturnError={(value: string | number | undefined | null): any => {
                    return 'Invalid OTP';
                  }}
                  onInputChanged={() => {
                    console.log(this.form.getInputValue('numberfields'));
                  }}
                />
                <Controls.FormControl
                  required
                  label={'Date'}
                  name='date'
                  type={'date'}
                  placeholder={'DD/MM/YYYY'}
                  dateOptions={{
                    endDate: new Date()
                  }}
                  value={this.state.value}
                  onInputChanged={(value) => {
                    console.log(value);
                  }}
                  append={
                    <Controls.Button
                      float={'left'}
                      textAlign={'center'}
                      type={'submit'}
                      onPress={() => {
                        this.setState({ value: 770169600, loading: false });
                      }}
                    >
                      Change Date
                    </Controls.Button>
                  }
                />
                <Controls.FormControl
                  required={true}
                  name={'dateformat'}
                  label={
                    <h6>
                      Date <br /> (DD-MM-YYYY)
                    </h6>
                  }
                  placeholder='Only DD-MM-YYYY format is allowed'
                  type={'date'}
                  dateOptions={{
                    dateFormat: 'dd-MM-yyyy'
                  }}
                />
                <Controls.FormControl
                  required
                  label={'DateTime'}
                  name='datetime'
                  type={'date'}
                  dateOptions={{
                    showTimeSelect: true
                  }}
                  onInputChanged={(value) => {
                    console.log(value);
                  }}
                />
                <Controls.FormControl
                  required
                  label={'DateRange'}
                  name='daterange'
                  type={'daterange'}
                  placeholder={''}
                  // value={Formatter.dateToUnixTimestamp(new Date())}
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
                  label={'Notify me'}
                  name='notify'
                  type={'switch'}
                  defaultValue='0'
                />
                <Controls.FormControl
                  label={'H Checkbox'}
                  name='h_checkbox'
                  type={'checkbox'}
                  variant={'horizontal'}
                  selectOptions={[
                    {
                      label: link,
                      value: '1'
                    }
                  ]}
                  value={this.state.value || '1'}
                  append={
                    <Controls.Button
                      float={'left'}
                      textAlign={'center'}
                      type={'submit'}
                      onPress={() => {
                        this.setState({
                          value: '2'
                        });
                      }}
                    >
                      Change Checkbox
                    </Controls.Button>
                  }
                  onInputChanged={(value) => {
                    console.log(this.form.getInputValue('h_checkbox'));
                    console.log(value);
                  }}
                />
                <Controls.FormControl
                  required
                  label={'V Checkbox'}
                  name='v_checkbox'
                  type={'checkbox'}
                  selectOptions={[
                    {
                      label: 'Option1',
                      value: 'option1'
                    },
                    {
                      label: 'Option2',
                      value: 'option2'
                    },
                    {
                      label: 'Option3',
                      value: 'option3'
                    }
                  ]}
                  onInputChanged={(value) => {
                    console.log(this.form.getInputValue('v_checkbox'));
                    console.log(value);
                  }}
                  // value={'option2,option3'}
                />
                <Controls.FormControl
                  required
                  label={'Dropdown'}
                  name='dropdown'
                  placeholder='Choose'
                  type={'select'}
                  value={'secondary'}
                  selectOptions={this.state.selectOptions}
                  onInputChanged={(value) => {
                    console.log(this.form.getInputValue('dropdown'));
                    console.log(value);
                  }}
                  // static={true}
                  append={
                    <Controls.Button
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
                          ],
                          loading: false
                        });
                      }}
                    >
                      Change Dropdown
                    </Controls.Button>
                  }
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
                      html: (
                        <Controls.Container>
                          <Controls.Icon
                            badge={{
                              backgroundColor: 'rgba(220, 53, 69, 0.5)',
                              width: 40,
                              height: 40,
                              borderSize: 1,
                              borderRadius: 50,
                              borderColor: '#FFF',
                              borderStyle: 'solid',
                              fontSize: 100,
                              iconBackground: true
                            }}
                            currency={'SGD'}
                          />
                        </Controls.Container>
                      )
                    },
                    {
                      label: 'Option2',
                      value: 'abcl',
                      html: <Controls.Image fullWidth src={'/images/ISTOX_Logo.png'} />
                    }
                  ]}
                />
                <Controls.FormControl label={'Country'} name='country' type={'country'} required />
                <Controls.FormControl
                  label={'Country Code'}
                  name='countrycode'
                  type={'countrycode'}
                  value={'SGP'}
                />
                <Controls.FormControl
                  required={true}
                  label={'Phone'}
                  name='phone'
                  value={'+65-88234124'}
                  type={'phone'}
                  onInputChanged={() => {
                    console.log(this.form.getInputValue('phone'));
                  }}
                />
                <Controls.FormControl
                  label={'Phone With Send Code'}
                  name='phone'
                  type={'phone'}
                  placeholder={'+65-88234124'}
                  loading={this.state.loading}
                  onSendCode={(processing: boolean) => {
                    console.log(processing);
                    if (processing) {
                      this.setState({ loading: true });
                    } else {
                      this.setState({ loading: false });
                    }
                  }}
                  onInputChanged={() => {
                    console.log(this.form.getInputValue('phone'));
                  }}
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
              </Controls.Form>
            </Controls.Container>
            <Controls.Divider />
            <h4>Item</h4>
            <Controls.Item
              icon={faCheckCircle}
              title={'Title'}
              description={
                'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...'
              }
            />
            <Controls.Item
              icon={faCheckCircle}
              image={'/images/ISTOX_Logo.png'}
              title={'Title'}
              description={
                'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...'
              }
            />
            <Controls.Item
              basic
              icon={faCheckCircle}
              title={'Title'}
              description={
                'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...'
              }
            />
            <Controls.Divider visibility={'hidden'} />
            <Controls.Item icon={faCheckCircle}>
              <Controls.Container widthPercent={100} verticalAlign={'center'}>
                <Controls.Card
                  leftIcon={faInfoCircle}
                  rightIcon={faCheckCircle}
                  icon={faUser}
                  title={'Title'}
                />
                <Controls.ProgressBar gap width={200}>
                  <Controls.ProgressBar striped variant='success' value={25} order={1} />
                  <Controls.ProgressBar variant='info' value={25} order={2} />
                  <Controls.ProgressBar striped variant='warning' value={25} order={3} />
                  <Controls.ProgressBar striped variant='danger' value={25} order={4} />
                </Controls.ProgressBar>
                <Controls.Button float={'right'} size='small' variant='primary'>
                  Small
                </Controls.Button>
              </Controls.Container>
            </Controls.Item>
            <Controls.Divider />
            <h4>Card</h4>
            <Controls.Container display={'flex'}>
              <Controls.Card
                leftIcon={faInfoCircle}
                rightIcon={faCheckCircle}
                icon={faUser}
                title={'Title'}
              />
              <Controls.Card
                leftIcon={faInfoCircle}
                rightIcon={faCheckCircle}
                image={'/images/ISTOX_Logo.png'}
                title={'Title'}
              />
              <Controls.Card leftIcon={faInfoCircle} rightIcon={faCheckCircle}>
                <Controls.Button float={'none'} size='small' variant='primary'>
                  Small
                </Controls.Button>
              </Controls.Card>
            </Controls.Container>
            <Controls.Divider />
            <h4>Message</h4>
            <Controls.Container padding={{ allPx: 15 }} backgroundColor={'#FFF'}>
              {this.variantStates.map((message: any) => (
                <Controls.Message
                  key={uniqid().toString()}
                  variant={message}
                  icon={faCheckCircle}
                  message={`Hello i am a ${message}`}
                />
              ))}
              <Controls.Divider visibility={'hidden'} />
              {this.variantStates.map((message: any) => (
                <Controls.Message
                  key={uniqid().toString()}
                  flat
                  icon={faInfoCircle}
                  variant={message}
                  message={`Hello i am a ${message}`}
                />
              ))}
              <Controls.Divider visibility={'hidden'} />
              {this.variantStates.map((message: any) => (
                <Controls.Message
                  key={uniqid().toString()}
                  flat
                  icon={faInfoCircle}
                  variant={message}
                  message={`Hello i am a ${message}`}
                  messageColor={'#000'}
                />
              ))}
              <Controls.Divider visibility={'hidden'} />
              {this.variantStates.map((message: any) => (
                <Controls.Message
                  key={uniqid().toString()}
                  variant={message}
                  message={`Hello i am a ${message}`}
                />
              ))}
              <Controls.Divider visibility={'hidden'} />
              {this.variantStates.map((message: any) => (
                <Controls.Message
                  key={uniqid().toString()}
                  flat
                  variant={message}
                  message={`Hello i am a ${message}`}
                />
              ))}
              <Controls.Divider visibility={'hidden'} />
              {this.variantStates.map((message: any) => (
                <Controls.Message
                  key={uniqid().toString()}
                  outline
                  variant={message}
                  message={`Hello i am a ${message}`}
                />
              ))}
              <Controls.Divider visibility={'hidden'} />
              {this.variantStates.map((message: any) => (
                <Controls.Message
                  key={uniqid().toString()}
                  fluid
                  justifyContent={'left'}
                  outline
                  icon={faInfoCircle}
                  variant={message}
                  message={`Hello i am a ${message}`}
                />
              ))}
              <Controls.Message
                fluid
                justifyContent={'left'}
                outline
                icon={faInfoCircle}
                message={`Hello i am a  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget sem
              tortor. Nam eu bibendum nisi. In pellentesque consequat orci, at fermentum neque
              luctus in. Vestibulum quis magna porta, pulvinar ipsum ut, sollicitudin nibh.
              Suspendisse tincidunt, nulla quis varius dictum, elit mauris iaculis lorem, id
              efficitur orci quam ac felis. Pellentesque auctor et orci ultricies varius. Nullam
              mollis velit sit amet erat scelerisque, nec blandit orci interdum. Vivamus turpis
              tortor, malesuada sit amet dignissim ac, malesuada ac tortor. Sed rutrum tincidunt
              auctor. Mauris odio ipsum, pretium vitae consectetur eu, tempor vitae lorem. Nulla
              facilisi.`}
              />
            </Controls.Container>
            <Controls.Divider />
            <h4>Breadcrumbs</h4>
            <Controls.Breadcrumbs
              links={[{ title: 'User', href: '#' }, { title: 'Admin', href: '#' }]}
            />
            <Controls.Divider />
            <h4>Custom tooltip</h4>
            <Controls.Container
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
            <Controls.Divider />
            <Controls.Container>
              <h4>Pagination</h4>
              <Controls.Pagination
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                pageCount={7}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
              />
              <br />
              <Controls.Pagination pageCount={7} marginPagesDisplayed={2} pageRangeDisplayed={3} />
            </Controls.Container>
            <Controls.Divider />
            <Controls.Container>
              <h4>Pie chart</h4>
              <Controls.DoughnutChart
                width={300}
                height={300}
                title='
                  <div style="margin-top: -40px; text-align: center;">
                    <h3>Fail</h3>
                    <span>3 issues found</span>
                  </div>'
                labelName={'issues'}
                backgroundColor={'rgba(255, 243, 205, 1)'}
                data={[
                  {
                    name: 'fake data',
                    y: 2
                  },
                  {
                    name: 'blurred documents/data',
                    y: 3
                  },
                  {
                    name: 'verified documents',
                    y: 10
                  }
                ]}
              />
            </Controls.Container>
            <Controls.Divider />
            <Controls.Container>
              <h4>Highlighted Information</h4>
              {this.variantStates.map((info: any) => (
                <Controls.HighlightedInfo
                  key={uniqid().toString()}
                  variant={info}
                  headline={'new info'}
                  title={'Issuer name'}
                  subtitle={'Misty Kasumi'}
                >
                  This is a children
                </Controls.HighlightedInfo>
              ))}
            </Controls.Container>
          </Controls.WrapperContainer>
        </Controls.RootContainer>
        <Controls.Footer />
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
