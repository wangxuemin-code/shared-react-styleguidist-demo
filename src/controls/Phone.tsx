import { countries } from 'country-data';
import * as React from 'react';
import { Input as ReactInput } from 'antd';
import Select, { components } from 'react-select';
import { Button } from './Button';
import { Container } from './Container';
import { Icon } from './Icon';
import * as styles from '../css/main.scss';

interface IProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  selectOptions?: { label: any; value: string }[];
  required?: boolean;
  onSendCode?: (processing: boolean) => void;
  loading?: boolean;
  showPhoneLabel?: boolean;
}

interface IState {
  value?: string | number;
  phoneCode?: string | number;
  phoneNumber?: string | number;
  timeRemainingInSeconds: number;
  firstSendCode?: boolean;
}

export class Phone extends React.Component<IProps, IState> {
  private timer: any;
  public static defaultProps: IProps = {};

  public constructor(props: IProps) {
    super(props);
    this.onSetOption = this.onSetOption.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      phoneCode: '',
      phoneNumber: '',
      timeRemainingInSeconds: 60,
      firstSendCode: true
    };
  }

  public componentWillMount() {
    if (this.props.value) {
      this.processPhoneCode(this.props.value);
    }
  }

  public componentDidUpdate(prevProps: IProps) {
    if (this.props.value !== prevProps.value) {
      this.processPhoneCode(this.props.value);
    }
  }

  public render() {
    const CustomOption = (innerProps: any) => {
      return (
        <components.Option {...innerProps}>
          <Container className='select-option'>
            <Icon flag={innerProps.data.code} /> &nbsp;&nbsp;
            {innerProps.data.label}
          </Container>
        </components.Option>
      );
    };
    const DisplayOption = (innerProps: any) => {
      return (
        <components.SingleValue {...innerProps}>
          <Container className='select-option'>
            <Icon flag={innerProps.data.code} /> &nbsp;&nbsp;
            {innerProps.data.label}
          </Container>
        </components.SingleValue>
      );
    };
    const Options: any = [];
    countries.all.map((option) => {
      if (option.countryCallingCodes.length && option.emoji) {
        var obj = {
          label: option.countryCallingCodes[0],
          value: option.countryCallingCodes[0],
          country: option.name,
          code: option.alpha2
        };
        Options.push(obj);
      }
    });
    const customFilter = (option: any, searchText: string) => {
      if (
        (option.data && option.data.label.includes(searchText.toLowerCase())) ||
        (option.data && option.data.value.includes(searchText.toLowerCase())) ||
        (option.data && option.data.value.includes('+' + searchText.toLowerCase())) ||
        (option.data && option.data.country.toLowerCase().includes(searchText.toLowerCase())) ||
        (option.data && option.data.code.toLowerCase().includes(searchText.toLowerCase()))
      ) {
        return true;
      } else {
        return false;
      }
    };
    return (
      <Container fluid display={'flex'}>
        <Container display={'flex'} margin={{ rightRem: 1 }}>
          <Container width={120}>
            {this.props.showPhoneLabel && (
              <label className={styles.semiBold}>
                <Container className={styles.semiBold}>Area Code</Container>
              </label>
            )}

            <Select
              // componentClass='select'
              // defaultMenuIsOpen
              className={'select'}
              value={Options.filter((obj: any) => obj.value === this.state.phoneCode)[0] || ''}
              filterOption={customFilter}
              onChange={this.onSetOption}
              components={{ Option: CustomOption, SingleValue: DisplayOption }}
              options={Options}
              isDisabled={this.props.loading}
              styles={{
                placeholder: (base: any) => ({
                  ...base,
                  color: 'rgba(125, 125, 125, 0.9)'
                }),
                control: (base: any) => ({
                  ...base,
                  padding: '0 0.5rem',
                  color: 'rgba(0, 0, 0, 0.9)'
                }),
                option: (base: any, state: any) => ({
                  ...base,
                  borderColor: state.isFocused ? 'rgba(0, 27, 86, 1) !important' : ''
                })
              }}
            />
          </Container>
        </Container>
        <Container fluid display={'flex'} className={styles.flex1}>
          <Container fluid>
            {this.props.showPhoneLabel && (
              <label>
                <Container className={styles.semiBold}>Phone Number</Container>
              </label>
            )}
            <Container display={'flex'}>
              <Container fluid>
                <ReactInput
                  autoComplete={'off'}
                  autoCorrect={'off'}
                  type={'text'}
                  disabled={this.props.loading}
                  placeholder={this.props.placeholder}
                  value={this.state.phoneNumber || ''}
                  onChange={this.onChange}
                />
              </Container>

              {this.props.onSendCode && (
                <Container margin={{ leftRem: 1 }}>
                  <Button
                    disabled={!this.state.phoneCode || !this.state.phoneNumber}
                    loading={
                      this.state.timeRemainingInSeconds === 60 ||
                      this.state.timeRemainingInSeconds === 0 ||
                      !this.props.loading
                        ? false
                        : true
                    }
                    width={
                      this.state.timeRemainingInSeconds === 60 ||
                      this.state.timeRemainingInSeconds === 0 ||
                      !this.props.loading
                        ? undefined
                        : 150
                    }
                    float={'right'}
                    variant={
                      !this.state.phoneCode || !this.state.phoneNumber ? 'disabled' : 'primary'
                    }
                    onPress={this.sendPhoneCode}
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
              )}
            </Container>
          </Container>
        </Container>
      </Container>
    );
  }

  private processPhoneCode = (phoneValue: string | undefined) => {
    if (phoneValue) {
      const phone = phoneValue ? phoneValue.toString().split('-') : '';
      const phoneCode = phone[0] ? phone[0] : '';
      const phoneNumber = phone[1] ? phone[1] : '';
      this.setState({ phoneCode: phoneCode, phoneNumber: phoneNumber, value: phoneValue });
    } else {
      this.setState({ phoneCode: '', phoneNumber: '', value: '' });
    }
  };

  private validateValueCanChanged(value: string): boolean {
    const re = /^\d+$/;
    if (value && !re.test(value)) {
      return false;
    }
    return true;
  }

  private onChange(event: React.FormEvent<any>) {
    const { value } = event.target as HTMLInputElement;
    let newValue = value;
    if (this.validateValueCanChanged(newValue)) {
      const phoneCode = this.state.phoneCode;
      let value = '';
      if (phoneCode) {
        value = phoneCode + '-' + newValue;
      }
      this.setState({ phoneNumber: newValue, value: value });
      if (this.props.onChange) {
        this.props.onChange(value);
      }
    }
  }

  private onSetOption = (selectedOption: any) => {
    let newValue = selectedOption.value;
    if (newValue.constructor === Array) {
      newValue = selectedOption.value[0];
    }
    const phoneNumber = this.state.phoneNumber;
    let value = '';
    if (newValue || phoneNumber) {
      value = newValue + '-' + phoneNumber;
    }
    this.setState({ phoneCode: newValue, value: value });
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  };

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
