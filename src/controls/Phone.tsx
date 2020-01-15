// import { countries } from 'country-data';
import countries from '../helpers/Countries';
import * as React from 'react';
import * as styles from '../css/main.scss';
import ReactInput from 'antd/es/input';
import ReactSelect from 'antd/es/select';
const { Option, OptGroup } = ReactSelect;
const chevronDown = (
  <svg viewBox='0 0 448 512' fill='currentColor' width='1em' height='1em'>
    <path d='M441.9 167.3l-19.8-19.8c-4.7-4.7-12.3-4.7-17 0L224 328.2 42.9 147.5c-4.7-4.7-12.3-4.7-17 0L6.1 167.3c-4.7 4.7-4.7 12.3 0 17l209.4 209.4c4.7 4.7 12.3 4.7 17 0l209.4-209.4c4.7-4.7 4.7-12.3 0-17z' />
  </svg>
);
import { Icon, Container, Button } from '.';

interface IProps {
  disabled?: boolean;
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
    const mainOptions: any = [];
    const restOptions: any = [];
    const singaporeLabel = '+65';
    var sortedCountries: any = countries.all;

    var obj = {
      label: singaporeLabel,
      value: singaporeLabel,
      country: 'Singapore',
      code: 'SG'
    };
    mainOptions.push(obj);
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
      if (
        option.countryCallingCodes.length &&
        option.emoji &&
        option.alpha2 !== 'SG'
      ) {
        var obj = {
          label: option.countryCallingCodes[0],
          value: option.countryCallingCodes[0],
          country: option.name,
          code: option.alpha2
        };
        restOptions.push(obj);
      }
    });

    var filteredRestOptions = restOptions.reduce(
      (accumulator: any, current: any) => {
        if (checkIfAlreadyExist(current)) {
          return accumulator;
        } else {
          return [...accumulator, current];
        }

        function checkIfAlreadyExist(currentVal: any) {
          return accumulator.some((item: any) => {
            return item.label === currentVal.label;
          });
        }
      },
      []
    );

    const mainChildren: any[] = [];
    const restChildren: any[] = [];
    mainOptions!.map((item: any, i: any) => {
      mainChildren.push(
        <Option
          data-search={`${item.label} ${item.country} ${item.code}`}
          value={item.value}
          key={i}
        >
          <Container float='left'>
            <Icon flag={item.code} /> &nbsp;
            <Container className='phone-country'>{item.country}</Container>
          </Container>
          <Container float='right'> {item.label}</Container>
        </Option>
      );
    });
    filteredRestOptions!.map((item: any, i: any) => {
      restChildren.push(
        <Option
          data-search={`${item.label} ${item.country} ${item.code}`}
          value={item.value}
          key={i}
        >
          <Container float='left'>
            <Icon flag={item.code} /> &nbsp;
            <Container className='phone-country'>{item.country}</Container>
          </Container>
          <Container float='right'> {item.label}</Container>
        </Option>
      );
    });

    return (
      <Container position={'relative'} fluid display={'flex'}>
        <Container display={'flex'} margin={{ rightRem: 1 }}>
          <Container width={120}>
            {this.props.showPhoneLabel && (
              <label className={styles.semiBold}>
                <Container className={styles.semiBold}>Area Code</Container>
              </label>
            )}
            <ReactSelect
              // open={true}
              disabled={this.props.disabled}
              placeholder={this.getPlaceholderAreaCode()}
              value={this.state.phoneCode || undefined}
              optionLabelProp='children'
              onChange={this.onSetOption}
              suffixIcon={chevronDown}
              showSearch={true}
              dropdownRender={(menu) => (
                <div className='flag-select phone-select'>{menu}</div>
              )}
              optionFilterProp='data-search'
              notFoundContent={'No Results'}
              dropdownMatchSelectWidth={false}
              className={'phone-select'}
            >
              <OptGroup label='mainOptions'>{mainChildren}</OptGroup>
              <OptGroup label='restOptions'>{restChildren}</OptGroup>
            </ReactSelect>
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
                  disabled={this.props.loading || this.props.disabled}
                  placeholder={this.getPlaceholderPhone()}
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
                      (this.state.timeRemainingInSeconds !== 60 &&
                        this.state.timeRemainingInSeconds !== 0)
                        ? 'disabled'
                        : 'primary'
                    }
                    onPress={this.sendPhoneCode}
                  >
                    {this.state.firstSendCode &&
                    this.state.timeRemainingInSeconds === 60
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
            : this.state.timeRemainingInSeconds === 60 ||
              this.state.timeRemainingInSeconds === 0 ||
              !this.props.loading
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
      this.setState({
        phoneCode: phoneCode,
        phoneNumber: phoneNumber,
        value: phoneValue
      });
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
    let newValue = selectedOption;
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

  private getPlaceholderAreaCode() {
    if (this.props.placeholder) {
      const arr = this.props.placeholder.split('-');
      if (arr.length > 1) {
        return arr[0];
      }
    }

    return '';
  }

  private getPlaceholderPhone() {
    if (this.props.placeholder) {
      const arr = this.props.placeholder.split('-');
      if (arr.length >= 2) {
        return arr[1];
      } else if (arr.length === 1) {
        return arr[0];
      }
    }

    return '';
  }
}
