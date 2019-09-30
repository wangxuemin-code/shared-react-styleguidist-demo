import * as React from 'react';
import { Container, IContainer } from './Container';
import { Button } from './Button';
import { Item } from './Item';
import { Divider } from './Divider';
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import * as styles from '../css/main.scss';

const BACKSPACE = 8;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const DELETE = 46;

interface IProps extends IContainer {
  numInputs: number;
  onChange: Function;
  separator?: any;
  autoFocus: boolean;
  isInputNum?: boolean;
  inputWidth: string;
  maxLength: number;
  value?: any;
  verificationNumber?: string;
  onSendCode?: (processing: boolean) => void;
  required?: boolean;
  loading?: boolean;
}

interface ISingleOtpInput extends IContainer {
  value: string;
  maxLength: number;
  autoFocus?: boolean;
  inputWidth: string;
  isInputNum?: boolean;
  onChange: any;
  onKeyDown: any;
  onFocus: Function;
  onBlur: Function;
}

interface IState {
  activeInput: number;
  otp: string[];
  phoneCode?: string | number;
  phoneNumber?: string | number;
  timeRemainingInSeconds: number;
  firstSendCode?: boolean;
}

export class OtpInput extends React.Component<IProps, IState> {
  private timer: any;
  private activeInput: number;
  public static defaultProps: IProps = {
    numInputs: 4,
    onChange: (otp: number) => {
      // console.log(otp);
    },
    autoFocus: false,
    inputWidth: '2rem',
    maxLength: 1
  };

  constructor(props: IProps) {
    super(props);

    this.state = {
      activeInput: 0,
      otp: [],
      phoneCode: this.props.verificationNumber
        ? this.props.verificationNumber.toString().split('-')[0]
        : '',
      phoneNumber: this.props.verificationNumber
        ? this.props.verificationNumber.toString().split('-')[1]
        : '',
      timeRemainingInSeconds: 60,
      firstSendCode: true
    };
  }

  public componentDidUpdate(prevProps: IProps) {
    if (this.props.value !== prevProps.value) {
      if (this.props.value === '') {
        this.setState({ activeInput: 0, otp: [] });
      }
    }
  }

  getOtp = () => {
    this.props.onChange(this.state.otp.join(''));
  };

  focusInput = (input: number) => {
    const { numInputs } = this.props;
    const activeInput = Math.max(Math.min(numInputs, input), 0);
    this.setState({
      activeInput
    });
  };

  focusNextInput = (input?: number) => {
    let activeInput = 0;
    if (input !== undefined) {
      activeInput = input;
    } else {
      activeInput = this.state.activeInput;
    }
    this.focusInput(activeInput + 1);
  };

  focusPrevInput = (input?: number) => {
    let activeInput = 0;
    if (input !== undefined) {
      activeInput = input;
    } else {
      activeInput = this.state.activeInput;
    }
    this.setState({
      activeInput
    });
    this.focusInput(activeInput - 1);
  };

  changeCodeAtFocus = (value: string, input?: number) => {
    let activeInput = 0;
    if (input !== undefined) {
      activeInput = input;
    } else {
      activeInput = this.state.activeInput;
    }
    const otp: string[] = this.state.otp;
    otp[activeInput] = value;
    this.setState({
      otp
    });
    this.getOtp();
  };

  handleOnChange = (e: any) => {
    // this.changeCodeAtFocus(e.target.value);
    // this.focusNextInput();
  };

  handleOnKeyDown = (e: any, i: number) => {
    if (
      (e.keyCode >= 48 && e.keyCode <= 57) ||
      (e.keyCode >= 96 && e.keyCode <= 105) ||
      e.keyCode == 13 ||
      e.keyCode == 9
    ) {
      // 0-9 only and Enter
      if (!isNaN(e.key)) {
        this.changeCodeAtFocus(e.key, i);
        this.focusNextInput(i);
      }
    } else {
      e.preventDefault();
    }
    const otp: string[] = this.state.otp;
    switch (e.keyCode) {
      case BACKSPACE:
        e.preventDefault();
        if (otp[i] == '') {
          this.focusPrevInput(i);
        }
        this.changeCodeAtFocus('', i);
        break;
      case DELETE:
        e.preventDefault();
        if (otp[i] == '') {
          this.focusPrevInput(i);
        }
        this.changeCodeAtFocus('', i);
        break;
      case LEFT_ARROW:
        e.preventDefault();
        this.focusPrevInput(i);
        break;
      case RIGHT_ARROW:
        e.preventDefault();
        this.focusNextInput(i);
        break;
      default:
        break;
    }
  };

  renderInputs = () => {
    const { activeInput, otp } = this.state;
    const { numInputs, separator, autoFocus, isInputNum, inputWidth, maxLength } = this.props;
    const inputs = [];
    for (let i = 0; i < numInputs; i++) {
      inputs.push(
        <Container key={i}>
          <SingleOtpInput
            focus={activeInput === i}
            value={otp && otp[i]}
            onChange={this.handleOnChange}
            onKeyDown={(e: any) => this.handleOnKeyDown(e, i)}
            onFocus={(e: any) => {
              this.setState({
                activeInput: i
              });
              e.target.select();
            }}
            onBlur={() => this.setState({ activeInput: -1 })}
            // isLastChild={i === numInputs - 1}
            autoFocus={autoFocus}
            isInputNum={isInputNum}
            inputWidth={inputWidth}
            maxLength={maxLength}
          />
          {i !== numInputs - 1 && separator}
        </Container>
      );
    }
    return inputs;
  };

  public render() {
    let phoneNumber = this.state.phoneNumber;
    const asterisk = '* ';
    const asteriskCount = phoneNumber ? phoneNumber.toString().length - 3 : 0;
    phoneNumber = phoneNumber
      ? phoneNumber.toString().substr(phoneNumber.toString().length - 3)
      : '';
    return (
      <Container {...this.props} className={styles.otpControl}>
        {this.props.verificationNumber && (
          <>
            <Item basic={true} backgroundColor={'#F8F8F8'} icon={faMobileAlt}>
              <Container verticalAlign={'center'}>
                <Container>
                  code sent to <br /> {this.state.phoneCode}&nbsp; {asterisk.repeat(asteriskCount)}
                  {phoneNumber}
                </Container>
                <Button
                  disabled={!phoneNumber}
                  loading={
                    this.state.timeRemainingInSeconds === 60 ||
                    this.state.timeRemainingInSeconds === 0 ||
                    !this.props.loading
                      ? false
                      : true
                  }
                  float={'right'}
                  variant='primary'
                  onPress={this.sendPhoneCode}
                  type={'submit'}
                >
                  {this.state.firstSendCode && this.state.timeRemainingInSeconds === 60
                    ? 'Send Code'
                    : this.state.timeRemainingInSeconds === 60 ||
                      this.state.timeRemainingInSeconds === 0 ||
                      !this.props.loading
                    ? 'Resend Code'
                    : 'Expires in ' + this.state.timeRemainingInSeconds + ' sec'}
                </Button>
              </Container>
            </Item>
            <Divider visibility={'hidden'} />
            <label>
              <Container className={styles.semiBold}>Enter Code</Container>
            </label>
          </>
        )}
        <Container display={'flex'}>{this.renderInputs()}</Container>
      </Container>
    );
  }

  private sendPhoneCode = () => {
    clearInterval(this.timer!);
    this.setState({ timeRemainingInSeconds: 59 });
    this.timer = setInterval(() => {
      this.decrementTimeRemaining();
    }, 1000);
    if (this.props.onSendCode) {
      this.props.onSendCode(true);
    }
  };

  private decrementTimeRemaining = () => {
    if (this.state.timeRemainingInSeconds > 0) {
      this.setState({
        timeRemainingInSeconds: this.state.timeRemainingInSeconds - 1
      });
    } else {
      if (this.props.onSendCode) {
        this.props.onSendCode(false);
      }
      clearInterval(this.timer!);
    }
  };
}

class SingleOtpInput extends React.PureComponent<ISingleOtpInput> {
  input: any;
  componentDidMount() {
    const {
      input,
      props: { focus, autoFocus }
    } = this;

    if (input && focus && autoFocus) {
      input.focus();
    }
  }

  componentDidUpdate(prevProps: any) {
    const {
      input,
      props: { focus }
    } = this;

    if (prevProps.focus !== focus && (input && focus)) {
      input.focus();
      input.select();
    }
  }

  render() {
    const { inputWidth, value, onKeyDown, onChange } = this.props;
    return (
      <input
        ref={(input) => {
          this.input = input;
        }}
        style={Object.assign({ width: inputWidth, textAlign: 'center' })}
        className='otp'
        onKeyDown={onKeyDown}
        onChange={onChange}
        type={this.props.isInputNum ? 'number' : 'text'}
        maxLength={1}
        value={value ? value : ''}
      />
    );
  }
}
