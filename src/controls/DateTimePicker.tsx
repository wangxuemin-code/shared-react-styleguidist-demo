import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';
import DatePicker from 'react-datepicker';
import * as styles from '../css/main.scss';
import { Controls } from '../index-prod';
import { IContainer } from './Container';
import { Formatter } from '../helpers';
import moment = require('moment');

export interface IDateOption {
  endDate?: Date;
  startDate?: Date;
  showTimeSelect?: boolean;
}

interface IProps extends IContainer {
  type?: string;
  placeholder?: string;
  value?: number | string; // value will be in unix timestamp
  onChange?: (newTimestamp: number, newDate: Date) => void;
  options: IDateOption;
}

interface IState {
  selectedStartUnixTimestamp?: number;
  selectedEndUnixTimestamp?: number;
}

export class DateTimePicker extends React.Component<IProps, IState> {
  public static defaultProps: IProps = { options: {} };

  public constructor(props: IProps) {
    super(props);
    this.updateStateWithProps(true, this.props.value ? this.props.value : 0);
  }

  public componentDidUpdate(prevProps: IProps) {
    if (this.props.value !== prevProps.value) {
      this.updateStateWithProps(false, this.props.value ? this.props.value : 0);
    }
  }

  public render() {
    if (this.props.type === 'date') {
      return (
        <React.Fragment>
          <DatePicker
            selected={Formatter.unixTimestampToDate(this.state.selectedStartUnixTimestamp)}
            onChange={this.handleChangeStart.bind(this)}
            onChangeRaw={this.handleChangeRawStart.bind(this)}
            showTimeSelect={false}
            dateFormat='dd-MM-YY'
            placeholderText={this.props.placeholder}
            minDate={this.props.options.startDate}
            maxDate={this.props.options.endDate}
            showMonthDropdown
            showYearDropdown
            dropdownMode='select'
          />
          <Controls.Container className={styles.datepickerCalenderContainer}>
            <Controls.Icon icon={faCalendarAlt} />
          </Controls.Container>
        </React.Fragment>
      );
    } else if (this.props.type === 'datetime') {
      return (
        <React.Fragment>
          <DatePicker
            selected={Formatter.unixTimestampToDate(this.state.selectedStartUnixTimestamp)}
            onChange={this.handleChangeStart.bind(this)}
            onChangeRaw={this.handleChangeRawStart.bind(this)}
            showTimeSelect={true}
            dateFormat='dd-MM-YY hh:mm aa'
            placeholderText={this.props.placeholder}
            minDate={this.props.options.startDate}
            maxDate={this.props.options.endDate}
            showMonthDropdown
            showYearDropdown
            dropdownMode='select'
          />
          <Controls.Container className={styles.datepickerCalenderContainer}>
            <Controls.Icon icon={faCalendarAlt} />
          </Controls.Container>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <DatePicker
            selected={Formatter.unixTimestampToDate(this.state.selectedStartUnixTimestamp)}
            onChange={this.handleChangeStart.bind(this)}
            onChangeRaw={this.handleChangeRawStart.bind(this)}
            showTimeSelect={this.props.options.showTimeSelect}
            dateFormat='dd-MM-YY hh:mm aa'
            placeholderText={this.props.placeholder}
            minDate={this.props.options.startDate}
            maxDate={this.props.options.endDate}
            selectsStart
            startDate={Formatter.unixTimestampToDate(this.state.selectedStartUnixTimestamp)}
            endDate={Formatter.unixTimestampToDate(this.state.selectedEndUnixTimestamp)}
            showMonthDropdown
            showYearDropdown
            dropdownMode='select'
          />
          <Controls.Container
            margin={{ rightRem: 1 }}
            position={'relative'}
            className={styles.datepickerCalenderContainer}
          >
            <Controls.Icon icon={faCalendarAlt} />
          </Controls.Container>
          <DatePicker
            selected={Formatter.unixTimestampToDate(this.state.selectedEndUnixTimestamp)}
            onChange={this.handleChangeEnd.bind(this)}
            onChangeRaw={this.handleChangeRawEnd.bind(this)}
            showTimeSelect={this.props.options.showTimeSelect}
            dateFormat='dd-MM-YY hh:mm aa'
            placeholderText={this.props.placeholder}
            minDate={this.props.options.startDate}
            maxDate={this.props.options.endDate}
            selectsEnd
            startDate={Formatter.unixTimestampToDate(this.state.selectedStartUnixTimestamp)}
            endDate={Formatter.unixTimestampToDate(this.state.selectedEndUnixTimestamp)}
            showMonthDropdown
            showYearDropdown
            dropdownMode='select'
          />
          <Controls.Container position={'relative'} className={styles.datepickerCalenderContainer}>
            <Controls.Icon icon={faCalendarAlt} />
          </Controls.Container>
        </React.Fragment>
      );
    }
  }

  private updateStateWithProps(firstCall: boolean, newValue: number | string) {
    let value = newValue;
    if (typeof newValue === 'string') {
      value = parseInt(newValue, 10);
    } else {
      value = newValue;
    }
    if (firstCall) {
      this.state = {
        selectedStartUnixTimestamp: value,
        selectedEndUnixTimestamp: value
      };
    } else {
      this.setState({
        selectedStartUnixTimestamp: value,
        selectedEndUnixTimestamp: value
      });
    }
  }

  private handleChangeRawStart(event: React.FocusEvent<HTMLInputElement>) {
    const newMoment = moment(event.target.value, 'DD-MM-YY hh:mm A');
    if (newMoment.isValid()) {
      this.handleChangeStart(newMoment.toDate());
    }
  }

  private handleChangeStart(date: Date) {
    const unixTimestamp = Formatter.dateToUnixTimestamp(date);
    if (this.state.selectedEndUnixTimestamp) {
      if (this.state.selectedEndUnixTimestamp < unixTimestamp) {
        this.setState({ selectedEndUnixTimestamp: 0 });
        this.setState({ selectedStartUnixTimestamp: unixTimestamp });
        if (this.props.onChange) {
          this.props.onChange(unixTimestamp, date);
        }
      } else {
        this.setState({ selectedStartUnixTimestamp: unixTimestamp });
        if (this.props.onChange) {
          this.props.onChange(unixTimestamp, date);
        }
      }
    } else {
      this.setState({ selectedStartUnixTimestamp: unixTimestamp });
      if (this.props.onChange) {
        this.props.onChange(unixTimestamp, date);
      }
    }
  }

  private handleChangeRawEnd(event: React.FocusEvent<HTMLInputElement>) {
    const newMoment = moment(event.target.value, 'DD-MM-YY hh:mm A');
    if (newMoment.isValid()) {
      this.handleChangeEnd(newMoment.toDate());
    }
  }

  private handleChangeEnd(date: Date) {
    const unixTimestamp = Formatter.dateToUnixTimestamp(date);
    if (this.state.selectedStartUnixTimestamp) {
      if (this.state.selectedStartUnixTimestamp < unixTimestamp) {
        this.setState({ selectedEndUnixTimestamp: unixTimestamp });
        if (this.props.onChange) {
          this.props.onChange(unixTimestamp, date);
        }
      } else {
        this.setState({ selectedStartUnixTimestamp: unixTimestamp });
        this.handleChangeStart(date);
      }
    } else {
      this.setState({ selectedEndUnixTimestamp: unixTimestamp });
      if (this.props.onChange) {
        this.props.onChange(unixTimestamp, date);
      }
    }
  }
}
