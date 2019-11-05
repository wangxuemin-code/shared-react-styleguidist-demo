import { countries } from 'country-data';
import * as React from 'react';
import Select, { components } from 'react-select';
import * as styles from '../css/main.scss';
import ReactInput from 'antd/es/input';
import { Divider, Icon, Container, Button } from '.';

interface IProps {
  placeholder?: string;
  value?: string;
  selectOptions?: { label: any; value: string }[];
  required?: boolean;
  loading?: boolean;
  showPhoneLabel?: boolean;
  autoFocus?: boolean;
  onChange?: (value: string) => void;
  onSendCode?: (processing: boolean) => void;
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
          <Container className={'select-opt'}>
            <Container float='left'>
              <Icon flag={innerProps.data.code} /> &nbsp;&nbsp;
              {innerProps.data.country}
            </Container>
            <Container float='right'>{innerProps.data.label}</Container>
          </Container>
        </components.Option>
      );
    };
    const DisplayOption = (innerProps: any) => {
      return (
        <components.SingleValue {...innerProps}>
          <Container className='select-opt'>
            <Icon flag={innerProps.data.code} /> &nbsp;&nbsp;
            {innerProps.data.label}
          </Container>
        </components.SingleValue>
      );
    };
    const allOptions: any = [];
    const mainOptions: any = [];
    const restOptions: any = [];
    var obj = {
      label: '+65',
      value: '+65',
      country: 'Singapore',
      code: 'SG'
    };
    mainOptions.push(obj);
    allOptions.push(obj);
    var sortedCountries: any = countries.all;
    sortedCountries.sort(function(a: any, b: any) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    sortedCountries.map((option: any) => {
      if (option.countryCallingCodes.length && option.emoji && option.alpha2 !== 'SG') {
        var obj = {
          label: option.countryCallingCodes[0],
          value: option.countryCallingCodes[0],
          country: option.name,
          code: option.alpha2
        };
        restOptions.push(obj);
        allOptions.push(obj);
      }
    });
    const Options: any = [
      {
        label: <Container display='none'></Container>,
        options: mainOptions
      },
      {
        label: <Divider compact />,
        options: restOptions
      }
    ];
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
      <Container position={'relative'} fluid display={'flex'}>
        <Container display={'flex'} margin={{ rightRem: 1 }}>
          <Container width={120}>
            {this.props.showPhoneLabel && (
              <label className={styles.semiBold}>
                <Container className={styles.semiBold}>Area Code</Container>
              </label>
            )}
            <Select
              autoFocus={this.props.autoFocus}
              ignoreAccents={false}
              // componentClass='select'
              // defaultMenuIsOpen
              searchable={true}
              className={'select phone-select'}
              value={allOptions.filter((obj: any) => obj.value === this.state.phoneCode)[0] || ''}
              filterOption={customFilter}
              onChange={this.onSetOption}
              components={{ Option: CustomOption, SingleValue: DisplayOption }}
              options={Options}
              isDisabled={this.props.loading}
              styles={{
                placeholder: (base: any) => ({
                  ...base,
                  color: 'rgba(125, 125, 125, 1)'
                }),
                control: (base: any) => ({
                  ...base,
                  padding: '0 0.5rem',
                  color: 'rgba(0, 0, 0, 1)',
                  backgroundColor: 'transparent'
                }),
                menu: (base: any, state: any) => ({
                  ...base,
                  width: '300px',
                  padding: '0.5rem !important',
                  backgroundColor: 'white',
                  boxShadow: 'rgba(0, 0, 0, 0.15) 0px 4px 0px',
                  border: '1px solid rgba(125, 125, 125, 0.1)',
                  zIndex: 2
                }),
                dropdownIndicator: (base: any, state: any) => ({
                  ...base,
                  transition: 'all .2s ease',
                  transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null
                }),
                noOptionsMessageCSS: (base: any, state: any) => ({
                  ...base,
                  padding: '1rem'
                }),
                singleValue: (base: any) => ({
                  ...base,
                  color: 'rgba(0, 0, 0, 1)'
                }),
                option: (base: any, state: any) => ({
                  ...base,
                  fontWeight: state.isSelected ? 600 : 400,
                  color: state.isSelected ? 'rgba(0, 0, 0, 1)' : '#7D7D7D'
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
                    type={'submit'}
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
                      !this.state.phoneCode ||
                      !this.state.phoneNumber ||
                      (this.state.timeRemainingInSeconds !== 60 && this.state.timeRemainingInSeconds !== 0)
                        ? 'disabled'
                        : 'primary'
                    }
                    onPress={this.sendPhoneCode}
                  >
                    {this.state.firstSendCode && this.state.timeRemainingInSeconds === 60
                      ? 'Send Code'
                      : this.state.timeRemainingInSeconds === 60 ||
                        this.state.timeRemainingInSeconds === 0 ||
                        !this.props.loading
                      ? 'Resend Code'
                      : 'Resend Code'}
                  </Button>
                </Container>
              )}
            </Container>
          </Container>
        </Container>
        <Container className={styles.phoneTimerMessage}>
          {this.state.firstSendCode && this.state.timeRemainingInSeconds === 60
            ? ''
            : this.state.timeRemainingInSeconds === 60 || this.state.timeRemainingInSeconds === 0 || !this.props.loading
            ? ''
            : 'You can resend in ' + this.state.timeRemainingInSeconds + ' sec'}
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
