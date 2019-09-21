import * as React from 'react';
import * as styles from '../css/main.scss';
import { IContainer, Container } from './Container';
import moment = require('moment');
import { Icon as ReactIcon, DatePicker as ReactDatePicker } from 'antd';
import MaskedInput from 'react-maskedinput-ultimate';
const { RangePicker } = ReactDatePicker;

export interface IDateOption {
  endDate?: Date;
  startDate?: Date;
  showTimeSelect?: boolean;
  dateFormat?: string;
  defaultShowDate?: boolean;
}

interface IProps extends IContainer {
  type: 'date' | 'datetime' | 'daterange';
  placeholder?: string;
  value?: number | string;
  onChange?: (newTimestamp: number | string, newDate?: Date) => void;
  options: IDateOption;
  startDate?: Date;
  endDate?: Date;
  disabled?: boolean;
}

interface IState {
  selectedStartUnixTimestamp?: number;
  selectedEndUnixTimestamp?: number;
  keyCodeArray?: any[];
  showCalendar?: boolean;
  showRangeCalendar?: boolean;
  displayValue?: string;
  displayStartValue?: string;
  displayEndValue?: string;
  defaultValue?: any;
  calendarIconClicked?: boolean;
}

export class DateTimePicker extends React.Component<IProps, IState> {
  public static defaultProps: IProps = {
    type: 'date',
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
          <Container className={styles.dateInput}>
            <MaskedInput
              placeholderChar=' '
              mask={this.props.type === 'date' ? '11/11/1111' : '11/11/1111 11:11 ab'}
              disabled={this.props.disabled}
              className={'ant-input'}
              value={this.state.displayValue}
              isRevealingMask={true}
              placeholder={this.props.placeholder}
              onChange={this.handleChangeRaw.bind(this)}
              // placeholderFixed={
              //   this.props.type === 'datetime' || this.props.options.showTimeSelect
              //     ? 'DD/MM/YYYY HH:MM AA'
              //     : 'DD/MM/YYYY'
              // }
              formatCharacters={{
                a: {
                  validate: function(char: any) {
                    if (char == 'a' || char == 'A' || char == 'p' || char == 'P') {
                      return true;
                    }
                  }
                },
                b: {
                  validate: function(char: any) {
                    if (char == 'm' || char == 'M') {
                      return true;
                    }
                  }
                }
              }}
            />
            <ReactIcon
              onClick={this.toggleDatePicker}
              type='calendar'
              style={{ color: 'rgba(0,0,0)' }}
            />
            <ReactDatePicker
              getCalendarContainer={(trigger: any) => trigger.parentNode.parentNode}
              value={this.state.defaultValue}
              disabledDate={this.disabledDate}
              disabled={this.props.disabled}
              format={
                this.props.type === 'datetime' || this.props.options.showTimeSelect
                  ? 'DD/MM/YYYY HH:mm:ss'
                  : 'DD/MM/YYYY'
              }
              style={{ visibility: 'hidden', width: 0 }}
              onChange={this.handleChange.bind(this)}
              onOk={this.toggleDatePicker}
              open={this.state.showCalendar}
              showTime={
                this.props.type === 'datetime' || this.props.options.showTimeSelect
                  ? {
                      use12Hours: true,
                      format: 'HH:mm',
                      defaultValue: moment('00:00:00', 'HH:mm')
                    }
                  : undefined
              }
              onOpenChange={this.datePickerStatus}
            />
          </Container>
        </React.Fragment>
      );
    } else {
      return (
        <Container className={styles.dateGroup}>
          <Container className={styles.dateInput} position={'relative'}>
            <MaskedInput
              placeholderChar=' '
              mask={this.props.options.showTimeSelect ? '11/11/1111 11:11 ab' : '11/11/1111'}
              disabled={this.props.disabled}
              className={'ant-input'}
              value={this.state.displayStartValue || ''}
              isRevealingMask={true}
              placeholder={this.props.placeholder}
              onChange={this.handleChangeRangeStartRaw.bind(this)}
              // placeholderFixed={
              //   this.props.options.showTimeSelect ? 'DD/MM/YYYY HH:MM AA' : 'DD/MM/YYYY'
              // }
              formatCharacters={{
                a: {
                  validate: function(char: any) {
                    if (char == 'a' || char == 'A' || char == 'p' || char == 'P') {
                      return true;
                    }
                  }
                },
                b: {
                  validate: function(char: any) {
                    if (char == 'm' || char == 'M') {
                      return true;
                    }
                  }
                }
              }}
            />
            <ReactIcon
              onClick={this.showRangeCalendar}
              type='calendar'
              style={{ color: 'rgba(0,0,0)' }}
            />
            <RangePicker
              getCalendarContainer={(trigger: any) => trigger.parentNode.parentNode}
              value={[
                this.state.displayStartValue
                  ? moment(this.state.displayStartValue, this.getDateFormat())
                  : moment(),
                this.state.displayEndValue
                  ? moment(this.state.displayEndValue, this.getDateFormat())
                  : moment()
                // moment(this.state.displayStartValue, this.getDateFormat()),
                // moment(this.state.displayEndValue, this.getDateFormat())
              ]}
              // disabledDate={this.disabledStartDate}
              disabled={this.props.disabled}
              format={this.props.options.showTimeSelect ? 'DD/MM/YYYY HH:mm:ss' : 'DD/MM/YYYY'}
              style={{ visibility: 'hidden', width: 0 }}
              onCalendarChange={this.handleChangeRange.bind(this)}
              onOk={this.showRangeCalendar}
              open={this.state.showRangeCalendar}
              showTime={
                this.props.options.showTimeSelect
                  ? {
                      use12Hours: true,
                      format: 'HH:mm',
                      defaultValue: moment('00:00:00', 'HH:mm')
                    }
                  : undefined
              }
              onOpenChange={this.hideRangeCalendar}
            />
          </Container>
          <Container className={styles.dateInput} position={'relative'} display={'flex'}>
            <MaskedInput
              placeholderChar=' '
              mask={this.props.options.showTimeSelect ? '11/11/1111 11:11 ab' : '11/11/1111'}
              disabled={this.props.disabled}
              className={'ant-input'}
              value={this.state.displayEndValue || ''}
              isRevealingMask={true}
              placeholder={this.props.placeholder}
              onChange={this.handleChangeRangeEndRaw.bind(this)}
              // placeholderFixed={
              //   this.props.options.showTimeSelect ? 'DD/MM/YYYY HH:MM AA' : 'DD/MM/YYYY'
              // }
              formatCharacters={{
                a: {
                  validate: function(char: any) {
                    if (char == 'a' || char == 'A' || char == 'p' || char == 'P') {
                      return true;
                    }
                  }
                },
                b: {
                  validate: function(char: any) {
                    if (char == 'm' || char == 'M') {
                      return true;
                    }
                  }
                }
              }}
            />
            <ReactIcon
              onClick={this.showRangeCalendar}
              type='calendar'
              style={{ color: 'rgba(0,0,0)' }}
            />
            {/* <ReactDatePicker
              getCalendarContainer={(trigger: any) => trigger.parentNode.parentNode}
              value={moment(this.state.displayEndValue, this.getDateFormat())}
              disabledDate={this.disabledEndDate}
              disabled={this.props.disabled}
              format={
                this.props.type === 'datetime' || this.props.options.showTimeSelect
                  ? 'DD/MM/YYYY HH:mm:ss'
                  : 'DD/MM/YYYY'
              }
              style={{ visibility: 'hidden', width: 0 }}
              onChange={this.handleChangeEnd.bind(this)}
              onOk={this.showEndCalendar}
              open={this.state.showEndCalendar}
              showTime={
                this.props.type === 'datetime' || this.props.options.showTimeSelect
                  ? { defaultValue: moment('00:00:00', 'HH:mm:ss') }
                  : false
              }
            /> */}
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
    let value: any = '';
    let displayValue: any = '';
    let displayStartValue: any = '';
    let displayEndValue: any = '';
    value = newValue;
    if (type === 'date' || type === 'datetime') {
      if (value) {
        displayValue = moment.unix(value).format('DD/MM/YYYY');
        if (this.props.type === 'datetime' || this.props.options.showTimeSelect) {
          displayValue = moment.unix(value).format('DD/MM/YYYY hh:mm a');
        }
      }
    } else {
      if (value) {
        value = newValue.toString();
        displayStartValue =
          value.split(',')[0] !== '0' ? moment.unix(value.split(',')[0]).format('DD/MM/YYYY') : '';
        displayEndValue =
          value.split(',')[1] !== '0' ? moment.unix(value.split(',')[1]).format('DD/MM/YYYY') : '';
        if (this.props.type === 'datetime' || this.props.options.showTimeSelect) {
          displayStartValue =
            value.split(',')[0] !== '0'
              ? moment.unix(value.split(',')[0]).format('DD/MM/YYYY hh:mm a')
              : '';
          displayEndValue =
            value.split(',')[1] !== '0'
              ? moment.unix(value.split(',')[1]).format('DD/MM/YYYY hh:mm a')
              : '';
        }
      }
    }
    if (firstCall) {
      if (type === 'date' || type === 'datetime') {
        if (typeof newValue === 'string') {
          value = parseInt(newValue, 10);
        } else {
          value = newValue;
        }
        this.state = {
          displayValue,
          defaultValue: this.getDefaultValue(displayValue)
        };
      } else {
        if (newValue) {
          value = newValue.toString();
        }

        this.state = {
          selectedStartUnixTimestamp:
            value && parseInt(value.split(',')[0]) ? parseInt(value.split(',')[0]) : undefined,
          selectedEndUnixTimestamp:
            value && parseInt(value.split(',')[1]) ? parseInt(value.split(',')[1]) : undefined,
          displayStartValue,
          displayEndValue
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
          displayValue,
          defaultValue: this.getDefaultValue(displayValue)
        });
      } else {
        if (newValue) {
          value = newValue.toString();
        }

        this.setState({
          selectedStartUnixTimestamp:
            value && parseInt(value.split(',')[0]) ? parseInt(value.split(',')[0]) : undefined,
          selectedEndUnixTimestamp:
            value && parseInt(value.split(',')[1]) ? parseInt(value.split(',')[1]) : undefined,
          displayStartValue: displayStartValue || undefined,
          displayEndValue: displayEndValue || undefined
        });
      }
    }
  }

  private handleChangeRaw(event: React.FocusEvent<HTMLInputElement>) {
    let dateValue: any = event.target.value;
    this.setState({
      displayValue: event.target.value
    });
    if (dateValue == '  /  /    ' || dateValue == '  /  /       :     ') {
      this.handleChange(undefined);
    } else {
      if (moment(event.target.value, this.getDateFormat(), true).isValid()) {
        this.handleChange(moment(event.target.value, this.getDateFormat()).toDate());
      }
    }
  }

  private handleChangeRangeStartRaw(event: React.FocusEvent<HTMLInputElement>) {
    let dateValue: any = event.target.value;
    this.setState({
      displayStartValue: event.target.value
    });
    if (dateValue == '  /  /    ' || dateValue == '  /  /       :     ') {
      this.handleChangeRange([
        undefined,
        this.state.displayEndValue
          ? moment(this.state.displayEndValue, this.getDateFormat())
          : undefined
      ]);
    } else {
      if (moment(event.target.value, this.getDateFormat(), true).isValid()) {
        this.handleChangeRange([
          moment(event.target.value, this.getDateFormat()),
          this.state.displayEndValue
            ? moment(this.state.displayEndValue, this.getDateFormat())
            : undefined
        ]);
      }
    }
  }

  private handleChangeRangeEndRaw(event: React.FocusEvent<HTMLInputElement>) {
    let dateValue: any = event.target.value;
    this.setState({
      displayEndValue: event.target.value
    });
    if (dateValue == '  /  /    ' || dateValue == '  /  /       :     ') {
      this.handleChangeRange([
        this.state.displayStartValue
          ? moment(this.state.displayStartValue, this.getDateFormat())
          : undefined,
        undefined
      ]);
    } else {
      if (moment(event.target.value, this.getDateFormat(), true).isValid()) {
        this.handleChangeRange([
          this.state.displayStartValue
            ? moment(this.state.displayStartValue, this.getDateFormat())
            : undefined,
          moment(event.target.value, this.getDateFormat())
        ]);
      }
    }
  }

  private handleChange(date?: Date) {
    if (date) {
      // by default use start of day as value if no time specified
      const unixTimestamp =
        this.props.type === 'datetime' || this.props.options.showTimeSelect
          ? moment(date).unix()
          : moment(date)
              .startOf('day')
              .unix();

      if (this.props.onChange) {
        this.props.onChange(unixTimestamp, date);
      }
    } else {
      if (this.props.onChange) {
        this.props.onChange('');
      }
    }
  }

  private handleChangeRange(date: any) {
    const startDate: any = date[0];
    const endDate: any = date[1];
    // by default use start of day as value if no time specified
    const startUnixTimestamp =
      this.props.type === 'datetime' || this.props.options.showTimeSelect
        ? moment(startDate).unix()
        : moment(startDate)
            .startOf('day')
            .unix();
    const endUnixTimestamp =
      this.props.type === 'datetime' || this.props.options.showTimeSelect
        ? moment(endDate).unix()
        : moment(endDate)
            .startOf('day')
            .unix();

    if (startDate) {
      if (endDate) {
        if (endUnixTimestamp < startUnixTimestamp) {
          this.setState({
            selectedStartUnixTimestamp: startUnixTimestamp,
            selectedEndUnixTimestamp: 0
          });
          if (this.props.onChange) {
            this.props.onChange(startUnixTimestamp + ',' + 0);
          }
        } else {
          this.setState({ selectedStartUnixTimestamp: startUnixTimestamp });
          if (this.props.onChange) {
            this.props.onChange(startUnixTimestamp + ',' + endUnixTimestamp);
          }
        }
      } else {
        this.setState({ selectedStartUnixTimestamp: startUnixTimestamp });
        if (this.props.onChange) {
          this.props.onChange(startUnixTimestamp + ',' + 0);
        }
      }
    } else if (endDate) {
      this.setState({ selectedEndUnixTimestamp: endUnixTimestamp });
      if (this.props.onChange) {
        this.props.onChange(0 + ',' + endUnixTimestamp);
      }
    } else {
      this.setState({
        selectedStartUnixTimestamp: 0,
        selectedEndUnixTimestamp: 0
      });
      if (this.props.onChange) {
        this.props.onChange(0 + ',' + 0);
      }
    }
    // if (endDate) {
    //   const unixTimestamp = moment(endDate).unix();
    //   console.log('date', endDate, unixTimestamp);
    //   if (this.state.selectedStartUnixTimestamp) {
    //     if (this.state.selectedStartUnixTimestamp < unixTimestamp) {
    //       this.setState({ selectedEndUnixTimestamp: unixTimestamp });
    //       if (this.props.onChange) {
    //         this.props.onChange(
    //           this.state.selectedStartUnixTimestamp + ',' + unixTimestamp,
    //           endDate
    //         );
    //       }
    //     } else {
    //       this.setState({ selectedStartUnixTimestamp: unixTimestamp });
    //       this.handleChangeRange(endDate);
    //     }
    //   } else {
    //     this.setState({ selectedEndUnixTimestamp: unixTimestamp });
    //     if (this.props.onChange) {
    //       this.props.onChange(this.state.selectedStartUnixTimestamp + ',' + unixTimestamp, endDate);
    //     }
    //   }
    // }
  }

  private datePickerStatus = (status: any) => {
    if (!status) {
      this.hideDatePicker();
    }
  };

  private hideDatePicker = () => {
    setTimeout(() => {
      this.setState({
        showCalendar: false,
        calendarIconClicked: false
      });
    }, 200);
  };

  private toggleDatePicker = () => {
    if (!this.state.calendarIconClicked) {
      this.setState((prevState): any => {
        return {
          showCalendar: !prevState.showCalendar,
          calendarIconClicked: true
        };
      });
    }
  };

  private getDefaultValue = (displayValue: any) => {
    if (displayValue) {
      return moment(displayValue, this.getDateFormat());
    } else {
      if (this.props.options.startDate || this.props.options.endDate) {
        if (this.props.options.startDate) {
          return moment(this.props.options.startDate);
        } else {
          return moment(this.props.options.endDate);
        }
      } else {
        return moment();
      }
    }
  };

  private disabledDate = (d: any) => {
    if (this.props.options.startDate && this.props.options.endDate) {
      return d.isBefore(this.props.options.startDate) || d.isAfter(this.props.options.endDate);
    }
    if (this.props.options.startDate) {
      return d.isBefore(this.props.options.startDate);
    }
    if (this.props.options.endDate) {
      return d.isAfter(this.props.options.endDate);
    }
  };

  private hideRangeCalendar = () => {
    setTimeout(() => {
      if (this.state.calendarIconClicked) {
        this.setState({ showRangeCalendar: false, calendarIconClicked: false });
      } else {
        this.setState({ showRangeCalendar: true });
      }
    }, 100);
  };

  private showRangeCalendar = () => {
    if (!this.state.calendarIconClicked) {
      this.setState({ showRangeCalendar: true, calendarIconClicked: true });
    } else {
      this.setState({ showRangeCalendar: false });
    }
  };

  private getDateFormat = () => {
    let dateFormat = 'DD/MM/YYYY';
    if (this.props.type === 'datetime' || this.props.options.showTimeSelect) {
      dateFormat = 'DD/MM/YYYY hh:mm a';
    }
    return dateFormat;
  };
}
