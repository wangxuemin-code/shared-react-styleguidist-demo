import * as React from 'react';
import * as styles from '../css/main.scss';
import { Container, IContainer } from './Container';
import { Message } from './Message';
import { FormControl as BootstrapFormControl } from 'react-bootstrap';
import { Formatter } from '../helpers/Formatter';

interface IState {
  displayValue?: string;
  value?: string | number;
  error?: string;
}

interface IProps extends IContainer {
  fullWidth?: boolean;
  defaultValue?: string | number;
  value?: string | number;
  placeholder?: string;
  type?: 'text' | 'number' | 'money' | 'static';
  name?: string;
  disabled?: boolean;
  onInputChanged?: (value: string | number) => void;
  append?: any;
  label?: any;
  required?: boolean;
  validateReturnError?: (value: string | number | undefined) => string | undefined;
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
      String(this.props.value ? this.props.value : this.props.defaultValue)
    );
  }

  public componentDidUpdate(prevProps: IProps) {
    if (prevProps.value !== this.props.value) {
      this.onValueChanged(false, String(this.props.value));
    }
  }

  public render() {
    const classes: string[] = [styles.formControlsWrapper];
    if (this.state.error) {
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

          <Message error={this.state.error} />
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
        this.setState({ error: 'Cannot be empty.' });
        return false;
      }
    }

    if (this.props.validateReturnError) {
      const error = this.props.validateReturnError(this.state.value);
      if (error) {
        this.setState({ error });
        return false;
      }
    }

    this.setState({ error: '' });
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
    } else {
      return (
        <BootstrapFormControl
          autoComplete={'off'}
          autoCorrect={'off'}
          type={'text'}
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
      this.props.onInputChanged(result.value);
    }
  }

  private processValue(value: string): IProcessResult {
    if (this.props.type === 'text') {
      return { displayValue: value, value };
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
    result = this.processValue(String(newValue));

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
