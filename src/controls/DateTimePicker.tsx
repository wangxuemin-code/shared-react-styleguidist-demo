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
}

interface IProps extends IContainer {
  placeholder?: string;
  value?: number | string; // value will be in unix timestamp
  onChange?: (newTimestamp: number, newDate: Date) => void;
  options: IDateOption;
}

interface IState {
  selectedUnixTimestamp?: number;
}

export class DateTimePicker extends React.Component<IProps, IState> {
  public static defaultProps: IProps = { options: {} };

  public constructor(props: IProps) {
    super(props);

    this.updateStateWithProps();
  }

  public componentDidUpdate(prevProps: IProps) {
    if (this.props.value !== prevProps.value) {
      this.updateStateWithProps();
    }
  }

  public render() {
    return (
      <React.Fragment>
        <DatePicker
          selected={Formatter.unixTimestampToDate(this.state.selectedUnixTimestamp)}
          onChange={this.handleChange.bind(this)}
          onChangeRaw={this.handleChangeRaw.bind(this)}
          showTimeSelect
          dateFormat='dd-MM-YY hh:mm aa'
          // timeFormat='hh:mm A'
          placeholderText={this.props.placeholder}
          minDate={this.props.options.startDate}
          maxDate={this.props.options.endDate}
        />
        <Controls.Container className={styles.datepickerCalenderContainer}>
          <Controls.Icon icon={faCalendarAlt} />
        </Controls.Container>
      </React.Fragment>
    );
  }

  private updateStateWithProps() {
    let value;
    if (typeof this.props.value === 'string') {
      value = parseInt(this.props.value, 10);
    } else {
      value = this.props.value;
    }

    this.state = {
      selectedUnixTimestamp: value
    };
  }

  private handleChangeRaw(event: React.FocusEvent<HTMLInputElement>) {
    const newMoment = moment(event.target.value, 'DD-MM-YY hh:mm A');
    if (newMoment.isValid()) {
      this.handleChange(newMoment.toDate());
    }
  }

  private handleChange(date: Date) {
    const unixTimestamp = Formatter.dateToUnixTimestamp(date);
    this.setState({ selectedUnixTimestamp: unixTimestamp });

    if (this.props.onChange) {
      this.props.onChange(unixTimestamp, date);
    }
  }
}
