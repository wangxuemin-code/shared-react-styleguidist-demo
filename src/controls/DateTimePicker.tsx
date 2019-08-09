import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import * as React from 'react';
import DatePicker from 'react-datepicker';
import * as styles from '../css/main.scss';
import { IContainer, Container } from './Container';
import { Icon } from './Icon';
import { Formatter } from '../helpers';
import moment = require('moment');

export interface IDateOption {
  endDate?: Date;
  startDate?: Date;
  showTimeSelect?: boolean;
  dateFormat?: string;
}

interface IProps extends IContainer {
  type?: string;
  placeholder?: string;
  value?: number | string;
  onChange?: (newTimestamp: number | string, newDate: Date) => void;
  options: IDateOption;
  startDate?: Date;
  endDate?: Date;
  disabled?: boolean;
}

interface IState {
  selectedUnixTimestamp?: number;
  selectedStartUnixTimestamp?: number;
  selectedEndUnixTimestamp?: number;
  keyCodeArray?: any[];
}

export class DateTimePicker extends React.Component<IProps, IState> {
  public static defaultProps: IProps = {
    options: {},
    startDate: undefined,
    endDate: undefined
  };

  public constructor(props: IProps) {
    super(props);
    this.updateStateWithProps(true, this.props.value ? this.props.value : 0, this.props.type);
  }

  public componentDidUpdate(prevProps: IProps) {
    if (this.props.value !== prevProps.value) {
      this.updateStateWithProps(false, this.props.value ? this.props.value : 0, this.props.type);
    }
  }

  public render() {
    if (this.props.type === 'date' || this.props.type === 'datetime') {
      return (
        <React.Fragment>
          <Container position={'relative'} display={'flex'} fluid>
            <DatePicker
              readOnly={this.props.disabled}
              selected={Formatter.unixTimestampToDate(this.state.selectedUnixTimestamp)}
              onKeyDown={(e) => this.handleKeyDown(e)}
              onChange={this.handleChange.bind(this)}
              onChangeRaw={this.handleChangeRaw.bind(this)}
              showTimeSelect={
                this.props.type === 'datetime'
                  ? true
                  : this.props.options.showTimeSelect
                  ? true
                  : false
              }
              dateFormat={
                this.props.options.dateFormat
                  ? this.props.options.dateFormat
                  : this.props.type === 'datetime' || this.props.options.showTimeSelect
                  ? 'dd/MM/yyyy hh:mm aa'
                  : 'dd/MM/yyyy'
              }
              placeholderText={this.props.placeholder}
              minDate={this.props.options.startDate}
              maxDate={this.props.options.endDate}
              startDate={this.props.startDate}
              endDate={this.props.endDate}
              showMonthDropdown
              showYearDropdown
              dropdownMode='select'
              popperModifiers={{
                flip: {
                  enabled: false
                }
              }}
            />
            <Container className={styles.datepickerCalenderContainer}>
              <Icon icon={faCalendarAlt} />
            </Container>
          </Container>
        </React.Fragment>
      );
    } else {
      return (
        <Container className={styles.dateGroup}>
          <Container position={'relative'}>
            <DatePicker
              readOnly={this.props.disabled}
              selected={Formatter.unixTimestampToDate(this.state.selectedStartUnixTimestamp)}
              onChange={this.handleChangeStart.bind(this)}
              onChangeRaw={this.handleChangeRawStart.bind(this)}
              showTimeSelect={this.props.options.showTimeSelect}
              dateFormat={
                this.props.options.dateFormat ||
                (this.props.options.showTimeSelect ? 'dd/MM/yyyy hh:mm aa' : 'dd/MM/yyyy')
              }
              placeholderText={this.props.placeholder}
              minDate={this.props.options.startDate}
              maxDate={this.props.options.endDate}
              selectsStart
              startDate={Formatter.unixTimestampToDate(this.state.selectedStartUnixTimestamp)}
              endDate={Formatter.unixTimestampToDate(this.state.selectedEndUnixTimestamp)}
              showMonthDropdown
              showYearDropdown
              dropdownMode='select'
              popperModifiers={{
                flip: {
                  enabled: false
                }
              }}
            />
            <Container className={styles.datepickerCalenderContainer}>
              <Icon icon={faCalendarAlt} />
            </Container>
          </Container>
          <Container position={'relative'} display={'flex'}>
            <DatePicker
              readOnly={this.props.disabled}
              selected={Formatter.unixTimestampToDate(this.state.selectedEndUnixTimestamp)}
              onChange={this.handleChangeEnd.bind(this)}
              onChangeRaw={this.handleChangeRawEnd.bind(this)}
              showTimeSelect={this.props.options.showTimeSelect}
              dateFormat={
                this.props.options.dateFormat ||
                (this.props.options.showTimeSelect ? 'dd/MM/yyyy hh:mm aa' : 'dd/MM/yyyy')
              }
              placeholderText={this.props.placeholder}
              minDate={this.props.options.startDate}
              maxDate={this.props.options.endDate}
              selectsEnd
              startDate={Formatter.unixTimestampToDate(this.state.selectedStartUnixTimestamp)}
              endDate={Formatter.unixTimestampToDate(this.state.selectedEndUnixTimestamp)}
              showMonthDropdown
              showYearDropdown
              dropdownMode='select'
              popperModifiers={{
                flip: {
                  enabled: false
                }
              }}
            />
            <Container className={styles.datepickerCalenderContainer}>
              <Icon icon={faCalendarAlt} />
            </Container>
          </Container>
        </Container>
      );
    }
  }

  private updateStateWithProps(
    firstCall: boolean,
    newValue: number | string,
    type: string | undefined
  ) {
    let value = newValue;
    if (firstCall) {
      if (type === 'date' || type === 'datetime') {
        if (typeof newValue === 'string') {
          value = parseInt(newValue, 10);
        } else {
          value = newValue;
        }
        this.state = {
          selectedUnixTimestamp: value
        };
      } else {
        value = newValue.toString();
        this.state = {
          selectedStartUnixTimestamp: parseInt(value.split(',')[0]),
          selectedEndUnixTimestamp: parseInt(value.split(',')[1])
        };
      }
    } else {
      if (type === 'date' || type === 'datetime') {
        if (typeof newValue === 'string') {
          value = parseInt(newValue, 10);
        } else {
          value = newValue;
        }
        this.setState({
          selectedUnixTimestamp: value
        });
      } else {
        this.setState({
          selectedStartUnixTimestamp: parseInt(value.toString().split(',')[0]),
          selectedEndUnixTimestamp: parseInt(value.toString().split(',')[1])
        });
      }
    }
  }

  private handleKeyDown(e: any) {
    if (this.props.type === 'date') {
      const keyCodeArray: number[] = this.state.keyCodeArray || [];

      if (e.keyCode === 13 || e.keyCode === 9) {
        return;
      }
      if ((e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode === 191 || e.keyCode === 189) {
        if (keyCodeArray.length > 9) {
          e.preventDefault();
        } else {
          if (keyCodeArray.length == 2 || keyCodeArray.length == 5) {
            if (this.props.options.dateFormat === 'DD-MM-YYYY') {
              if (e.keyCode === 189) {
                keyCodeArray.push(e.keyCode);
                this.setState({ keyCodeArray: keyCodeArray });
              } else {
                e.preventDefault();
              }
            } else {
              if (e.keyCode === 191) {
                keyCodeArray.push(e.keyCode);
                this.setState({ keyCodeArray: keyCodeArray });
              } else {
                e.preventDefault();
              }
            }
          } else {
            if (e.keyCode === 189 || e.keyCode === 191) {
              e.preventDefault();
            } else {
              keyCodeArray.push(e.keyCode);
              this.setState({ keyCodeArray: keyCodeArray });
            }
          }
        }
      } else if (e.keyCode === 8) {
        keyCodeArray.pop();
        this.setState({ keyCodeArray: keyCodeArray });
      } else {
        e.preventDefault();
      }
      // console.log(keyCodeArray);
    }
  }

  private handleChangeRaw(event: React.FocusEvent<HTMLInputElement>) {
    if (this.props.type === 'date') {
      const newMoment = moment(event.target.value, 'DD-MM-YYYY');
      if (newMoment.isValid()) {
        this.handleChange(newMoment.toDate());
      }
    } else {
      const newMoment = moment(event.target.value, 'DD-MM-YYYY hh:mm A');
      if (newMoment.isValid()) {
        this.handleChange(newMoment.toDate());
      }
    }
  }

  private handleChange(date: Date) {
    if (date) {
      const unixTimestamp = Formatter.dateToUnixTimestamp(date);
      if (date) {
        this.setState({
          selectedUnixTimestamp: unixTimestamp
        });
      }
      if (this.props.onChange) {
        this.props.onChange(unixTimestamp, date);
      }
    }
  }

  private handleChangeRawStart(event: React.FocusEvent<HTMLInputElement>) {
    const newMoment = moment(event.target.value, 'DD-MM-YYYY hh:mm A');
    if (newMoment.isValid()) {
      this.handleChangeStart(newMoment.toDate());
    }
  }

  private handleChangeStart(date: Date) {
    if (date) {
      const unixTimestamp = Formatter.dateToUnixTimestamp(date);
      if (this.state.selectedEndUnixTimestamp) {
        if (this.state.selectedEndUnixTimestamp < unixTimestamp) {
          this.setState({
            selectedStartUnixTimestamp: unixTimestamp,
            selectedEndUnixTimestamp: 0
          });
          if (this.props.onChange) {
            this.props.onChange(unixTimestamp + ',' + 0, date);
          }
        } else {
          this.setState({ selectedStartUnixTimestamp: unixTimestamp });
          if (this.props.onChange) {
            this.props.onChange(unixTimestamp + ',' + this.state.selectedEndUnixTimestamp, date);
          }
        }
      } else {
        this.setState({ selectedStartUnixTimestamp: unixTimestamp });
        if (this.props.onChange) {
          this.props.onChange(unixTimestamp + ',' + 0, date);
        }
      }
    }
  }

  private handleChangeRawEnd(event: React.FocusEvent<HTMLInputElement>) {
    const newMoment = moment(event.target.value, 'DD-MM-YYYY hh:mm A');
    if (newMoment.isValid()) {
      this.handleChangeEnd(newMoment.toDate());
    }
  }

  private handleChangeEnd(date: Date) {
    if (date) {
      const unixTimestamp = Formatter.dateToUnixTimestamp(date);
      if (this.state.selectedStartUnixTimestamp) {
        if (this.state.selectedStartUnixTimestamp < unixTimestamp) {
          this.setState({ selectedEndUnixTimestamp: unixTimestamp });
          if (this.props.onChange) {
            this.props.onChange(this.state.selectedStartUnixTimestamp + ',' + unixTimestamp, date);
          }
        } else {
          this.setState({ selectedStartUnixTimestamp: unixTimestamp });
          this.handleChangeStart(date);
        }
      } else {
        this.setState({ selectedEndUnixTimestamp: unixTimestamp });
        if (this.props.onChange) {
          this.props.onChange(this.state.selectedStartUnixTimestamp + ',' + unixTimestamp, date);
        }
      }
    }
  }
}
