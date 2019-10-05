import * as React from 'react';
import { SyntheticEvent } from 'react';
import {
  Input as ReactInput,
  Checkbox as ReactCheckbox,
  Radio as ReactRadio,
  InputNumber as ReactInputNumber
} from 'antd';
import { OtpInput } from './OTP';
import { Phone } from './Phone';
import { countries } from 'country-data';
import Select, { components } from 'react-select';
import { DateTimePicker, IDateOption } from './DateTimePicker';
import TextareaAutosize from 'react-textarea-autosize';
import FileUploader, { FilePattern } from './FileUploader';
import Toggle from 'react-toggle';
import * as styles from '../css/main.scss';
import { Formatter } from '../helpers/Formatter';
import moment = require('moment');
import { DateTime } from '../helpers';
import { Container, IContainer } from './Container';
import { Icon } from './Icon';
import { Loading } from './Loading';
import { Message } from './Message';
import { Transition } from './Transition';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Divider } from './Divider';

interface IState {
  oldDisplayValue?: string;
  displayValue?: string;
  value?: string | number | null;
  error?: string;
  showError?: boolean;
  extraControls?: string;
  uploaderProgress?: number;
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
    | 'hidden'
    | 'checkbox';
  name?: string;
  disabled?: boolean;
  static?: boolean;
  prepend?: any;
  append?: any;
  suffix?: any;
  label?: any;
  required?: boolean;
  selectOptions?: { label: any; value: string | number }[];
  selectCustomOptions?: { label: string; value: string; html: any }[];
  excludeOptions?: string[];
  extraControls?: any;
  dateOptions?: IDateOption;
  alwaysCapitalize?: boolean;
  alphabetOnly?: boolean;
  decimalPlace?: number;
  unit?: string;
  numInputs?: number;
  inputWidth?: string;
  separator?: any;
  verificationNumber?: string;
  uploaderConfigs?: {
    fieldName?: any;
    label?: any;
    filePatterns?: FilePattern[];
    customAllowFileExtensions?: string[];
    viewer?: boolean;
    footer?: any;
    showFileName?: boolean;
    path?: string;
    bucketName?: string;
    fixedFileName?: string;
  };
  singleCheckbox?: boolean;
  includeInFormData?: boolean;
  showPhoneLabel?: boolean;
  debounce?: number;
  autoFocus?: boolean;
  onInputChanged?: (value: string | number | undefined, name: string) => void;
  onFocus?: (formControl: FormControl) => void;
  onBlur?: (formControl: FormControl) => void;
  onKeyPress?: () => void;
  onSendCode?: (processing: boolean) => any;
  validateReturnError?: (value: string | number | undefined | null) => string | undefined;
  getuploaderprogress?: (
    name: string,
    fileName: string,
    uploaderProgress: number,
    uploaderComplete: -1 | 0 | 1
  ) => void;
  getUploadedState?: () => boolean;
}

interface IProcessResult {
  displayValue?: string;
  value?: string | number;
}

export class FormControl extends React.Component<IProps, IState> {
  private control?: any;
  private debounceTimer?: any;

  public static defaultProps: IProps = {
    type: 'text',
    name: '',
    uploaderConfigs: {},
    includeInFormData: true,
    showPhoneLabel: true,
    debounce: 0
  };

  constructor(props: IProps) {
    super(props);
    this.debounceTimer = 0;
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
    this.onValueChanged(true, this.props.value);
  }

  public componentDidUpdate(prevProps: IProps) {
    if (
      prevProps.value !== this.props.value ||
      prevProps.oldValue !== this.props.oldValue ||
      (prevProps.selectOptions !== this.props.selectOptions &&
        prevProps.selectOptions == undefined) ||
      (prevProps.selectCustomOptions !== this.props.selectCustomOptions &&
        prevProps.selectCustomOptions == undefined)
    ) {
      this.onValueChanged(false, this.props.value);
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
      <Container
        {...this.props}
        classNames={[
          styles.mainFormControlsWrapper,
          this.props.type === 'uploader' ? styles.imageWrapper : '',
          this.props.type === 'hidden' ? styles.hide : ''
        ]}
      >
        <Container className={classes.join(' ')}>
          <>
            {this.shouldShowOldValue() && (
              <>
                {this.props.label && (
                  <label className={styles.semiBold}>
                    <Container classNames={[styles.displayFlex, styles.oldValueActive]}>
                      {typeof this.props.label === 'string' && (
                        <Container className={styles.semiBold}>
                          {this.props.label} &nbsp;(Old)
                        </Container>
                      )}
                      {typeof this.props.label !== 'string' && <>{this.props.label} &nbsp;(Old)</>}
                    </Container>
                  </label>
                )}
                <Container classNames={[styles.formControlsInner, styles.oldValueActive]}>
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
                    <Container className={styles.semiBold}>
                      {this.props.label}
                      {this.shouldShowOldValue() && <>&nbsp;(New)</>}
                    </Container>
                  )}
                  {typeof this.props.label !== 'string' && (
                    <>
                      {this.props.label}
                      {this.shouldShowOldValue() && <>&nbsp;(New)</>}
                    </>
                  )}
                </Container>
              </label>
            )}
            <Container classNames={[styles.formControlsInner]} id={this.props.name}>
              {this.getControlDesign(false)}
              {this.getInputAppendDesign(this.props.append)}
              <input type='hidden' name={this.props.name} value={this.state.value || ''} />
            </Container>
          </>
        </Container>
        {this.state.showError && (
          <Container className={styles.formControlsWrapper}>
            <span />
            <Transition in={this.state.showError}>
              <Message variant={'danger'} message={this.state.error} />
            </Transition>
          </Container>
        )}
        {this.state.extraControls && (
          <Container className={styles.formControlsWrapper}>
            <span />
            <Container className={'extra-control'} display='block'>
              {this.state.extraControls}
            </Container>
          </Container>
        )}
      </Container>
    );
  }

  public getValue(): string {
    if (this.state.value === null || this.state.value === undefined) {
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
          if (setErrorState) this.setState({ error: 'Required field', showError: true });
          return false;
        } else {
          this.setState({ showError: false });
          return true;
        }
      }
    }

    if (this.props.required) {
      if (this.props.type === 'phone') {
        const value = this.state.value;
        if (value) {
          if (value.toString().split('-').length < 2) {
            if (setErrorState) this.setState({ error: 'Required field', showError: true });
            return false;
          }
        }
      }
      if (
        this.state.value === undefined ||
        this.state.value === null ||
        this.state.value.toString().trim() === ''
      ) {
        if (setErrorState) this.setState({ error: 'Required field', showError: true });
        return false;
      }
    }

    if (this.props.type === 'date' && !this.props.oldValue) {
      if (this.props.required || (!this.props.required && this.state.value)) {
        // const re = /^\d\d[./-]\d\d[./-]\d\d\d\d$/;
        const re = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
        const value = moment(Number(this.state.value)).format('DD/MM/YYYY');
        // const value = moment.unix(Number(this.state.value)).format('DD/MM/YYYY');
        if (!re.test(value)) {
          if (setErrorState) {
            this.setState({
              error: 'Date format is invalid, only DD/MM/YYYY is allowed.',
              showError: true
            });
          }
          return false;
        }
      }
    }

    if (this.props.type === 'daterange' && !this.props.oldValue) {
      if (this.props.required || (!this.props.required && this.state.value)) {
        if (this.state.value) {
          const dateArray = String(this.state.value).split(',');
          const dateStart = dateArray[0];
          const dateEnd = dateArray[1];
          if (dateStart === '0' && dateEnd === '0') {
            if (setErrorState) {
              this.setState({
                error: 'Start date and End date are required.',
                showError: true
              });
            }
            return false;
          } else if (dateStart === '0') {
            if (setErrorState) {
              this.setState({
                error: 'Start date is required.',
                showError: true
              });
            }
            return false;
          } else if (dateEnd === '0') {
            if (setErrorState) {
              this.setState({
                error: 'End date is required.',
                showError: true
              });
            }
            return false;
          }
        }
      }
    }

    if (this.props.type === 'email') {
      if (this.props.required || (!this.props.required && this.state.value)) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(this.state.value).toLowerCase())) {
          if (setErrorState)
            this.setState({
              error: "The email address that you've entered is invalid.",
              showError: true
            });
          return false;
        }
      }
    }

    // if (this.props.type === 'password') {
    //   if (this.props.required || (!this.props.required && this.state.value)) {
    //     // const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    //     const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*)(?=.*\W.*)[a-zA-Z0-9\S]{8,}$/;
    //     if (!re.test(String(this.state.value))) {
    //       if (setErrorState)
    //         this.setState({
    //           error:
    //             'Password must contain at least one number, one lowercase letter, one uppercase letter, one special chatacter and eight characters in length',
    //           showError: true
    //         });
    //       return false;
    //     }
    //   }
    // }

    this.setState({ showError: false });
    return true;
  }

  public reset() {
    this.onValueChanged(false, undefined);
  }

  public onSaved() {
    if (this.control && this.control.onSaved) {
      this.control.onSaved();
    }
  }

  public onUpload() {
    if (this.control && this.control.onUpload) {
      return this.control.onUpload();
    }
  }

  public setValue(value: string | number, notify: boolean = true) {
    const result = this.processValue(String(value));
    this.setState({ displayValue: result.displayValue, value: result.value }, () => {
      if (notify) {
        this.beforeInputChanged(result.value || '');
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
            <FileUploader
              uploaderFieldName={this.props.uploaderConfigs!.fieldName}
              uploaderLabel={this.props.uploaderConfigs!.label}
              uploaderViewer={this.props.uploaderConfigs!.viewer}
              uploaderFooter={this.props.uploaderConfigs!.footer}
              path={this.props.uploaderConfigs!.path}
              bucketName={this.props.uploaderConfigs!.bucketName}
              value={
                oldValue
                  ? this.props.oldValue
                    ? this.state.oldDisplayValue
                    : ''
                  : this.state.displayValue
              }
              disabled={true}
              getuploaderprogress={this.getuploaderprogress}
            />

            {/* <Image
              src={
                oldValue
                  ? this.props.oldValue
                    ? this.state.oldDisplayValue
                    : ''
                  : this.state.displayValue
              }
            /> */}
          </Container>
        );
      } else if (this.props.type === 'number') {
        return (
          <Container>
            {oldValue
              ? this.isNotEmpty(this.props.oldValue)
                ? Formatter.number(this.state.oldDisplayValue, {
                    decimalPlace: this.props.decimalPlace
                  })
                : ''
              : this.isNotEmpty(this.state.displayValue)
              ? Formatter.number(this.state.displayValue, {
                  decimalPlace: this.props.decimalPlace
                })
              : ''}
            {this.props.unit ? ` ${this.props.unit}` : ''}
          </Container>
        );
      } else if (this.props.type === 'hidden') {
        return null;
      } else {
        return (
          <Container>
            {oldValue
              ? this.isNotEmpty(this.props.oldValue)
                ? this.state.oldDisplayValue
                : ''
              : this.state.displayValue}
          </Container>
        );
      }
    } else if (this.props.type === 'hidden') {
      return null;
    } else if (this.props.type === 'numberfields') {
      return (
        <OtpInput
          autoFocus={this.props.autoFocus}
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
          autoFocus={this.props.autoFocus}
          ignoreAccents={false}
          // componentClass='select'
          // defaultMenuIsOpen
          isDisabled={this.props.disabled}
          className={'select'}
          value={Options.filter((obj: any) => obj.value === this.state.value)[0] || ''}
          placeholder={this.props.placeholder}
          onChange={this.onSetOption}
          options={this.props.selectOptions}
          components={{ Option: CustomOption, SingleValue: DisplayOption }}
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
              padding: '0.5rem 0 !important',
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
            })
          }}
        />
      );
    } else if (this.props.type === 'customselect') {
      const CustomOption = (innerProps: any) => {
        return (
          <components.Option {...innerProps}>
            <Container className='select-opt'>{innerProps.data.html}</Container>
          </components.Option>
        );
      };
      const DisplayOption = (innerProps: any) => {
        return (
          <components.SingleValue {...innerProps}>
            <Container className='select-opt'>{innerProps.data.html}</Container>
          </components.SingleValue>
        );
      };
      let Options = this.props.selectCustomOptions || [];
      return (
        <Select
          autoFocus={this.props.autoFocus}
          ignoreAccents={false}
          isDisabled={this.props.disabled}
          className={'select'}
          // defaultMenuIsOpen
          value={Options.filter((obj: any) => obj.value === this.state.value)[0] || ''}
          placeholder={this.props.placeholder}
          onChange={this.onSetOption}
          components={{ Option: CustomOption, SingleValue: DisplayOption }}
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
              padding: '0.5rem 0 !important',
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
            })
          }}
          options={this.props.selectCustomOptions}
        />
      );
    } else if (this.props.type === 'phone') {
      return (
        <Phone
          autoFocus={this.props.autoFocus}
          required={this.props.required}
          placeholder={this.props.placeholder}
          value={this.state.displayValue || undefined}
          onChange={this.onPhoneChange}
          onSendCode={this.props.onSendCode}
          loading={this.props.loading}
          showPhoneLabel={this.props.showPhoneLabel}
        />
      );
    } else if (this.props.type === 'country') {
      const CustomOption = (innerProps: any) => {
        return (
          <components.Option {...innerProps}>
            <Container className='select-opt'>
              <Icon flag={innerProps.data.code} /> &nbsp;&nbsp;
              {innerProps.data.label}
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
      const excludeOptions = this.props.excludeOptions || [];
      if (excludeOptions.indexOf('Singapore') == -1) {
        var obj = {
          label: 'Singapore',
          value: 'Singapore',
          country: 'Singapore',
          code: 'SG'
        };
        mainOptions.push(obj);
        allOptions.push(obj);
      }
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
          option.alpha3.length &&
          option.emoji &&
          excludeOptions.indexOf(option.name) == -1 &&
          option.alpha2 !== 'SG'
        ) {
          var obj = {
            label: option.name,
            value: option.name,
            country: option.name,
            code: option.alpha2
          };
          restOptions.push(obj);
          allOptions.push(obj);
        }
      });
      if (excludeOptions.indexOf('Others') == -1) {
        var obj = {
          label: 'Others',
          value: 'Others',
          country: 'Others',
          code: 'Others'
        };
        restOptions.push(obj);
        allOptions.push(obj);
      }
      let Options: any = [
        {
          label: <Container display='none'></Container>,
          options: mainOptions
        },
        {
          label: <Divider compact />,
          options: restOptions
        }
      ];
      if (excludeOptions.indexOf('Singapore') !== -1) {
        Options = [
          {
            label: '',
            options: restOptions
          }
        ];
      }
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
          autoFocus={this.props.autoFocus}
          ignoreAccents={false}
          isDisabled={this.props.disabled}
          className={'select'}
          value={allOptions.filter((obj: any) => obj.value === this.state.value)[0] || ''}
          filterOption={customFilter}
          placeholder={this.props.placeholder}
          onChange={this.onSetOption}
          components={{ Option: CustomOption, SingleValue: DisplayOption }}
          options={Options}
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
              padding: '0.5rem 0 !important',
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
            })
          }}
        />
      );
    } else if (this.props.type === 'countrycode') {
      const CustomOption = (innerProps: any) => {
        return (
          <components.Option {...innerProps}>
            <Container className='select-opt'>
              <Icon flag={innerProps.data.code} /> &nbsp;&nbsp;
              {innerProps.data.label}
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
      const excludeOptions = this.props.excludeOptions || [];
      if (excludeOptions.indexOf('SGP') == -1) {
        var obj = {
          label: 'SGP',
          value: 'SGP',
          country: 'Singapore',
          code: 'SG'
        };
        mainOptions.push(obj);
        allOptions.push(obj);
      }
      var sortedCountries: any = countries.all;
      sortedCountries.sort(function(a: any, b: any) {
        if (a.alpha3 < b.alpha3) {
          return -1;
        }
        if (a.alpha3 > b.alpha3) {
          return 1;
        }
        return 0;
      });
      sortedCountries.map((option: any) => {
        if (
          option.alpha3.length &&
          option.emoji &&
          excludeOptions.indexOf(option.alpha3) == -1 &&
          option.alpha2 !== 'SG'
        ) {
          var obj = {
            label: option.alpha3,
            value: option.alpha3,
            country: option.name,
            code: option.alpha2
          };
          restOptions.push(obj);
          allOptions.push(obj);
        }
      });
      if (excludeOptions.indexOf('Others') == -1) {
        var obj = {
          label: 'Others',
          value: 'Others',
          country: 'Others',
          code: 'Others'
        };
        restOptions.push(obj);
        allOptions.push(obj);
      }
      let Options: any = [
        {
          label: <Container display='none'></Container>,
          options: mainOptions
        },
        {
          label: <Divider compact />,
          options: restOptions
        }
      ];
      if (excludeOptions.indexOf('SGP') !== -1) {
        Options = [
          {
            label: '',
            options: restOptions
          }
        ];
      }
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
          autoFocus={this.props.autoFocus}
          // defaultMenuIsOpen
          ignoreAccents={false}
          isDisabled={this.props.disabled}
          className={'select'}
          value={allOptions.filter((obj: any) => obj.value === this.state.value)[0] || ''}
          filterOption={customFilter}
          placeholder={this.props.placeholder}
          onChange={this.onSetOption}
          components={{ Option: CustomOption, SingleValue: DisplayOption }}
          options={Options}
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
              padding: '0.5rem 0 !important',
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
          autoFocus={this.props.autoFocus}
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
          autoFocus={this.props.autoFocus}
          disabled={this.props.disabled}
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
          autoFocus={this.props.autoFocus}
          disabled={this.props.disabled}
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
          autoFocus={this.props.autoFocus}
          disabled={this.props.disabled}
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
            uploaderFieldName={this.props.uploaderConfigs!.fieldName}
            uploaderLabel={this.props.uploaderConfigs!.label}
            uploaderViewer={this.props.uploaderConfigs!.viewer}
            uploaderFooter={this.props.uploaderConfigs!.footer}
            showFileName={this.props.uploaderConfigs!.showFileName}
            path={this.props.uploaderConfigs!.path}
            bucketName={this.props.uploaderConfigs!.bucketName}
            value={this.state.displayValue || undefined}
            onChange={this.onUploaderChanged}
            disabled={this.props.disabled}
            filePatterns={this.props.uploaderConfigs!.filePatterns}
            customAllowFileExtensions={this.props.uploaderConfigs!.customAllowFileExtensions}
            resetFormControl={this.reset}
            fixedFileName={this.props.uploaderConfigs!.fixedFileName}
            getuploaderprogress={this.getuploaderprogress}
          >
            {this.props.children}
          </FileUploader>
          {this.state.displayValue && !this.props.uploaderConfigs!.viewer && (
            <Icon onClick={this.setToEmpty} className={styles.clearUpload} icon={faTimes} />
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
        const radioStyle = {
          display: 'block'
        };
        return (
          <Container className={this.props.variant}>
            <ReactRadio.Group value={this.state.value} onChange={this.onRadioChanged}>
              {this.props.selectOptions.map((option, i) => {
                return (
                  <ReactRadio
                    disabled={this.props.disabled}
                    style={this.props.variant == 'horizontal' ? undefined : radioStyle}
                    key={i}
                    value={option.value}
                  >
                    {option.label}
                  </ReactRadio>
                );
              })}
            </ReactRadio.Group>
          </Container>
        );
      }
    } else if (this.props.type === 'checkbox') {
      if (this.props.selectOptions) {
        return (
          <Container className={this.props.variant}>
            <ReactCheckbox.Group
              disabled={this.props.disabled}
              options={this.props.selectOptions}
              value={this.state.value ? String(this.state.value).split(',') : undefined}
              onChange={this.onCheckChanged}
            />
          </Container>
        );
      }
    } else {
      let classes: string[] = [this.props.unit ? styles.unitPadding : ''];

      classes = classes.filter(function(el) {
        return el != '';
      });
      return (
        <>
          {this.props.type === 'password' && (
            <ReactInput.Password
              autoFocus={this.props.autoFocus}
              prefix={this.props.prepend || ''}
              className={classes.join(' ')}
              autoComplete={'off'}
              autoCorrect={'off'}
              placeholder={this.props.placeholder}
              value={this.state.displayValue || ''}
              onChange={this.onChange}
              disabled={this.props.disabled}
              onBlur={this.props.onBlur ? this.props.onBlur.bind(this, this) : null}
            />
          )}

          {this.props.type === 'number' && (
            <ReactInputNumber
              autoFocus={this.props.autoFocus}
              prefix={this.props.prepend || ''}
              className={classes.join(' ')}
              autoComplete={'off'}
              autoCorrect={'off'}
              max={1000000000000}
              min={0}
              placeholder={this.props.placeholder}
              value={
                this.isNotEmpty(this.state.value) && String(this.state.value!).trim() !== ''
                  ? Number(this.state.value)
                  : undefined
              }
              onChange={this.onNumberChanged}
              disabled={this.props.disabled}
              formatter={this.numberWithCommas}
              parser={(value) => (this.isNotEmpty(value) ? value!.replace(/\$\s?|(,*)/g, '') : '')}
              onBlur={this.props.onBlur ? this.props.onBlur.bind(this, this) : () => {}}
              precision={this.props.decimalPlace}
            />
          )}

          {this.props.type !== 'number' && this.props.type !== 'password' && (
            <ReactInput
              autoFocus={this.props.autoFocus}
              prefix={this.props.prepend || ''}
              className={classes.join(' ')}
              autoComplete={'off'}
              autoCorrect={'off'}
              placeholder={this.props.placeholder}
              value={this.state.displayValue || ''}
              onChange={this.onChange}
              disabled={this.props.disabled}
              onBlur={this.props.onBlur ? this.props.onBlur.bind(this, this) : null}
              suffix={this.props.suffix || ''}
            />
          )}
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
        this.beforeInputChanged(result.value);
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
          this.beforeInputChanged(result.value);
        }
      );
    }
  }

  private onNumberChanged = (value: string | number | undefined) => {
    const result = this.processValue(String(this.isNotEmpty(value) ? value : ''));
    this.setState(
      { displayValue: result.displayValue, value: result.value, showError: false },
      () => {
        this.beforeInputChanged(result.value);
      }
    );
  };

  private onSetOption = (selectedOption: any) => {
    let newValue = selectedOption.value;
    if (newValue.constructor === Array) {
      newValue = selectedOption.value[0];
    }
    this.setState({ displayValue: newValue, value: newValue, showError: false }, () => {
      this.beforeInputChanged(newValue);
    });
  };

  private setToEmpty = () => {
    this.onValueChanged(false, '');
    this.beforeInputChanged('');
  };

  private onPhoneChange(value: string) {
    this.setState({ displayValue: value, value: value, showError: false }, () => {
      this.beforeInputChanged(value);
    });
  }

  private onDateChange(newUnixTimestamp: number) {
    const result = this.processValue(newUnixTimestamp.toString());
    this.setState(
      { displayValue: result.displayValue, value: result.value, showError: false },
      () => {
        this.beforeInputChanged(result.value);
      }
    );
  }

  private onDateRangeChange(newUnixTimestamp: number) {
    const result = this.processValue(newUnixTimestamp.toString());
    this.setState(
      { displayValue: result.displayValue, value: result.value, showError: false },
      () => {
        this.beforeInputChanged(result.value);
      }
    );
  }

  private onUploaderChanged(newUrl: string) {
    this.setState({ displayValue: newUrl, value: newUrl, showError: false }, () => {
      this.beforeInputChanged(newUrl);
    });
  }

  private onSwitchChanged(e: SyntheticEvent<HTMLInputElement>) {
    const result = this.processValue((e.target as any).checked ? '1' : '0');
    this.setState(
      { displayValue: result.displayValue, value: result.value, showError: false },
      () => {
        this.beforeInputChanged(result.value);
      }
    );
  }

  private onRadioChanged(e: any) {
    const value = e.target.value;
    const result = this.processValue(value);
    this.setState(
      { displayValue: result.displayValue, value: result.value, showError: false },
      () => {
        this.beforeInputChanged(value);
      }
    );
  }

  private onCheckChanged(checkedValues: any) {
    const checkArray = checkedValues;
    const result = this.processValue(String(checkArray.join()));
    this.setState(
      {
        displayValue: result.displayValue,
        value: result.value,
        showError: false
      },
      () => {
        if (this.props.singleCheckbox) {
          this.beforeInputChanged(checkedValues.length == 1 ? checkedValues[0] : '0');
        } else {
          this.beforeInputChanged(checkedValues);
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
    if (this.props.type === 'numeric') {
      const re = /^\d+$/;
      if (value && !re.test(String(value))) {
        return false;
      }
    }
    if (this.props.type === 'alphabet' || this.props.alphabetOnly) {
      const re = /^[A-Za-z]+$/;
      if (value && !re.test(String(value))) {
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
      this.props.type === 'checkbox' ||
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
      this.props.type === 'number' ||
      this.props.type === 'numberfields' ||
      this.props.type === 'hidden'
    ) {
      return { displayValue: value || '', value };
    } else if (this.props.type === 'select') {
      let displayValue = '';
      if (
        this.props.selectOptions!.map((item) => {
          if (this.isNotEmpty(value) && String(item.value) === String(value)) {
            displayValue = item.label;
          }
        })
      ) {
        return { displayValue: displayValue || '', value };
      }
    } else if (this.props.type === 'customselect') {
      let displayValue = '';
      if (
        this.props.selectCustomOptions!.map((item) => {
          if (this.isNotEmpty(value) && String(item.value) === String(value)) {
            displayValue = item.label;
          }
        })
      ) {
        return { displayValue: displayValue || '', value };
      }
    } else if (this.props.type === 'numeric') {
      const re = /^\d+$/;
      return {
        displayValue: !re.test(value) ? '' : value,
        value: !re.test(value) ? '' : value
      };
    } else if (this.props.type === 'alphabet' || this.props.alphabetOnly) {
      const re = /^[a-zA-Z]+$/;
      return {
        displayValue: !re.test(value) ? '' : value,
        value: !re.test(value) ? '' : value
      };
    } else if (this.props.type === 'date' || this.props.type === 'datetime') {
      if (value) {
        // let dateFormat = 'DD/MM/YYYY';
        // if (this.props.type === 'datetime' || this.props.dateOptions!.showTimeSelect) {
        //   dateFormat = 'DD/MM/YYYY HH:mm:ss';
        // }
        const dateFormat = this.props.dateOptions
          ? this.props.dateOptions.dateFormat
            ? this.props.dateOptions.dateFormat.toUpperCase()
            : this.props.type === 'datetime' || this.props.dateOptions.showTimeSelect
            ? 'DD/MM/YYYY HH:mm:ss'
            : 'DD/MM/YYYY'
          : 'DD/MM/YYYY';
        if (this.props.static) {
          return {
            displayValue: Formatter.unixTimestampToDate(Number(value))
              ? moment.unix(Number(value)).format(dateFormat)
              : moment(value).format(dateFormat),
            value: Formatter.unixTimestampToDate(Number(value))
              ? value
              : moment(value).format(dateFormat)
          };
        } else {
          return {
            displayValue: Formatter.unixTimestampToDate(Number(value))
              ? value
              : moment(value).format('X'),
            value: Formatter.unixTimestampToDate(Number(value)) ? value : moment(value).format('X')
          };
        }
      } else {
        return { displayValue: '', value: '' };
      }
    }
    return { displayValue: '', value: '' };
  }

  private onValueChanged(firstCall: boolean, newValue: string | undefined | null | number) {
    let result: IProcessResult = { displayValue: '', value: '' };
    result = this.processValue(this.isNotEmpty(newValue) ? String(newValue) : '');
    let oldValueResult: IProcessResult = { displayValue: undefined, value: undefined };
    if (this.props.static && this.isNotEmpty(this.props.oldValue)) {
      oldValueResult = this.processValue(
        this.isNotEmpty(this.props.oldValue) ? String(this.props.oldValue) : ''
      );
    }
    if (firstCall) {
      this.state = {
        displayValue: result.displayValue,
        value: result.value,
        oldDisplayValue: oldValueResult.displayValue,
        showError: false,
        extraControls: this.props.extraControls
      };
    } else {
      this.setState({
        displayValue: result.displayValue,
        value: result.value,
        oldDisplayValue: oldValueResult.displayValue,
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

  public isIncludeInFormData = () => {
    return this.props.includeInFormData;
  };

  private isNotEmpty = (value: any) => {
    return value !== undefined && value !== null && value !== '';
  };

  private shouldShowOldValue = () => {
    if (this.props.static) {
      if (this.isNotEmpty(this.props.value) && this.isNotEmpty(this.props.oldValue)) {
        if (this.props.type === 'date' || this.props.type === 'datetime') {
          return (
            DateTime.getMoment(this.props.value!).unix() !==
            DateTime.getMoment(this.props.oldValue!).unix()
          );
        } else {
          return String(this.props.value) !== String(this.props.oldValue);
        }
      } else if (!this.isNotEmpty(this.props.value) && !this.isNotEmpty(this.props.oldValue)) {
        return false;
      } else {
        return this.props.value !== this.props.oldValue;
      }
    }
  };

  private numberWithCommas = (x: string) => {
    var parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  };

  private beforeInputChanged = (value: any) => {
    if (this.props.onInputChanged) {
      if (this.props.debounce! > 0) {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(() => {
          this.props.onInputChanged!(value, this.props.name || '');
        }, this.props.debounce);
      } else {
        this.props.onInputChanged!(value, this.props.name || '');
      }
    }
  };

  private getuploaderprogress = (
    fileName: string,
    uploaderProgress: number,
    uploaderComplete: -1 | 0 | 1
  ) => {
    if (this.props.getuploaderprogress && this.props.name && fileName) {
      this.props.getuploaderprogress(this.props.name, fileName, uploaderProgress, uploaderComplete);
    }
  };

  public getUploadState() {
    if (this.control && this.control.getUploadState) {
      return this.control.getUploadState();
    }
  }
}
