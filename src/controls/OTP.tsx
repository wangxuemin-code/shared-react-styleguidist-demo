import * as React from 'react';
import * as styles from '../css/main.scss';
import { Container, IContainer } from './Container';
var uniqid = require('uniqid');

const BACKSPACE = 8;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const DELETE = 46;

interface IOtpInput extends IContainer {
  numInputs: number;
  onChange: Function;
  separator?: any;
  shouldAutoFocus: boolean;
  isInputNum?: boolean;
  inputWidth: string;
  maxLength: number;
}

interface ISingleOtpInput extends IContainer {
  value: string;
  maxLength: number;
  shouldAutoFocus: boolean;
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
}

export class OtpInput extends React.Component<IOtpInput, IState> {
  public static defaultProps: IOtpInput = {
    numInputs: 4,
    onChange: (otp: number): void => {
      // console.log(otp);
    },
    shouldAutoFocus: false,
    inputWidth: '2rem',
    maxLength: 1
  };

  constructor(props: IOtpInput) {
    super(props);

    this.state = {
      activeInput: 0,
      otp: []
    };
  }

  getOtp = () => {
    this.props.onChange(this.state.otp.join(''));
  };

  focusInput = (input: number) => {
    const { numInputs } = this.props;
    const activeInput = Math.max(Math.min(numInputs - 1, input), 0);
    this.setState({
      activeInput
    });
  };

  focusNextInput = () => {
    const { activeInput } = this.state;
    this.focusInput(activeInput + 1);
  };

  focusPrevInput = () => {
    const { activeInput } = this.state;
    this.focusInput(activeInput - 1);
  };

  changeCodeAtFocus = (value: string) => {
    const activeInput = this.state.activeInput;
    const otp: string[] = this.state.otp;
    otp[activeInput] = value;
    this.setState({
      otp
    });
    this.getOtp();
  };

  handleOnChange = (e: any) => {
    this.changeCodeAtFocus(e.target.value);
    this.focusNextInput();
  };

  handleOnKeyDown = (e: any) => {
    if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
      // 0-9 only
    } else {
      e.preventDefault();
    }
    switch (e.keyCode) {
      case BACKSPACE:
        e.preventDefault();
        this.changeCodeAtFocus('');
        this.focusPrevInput();
        break;
      case DELETE:
        e.preventDefault();
        this.changeCodeAtFocus('');
        break;
      case LEFT_ARROW:
        e.preventDefault();
        this.focusPrevInput();
        break;
      case RIGHT_ARROW:
        e.preventDefault();
        this.focusNextInput();
        break;
      default:
        break;
    }
  };

  renderInputs = () => {
    const { activeInput, otp } = this.state;
    const { numInputs, separator, shouldAutoFocus, isInputNum, inputWidth, maxLength } = this.props;
    const inputs = [];
    for (let i = 0; i < numInputs; i++) {
      inputs.push(
        <Container key={i}>
          <SingleOtpInput
            focus={activeInput === i}
            value={otp && otp[i]}
            onChange={this.handleOnChange}
            onKeyDown={this.handleOnKeyDown}
            onFocus={(e: any) => {
              this.setState({
                activeInput: i
              });
              e.target.select();
            }}
            onBlur={() => this.setState({ activeInput: -1 })}
            // isLastChild={i === numInputs - 1}
            shouldAutoFocus={shouldAutoFocus}
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
    return (
      <Container display={'flex'} {...this.props}>
        {this.renderInputs()}
      </Container>
    );
  }
}

class SingleOtpInput extends React.PureComponent<ISingleOtpInput> {
  input: any;
  componentDidMount() {
    const {
      input,
      props: { focus, shouldAutoFocus }
    } = this;

    if (input && focus && shouldAutoFocus) {
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
        type={this.props.isInputNum ? 'text' : 'text'}
        maxLength={1}
        value={value ? value : ''}
      />
    );
  }
}
