import * as React from 'react';
import * as styles from '../css/main.scss';
import { Container, IContainer } from './Container';
import { Message } from './Message';
import { FormControl as BootstrapFormControl } from 'react-bootstrap';
import { Formatter } from '../helpers/Formatter';
import { Transition } from './Transition';

interface IState {
  displayValue?: string;
  value?: string | number;
  error?: string;
  showError?: boolean;
}

interface IProps extends IContainer {
  fullWidth?: boolean;
  defaultValue?: string | number;
  value?: string | number;
  placeholder?: string;
  type?: 'text' | 'number' | 'money' | 'static' | 'email' | 'password' | 'select';
  name?: string;
  disabled?: boolean;
  onInputChanged?: (value: string | number, name: string) => void;
  append?: any;
  label?: any;
  required?: boolean;
  validateReturnError?: (value: string | number | undefined) => string | undefined;
  selectOptions?: { label: string; value: string }[];
}

interface IProcessResult {
  displayValue: string;
  value: string | number;
}

export class FormControl extends React.Component<IProps, IState> {
  public static defaultProps: IProps = {
    type: 'text',
    name: ''
  };

  constructor(props: IProps) {
    super(props);
    this.onChange = this.onChange.bind(this);
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
      <div className={styles.mainFormControlsWrapper}>
        <Container {...this.props} className={classes.join(' ')}>
          <label>
            <span key='1'>{this.props.label}</span>
            {this.props.required && <span className={styles.required}>*</span>}
          </label>

          <Container position={'relative'}>
            {this.getControlDesign()}
            {this.getInputAppendDesign(this.props.append)}
            <input type='hidden' name={this.props.name} value={this.state.value} />
          </Container>
        </Container>
        <Container {...this.props} className={styles.formControlsWrapper}>
          <span />
          <Transition in={this.state.showError}>
            <Message error={this.state.error} />
          </Transition>
        </Container>
      </div>
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
    if (this.props.required) {
      if (!this.state.value) {
        this.setState({ error: 'Cannot be empty.', showError: true });
        return false;
      }
    }

    if (this.props.type === 'email') {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(String(this.state.value).toLowerCase())) {
        this.setState({ error: 'Email address is not valid.', showError: true });
        return false;
      }
    }

    if (this.props.type === 'password') {
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

    if (this.props.validateReturnError) {
      const error = this.props.validateReturnError(this.state.value);
      if (error) {
        this.setState({ error, showError: true });
        return false;
      }
    }

    this.setState({ showError: false });
    return true;
  }

  public reset() {
    this.onValueChanged(
      false,
      String(this.props.value ? this.props.value : this.props.defaultValue)
    );
  }

  private getControlDesign() {
    if (this.props.type === 'static') {
      return <Container>{this.props.value}</Container>;
    } else if (this.props.type === 'select') {
      return (
        <BootstrapFormControl
          componentClass='select'
          value={this.props.placeholder && !this.state.value ? 'PLACEHOLDER' : this.state.value}
          onChange={this.onChange}
        >
          {this.props.selectOptions &&
            this.props.selectOptions.map((option, i) => {
              return (
                <option key={i} value={option.value}>
                  {option.label}
                </option>
              );
            })}
          <option disabled value={'PLACEHOLDER'} key={-1} style={{ display: 'none' }}>
            {this.props.placeholder}
          </option>
        </BootstrapFormControl>
      );
    } else {
      return (
        <BootstrapFormControl
          autoComplete={'off'}
          autoCorrect={'off'}
          type={this.props.type === 'password' ? 'password' : 'text'}
          placeholder={this.props.placeholder}
          value={this.state.displayValue}
          onChange={this.onChange}
          disabled={this.props.disabled}
        />
      );
    }
  }

  private onChange(event: React.FormEvent<BootstrapFormControl>) {
    const { value } = event.target as HTMLInputElement;
    const result = this.processValue(value);
    this.setState({ displayValue: result.displayValue, value: result.value });
    if (this.props.onInputChanged) {
      this.props.onInputChanged(result.value, this.props.name || '');
    }
  }

  private processValue(value: string): IProcessResult {
    if (
      this.props.type === 'text' ||
      this.props.type === 'email' ||
      this.props.type === 'password' ||
      this.props.type === 'select'
    ) {
      return { displayValue: value || '', value };
    } else {
      const originalValue = Formatter.stripSymbol(value).trim();
      if (originalValue) {
        if (this.props.type === 'money') {
          return {
            displayValue: isNaN(parseInt(originalValue, 10))
              ? ''
              : Formatter.money(parseInt(originalValue, 10)),
            value: isNaN(parseInt(originalValue, 10)) ? '' : originalValue
          };
        } else if (this.props.type === 'number') {
          return {
            displayValue: isNaN(parseInt(originalValue, 10))
              ? ''
              : Formatter.number(parseInt(originalValue, 10)),
            value: isNaN(parseInt(originalValue, 10)) ? '' : originalValue
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
}
