import * as React from 'react';
import { SyntheticEvent } from 'react';
import { FormControl as BootstrapFormControl, Checkbox } from 'react-bootstrap';
import Toggle from 'react-toggle';
import * as styles from '../css/main.scss';
import { Formatter } from '../helpers/Formatter';
import { Container, IContainer } from './Container';
import { Loading } from './Loading';
import { Message } from './Message';
import { Transition } from './Transition';
import TextareaAutosize from 'react-textarea-autosize';
import { DateTimePicker, IDateOption } from './DateTimePicker';
import FileUploader, { IAwsSettings } from './FileUploader';
import Select, { components } from 'react-select';
import { Image } from './Image';
import { countries } from 'country-data';
import { any } from 'prop-types';
import { OtpInput } from './OTP';
import SingleValue from 'react-select/lib/components/SingleValue';
var uniqid = require('uniqid');

interface IState {
  displayValue?: string;
  value?: string | number | null;
  error?: string;
  showError?: boolean;
}

interface IProps extends IContainer {
  loading?: boolean;
  fullWidth?: boolean;
  defaultValue?: string | number;
  value?: string | number | null;
  placeholder?: any;
  type?:
    | 'text'
    | 'number'
    | 'numberfields'
    | 'money'
    | 'static'
    | 'email'
    | 'password'
    | 'select'
    | 'customselect'
    | 'phone'
    | 'country'
    | 'switch'
    | 'longtext'
    | 'datetime'
    | 'daterange'
    | 'uploader'
    | 'checkbox';
  name?: string;
  disabled?: boolean;
  onInputChanged?: (value: string | number, name: string) => void;
  prepend?: any;
  append?: any;
  label?: any;
  required?: boolean;
  validateReturnError?: (value: string | number | undefined | null) => string | undefined;
  selectOptions?: { label: string; value: string }[];
  selectCustomOptions?: { label: string; value: string; image: string }[];
  extraControls?: any;
  dateOptions?: IDateOption;
  alwaysCapitalize?: boolean;
  s3Settings?: IAwsSettings;
  decimalPlace?: number;
  numInputs?: number;
  inputWidth?: string;
  separator?: string;
}

interface IProcessResult {
  displayValue: string;
  value: string | number;
}

export class FormControl extends React.Component<IProps, IState> {
  public static defaultProps: IProps = {
    type: 'text',
    name: '',
    decimalPlace: 4
  };

  constructor(props: IProps) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onDateTimeChange = this.onDateTimeChange.bind(this);
    this.onSwitchChanged = this.onSwitchChanged.bind(this);
    this.onUploaderChanged = this.onUploaderChanged.bind(this);
    this.onValueChanged(
      true,
      String(this.props.value ? this.props.value : this.props.defaultValue || '')
    );
  }

  public componentDidUpdate(prevProps: IProps) {
    if (prevProps.value !== this.props.value) {
      this.onValueChanged(false, String(this.props.value || ''));
    }
  }

  public render() {
    const classes: string[] = [styles.formControlsWrapper];
    if (this.state.showError) {
      classes.push('error');
    }

    return (
      <Container {...this.props} className={styles.mainFormControlsWrapper}>
        <Container className={classes.join(' ')}>
          <label>
            <span key='1'>
              {this.props.label}
              {this.props.required && <span className={styles.required}>*</span>}
            </span>
          </label>

          <Container position={'relative'} className={styles.formControlsInner}>
            {this.getInputPrependDesign(this.props.prepend)}
            {this.getControlDesign()}
            {this.getInputAppendDesign(this.props.append)}
            <input type='hidden' name={this.props.name} value={this.state.value || ''} />
            {/* <div /> */}
          </Container>
        </Container>
        {this.props.extraControls && (
          <Container className={styles.formControlsWrapper}>
            <span />
            <Container className={'extra-control'} display='block'>
              {this.props.extraControls}
            </Container>
          </Container>
        )}

        <Container className={styles.formControlsWrapper}>
          <span />
          <Transition in={this.state.showError}>
            <Message error={this.state.error} />
          </Transition>
        </Container>
      </Container>
    );
  }

  public getValue(): string {
    if (!this.state.value) {
      return '';
    } else {
      if (typeof this.state.value === 'number') {
        return String(this.state.value);
      } else {
        return this.state.value;
      }
    }
  }

  public getName(): string {
    if (this.props.name) return this.props.name;
    return '';
  }

  public validate(): boolean {
    if (this.props.validateReturnError) {
      const error = this.props.validateReturnError(this.state.value);
      if (error) {
        this.setState({ error, showError: true });
        return false;
      }
    }

    if (this.props.required) {
      if (!this.state.value) {
        this.setState({ error: 'Cannot be empty.', showError: true });
        return false;
      }
    }

    if (this.props.type === 'email') {
      if (this.props.required || (!this.props.required && this.state.value)) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(this.state.value).toLowerCase())) {
          this.setState({ error: 'Email address is not valid.', showError: true });
          return false;
        }
      }
    }

    if (this.props.type === 'password') {
      if (this.props.required || (!this.props.required && this.state.value)) {
        const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        if (!re.test(String(this.state.value))) {
          this.setState({
            error:
              'Password must contain at least one number, one lowercase letter, one uppercase letter and at least six characters',
            showError: true
          });
          return false;
        }
      }
    }

    this.setState({ showError: false });
    return true;
  }

  public reset() {
    this.onValueChanged(false, String(this.props.defaultValue || this.props.value || ''));
  }

  public setValue(value: string | number, notify: boolean = true) {
    const result = this.processValue(String(value));
    this.setState({ displayValue: result.displayValue, value: result.value }, () => {
      if (notify) {
        if (this.props.onInputChanged) {
          this.props.onInputChanged(result.value, this.props.name || '');
        }
      }
    });
  }

  public toggle(notify: boolean = true) {
    this.setValue(this.state.value === '0' ? '1' : '0', notify);
  }

  private getControlDesign() {
    if (this.props.type === 'static') {
      return <Container>{this.props.value}</Container>;
    } else if (this.props.type === 'numberfields') {
      return (
        <OtpInput
          isInputNum
          separator={this.props.separator}
          inputWidth={this.props.inputWidth}
          numInputs={this.props.numInputs}
        />
      );
    } else if (this.props.type === 'select') {
      return (
        <Select
          // componentClass='select'
          className={'select'}
          // value={this.state.displayValue}
          placeholder={this.props.placeholder}
          onChange={this.onSetOption}
          options={this.props.selectOptions}
        />
      );
    } else if (this.props.type === 'customselect') {
      const CustomOption = (innerProps: any) => {
        return (
          <components.Option {...innerProps}>
            <Container className='select-option'>
              <Image fullWidth src={innerProps.data.image} />
              {innerProps.data.label}
            </Container>
          </components.Option>
        );
      };
      return (
        <Select
          className={'select'}
          // value={this.state.displayValue}
          // defaultMenuIsOpen
          placeholder={this.props.placeholder}
          onChange={this.onSetOption}
          components={{ Option: CustomOption }}
          styles={{
            option: (base: any) => ({
              ...base,
              border: `1px dotted red`
            })
          }}
          options={this.props.selectCustomOptions}
        />
      );
    } else if (this.props.type === 'phone') {
      const CustomOption = (innerProps: any) => {
        return (
          <components.Option {...innerProps}>
            <Container className='select-option'>
              {innerProps.data.image}
              {innerProps.data.label}
            </Container>
          </components.Option>
        );
      };
      const DisplayOption = (innerProps: any) => {
        return (
          <components.SingleValue {...innerProps}>
            <Container className='select-option'>
              {innerProps.data.image}
              {innerProps.data.label}
            </Container>
          </components.SingleValue>
        );
      };
      const Options: any = [];
      countries.all.map((option) => {
        if (option.countryCallingCodes.length && option.emoji) {
          var obj = {
            label: option.countryCallingCodes,
            value: option.countryCallingCodes,
            image: option.emoji,
            country: option.name
          };
          Options.push(obj);
        }
      });
      const customFilter = (option: any, searchText: string) => {
        if (
          option.data.label.includes(searchText.toLowerCase()) ||
          option.data.value.includes(searchText.toLowerCase()) ||
          option.data.country.toLowerCase().includes(searchText.toLowerCase())
        ) {
          return true;
        } else {
          return false;
        }
      };
      return (
        <Select
          // componentClass='select'
          className={'select'}
          filterOption={customFilter}
          placeholder={this.props.placeholder}
          onChange={this.onSetOption}
          components={{ Option: CustomOption, SingleValue: DisplayOption }}
          options={Options}
        />
      );
    } else if (this.props.type === 'country') {
      const CustomOption = (innerProps: any) => {
        return (
          <components.Option {...innerProps}>
            <Container className='select-option'>
              {innerProps.data.image}
              {innerProps.data.label}
            </Container>
          </components.Option>
        );
      };
      const DisplayOption = (innerProps: any) => {
        return (
          <components.SingleValue {...innerProps}>
            <Container className='select-option'>
              {innerProps.data.image}
              {innerProps.data.label}
            </Container>
          </components.SingleValue>
        );
      };
      const Options: any = [];
      countries.all.map((option) => {
        if (option.alpha3.length && option.emoji) {
          var obj = {
            label: option.alpha3,
            value: option.alpha3,
            image: option.emoji,
            country: option.name
          };
          Options.push(obj);
        }
      });
      const customFilter = (option: any, searchText: string) => {
        if (
          option.data.label.toLowerCase().includes(searchText.toLowerCase()) ||
          option.data.value.toLowerCase().includes(searchText.toLowerCase()) ||
          option.data.country.toLowerCase().includes(searchText.toLowerCase())
        ) {
          return true;
        } else {
          return false;
        }
      };
      return (
        <Select
          className={'select'}
          // value={this.state.displayValue}
          filterOption={customFilter}
          placeholder={this.props.placeholder}
          onChange={this.onSetOption}
          components={{ Option: CustomOption, SingleValue: DisplayOption }}
          options={Options}
        />
      );
    } else if (this.props.type === 'switch') {
      return (
        <Container className={styles.loadingContainerWrapper}>
          <Loading loading={this.props.loading} />
          <Toggle
            onChange={this.onSwitchChanged}
            disabled={this.props.disabled}
            checked={this.state.displayValue === '1'}
          />
        </Container>
      );
    } else if (this.props.type === 'longtext') {
      return (
        <TextareaAutosize
          className={'form-control'}
          autoComplete={'off'}
          autoCorrect={'off'}
          placeholder={this.props.placeholder}
          value={this.state.displayValue || ''}
          onChange={this.onChange}
          disabled={this.props.disabled}
        />
      );
    } else if (this.props.type === 'datetime') {
      return (
        <DateTimePicker
          type={'datetime'}
          placeholder={this.props.placeholder}
          value={this.state.displayValue || undefined}
          onChange={this.onDateTimeChange}
          options={this.props.dateOptions}
        />
      );
    } else if (this.props.type === 'daterange') {
      return (
        <DateTimePicker
          type={'daterange'}
          placeholder={this.props.placeholder}
          value={this.state.displayValue || undefined}
          onChange={this.onDateTimeChange}
          options={this.props.dateOptions}
        />
      );
    } else if (this.props.type === 'uploader') {
      return (
        <FileUploader
          bucketName={this.props.s3Settings!.bucketName}
          region={this.props.s3Settings!.region}
          accessKeyId={this.props.s3Settings!.accessKeyId}
          secretAccessKey={this.props.s3Settings!.secretAccessKey}
          value={this.state.displayValue || undefined}
          onChange={this.onUploaderChanged}
        />
      );
    } else if (this.props.type === 'checkbox') {
      if (this.props.selectOptions) {
        {
          return (
            <Container className={this.props.variant}>
              {this.props.selectOptions.map((option) => {
                return (
                  <Container key={uniqid().toString()} className={styles.loadingContainerWrapper}>
                    <Checkbox type='checkbox' label={option.label} value={option.value} />
                    {option.label}
                  </Container>
                );
              })}
            </Container>
          );
        }
      }
    } else {
      return (
        <BootstrapFormControl
          className={this.props.prepend ? 'prepend' : ''}
          autoComplete={'off'}
          autoCorrect={'off'}
          type={this.props.type === 'password' ? 'password' : 'text'}
          placeholder={this.props.placeholder}
          value={this.state.displayValue || ''}
          onChange={this.onChange}
          disabled={this.props.disabled}
        />
      );
    }
  }

  private onChange(event: React.FormEvent<any>) {
    const { value } = event.target as HTMLInputElement;

    if (this.validateValueCanChanged(value)) {
      const result = this.processValue(value);
      this.setState({ displayValue: result.displayValue, value: result.value }, () => {
        if (this.props.onInputChanged) {
          this.props.onInputChanged(result.value, this.props.name || '');
        }
      });
    }
  }

  onSetOption = (selectedOption: any) => {
    this.setState({ displayValue: selectedOption, value: selectedOption.value });
  };

  private onDateTimeChange(newUnixTimestamp: number) {
    this.setState({ displayValue: newUnixTimestamp.toString(), value: newUnixTimestamp });

    if (this.props.onInputChanged) {
      this.props.onInputChanged(newUnixTimestamp, this.props.name || '');
    }
  }

  private onUploaderChanged(newUrl: string) {
    this.setState({ displayValue: newUrl, value: newUrl });
  }

  private onSwitchChanged(e: SyntheticEvent<HTMLInputElement>) {
    const result = this.processValue((e.target as any).checked ? '1' : '0');
    this.setState({ displayValue: result.displayValue, value: result.value }, () => {
      if (this.props.onInputChanged) {
        this.props.onInputChanged(result.value, this.props.name || '');
      }
    });
  }

  private validateValueCanChanged(value: string): boolean {
    if (this.props.type === 'money' || this.props.type === 'number') {
      const temp = value.split('.');
      if (temp.length === 2) {
        if (temp[1].length > this.props.decimalPlace!) {
          return false;
        }
      }

      const realValue = parseFloat(Formatter.stripSymbol(value).trim());
      if (realValue > 999999999999) {
        return false;
      }
    }
    return true;
  }

  private processValue(value: string): IProcessResult {
    if (this.props.alwaysCapitalize) {
      value = value.toUpperCase();
    }

    if (
      this.props.type === 'text' ||
      this.props.type === 'longtext' ||
      this.props.type === 'email' ||
      this.props.type === 'password' ||
      this.props.type === 'select' ||
      this.props.type === 'switch' ||
      this.props.type === 'datetime' ||
      this.props.type === 'uploader'
    ) {
      return { displayValue: value || '', value };
    } else {
      const originalValue = Formatter.stripSymbol(value).trim();
      let appendDot: string = '';
      var dotsCount = (originalValue.match(/[\.]+/g) || []).length;

      if (originalValue.length > 0 && dotsCount >= 1) {
        if (originalValue[originalValue.length - 1] === '.') {
          appendDot = originalValue.match(/[\.]+/g)![0];
          appendDot = appendDot.replace('..', '.');
        }
      }

      var dotZeroCount = (originalValue.match(/\.[0]+/g) || []).length;
      if (originalValue.length > 1 && dotZeroCount === 1) {
        const matched = originalValue.match(/\.[0]+/g)![0];
        if (originalValue.indexOf(matched) + matched.length === originalValue.length) {
          appendDot = originalValue.match(/\.[0]+/g)![0];
          appendDot = appendDot.replace('.0000', '.000');
        }
      }

      if (originalValue) {
        if (this.props.type === 'money') {
          return {
            displayValue: isNaN(parseFloat(originalValue))
              ? ''
              : Formatter.money(parseFloat(originalValue), {
                  decimalPlace: this.props.decimalPlace
                }) + appendDot,
            value: isNaN(parseFloat(originalValue)) ? '' : parseFloat(originalValue)
          };
        } else if (this.props.type === 'number') {
          return {
            displayValue: isNaN(parseFloat(originalValue))
              ? ''
              : Formatter.number(parseFloat(originalValue), {
                  decimalPlace: this.props.decimalPlace
                }) + appendDot,
            value: isNaN(parseFloat(originalValue)) ? '' : parseFloat(originalValue)
          };
        }
      }
    }
    return { displayValue: '', value: '' };
  }

  private onValueChanged(firstCall: boolean, newValue: string) {
    let result: IProcessResult = { displayValue: '', value: '' };
    result = this.processValue(String(newValue || ''));

    if (firstCall) {
      this.state = {
        displayValue: result.displayValue,
        value: result.value
      };
    } else {
      this.setState({ displayValue: result.displayValue, value: result.value });
    }
  }

  private getInputAppendDesign(append?: any) {
    if (!append) {
      return null;
    }

    const classes = [styles.inputAppend];

    if (!(append instanceof String) && typeof append !== 'string') {
      classes.push(styles.custom);
    }

    return <Container className={classes.join(' ')}>{append}</Container>;
  }

  private getInputPrependDesign(prepend?: any) {
    if (!prepend) {
      return null;
    }

    const classes = [styles.inputPrepend];

    if (!(prepend instanceof SVGElement) && typeof prepend !== 'string') {
      classes.push(styles.svg);
    }

    return <Container className={classes.join(' ')}>{prepend}</Container>;
  }
}
