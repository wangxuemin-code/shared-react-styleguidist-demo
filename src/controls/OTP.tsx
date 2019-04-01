import * as React from 'react';
import * as styles from '../css/main.scss';
import { Container, IContainer } from './Container';

const BACKSPACE = 8;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const DELETE = 46;

interface IOtpInput extends IContainer {
  numInputs: number;
  onChange: Function;
  separator?: string;
  isInputNum?: boolean;
  inputWidth?: string;
}

interface ISingleOtpInput extends IContainer {
  value: number;
  maxLength: number;
}

interface IState {
  activeInput: number;
  otp: string[];
}

export class OtpInput extends React.Component<IOtpInput, IState> {
  public static defaultProps: IOtpInput = {
    numInputs: 4,
    onChange: (otp: number): void => console.log(otp)
  };

  constructor(props: IOtpInput) {
    super(props);

    this.state = {
      activeInput: 0,
      otp: []
    };
  }

  inputs: any = [];

  getOtp = () => {
    this.props.onChange(this.state.otp.join(''));
  };

  focusInput = (input: number) => {
    const { numInputs } = this.props;
    const activeInput = Math.max(Math.min(numInputs - 1, input), 0);
    this.setState({
      activeInput
    });
    this.inputs[activeInput].focus();
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
    const { numInputs, separator, isInputNum, inputWidth } = this.props;
    const inputs = [];
    const SingleOtpInput = (i: number, isLastChild: boolean, ...props: any) => (
      <>
        <input
          ref={(input) => (this.inputs[i] = input)}
          style={Object.assign({ width: inputWidth, textAlign: 'center' })}
          className=''
          onChange={this.handleOnChange}
          onKeyDown={this.handleOnKeyDown}
          onFocus={(e) => {
            this.setState({
              activeInput: i
            });
            e.target.select();
          }}
          type={this.props.isInputNum ? 'text' : 'text'}
          maxLength={1}
          value={props.value}
        />
        {isLastChild && <span>{separator}</span>}
      </>
    );
    this.inputs = [];
    for (let i = 0; i < numInputs; i++) {
      inputs.push(SingleOtpInput(i, i !== numInputs - 1, this.props));
    }
    return inputs;
  };

  public render() {
    return <Container {...this.props}>{this.renderInputs()}</Container>;
  }
}
