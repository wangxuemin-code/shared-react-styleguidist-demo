import { countries } from 'country-data';
import * as React from 'react';
import { SyntheticEvent } from 'react';
import { FormControl as BootstrapFormControl } from 'react-bootstrap';
import Select, { components } from 'react-select';
import TextareaAutosize from 'react-textarea-autosize';
import Toggle from 'react-toggle';
import * as styles from '../css/main.scss';
import { Formatter } from '../helpers/Formatter';
import { Container, IContainer } from './Container';
import { DateTimePicker, IDateOption } from './DateTimePicker';
import { Phone } from './Phone';
import { Icon } from './Icon';
import { Loading } from './Loading';
import { Message } from './Message';
import { OtpInput } from './OTP';
import { Transition } from './Transition';
import { Image } from './Image';
import FileUploader, { FilePattern } from './FileUploader';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import moment = require('moment');
var uniqid = require('uniqid');

interface IState {
  oldDisplayValue?: string;
  displayValue?: string;
  value?: string | number | null;
  error?: string;
  showError?: boolean;
  valueArray?: string[];
  extraControls?: string;
}

interface IProps extends IContainer {
  loading?: boolean;
  fullWidth?: boolean;
  defaultValue?: any;
  value?: string | number | null;
  oldValue?: string | number | null;
  placeholder?: any;
  type?:
    | 'alphabet'
    | 'text'
    | 'number'
    | 'numberfields'
    | 'numeric'
    | 'money'
    | 'email'
    | 'password'
    | 'select'
    | 'customselect'
    | 'country'
    | 'phone'
    | 'countrycode'
    | 'switch'
    | 'radio'
    | 'longtext'
    | 'date'
    | 'datetime'
    | 'daterange'
    | 'uploader'
    | 'checkbox';
  name?: string;
  disabled?: boolean;
  static?: boolean;
  prepend?: any;
  append?: any;
  label?: any;
  required?: boolean;
  selectOptions?: { label: any; value: string }[];
  selectCustomOptions?: { label: string; value: string; html: any }[];
  extraControls?: any;
  dateOptions?: IDateOption;
  alwaysCapitalize?: boolean;
  decimalPlace?: number;
  unit?: string;
  numInputs?: number;
  inputWidth?: string;
  separator?: any;
  verificationNumber?: string;
  uploaderConfigs?: {
    label?: any;
    filePatterns?: FilePattern[];
    customAllowFileExtensions?: string[];
    viewer?: boolean;
  };
  onInputChanged?: (value: string | number, name: string) => void;
  onFocus?: (formControl: FormControl) => void;
  onBlur?: (formControl: FormControl) => void;
  onKeyPress?: () => void;
  onSendCode?: (processing: boolean) => any;
  validateReturnError?: (value: string | number | undefined | null) => string | undefined;
}

interface IProcessResult {
  displayValue: string;
  value: string | number;
}

export class FormControl extends React.Component<IProps, IState> {
  private control?: any;

  public static defaultProps: IProps = {
    type: 'text',
    name: '',
    decimalPlace: 4,
    uploaderConfigs: {}
  };

  constructor(props: IProps) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSetOption = this.onSetOption.bind(this);
    this.onChangeNumberFields = this.onChangeNumberFields.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onDateRangeChange = this.onDateRangeChange.bind(this);
    this.onPhoneChange = this.onPhoneChange.bind(this);
    this.onSwitchChanged = this.onSwitchChanged.bind(this);
    this.onRadioChanged = this.onRadioChanged.bind(this);
    this.onCheckChanged = this.onCheckChanged.bind(this);
    this.onUploaderChanged = this.onUploaderChanged.bind(this);
    this.reset = this.reset.bind(this);
    this.state = { valueArray: [], displayValue: '', value: '', oldDisplayValue: '' };
  }

  public componentWillMount() {
    this.onValueChanged(
      true,
      String(this.props.value ? this.props.value : this.props.defaultValue || '')
    );
    this.setState({ extraControls: this.props.extraControls });
  }

  public componentDidUpdate(prevProps: IProps) {
    if (
      prevProps.value !== this.props.value ||
      (prevProps.selectOptions !== this.props.selectOptions &&
        prevProps.selectOptions == undefined) ||
      (prevProps.selectCustomOptions !== this.props.selectCustomOptions &&
        prevProps.selectCustomOptions == undefined)
    ) {
      if (this.props.type === 'checkbox' && this.props.value == undefined) {
        return false;
      }
      this.onValueChanged(false, String(this.props.value || ''));
    }

    if (prevProps.extraControls !== this.props.extraControls) {
      this.setState({ extraControls: this.props.extraControls });
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
          <>
            {this.props.oldValue !== this.props.value && this.props.oldValue && (
              <>
                {this.props.label && (
                  <label className={styles.semiBold}>
                    <Container classNames={[styles.displayFlex, styles.oldValueActive]}>
                      {typeof this.props.label === 'string' && (
                        <p className={styles.semiBold}>
                          {this.props.label}
                          {this.props.oldValue && <>&nbsp;(Old)</>}
                          {this.props.required && (
                            <Container className={styles.required}>&nbsp;*</Container>
                          )}
                        </p>
                      )}
                      {typeof this.props.label !== 'string' && (
                        <>
                          {this.props.label}
                          {this.props.oldValue && <>&nbsp;(Old)</>}
                        </>
                      )}
                    </Container>
                  </label>
                )}
                <Container
                  classNames={[styles.formControlsInner, styles.oldValueActive]}
                  position={this.props.prepend ? 'relative' : undefined}
                >
                  {this.getInputPrependDesign(this.props.prepend)}
                  {this.getControlDesign(true)}
                  {this.getInputAppendDesign(this.props.append)}
                  <input type='hidden' name={this.props.name} value={this.state.value || ''} />
                </Container>
              </>
            )}
            {this.props.label && (
              <label className={styles.semiBold}>
                <Container className={styles.displayFlex}>
                  {typeof this.props.label === 'string' && (
                    <p className={styles.semiBold}>
                      {this.props.label}
                      {this.props.oldValue !== this.props.value && this.props.oldValue && (
                        <>&nbsp;(New)</>
                      )}
                      {this.props.required && (
                        <Container className={styles.required}>&nbsp;*</Container>
                      )}
                    </p>
                  )}
                  {typeof this.props.label !== 'string' && (
                    <>
                      {this.props.label}
                      {this.props.oldValue !== this.props.value && this.props.oldValue && (
                        <>&nbsp;(New)</>
                      )}
                    </>
                  )}
                </Container>
              </label>
            )}
            <Container
              classNames={[styles.formControlsInner]}
              position={this.props.prepend ? 'relative' : undefined}
              id={this.props.name}
            >
              {this.getInputPrependDesign(this.props.prepend)}
              {this.getControlDesign(false)}
              {this.getInputAppendDesign(this.props.append)}
              <input type='hidden' name={this.props.name} value={this.state.value || ''} />
            </Container>
          </>
        </Container>
        {this.state.extraControls && (
          <Container className={styles.formControlsWrapper}>
            <span />
            <Container className={'extra-control'} display='block'>
              {this.state.extraControls}
            </Container>
          </Container>
        )}
        {this.state.showError && (
          <Container className={styles.formControlsWrapper}>
            <span />
            <Transition in={this.state.showError}>
              <Message variant={'danger'} message={this.state.error} />
            </Transition>
          </Container>
        )}
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

  public validate(setErrorState: boolean = true): boolean {
    if (this.props.validateReturnError) {
      const error = this.props.validateReturnError(this.state.value);
      if (error) {
        if (setErrorState) this.setState({ error, showError: true });
        return false;
      }
    }

    if (this.props.type === 'checkbox') {
      if (this.props.required) {
        if (this.state.value == '') {
          if (setErrorState) this.setState({ error: 'Cannot be empty.', showError: true });
          return false;
        } else {
          this.setState({ showError: false });
          return true;
        }
      }
    }

    if (this.props.required) {
      if (!this.state.value || !this.state.value.toString().trim()) {
        if (setErrorState) this.setState({ error: 'Cannot be empty.', showError: true });
        return false;
      }

      if (this.props.type === 'phone') {
        const value = this.state.value;
        if (!value && value.toString().split('-').length < 2) {
          if (setErrorState) this.setState({ error: 'Cannot be empty.', showError: true });
          return false;
        }
      }
    }

    if (this.props.type === 'date') {
      if (this.props.required || (!this.props.required && this.state.value)) {
        const re = /^\d\d[./-]\d\d[./-]\d\d\d\d$/;
        const value = moment.unix(Number(this.state.value)).format('DD-MM-YYYY');
        if (!re.test(value)) {
          if (setErrorState)
            this.setState({
              error: 'Date format is invalid, only DD-MM-YYYY is allowed',
              showError: true
            });
          return false;
        }
      }
    }

    if (this.props.type === 'email') {
      if (this.props.required || (!this.props.required && this.state.value)) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(this.state.value).toLowerCase())) {
          if (setErrorState)
            this.setState({ error: 'Email address is not valid.', showError: true });
          return false;
        }
      }
    }

    if (this.props.type === 'password') {
      if (this.props.required || (!this.props.required && this.state.value)) {
        // const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*)(?=.*\W.*)[a-zA-Z0-9\S]{8,}$/;
        if (!re.test(String(this.state.value))) {
          if (setErrorState)
            this.setState({
              error:
                'Password must contain at least one number, one lowercase letter, one uppercase letter, one special chatacter and eight characters in length',
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
    if (this.props.type !== 'uploader') {
      this.onValueChanged(false, String(this.props.defaultValue || this.props.value || ''));
    } else {
      this.onValueChanged(false, String(this.props.defaultValue || ''));
    }
  }

  public onSaved() {
    if (this.control && this.control.onSaved) {
      this.control.onSaved();
    }
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

  private getControlDesign(oldValue: boolean) {
    if (this.props.static) {
      if (this.props.type === 'uploader') {
        return (
          <Container>
            <Image
              src={
                oldValue
                  ? this.props.oldValue
                    ? this.state.oldDisplayValue
                    : ''
                  : this.state.displayValue
              }
            />
          </Container>
        );
      } else {
        return (
          <Container>
            {oldValue
              ? this.props.oldValue
                ? this.state.oldDisplayValue
                : ''
              : this.state.displayValue}
          </Container>
        );
      }
    } else if (this.props.type === 'numberfields') {
      return (
        <OtpInput
          loading={this.props.loading}
          required={this.props.required}
          isInputNum
          verificationNumber={this.props.verificationNumber}
          separator={this.props.separator}
          inputWidth={this.props.inputWidth}
          numInputs={this.props.numInputs}
          value={this.state.value || ''}
          onChange={this.onChangeNumberFields}
          onSendCode={this.props.onSendCode}
        />
      );
    } else if (this.props.type === 'select') {
      const CustomOption = (innerProps: any) => {
        return (
          <components.Option {...innerProps}>
            <Container>{innerProps.data.label}</Container>
          </components.Option>
        );
      };
      const DisplayOption = (innerProps: any) => {
        return (
          <components.SingleValue {...innerProps}>
            <Container>{innerProps.data.label}</Container>
          </components.SingleValue>
        );
      };
      let Options: any = this.props.selectOptions || [];
      return (
        <Select
          // componentClass='select'
          // defaultMenuIsOpen
          className={'select'}
          value={Options.filter((obj: any) => obj.value === this.state.value)[0] || ''}
          placeholder={this.props.placeholder}
          onChange={this.onSetOption}
          options={this.props.selectOptions}
          components={{ Option: CustomOption, SingleValue: DisplayOption }}
          styles={{
            control: (base: any) => ({
              ...base,
              minHeight: '2.357rem',
              padding: '0 0.5rem'
            }),
            option: (base: any, state: any) => ({
              ...base,
              borderColor: state.isFocused ? 'rgba(0, 27, 86, 1) !important' : ''
            })
          }}
        />
      );
    } else if (this.props.type === 'customselect') {
      const CustomOption = (innerProps: any) => {
        return (
          <components.Option {...innerProps}>
            <Container className='select-option'>{innerProps.data.html}</Container>
          </components.Option>
        );
      };
      const DisplayOption = (innerProps: any) => {
        return (
          <components.SingleValue {...innerProps}>
            <Container className='select-option'>{innerProps.data.html}</Container>
          </components.SingleValue>
        );
      };
      let Options = this.props.selectCustomOptions || [];
      return (
        <Select
          className={'select'}
          // defaultMenuIsOpen
          value={Options.filter((obj: any) => obj.value === this.state.value)[0] || ''}
          placeholder={this.props.placeholder}
          onChange={this.onSetOption}
          components={{ Option: CustomOption, SingleValue: DisplayOption }}
          styles={{
            control: (base: any) => ({
              ...base,
              minHeight: '2.357rem',
              padding: '0 0.5rem'
            }),
            option: (base: any, state: any) => ({
              ...base,
              borderColor: state.isFocused ? 'rgba(0, 27, 86, 1) !important' : ''
            })
          }}
          options={this.props.selectCustomOptions}
        />
      );
    } else if (this.props.type === 'phone') {
      return (
        <Phone
          required={this.props.required}
          placeholder={this.props.placeholder}
          value={this.state.displayValue || undefined}
          onChange={this.onPhoneChange}
          onSendCode={this.props.onSendCode}
          loading={this.props.loading}
        />
      );
    } else if (this.props.type === 'country') {
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
        if (option.alpha3.length && option.emoji) {
          var obj = {
            label: option.name,
            value: option.name,
            // image: option.emoji,
            country: option.name,
            code: option.alpha2
          };
          Options.push(obj);
        }
      });
      const customFilter = (option: any, searchText: string) => {
        if (
          (option.data && option.data.label.toLowerCase().includes(searchText.toLowerCase())) ||
          (option.data && option.data.value.toLowerCase().includes(searchText.toLowerCase())) ||
          (option.data && option.data.country.toLowerCase().includes(searchText.toLowerCase())) ||
          (option.data && option.data.code.toLowerCase().includes(searchText.toLowerCase()))
        ) {
          return true;
        } else {
          return false;
        }
      };
      return (
        <Select
          className={'select'}
          value={Options.filter((obj: any) => obj.value === this.state.value)[0] || ''}
          filterOption={customFilter}
          placeholder={this.props.placeholder}
          onChange={this.onSetOption}
          components={{ Option: CustomOption, SingleValue: DisplayOption }}
          options={Options}
          styles={{
            control: (base: any) => ({
              ...base,
              minHeight: '2.357rem',
              padding: '0 0.5rem'
            }),
            option: (base: any, state: any) => ({
              ...base,
              borderColor: state.isFocused ? 'rgba(0, 27, 86, 1) !important' : ''
            })
          }}
        />
      );
    } else if (this.props.type === 'countrycode') {
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
        if (option.alpha3.length && option.emoji) {
          var obj = {
            label: option.alpha3,
            value: option.alpha3,
            // image: option.emoji,
            country: option.name,
            code: option.alpha2
          };
          Options.push(obj);
        }
      });
      const customFilter = (option: any, searchText: string) => {
        if (
          (option.data && option.data.label.toLowerCase().includes(searchText.toLowerCase())) ||
          (option.data && option.data.value.toLowerCase().includes(searchText.toLowerCase())) ||
          (option.data && option.data.country.toLowerCase().includes(searchText.toLowerCase())) ||
          (option.data && option.data.code.toLowerCase().includes(searchText.toLowerCase()))
        ) {
          return true;
        } else {
          return false;
        }
      };
      return (
        <Select
          // defaultMenuIsOpen
          className={'select'}
          value={Options.filter((obj: any) => obj.value === this.state.value)[0] || ''}
          filterOption={customFilter}
          placeholder={this.props.placeholder}
          onChange={this.onSetOption}
          components={{ Option: CustomOption, SingleValue: DisplayOption }}
          options={Options}
          styles={{
            control: (base: any) => ({
              ...base,
              minHeight: '2.357rem',
              padding: '0 0.5rem'
            }),
            option: (base: any, state: any) => ({
              ...base,
              borderColor: state.isFocused ? 'rgba(0, 27, 86, 1) !important' : ''
            })
          }}
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
          onBlur={this.props.onBlur ? this.props.onBlur.bind(this, this) : null}
        />
      );
    } else if (this.props.type === 'date') {
      return (
        <DateTimePicker
          type={'date'}
          placeholder={this.props.placeholder}
          value={this.state.displayValue || undefined}
          onChange={this.onDateChange}
          options={this.props.dateOptions}
        />
      );
    } else if (this.props.type === 'datetime') {
      return (
        <DateTimePicker
          type={'datetime'}
          placeholder={this.props.placeholder}
          value={this.state.displayValue || undefined}
          onChange={this.onDateChange}
          options={this.props.dateOptions}
        />
      );
    } else if (this.props.type === 'daterange') {
      return (
        <DateTimePicker
          type={'daterange'}
          placeholder={this.props.placeholder}
          value={this.state.displayValue || undefined}
          onChange={this.onDateRangeChange}
          options={this.props.dateOptions}
        />
      );
    } else if (this.props.type === 'uploader') {
      return (
        <Container className={styles.uploaderContainer}>
          <FileUploader
            ref={(ref) => {
              if (ref) {
                this.control = ref;
              }
            }}
            label={this.props.label}
            uploaderLabel={this.props.uploaderConfigs!.label}
            value={this.state.displayValue || undefined}
            onChange={this.onUploaderChanged}
            disabled={this.props.disabled}
            viewer={this.props.uploaderConfigs!.viewer}
            filePatterns={this.props.uploaderConfigs!.filePatterns}
            customAllowFileExtensions={this.props.uploaderConfigs!.customAllowFileExtensions}
          >
            {this.props.children}
          </FileUploader>
          {this.state.displayValue && !this.props.uploaderConfigs!.viewer && (
            <Icon onClick={this.reset} className={styles.clearUpload} icon={faTimes} />
          )}
        </Container>
      );
    } else if (this.props.type === 'radio') {
      let value: any = '';
      if (this.state.value && this.state.value !== '') {
        value = this.state.value;
      } else {
        value = false;
      }
      if (this.props.selectOptions) {
        return (
          <Container className={this.props.variant}>
            {this.props.selectOptions.map((option, i) => {
              return (
                <Container
                  key={uniqid().toString()}
                  classNames={[styles.loadingContainerWrapper, styles.radio]}
                >
                  <input
                    onChange={(e) => this.onRadioChanged(e)}
                    type='radio'
                    name={this.props.name}
                    value={option.value}
                    checked={value && value == option.value}
                  />
                  <Container className={styles.checkboxLabel}>{option.label}</Container>
                </Container>
              );
            })}
          </Container>
        );
      }
    } else if (this.props.type === 'checkbox') {
      if (this.props.selectOptions) {
        return (
          <Container className={this.props.variant}>
            {this.props.selectOptions.map((option, i) => {
              return (
                <Container
                  key={uniqid().toString()}
                  classNames={[styles.loadingContainerWrapper, styles.checkbox]}
                >
                  <input
                    onChange={(e) => this.onCheckChanged(e, i)}
                    checked={
                      this.state.value && this.state.value.toString().indexOf(option.value) !== -1
                        ? true
                        : this.state.valueArray
                        ? this.state.valueArray.indexOf(option.value) !== -1
                          ? true
                          : false
                        : false
                    }
                    type='checkbox'
                    value={option.value}
                  />
                  <Container className={styles.checkboxLabel}>{option.label}</Container>
                  {/* <Checkbox type='checkbox' label={option.label} value={option.value} /> */}
                </Container>
              );
            })}
          </Container>
        );
      }
    } else {
      let classes: string[] = [
        this.props.prepend ? styles.prepend : '',
        this.props.unit ? styles.unitPadding : ''
      ];

      classes = classes.filter(function(el) {
        return el != '';
      });
      return (
        <>
          <BootstrapFormControl
            className={classes.join(' ')}
            autoComplete={'off'}
            autoCorrect={'off'}
            type={this.props.type === 'password' ? 'password' : 'text'}
            placeholder={this.props.placeholder}
            value={this.state.displayValue || ''}
            onChange={this.onChange}
            disabled={this.props.disabled}
            onBlur={this.props.onBlur ? this.props.onBlur.bind(this, this) : null}
          />
          {this.props.unit && (
            <Container className={styles.unit}>&nbsp;{this.props.unit}</Container>
          )}
        </>
      );
    }
  }

  private onChangeNumberFields(event: number) {
    const numbers = event;
    const result = this.processValue(numbers.toString());
    this.setState(
      { displayValue: result.displayValue, value: result.value, showError: false },
      () => {
        if (this.props.onInputChanged) {
          this.props.onInputChanged(result.value, this.props.name || '');
        }
      }
    );
  }

  private onChange(event: React.FormEvent<any>) {
    const { value } = event.target as HTMLInputElement;
    if (this.validateValueCanChanged(value)) {
      const result = this.processValue(value);
      this.setState(
        { displayValue: result.displayValue, value: result.value, showError: false },
        () => {
          if (this.props.onInputChanged) {
            this.props.onInputChanged(result.value, this.props.name || '');
          }
        }
      );
    }
  }

  private onSetOption = (selectedOption: any) => {
    let newValue = selectedOption.value;
    if (newValue.constructor === Array) {
      newValue = selectedOption.value[0];
    }
    this.setState({ displayValue: newValue, value: newValue, showError: false }, () => {
      if (this.props.onInputChanged) {
        this.props.onInputChanged(newValue, this.props.name || '');
      }
    });
  };

  private onPhoneChange(value: string) {
    this.setState({ displayValue: value, value: value, showError: false }, () => {
      if (this.props.onInputChanged) {
        this.props.onInputChanged(value, this.props.name || '');
      }
    });
  }

  private onDateChange(newUnixTimestamp: number) {
    const result = this.processValue(newUnixTimestamp.toString());
    this.setState(
      { displayValue: result.displayValue, value: result.value, showError: false },
      () => {
        if (this.props.onInputChanged) {
          this.props.onInputChanged(result.value, this.props.name || '');
        }
      }
    );
  }

  private onDateRangeChange(newUnixTimestamp: number) {
    const result = this.processValue(newUnixTimestamp.toString());
    this.setState(
      { displayValue: result.displayValue, value: result.value, showError: false },
      () => {
        if (this.props.onInputChanged) {
          this.props.onInputChanged(result.value, this.props.name || '');
        }
      }
    );
  }

  private onUploaderChanged(newUrl: string) {
    this.setState({ displayValue: newUrl, value: newUrl, showError: false }, () => {
      if (this.props.onInputChanged) {
        this.props.onInputChanged(newUrl, this.props.name || '');
      }
    });
  }

  private onSwitchChanged(e: SyntheticEvent<HTMLInputElement>) {
    const result = this.processValue((e.target as any).checked ? '1' : '0');
    this.setState(
      { displayValue: result.displayValue, value: result.value, showError: false },
      () => {
        if (this.props.onInputChanged) {
          this.props.onInputChanged(result.value, this.props.name || '');
        }
      }
    );
  }

  private onRadioChanged(e: any) {
    const value = e.target.value;
    this.setState({ displayValue: value, value: value, showError: false }, () => {
      if (this.props.onInputChanged) {
        this.props.onInputChanged(value, this.props.name || '');
      }
    });
  }

  private onCheckChanged(e: any, index: number) {
    const checked = e.target.checked;
    const value = e.target.value;
    let valueArray = this.state.valueArray || [];
    valueArray = valueArray.filter(function(x) {
      return x !== (undefined || null || '');
    });
    if (checked) {
      valueArray.push(value);
    } else {
      var index = valueArray.indexOf(value);
      if (index > -1) {
        valueArray.splice(index, 1);
      }
    }
    const result = this.processValue(String(valueArray.join()));
    this.setState(
      {
        valueArray: valueArray,
        displayValue: result.displayValue,
        value: result.value,
        showError: false
      },
      () => {
        if (this.props.onInputChanged) {
          this.props.onInputChanged(checked ? value : null, this.props.name || '');
        }
      }
    );
  }

  private validateValueCanChanged(value: string): boolean {
    if (this.props.type == 'password') {
      if (/\s/.test(value)) {
        return false;
      }
    }
    if (this.props.type === 'alphabet') {
      const re = /^[A-Za-z]+$/;
      if (value && !re.test(String(value))) {
        return false;
      }
    }
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
    let oldDisplayValue = this.props.oldValue ? this.props.oldValue.toString() : '';
    this.setState({ oldDisplayValue: oldDisplayValue });
    if (this.props.alwaysCapitalize) {
      value = value.toUpperCase();
    }
    if (this.props.type === 'checkbox') {
      if (value) {
        this.setState({ valueArray: value.split(',') });
      } else {
        this.setState({ valueArray: [] });
      }
      return { displayValue: value || '', value };
    }
    if (
      this.props.type === 'text' ||
      this.props.type === 'longtext' ||
      this.props.type === 'email' ||
      this.props.type === 'password' ||
      this.props.type === 'phone' ||
      this.props.type === 'countrycode' ||
      this.props.type === 'country' ||
      this.props.type === 'switch' ||
      this.props.type === 'radio' ||
      this.props.type === 'daterange' ||
      this.props.type === 'uploader' ||
      this.props.type === 'numberfields'
    ) {
      return { displayValue: value || '', value };
    } else if (this.props.type === 'select') {
      let displayValue = '';
      if (
        this.props.selectOptions!.map((item) => {
          if (item.value === value) {
            displayValue = item.label;
          }
          if (item.value === this.props.oldValue) {
            oldDisplayValue = item.label;
          }
        })
      ) {
        this.setState({ oldDisplayValue: oldDisplayValue });
        return { displayValue: displayValue || '', value };
      }
    } else if (this.props.type === 'customselect') {
      let displayValue = '';
      if (
        this.props.selectCustomOptions!.map((item) => {
          if (item.value === value) {
            displayValue = item.label;
          }
          if (item.value === this.props.oldValue) {
            oldDisplayValue = item.label;
          }
        })
      ) {
        this.setState({ oldDisplayValue: oldDisplayValue });
        return { displayValue: displayValue || '', value };
      }
    } else if (this.props.type === 'numeric') {
      const re = /^\d+$/;
      return {
        displayValue: !re.test(value) ? '' : value,
        value: !re.test(value) ? '' : value
      };
    } else if (this.props.type === 'alphabet') {
      const re = /^[a-zA-Z]+$/;
      return {
        displayValue: !re.test(value) ? '' : value,
        value: !re.test(value) ? '' : value
      };
    } else if (this.props.type === 'date' || this.props.type === 'datetime') {
      const re = /^[0-9-]+$/;
      const dateFormat = this.props.dateOptions
        ? this.props.dateOptions.dateFormat
          ? this.props.dateOptions.dateFormat
          : this.props.type === 'datetime' || this.props.dateOptions.showTimeSelect
          ? 'DD/MM/YYYY hh:mm A'
          : 'DD/MM/YYYY'
        : 'DD/MM/YYYY';
      if (this.props.static) {
        this.setState({
          oldDisplayValue: moment.unix(Number(oldDisplayValue)).format(dateFormat)
        });
        return {
          displayValue: !re.test(value)
            ? ''
            : Formatter.unixTimestampToDate(Number(value))
            ? moment.unix(Number(value)).format(dateFormat)
            : '',
          value: !re.test(value)
            ? ''
            : Formatter.unixTimestampToDate(Number(value))
            ? moment.unix(Number(value)).format(dateFormat)
            : ''
        };
      } else {
        return {
          displayValue: !re.test(value) ? '' : value,
          value: !re.test(value) ? '' : value
        };
      }
    } else {
      const originalValue = Formatter.stripSymbol(value).trim();
      const originalOldValue = Formatter.stripSymbol(oldDisplayValue).trim();

      const appendDot = this.processNumber(originalValue);
      const appendOldDot = this.processNumber(originalOldValue);

      if (originalValue) {
        if (this.props.type === 'money') {
          if (isNaN(parseFloat(originalOldValue))) {
            oldDisplayValue = '';
          } else {
            oldDisplayValue =
              Formatter.money(parseFloat(originalOldValue), {
                decimalPlace: this.props.decimalPlace
              }) + appendOldDot;
          }
          this.setState({ oldDisplayValue: oldDisplayValue });
          return {
            displayValue: isNaN(parseFloat(originalValue))
              ? ''
              : Formatter.money(parseFloat(originalValue), {
                  decimalPlace: this.props.decimalPlace
                }) + appendDot,
            value: isNaN(parseFloat(originalValue)) ? '' : parseFloat(originalValue)
          };
        } else if (this.props.type === 'number') {
          if (isNaN(parseFloat(originalOldValue))) {
            oldDisplayValue = '';
          } else {
            oldDisplayValue =
              Formatter.number(parseFloat(originalOldValue), {
                decimalPlace: this.props.decimalPlace
              }) + appendOldDot;
          }
          this.setState({ oldDisplayValue: oldDisplayValue });
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

  private processNumber(value: string) {
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

    return appendDot;
  }

  private onValueChanged(firstCall: boolean, newValue: string) {
    let result: IProcessResult = { displayValue: '', value: '' };
    result = this.processValue(String(newValue || ''));
    if (firstCall) {
      // this.state = {
      //   displayValue: result.displayValue,
      //   value: result.value
      // };
      this.setState({
        displayValue: result.displayValue,
        value: result.value,
        showError: false
      });
    } else {
      this.setState({
        displayValue: result.displayValue,
        value: result.value,
        showError: false
      });
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
