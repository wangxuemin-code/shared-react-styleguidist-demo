import * as React from 'react';
import * as styles from '../css/main.scss';
import { IContainer, Container } from './Container';
import moment = require('moment');
import { Input as ReactInput, Icon as ReactIcon, DatePicker as ReactDatePicker } from 'antd';
import MaskedInput from 'antd-mask-input';

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
  selectedStartUnixTimestamp?: number;
  selectedEndUnixTimestamp?: number;
  keyCodeArray?: any[];
  showCalendar?: boolean;
  showStartCalendar?: boolean;
  showEndCalendar?: boolean;
  displayValue?: string;
  displayStartValue?: string;
  displayEndValue?: string;
  defaultValue?: any;
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
    console.log(this.props.value, prevProps.value);
    if (this.props.value !== prevProps.value) {
      this.updateStateWithProps(false, this.props.value ? this.props.value : 0, this.props.type);
    }
  }

  public render() {
    if (this.props.type === 'date' || this.props.type === 'datetime') {
      return (
        <React.Fragment>
          <MaskedInput
            placeholderChar=' '
            mask={this.props.type === 'date' ? '11/11/1111' : '11/11/1111 11:11:11'}
            isRevealingMask={false}
            disabled={this.props.disabled}
            className={'date-input'}
            value={this.state.displayValue}
            suffix={
              <ReactIcon
                onClick={this.showCalendar}
                type='calendar'
                style={{ color: 'rgba(0,0,0)' }}
              />
            }
            placeholder={this.props.placeholder}
            onChange={this.handleChangeRaw.bind(this)}
          />
          {/* <ReactInput
            disabled={this.props.disabled}
            className={'date-input'}
            value={this.state.displayValue}
            suffix={
              <ReactIcon
                onClick={this.showCalendar}
                type='calendar'
                style={{ color: 'rgba(0,0,0)' }}
              />
            }
            placeholder={this.props.placeholder}
            onChange={this.handleChangeRaw.bind(this)}
            // onBlur={this.showCalendar}
          /> */}
          <ReactDatePicker
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
            onOk={this.showCalendar}
            open={this.state.showCalendar}
            showTime={
              this.props.type === 'datetime' || this.props.options.showTimeSelect
                ? { defaultValue: moment('00:00:00', 'HH:mm:ss') }
                : false
            }
          />
        </React.Fragment>
      );
    } else {
      return (
        <Container className={styles.dateGroup}>
          <Container position={'relative'}>
            <MaskedInput
              placeholderChar=' '
              mask={
                this.props.type === 'datetime' || this.props.options.showTimeSelect
                  ? '11/11/1111 11:11:11'
                  : '11/11/1111'
              }
              isRevealingMask={false}
              disabled={this.props.disabled}
              className={'date-input'}
              value={this.state.displayStartValue}
              suffix={
                <ReactIcon
                  onClick={this.showStartCalendar}
                  type='calendar'
                  style={{ color: 'rgba(0,0,0)' }}
                />
              }
              placeholder={this.props.placeholder}
              onChange={this.handleChangeStartRaw.bind(this)}
            />
            <ReactDatePicker
              value={moment(this.state.displayStartValue, this.getDateFormat())}
              disabledDate={this.disabledStartDate}
              disabled={this.props.disabled}
              format={
                this.props.type === 'datetime' || this.props.options.showTimeSelect
                  ? 'DD/MM/YYYY HH:mm:ss'
                  : 'DD/MM/YYYY'
              }
              style={{ visibility: 'hidden', width: 0 }}
              onChange={this.handleChangeStart.bind(this)}
              onOk={this.showStartCalendar}
              open={this.state.showStartCalendar}
              showTime={
                this.props.type === 'datetime' || this.props.options.showTimeSelect
                  ? { defaultValue: moment('00:00:00', 'HH:mm:ss') }
                  : false
              }
            />
          </Container>
          <Container position={'relative'} display={'flex'}>
            <MaskedInput
              placeholderChar=' '
              mask={
                this.props.type === 'datetime' || this.props.options.showTimeSelect
                  ? '11/11/1111 11:11:11'
                  : '11/11/1111'
              }
              isRevealingMask={false}
              disabled={this.props.disabled}
              className={'date-input'}
              value={this.state.displayEndValue}
              suffix={
                <ReactIcon
                  onClick={this.showEndCalendar}
                  type='calendar'
                  style={{ color: 'rgba(0,0,0)' }}
                />
              }
              placeholder={this.props.placeholder}
              onChange={this.handleChangeEndRaw.bind(this)}
            />
            <ReactDatePicker
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
            />
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
          displayValue = moment.unix(value).format('DD/MM/YYYY HH:mm:ss');
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
              ? moment.unix(value.split(',')[0]).format('DD/MM/YYYY HH:mm:ss')
              : '';
          displayEndValue =
            value.split(',')[1] !== '0'
              ? moment.unix(value.split(',')[1]).format('DD/MM/YYYY HH:mm:ss')
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
        value = newValue.toString();
        this.state = {
          selectedStartUnixTimestamp: parseInt(value.split(',')[0])
            ? parseInt(value.split(',')[0])
            : undefined,
          selectedEndUnixTimestamp: parseInt(value.split(',')[1])
            ? parseInt(value.split(',')[1])
            : undefined,
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
        this.setState({
          selectedStartUnixTimestamp: parseInt(value.split(',')[0])
            ? parseInt(value.split(',')[0])
            : undefined,
          selectedEndUnixTimestamp: parseInt(value.split(',')[1])
            ? parseInt(value.split(',')[1])
            : undefined,
          displayStartValue,
          displayEndValue
        });
      }
    }
  }

  private handleChangeRaw(event: React.FocusEvent<HTMLInputElement>) {
    this.setState({
      displayValue: event.target.value
    });
    if (moment(event.target.value, this.getDateFormat(), true).isValid()) {
      this.handleChange(moment(event.target.value, this.getDateFormat()).toDate());
    }
  }

  private handleChangeStartRaw(event: React.FocusEvent<HTMLInputElement>) {
    this.setState({
      displayStartValue: event.target.value
    });
    if (moment(event.target.value, this.getDateFormat(), true).isValid()) {
      this.handleChangeStart(moment(event.target.value, this.getDateFormat()).toDate());
    }
  }

  private handleChangeEndRaw(event: React.FocusEvent<HTMLInputElement>) {
    this.setState({
      displayEndValue: event.target.value
    });
    if (moment(event.target.value, this.getDateFormat(), true).isValid()) {
      this.handleChangeEnd(moment(event.target.value, this.getDateFormat()).toDate());
    }
  }

  private handleChange(date: Date) {
    if (date) {
      const unixTimestamp = moment(date).unix();
      this.setState({
        showCalendar: false
      });
      if (this.props.onChange) {
        this.props.onChange(unixTimestamp, date);
      }
    }
  }

  private handleChangeStart(date: Date) {
    if (date) {
      const unixTimestamp = moment(date).unix();
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

  private handleChangeEnd(date: Date) {
    if (date) {
      const unixTimestamp = moment(date).unix();
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

  private showCalendar = () => {
    if (this.state.showCalendar) {
      this.setState({ showCalendar: false });
    } else {
      this.setState({ showCalendar: true });
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

  private disabledStartDate = (d: any) => {
    const { displayEndValue, displayStartValue }: any = this.state;
    if (!displayStartValue || !displayEndValue) {
      return false;
    }
    return d.isAfter(new Date(moment(displayEndValue).format(this.getDateFormat())));
  };

  private disabledEndDate = (d: any) => {
    const { displayEndValue, displayStartValue }: any = this.state;
    if (!displayStartValue || !displayEndValue) {
      return false;
    }
    return d.isBefore(new Date(moment(displayStartValue).format(this.getDateFormat())));
  };

  private showStartCalendar = () => {
    if (this.state.showStartCalendar) {
      this.setState({ showStartCalendar: false });
    } else {
      this.setState({ showStartCalendar: true, showEndCalendar: false });
    }
  };

  private showEndCalendar = () => {
    if (this.state.showEndCalendar) {
      this.setState({ showEndCalendar: false });
    } else {
      this.setState({ showEndCalendar: true, showStartCalendar: false });
    }
  };

  private getDateFormat = () => {
    let dateFormat = 'DD/MM/YYYY';
    if (this.props.type === 'datetime' || this.props.options.showTimeSelect) {
      dateFormat = 'DD/MM/YYYY HH:mm:ss';
    }
    return dateFormat;
  };
}
