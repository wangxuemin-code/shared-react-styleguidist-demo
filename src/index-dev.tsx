import * as React from 'react';
import { Mqtt, Formatter, FMath } from './helpers';
import * as ReactDOM from 'react-dom';
import { Controls, Ant } from './index-prod';
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
  faCheck,
  faLongArrowAltRight
} from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';

var uniqid = require('uniqid');
// const mqtt = new Mqtt({
//   host: 'localhost',
//   port: 35675,
//   onConnected: () => {
//     console.log('connected!');
//   }
// });
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
    modalWidth: number;
    value?: string | number;
    selectOptions: any[];
    email: string;
    imageUrl: string;
    imageFooterChanged: boolean;
  }
> {
  tabs: any;
  form: any;
  imageForm: any;
  formControls: any[];
  variantStates: string[];
  tabsContent: any[];
  tabsEmptyContent: any[];
  tabsContentWithIcons: any[];

  public constructor(props: any) {
    super(props);
    this.state = {
      success: ['Success'],
      error: '',
      modalWidth: 200,
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
      imageUrl: '',
      imageFooterChanged: false
    };
    this.variantStates = [
      'primary',
      'secondary',
      'disabled',
      'light',
      'dark',
      'info',
      'success',
      'warning',
      'danger'
    ];
    this.tabsContent = [
      {
        title: <Controls.Container>Account Info</Controls.Container>,
        contents: 'ABCD'
      },
      {
        title: <Controls.Container>Phone Number</Controls.Container>,
        contents: 'EFGH'
      },
      {
        title: <Controls.Container>Personal Info</Controls.Container>,
        contents: 'IJKL'
      },
      {
        title: <Controls.Container>Documents</Controls.Container>,
        contents: 'MNOP'
      }
    ];

    this.tabsEmptyContent = [
      {
        title: <Controls.Container>Account Info</Controls.Container>,
        contents: ''
      },
      {
        title: <Controls.Container>Phone Number</Controls.Container>,
        contents: ''
      },
      {
        title: <Controls.Container>Personal Info</Controls.Container>,
        contents: ''
      },
      {
        title: <Controls.Container>Documents</Controls.Container>,
        contents: ''
      }
    ];

    this.tabsContentWithIcons = [
      {
        title: (
          <Controls.Container verticalAlign={'center'}>
            <Controls.Icon icon={faExclamationCircle} /> &nbsp; Account Info
          </Controls.Container>
        ),
        contents: 'ABCD'
      },
      {
        title: (
          <Controls.Container verticalAlign={'center'}>
            <Controls.Icon icon={faExclamationCircle} /> &nbsp; Phone Number
          </Controls.Container>
        ),
        contents: 'EFGH'
      },
      {
        title: (
          <Controls.Container verticalAlign={'center'}>
            <Controls.Icon icon={faExclamationCircle} /> &nbsp; Personal Info
          </Controls.Container>
        ),
        contents: 'IJKL'
      },
      {
        title: (
          <Controls.Container verticalAlign={'center'}>
            <Controls.Icon icon={faExclamationCircle} /> &nbsp; Documents
          </Controls.Container>
        ),
        contents: 'MNOP'
      }
    ];
  }

  public render() {
    const link = (
      <>
        By visiting the iSTOX platform, I shall be subject to and bound by our&nbsp;
        <Controls.Link
          onClick={() => {
            this.setState({ showModal: true });
          }}
          useNormalAnchor={true}
        >
          Terms of Use
        </Controls.Link>
      </>
    );
    return this.shouldRender(() => {
      return (
        <>
          <Controls.RootContainer>
            <Controls.Header
              logo={false}
              className={'istox-header'}
              mainLinks={[
                <Controls.Link
                  className={'bold'}
                  padding={{ leftRightRem: 1 }}
                  underline={false}
                  useNormalAnchor={true}
                  href={'sto'}
                >
                  STO
                </Controls.Link>,
                <Controls.Link
                  padding={{ leftRightRem: 1 }}
                  underline={false}
                  useNormalAnchor={true}
                  href={'wallet'}
                >
                  Wallet
                </Controls.Link>
              ]}
              subLinks={[
                <Controls.Container>
                  <Controls.Image width={42} src={'/images/User-Avatar.png'} />
                </Controls.Container>,
                <Controls.Link underline={false} useNormalAnchor={true} href={'transactions'}>
                  Transactions
                </Controls.Link>,
                <Controls.Link
                  onClick={() => {
                    this.setState({ showModal: true });
                  }}
                  variant={'danger'}
                  underline={false}
                >
                  Sign Out
                </Controls.Link>
              ]}
              notificationUnread={true}
              onNotificationVisibleChanged={() => {
                console.log('on show notification');
              }}
              notifications={[
                {
                  header: 'Notifications',
                  notifications: [
                    {
                      title: 'Earlier',
                      contents: [
                        {
                          icon: (
                            <Controls.Icon
                              size={'large'}
                              variant={'success'}
                              icon={faCheckCircle}
                            />
                          ),
                          content: (
                            <Controls.Container>
                              <h6>Account Info</h6>
                              <p>Desciption</p>
                              <span>1 min ago</span>
                            </Controls.Container>
                          ),
                          onClick: () => {
                            console.log('notification on click');
                          }
                        },
                        {
                          icon: (
                            <Controls.Icon
                              size={'large'}
                              variant={'success'}
                              icon={faCheckCircle}
                            />
                          ),
                          content: (
                            <Controls.Container>
                              <h6>Account Info</h6>
                              <p>Desciption</p>
                              <span>1 min ago</span>
                            </Controls.Container>
                          ),
                          onClick: () => {
                            console.log('notification on click');
                          }
                        }
                      ]
                    },
                    {
                      title: 'Days ago',
                      contents: [
                        {
                          icon: (
                            <Controls.Icon
                              size={'large'}
                              variant={'success'}
                              icon={faCheckCircle}
                            />
                          ),
                          content: (
                            <Controls.Container>
                              <h6>Account Info</h6>
                              <p>Desciption</p>
                              <span>1 min ago</span>
                            </Controls.Container>
                          ),
                          onClick: () => {
                            console.log('notification on click');
                          }
                        }
                      ]
                    }
                  ]
                }
              ]}
              name={this.state.email}
              email={this.state.email}
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
                    <p className='light-bold'>Light Bold</p>
                    <p className='semi-bold'>Semi Bold</p>
                    <b>Bold</b>
                    <p className='extra-bold'>Extra Bold</p>
                    <br />
                    <i>Italic</i>
                    <br />
                    <u>Underline</u>
                    <br />
                    <span className='tiny'>Tiny</span> &nbsp;
                    <span className='small'>Small</span> &nbsp;
                    <span className='medium'>Medium</span> &nbsp;
                    <span className='large'>Large</span>
                    <br />
                    {this.variantStates.map((color: any) => (
                      <Controls.Container display={'inline-block'} key={uniqid().toString()}>
                        <span className={`color-${color}`}>{color}</span> &nbsp;
                      </Controls.Container>
                    ))}
                  </Controls.Container>
                </Controls.Container>
              </Controls.Container>
              <Controls.Divider />
              <h4>Tabs</h4>
              <Controls.Tabs
                id={'registration'}
                basic
                orientation={'horizontal'}
                onTabSelected={(tabName) => {
                  console.log(tabName);
                }}
                animated={{ inkBar: true, tabPane: false }}
                selectedIndex={2}
                ref={(ref) => {
                  if (ref) this.tabs = ref;
                }}
                tabs={this.tabsContent}
                extraControls={<Controls.Button>Extra Action</Controls.Button>}
              />
              {this.variantStates.map((tab: any) => (
                <Controls.Tabs
                  key={uniqid().toString()}
                  margin={{ topPx: 20 }}
                  basic
                  variant={tab}
                  orientation={'horizontal'}
                  onTabSelected={(tabName) => {
                    console.log(tabName);
                  }}
                  selectedIndex={2}
                  ref={(ref) => {
                    if (ref) this.tabs = ref;
                  }}
                  tabs={this.tabsEmptyContent}
                />
              ))}
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
                id={'personal-info'}
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
                tabsContentOrientation={'stacked'}
                align={'middle'}
                tabs={this.tabsContentWithIcons}
              />
              <Controls.Divider />
              <Controls.Tabs
                margin={{ topPx: 20 }}
                className={'istox-tabs'}
                orientation={'vertical'}
                variant={'secondary'}
                align={'middle'}
                tabs={this.tabsContent}
              />
              <Controls.Divider />
              <Controls.Tabs
                basic
                variant={'secondary'}
                margin={{ topPx: 20 }}
                className={'istox-tabs'}
                orientation={'vertical'}
                align={'middle'}
                tabs={this.tabsContent}
                extraControls={
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
                }
              />
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
              <Controls.Button
                loading
                size='tiny'
                variant='primary'
                onClick={() => {
                  console.log('should not happen');
                }}
              >
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
              <Controls.Button variant='primary'>
                <Controls.Icon icon={faPlus} />
                Icon
              </Controls.Button>
              <Controls.Button
                variant='primary'
                subText={<span className='small'>Back to Residential / Mailing</span>}
              >
                SubText
              </Controls.Button>
              <Controls.Button float={'right'} fontStyle={'italic'} variant='primary'>
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
                <Controls.Button key={uniqid().toString()} loading variant={button}>
                  {button.toUpperCase()}
                </Controls.Button>
              ))}
              <Controls.Divider visibility={'hidden'} />
              {this.variantStates.map((button: any) => (
                <Controls.Button disabled={true} key={uniqid().toString()} variant={button}>
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
              <Controls.Container display={'flex'}>
                {this.variantStates.map((link: any) => (
                  <Controls.Container key={uniqid().toString()}>
                    <Controls.Link linkColor={'#000'} variant={link} useNormalAnchor>
                      {link.toUpperCase()}
                    </Controls.Link>
                    &nbsp; &nbsp;
                  </Controls.Container>
                ))}
              </Controls.Container>
              <Controls.Container display={'flex'}>
                {this.variantStates.map((link: any) => (
                  <Controls.Container key={uniqid().toString()}>
                    <Controls.Link
                      showUnderline={true}
                      linkColor={'#000'}
                      variant={link}
                      useNormalAnchor
                    >
                      {link.toUpperCase()}
                    </Controls.Link>
                    &nbsp; &nbsp;
                  </Controls.Container>
                ))}
              </Controls.Container>
              <Controls.Container>
                There is a&nbsp;
                <Controls.Link
                  showUnderline={true}
                  linkColor={'#000'}
                  variant={'secondary'}
                  href='/'
                  useNormalAnchor
                >
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
              <Controls.Resend
                duration={10}
                initTimer={true}
                onPress={(processing: boolean) => {
                  if (processing) {
                    console.log(1);
                  } else {
                    console.log(2);
                  }
                }}
              />
              <Controls.Divider />
              <h4>Icon</h4>
              <Controls.Container display={'flex'}>
                <Controls.Icon size='tiny' icon={faUser} text={'Tiny'} /> &nbsp; &nbsp;
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
                {/* <Controls.Icon icon={'mobile'} text={'Passing ICON as a string'} /> */}
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
                  tooltip={
                    <>
                      <Controls.Container
                        onClick={() => {
                          console.log(1);
                        }}
                      >
                        dasdas
                      </Controls.Container>
                      <Controls.Container>dasdas</Controls.Container>
                      <Controls.Container>dasdas</Controls.Container>
                    </>
                  }
                  tooltipOptions={{
                    event: 'click',
                    clickable: true
                    // delayShow: 500,
                    // delayHide: 500,
                    // delayUpdate: 500
                  }}
                  icon={faLongArrowAltRight}
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
                    fontSize: 40,
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
                    fontSize: 40,
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
                    fontSize: 40,
                    iconBackground: true
                  }}
                  flag={'ID'}
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
                <Controls.Grid.Row>
                  <Controls.Grid.Col col={2}>
                    <Controls.Container height={50} backgroundColor={'#e1e1e1'} />
                  </Controls.Grid.Col>
                  <Controls.Grid.Col col={8}>
                    <Controls.Container height={50} backgroundColor={'#e1e1e1'} />
                  </Controls.Grid.Col>
                  <Controls.Grid.Col col={2}>
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
                <Controls.Grid.Row fitted equalWidth>
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
                  <Controls.Container className={'form-group'}>
                    <Controls.Container height={200} width={200}>
                      <Controls.FormControl
                        required
                        label='Image uploader'
                        name='upload'
                        type='uploader'
                        value={this.state.imageUrl}
                        uploaderConfigs={{
                          customAllowFileExtensions: ['.pdf'],
                          showFileName: true,
                          footer: (
                            <>
                              {!this.state.imageFooterChanged && (
                                <p className='small normal-text color-primary-grey-darker text-center'>
                                  Drop or <br />
                                  <a className='color-primary'>choose file here</a> to upload
                                </p>
                              )}
                              {this.state.imageFooterChanged && (
                                <p className='small normal-text color-primary-grey-darker text-center'>
                                  Drop or <br />
                                  <a className='color-primary'>click here</a> to reupload again
                                </p>
                              )}
                            </>
                          )
                        }}
                        onInputChanged={(value: any) => {
                          this.setState({
                            imageFooterChanged: true
                          });
                        }}
                      >
                        <Controls.Container fluid>
                          <Controls.Image
                            height={100}
                            src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/LACMTA_Square_Orange_Line.svg/1024px-LACMTA_Square_Orange_Line.svg.png'
                          />
                        </Controls.Container>
                      </Controls.FormControl>
                    </Controls.Container>
                    <Controls.Container height={200} width={200}>
                      <Controls.FormControl
                        required
                        label='Image uploader'
                        name='uploadviewer'
                        type='uploader'
                        value={
                          'https://v.fastcdn.co/t/fb1fdb8c/ebe0efb9/1559806595-42933764-ghost-shutterstock-1898204.jpg'
                        }
                        uploaderConfigs={{
                          customAllowFileExtensions: ['.pdf'],
                          viewer: true,
                          label: 'Image',
                          footer: (
                            <p className='text-center normal-text small'>
                              Drag and drop or <br />
                              Click here to attached a file
                            </p>
                          )
                        }}
                      />
                    </Controls.Container>
                    <Controls.Container height={200} width={200}>
                      <Controls.FormControl
                        required
                        label='Image uploader disabled '
                        name='uploadviewer'
                        type='uploader'
                        disabled
                        value='http://www.africau.edu/images/default/sample.pdf'
                        uploaderConfigs={{
                          customAllowFileExtensions: ['.pdf'],
                          viewer: true,
                          label: 'PDF'
                        }}
                      />
                    </Controls.Container>
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
              <Controls.BlockchainToast />
              <Controls.Button
                onPress={() => {
                  Controls.BlockchainToast.show({
                    type: 'transaction_status_ok',
                    blockchainTransactionOptions: {
                      purpose: 'Create Fiat'
                    }
                  });
                }}
              >
                Toast
              </Controls.Button>
              <Controls.Modal
                onModalHide={() => {
                  console.log('modal hide');
                }}
                onExited={() => {
                  console.log('modal exited');
                }}
                visible={this.state.showModal}
                width={this.state.modalWidth}
              >
                Modal
              </Controls.Modal>
              <Controls.Button
                variant='danger'
                onPress={() => {
                  // this.setState({
                  //   loading: true
                  // });
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
                  setTimeout(() => {
                    this.setState({
                      modalWidth: 100
                    });
                  }, 3000);
                }}
              >
                Modal
              </Controls.Button>
              <Controls.Button variant='primary' tooltip={'tooltip!'} display='inline-block'>
                ToolTip
              </Controls.Button>
              <Controls.Button
                variant='success'
                // onPress={() => {
                //   Controls.BlockchainTransaction.show({
                //     mqttClient: mqtt,
                //     waitOptions: {
                //       queueName: 'test'
                //     },
                //     onSucess: () => {}
                //   });
                // }}
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
              <br />
              <br />
              <h5>Blockchain Receiption Toast</h5>
              <Controls.Button
                variant={'success'}
                onPress={() => {
                  Controls.BlockchainToast.show({
                    type: 'transaction_status_ok',
                    blockchainTransactionOptions: {
                      purpose: 'moved to allocation'
                    }
                  });
                }}
              >
                Success
              </Controls.Button>
              <Controls.Button
                variant={'danger'}
                onPress={() => {
                  Controls.BlockchainToast.show({
                    type: 'transaction_status_fail',
                    blockchainTransactionOptions: {
                      purpose: 'moved to allocation'
                    }
                  });
                }}
              >
                Fail
              </Controls.Button>
              <Controls.Divider />
              <h4>Progress</h4>
              <Controls.ProgressBar compact value={20} />
              <Controls.ProgressBar animated compact value={25} />
              {this.variantStates.map((progress: any) => (
                <Controls.ProgressBar value={20} variant={progress} />
              ))}
              <Controls.ProgressBar value={20} label={'Strong Password'} variant={'success'} />
              <Controls.ProgressBar compact>
                <Controls.ProgressBar variant='success' value={25} order={1} />
                <Controls.ProgressBar variant='info' value={25} order={2} />
                <Controls.ProgressBar variant='warning' value={25} order={3} />
                <Controls.ProgressBar variant='danger' value={25} order={4} />
              </Controls.ProgressBar>
              <Controls.ProgressBar>
                <Controls.ProgressBar variant='success' value={25} order={1} />
                <Controls.ProgressBar variant='info' value={25} order={2} />
                <Controls.ProgressBar variant='warning' value={25} order={3} />
                <Controls.ProgressBar variant='danger' value={25} order={4} />
              </Controls.ProgressBar>
              <Controls.ProgressBar>
                <Controls.ProgressBar variant='success' value={25} order={1} />
                <Controls.ProgressBar variant='info' value={25} order={2} />
                <Controls.ProgressBar variant='warning' value={25} order={3} />
                <Controls.ProgressBar variant='danger' value={25} order={4} />
              </Controls.ProgressBar>
              <Controls.ProgressBar gap width={200}>
                <Controls.ProgressBar variant='success' value={25} order={1} />
                <Controls.ProgressBar variant='info' value={25} order={2} />
                <Controls.ProgressBar variant='warning' value={25} order={3} />
                <Controls.ProgressBar variant='danger' value={25} order={4} />
              </Controls.ProgressBar>
              <Controls.Divider />
              <h4>Rating</h4>
              <Controls.Rating defaultValue={2} maxValue={4} />
              <Controls.Rating defaultValue={3} maxValue={4} />
              <Controls.Rating defaultValue={4} maxValue={4} />
              <Controls.Rating defaultValue={3} maxValue={3} />
              <Controls.Rating defaultValue={2.5} width={200} maxValue={4} />
              {this.variantStates.map((rating: any) => (
                <Controls.Container
                  key={uniqid().toString()}
                  display={'flex'}
                  alignItems={'center'}
                >
                  <Controls.Rating variant={rating} defaultValue={0} maxValue={1} />
                  &nbsp;&nbsp; {rating}
                </Controls.Container>
              ))}
              {this.variantStates.map((rating: any) => (
                <Controls.Container
                  key={uniqid().toString()}
                  display={'flex'}
                  alignItems={'center'}
                >
                  <Controls.Rating filled variant={rating} defaultValue={3} maxValue={3} />
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
                          <h5>Title</h5>
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
                          <h5>Title</h5>
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
                  {
                    rowContents: ['Super Admin', 'This is another not very long content.', '']
                  },
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
                selectable={true}
                selectedItemIds={['2', '3', '4']}
                striped
                onSelectedItemsChanged={(selectedItemIds) => {
                  console.log(`Selected id changed: ${selectedItemIds.join(', ')}`);
                }}
                columnHeaders={[
                  { title: 'Code' },
                  { title: 'Date Created' },
                  { title: 'Request Status' },
                  {
                    title: 'Actions',
                    tdClass: 'test-class'
                  }
                ]}
                rows={[
                  {
                    rowContents: ['Super Admin', 'This is another not very long content.', '', ''],
                    itemId: '1'
                  },
                  {
                    rowHeaderContents: ['Header1', 'Header2', ''],
                    groupId: '1',
                    rowColSpans: [2]
                  },
                  {
                    rowContents: [
                      'Super Admin',
                      'This is another not very long content.',
                      'DDMMYYYY'
                    ],
                    itemId: '2',
                    groupId: '1',
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
                    rowContents: ['Super Admin', 'This is another not very long content.', '', ''],
                    itemId: '3',
                    groupId: '1'
                  },
                  {
                    rowContents: [
                      'Super Admin',
                      'This is another not very long content.',
                      'DDMMYYYY'
                    ],
                    itemId: '4',
                    groupId: '1',
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
                  <Controls.Container className={'form-group '}>
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
                        <Controls.Link>
                          <Controls.Icon icon={faPlus} text={'Extra control'} />
                        </Controls.Link>
                      }
                      append={
                        <Controls.Button
                          size={'large'}
                          float={'left'}
                          textAlign={'center'}
                          type={'submit'}
                          onPress={() => {
                            console.log(this.form.getInputValue('dropdown'));
                            console.log(this.form.getFormData());
                            console.log(this.form.getInputValue('areacode'));
                            console.log('email', this.form.getInputValue('email'));
                            this.setState({
                              error: 'yes'
                            });
                            this.form.onSaved();
                          }}
                        >
                          Submit
                        </Controls.Button>
                      }
                      name='hi'
                      type={'number'}
                      decimalPlace={2}
                    />
                  </Controls.Container>
                  <Controls.FormControl
                    required
                    label='Image'
                    name='image'
                    type='uploader'
                    value='https://v.fastcdn.co/t/fb1fdb8c/bb03cafd/1558938078-42717848-212x56-iSTOX-Logo.png'
                    uploaderConfigs={{ showFileName: true, customAllowFileExtensions: ['.pdf'] }}
                  />
                  <Controls.FormControl
                    debounce={2000}
                    required
                    label={'Search'}
                    name='search'
                    type={'text'}
                    placeholder={'Search'}
                    value=''
                    prepend={<Controls.Icon icon={faSearch} />}
                    onInputChanged={() => {
                      console.log(this.form.getInputValue('search'));
                    }}
                  />
                  <Controls.FormControl
                    required
                    disabled
                    label={'Email'}
                    name='email'
                    type={'email'}
                    value={this.state.email}
                    onBlur={() => {
                      console.log(this.form.getInputValue('email'));
                    }}
                    suffix={<Controls.Icon variant={'success'} icon={faCheckCircle} />}
                  />
                  <Controls.Container className={'form-group'}>
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
                    disabled
                    label={'Description'}
                    name='description'
                    type={'longtext'}
                    alwaysCapitalize={true}
                  />
                  <Controls.FormControl
                    required
                    label={'Numbers only'}
                    name='numeric'
                    type={'numeric'}
                  />
                  <Controls.FormControl
                    required
                    label={'Numbers with commas'}
                    name='number'
                    type={'number'}
                  />
                  <Controls.FormControl
                    required
                    label={'$$$'}
                    name='money'
                    type={'number'}
                    decimalPlace={2}
                    unit={'SGD'}
                  />
                  <Controls.FormControl
                    required
                    label={'Alpha only'}
                    name='alphabet'
                    placeholder={'Only alphabet allowed'}
                    type={'alphabet'}
                    alphabetOnly={true}
                  />
                  <Controls.FormControl
                    required
                    label={'Capitalize only'}
                    name='capitalize'
                    placeholder={'Only capitalize allowed'}
                    alwaysCapitalize={true}
                  />
                  <Controls.FormControl
                    required
                    label={'Unit Field'}
                    name='unit'
                    type={'number'}
                    decimalPlace={2}
                    unit={'SGD'}
                  />
                  <Controls.FormControl
                    numInputs={6}
                    inputWidth={'60px'}
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
                    inputWidth={'60px'}
                    label={'OTP with verification'}
                    verificationNumber={'+65-88234124'}
                    name='numberfields'
                    type={'numberfields'}
                    separator={<span>&nbsp;&nbsp;</span>}
                    required
                    loading={true}
                    // loading={this.state.loading}
                    onSendCode={(processing: boolean) => {
                      if (processing) {
                        this.setState({ loading: true });
                        // setTimeout(() => {
                        //   this.setState({ email: 'hahahaha@gmail.com' });
                        // }, 5000);
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
                      startDate: new Date(),
                      dateFormat: 'dd-MM-yyyy',
                      defaultShowDate: true
                    }}
                    value={this.state.value}
                    // value={'2019-07-28T13:35:38.000Z'}
                    // value={'07/17/1999'}
                    onInputChanged={(value) => {
                      console.log(value);
                      console.log('date', this.form.getInputValue('date'));
                    }}
                    append={
                      <Controls.Button
                        float={'left'}
                        textAlign={'center'}
                        type={'submit'}
                        onPress={() => {
                          if (this.state.value == '' || this.state.value == undefined) {
                            this.setState({
                              value: '2019-07-28T13:35:38.000Z'
                            });
                          } else {
                            this.setState({
                              value: undefined
                              // value: '2019-07-28T13:35:38.000Z'
                            });
                          }
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
                      <>
                        <h6>
                          Date <br /> (DD-MM-YYYY)
                        </h6>
                      </>
                    }
                    placeholder='Only DD-MM-YYYY format is allowed'
                    type={'date'}
                    dateOptions={{
                      dateFormat: 'dd-MM-yyyy'
                    }}
                  />
                  <Controls.FormControl
                    disabled
                    required
                    label={'DateTime'}
                    name='datetime'
                    type={'datetime'}
                    dateOptions={{
                      startDate: new Date(),
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
                      startDate: new Date(),
                      showTimeSelect: true
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
                    required
                    label={'H Radio'}
                    name='h_radio'
                    type={'radio'}
                    variant={'horizontal'}
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
                      console.log(this.form.getInputValue('h_radio'));
                      console.log(value);
                    }}
                  />
                  <Controls.FormControl
                    required
                    label={'V Radio'}
                    name='v_radio'
                    type={'radio'}
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
                      console.log(this.form.getInputValue('v_radio'));
                      console.log(value);
                    }}
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
                      },
                      {
                        label: link,
                        value: '2'
                      }
                    ]}
                    value={this.state.value}
                    append={
                      <Controls.Button
                        float={'left'}
                        textAlign={'center'}
                        // type={'submit'}
                        onPress={() => {
                          if (this.form.getInputValue('h_checkbox') == '1') {
                            this.setState({
                              value: undefined
                            });
                          } else {
                            this.setState({
                              value: '1'
                            });
                          }
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
                        label: 'abc',
                        value: '0'
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
                    value={0}
                  />
                  <Controls.FormControl
                    disabled
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
                                iconBackground: true
                              }}
                              currency={'SGD'}
                            />

                            <Controls.Label className={'html'} variant={'info'} text={'Creating'} />
                          </Controls.Container>
                        )
                      },
                      {
                        label: 'Option2',
                        value: 'abcl',
                        html: <Controls.Image fullWidth src={'/images/User-Avatar.png'} />
                      }
                    ]}
                  />
                  <Controls.FormControl
                    label={'Country'}
                    name='country'
                    type={'country'}
                    // excludeOptions={['Others', 'Singapore']}
                    required
                  />
                  <Controls.FormControl
                    label={'Country Code'}
                    name='countrycode'
                    type={'countrycode'}
                    // excludeOptions={['Others', 'SGP']}
                    value={'SGP'}
                  />
                  <Controls.FormControl
                    required={true}
                    label={'Phone'}
                    name='phone'
                    value={'+65'}
                    type={'phone'}
                    onInputChanged={() => {
                      console.log(this.form.getInputValue('phone'));
                    }}
                    showPhoneLabel={false}
                  />
                  <Controls.FormControl
                    autoFocus={true}
                    label={'Phone With Send Code'}
                    name='phonewithsendcode'
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
                      console.log(this.form.getInputValue('phonewithsendcode'));
                    }}
                  />
                  <Controls.FormControl
                    value={'1234567'}
                    label={'Static'}
                    name='test_static'
                    static={true}
                    oldValue={'1234567'}
                    type='number'
                  />
                  <Controls.FormControl
                    label={'Static Date'}
                    name='date_static'
                    type={'date'}
                    static={true}
                    placeholder={'DD/MM/YYYY'}
                    dateOptions={{
                      startDate: new Date()
                      // dateFormat: 'DD-MM-YYYY'
                    }}
                    // oldValue={'2019-07-28T17:58:18.000Z'}
                    // value={'2019-07-28T17:58:18.000Z'}
                    // oldValue={1563552000} // 20/07/2019
                    // value={1564156800} // 27/07/2019
                    oldValue={'07/20/2019'}
                    value={'07/23/2019'}
                  />
                  <Controls.FormControl
                    required
                    label={'Static Select'}
                    name='select_static'
                    type={'select'}
                    static={true}
                    value={7}
                    oldValue={7}
                    selectOptions={[
                      {
                        label: 'Standard Rate 7%',
                        value: 7
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
                    static={true}
                    label='Static Image uploader'
                    name='upload'
                    type='uploader'
                    oldValue='https://v.fastcdn.co/t/fb1fdb8c/bb03cafd/1558938078-42717848-212x56-iSTOX-Logo.png'
                    value='https://v.fastcdn.co/t/fb1fdb8c/bb03cafd/1558938078-42717848-212x56-iSTOX-Logo.png'
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
                image={'/images/User-Avatar.png'}
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
              {/* <Controls.Item icon={faCheckCircle}>
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
            <Controls.Divider /> */}
              <h4>Card</h4>
              <Controls.Container className={'display-flex'}>
                <Controls.Card
                  leftIcon={faInfoCircle}
                  rightIcon={faCheckCircle}
                  icon={faUser}
                  title={'Title'}
                />
                <Controls.Card
                  leftIcon={faInfoCircle}
                  rightIcon={faCheckCircle}
                  image={'/images/User-Avatar.png'}
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
                    flat
                    variant={message}
                    size={'small'}
                    message={`Hello i am a smaller ${message}`}
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
                    icon={faExclamationCircle}
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
                    labeled
                    icon={faExclamationCircle}
                    variant={message}
                    message={`Hello i am a ${message}`}
                    messageColor={'#000'}
                  />
                ))}
                <Controls.Divider visibility={'hidden'} />
                {this.variantStates.map((message: any) => (
                  <>
                    <Controls.Message
                      key={uniqid().toString()}
                      fluid
                      labeled
                      icon={faExclamationCircle}
                      variant={message}
                      title={'STO HALT'}
                      content={'We will notify you when STO is up'}
                      subContent={'2010 August 2018'}
                    />
                    <Controls.Divider />
                  </>
                ))}
                <Controls.Divider visibility={'hidden'} />
                <Controls.Message
                  fluid
                  justifyContent={'left'}
                  outline
                  icon={faExclamationCircle}
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
                useNormalAnchor
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
              <h4>Label</h4>
              <Controls.Container padding={{ allPx: 15 }} backgroundColor={'#FFF'}>
                {this.variantStates.map((message: any) => (
                  <Controls.Label
                    key={uniqid().toString()}
                    variant={message}
                    text={`Hello i am a ${message}`}
                  />
                ))}
              </Controls.Container>

              <Controls.Container padding={{ allPx: 15 }} backgroundColor={'#FFF'}>
                {this.variantStates.map((message: any) => (
                  <Controls.Label
                    key={uniqid().toString()}
                    variant={message}
                    size='small'
                    text={`Hello i am a small ${message}`}
                  />
                ))}
              </Controls.Container>
              <Controls.Divider />
              <Controls.Container>
                <h4>Pagination</h4>
                <Controls.Pagination current={2} total={50} />
                <br />
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
              <Controls.Container>
                <h4>Bar chart</h4>
                <Controls.BarChart
                  width={300}
                  height={300}
                  title='
                  <div style="margin-top: -40px; text-align: center;">
                    <h3>Fail</h3>
                    <span>Statement</span>
                  </div>'
                  type={'column'}
                  colors={[
                    'rgba(0, 27, 86, 0.9)',
                    'rgba(101, 195, 102, 0.9)',
                    'rgba(59, 228, 193, 1)'
                  ]}
                  categories={['2016', '2017', '2018']}
                  plotOptions={{
                    column: {
                      pointPadding: 0.2,
                      borderWidth: 0
                    }
                  }}
                  series={[
                    {
                      name: 'fake data',
                      data: [2, 8, 14]
                    },
                    {
                      name: 'blurred documents/data',
                      data: [3, 16, 9]
                    },
                    {
                      name: 'verified documents',
                      data: [10, 6, 12]
                    }
                  ]}
                  columnWidth={3}
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
                <Controls.Divider visibility={'hidden'} />
                <Controls.Divider visibility={'hidden'} />
              </Controls.Container>
              <Controls.Container>
                <h4>Test Direct Ant Component Access</h4>
                <Ant.Alert message={'Testing Ant component'} />
              </Controls.Container>
              <Controls.Divider />
              <Controls.Container margin={{ bottomRem: 6 }}>
                <h4 style={{ marginBottom: '80px' }}>STO Timeline</h4>
                <Controls.StoTimeLine
                  stoDateTime={{
                    createdAt: '2019-08-10T01:36:48Z',
                    bookbuildingStartTime: '2019-08-14T10:20:24Z',
                    bookbuildingEndTime: '2019-08-24T10:20:24Z',
                    preSaleStartTime: '2019-08-28T10:20:24Z',
                    preSaleEndTime: '2019-09-15T10:20:24Z',
                    publicSaleStartTime: '2019-09-20T10:20:24Z',
                    publicSaleEndTime: '2019-09-26T00:20:24Z',
                    issueDateTime: '2019-09-26T00:20:24Z'
                  }}
                  hideTitle
                />
              </Controls.Container>
              <Controls.Divider visibility={'hidden'} />
            </Controls.WrapperContainer>
          </Controls.RootContainer>
          <Controls.Footer detailed />
        </>
      );
    }, this.state.loading);
  }

  private function = () => {
    console.log('this is a callback');
  };
}

const render = () => {
  ReactDOM.render(<Main />, document.getElementById('reactContainer'));
};

render();
