import * as React from 'react';
import * as inputStyles from './css/Input.css';
import { Container, IContainer } from './Container';
import { FormControl } from 'react-bootstrap';
import Formatter from '../helpers/Formatter';

interface IState {
  displayValue?: string;
  value?: string | number;
}

interface IProps extends IContainer {
  fullWidth?: boolean;
  defaultValue?: string | number;
  placeholder?: string;
  type: 'text' | 'number' | 'money';
  name: string;
  disabled?: boolean;
  onInputChanged?: (value: string | number) => void;
  append?: any;
}

interface IProcessResult {
  displayValue: string;
  value: string | number;
}

export class Input extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.defaultValueChanged(true);
  }

  public componentDidUpdate(prevProps: IProps) {
    if (prevProps.defaultValue !== this.props.defaultValue) {
      this.defaultValueChanged(false);
    }
  }

  public render() {
    return (
      <Container {...this.props} position={'relative'}>
        <FormControl
          className={inputStyles.input}
          type={'text'}
          placeholder={this.props.placeholder}
          value={this.state.displayValue}
          onChange={this.onChange}
          disabled={this.props.disabled}
        />
        {this.getInputAppendDesign(this.props.append)}
        <input type='hidden' name={this.props.name} value={this.state.value} />
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

  private onChange(event: React.FormEvent<FormControl>) {
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
      const originalValue = Formatter.stripSymbol(value);
      if (originalValue) {
        if (this.props.type === 'money') {
          return {
            displayValue: Formatter.money(parseInt(originalValue, 10)),
            value: originalValue
          };
        } else if (this.props.type === 'number') {
          return {
            displayValue: Formatter.number(parseInt(originalValue, 10)),
            value: originalValue
          };
        }
      }
    }
    return { displayValue: '', value: '' };
  }

  private defaultValueChanged(firstCall: boolean) {
    let result: IProcessResult = { displayValue: '', value: '' };
    if (this.props.defaultValue) {
      result = this.processValue(String(this.props.defaultValue));
    }
    if (firstCall) {
      this.state = { displayValue: result.displayValue, value: result.value };
    } else {
      this.setState({ displayValue: result.displayValue, value: result.value });
    }
  }

  private getInputAppendDesign(append?: any) {
    if (!append) {
      return null;
    }
    return <Container className={inputStyles.inputAppend}>{append}</Container>;
  }
}
