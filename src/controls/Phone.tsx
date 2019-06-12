import { countries } from 'country-data';
import * as React from 'react';
import { FormControl as BootstrapFormControl } from 'react-bootstrap';
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
}

interface IState {
  value?: string | number;
  phoneCode?: string | number;
  phoneNumber?: string | number;
  timeRemainingInSeconds: number;
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
      timeRemainingInSeconds: 60
    };
  }

  public componentWillMount() {
    if (this.props.value) {
      this.processPhoneCode(this.props.value);
    }
  }

  public componentDidUpdate(prevProps: IProps) {}

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
      <Container display={'flex'} className={'form-group'}>
        <Container width={120}>
          <label className={styles.semiBold}>
            <h6>
              Area Code
              {this.props.required && <Container className={styles.required}>*</Container>}
            </h6>
          </label>
          <Select
            // componentClass='select'
            className={'select'}
            value={Options.filter((obj: any) => obj.value === this.state.phoneCode)[0]}
            filterOption={customFilter}
            placeholder={this.props.placeholder}
            onChange={this.onSetOption}
            components={{ Option: CustomOption, SingleValue: DisplayOption }}
            options={Options}
            styles={{
              control: (base) => ({
                ...base,
                height: '2.857rem',
                minHeight: '2.571rem',
                padding: '0 0.5rem'
              }),
              option: (base: any) => ({
                ...base
              })
            }}
          />
        </Container>
        &nbsp;&nbsp;
        <Container>
          <label className={styles.semiBold}>
            <h6>
              Phone Number
              {this.props.required && <Container className={styles.required}>*</Container>}
            </h6>
          </label>
          <Container display={'flex'}>
            <Container width={230}>
              <BootstrapFormControl
                autoComplete={'off'}
                autoCorrect={'off'}
                type={'text'}
                placeholder={this.props.placeholder}
                value={this.state.phoneNumber || ''}
                onChange={this.onChange}
              />
            </Container>
            &nbsp;&nbsp;
            <Container>
              {this.props.onSendCode && (
                <Button
                  disabled={!this.state.phoneCode || !this.state.phoneNumber}
                  loading={
                    this.state.timeRemainingInSeconds === 60 ||
                    this.state.timeRemainingInSeconds === 0
                      ? false
                      : true
                  }
                  width={
                    this.state.timeRemainingInSeconds === 60 ||
                    this.state.timeRemainingInSeconds === 0
                      ? undefined
                      : 150
                  }
                  float={'right'}
                  variant='primary'
                  onPress={this.sendPhoneCode}
                >
                  {this.state.timeRemainingInSeconds === 60
                    ? 'Resend Code'
                    : this.state.timeRemainingInSeconds === 0
                    ? 'Resend Code'
                    : 'Expires in ' + this.state.timeRemainingInSeconds + ' sec'}
                </Button>
              )}
            </Container>
          </Container>
        </Container>
      </Container>
    );
  }

  private processPhoneCode = (phoneValue: string) => {
    const phone = phoneValue ? phoneValue.toString().split('-') : '';
    const phoneCode = phone[0] ? phone[0] : '';
    const phoneNumber = phone[1] ? phone[1] : '';
    this.setState({ phoneCode: phoneCode, phoneNumber: phoneNumber });
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
      if (phoneCode && newValue) {
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
    if (newValue && phoneNumber) {
      value = newValue + '-' + phoneNumber;
    }
    this.setState({ phoneCode: newValue, value: value });
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  };

  private sendPhoneCode = () => {
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
