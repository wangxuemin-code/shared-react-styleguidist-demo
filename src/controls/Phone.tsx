import { countries } from 'country-data';
import * as React from 'react';
import { FormControl as BootstrapFormControl } from 'react-bootstrap';
import Select, { components } from 'react-select';
import { Container } from './Container';
import { Icon } from './Icon';

interface IProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  selectOptions?: { label: any; value: string }[];
}

interface IState {
  value?: string | number;
  phoneCode?: string | number;
  phoneNumber?: string | number;
}

export class Phone extends React.Component<IProps, IState> {
  public static defaultProps: IProps = {};

  public constructor(props: IProps) {
    super(props);
    this.onSetOption = this.onSetOption.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      phoneCode: '',
      phoneNumber: ''
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
      <>
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
        &nbsp;&nbsp;
        <BootstrapFormControl
          autoComplete={'off'}
          autoCorrect={'off'}
          type={'text'}
          placeholder={this.props.placeholder}
          value={this.state.phoneNumber || ''}
          onChange={this.onChange}
          // disabled={this.props.disabled}
          // onBlur={this.props.onBlur}
        />
      </>
    );
  }

  private processPhoneCode = (phoneValue: string) => {
    const phone = phoneValue ? phoneValue.toString().split('-') : '';
    const phoneCode = phone[0] ? phone[0] : '';
    const phoneNumber = phone[1] ? phone[1] : '';
    console.log(phoneCode && phoneNumber);
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
}
