import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';
import DatePicker from 'react-datepicker';
import * as styles from '../css/main.scss';
import { Controls } from '../index-prod';
import { IContainer } from './Container';
import { Formatter } from '../helpers';

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

  public render() {
    return (
      <React.Fragment>
        <DatePicker
          selected={Formatter.unixTimestampToDate(this.state.selectedUnixTimestamp)}
          onChange={this.handleChange.bind(this)}
          showTimeSelect
          dateFormat='dd-MM-yy hh:mm aa'
          timeFormat='hh:mm aa'
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

  private handleChange(date: Date) {
    const unixTimestamp = Formatter.dateToUnixTimestamp(date);
    this.setState({ selectedUnixTimestamp: unixTimestamp });

    if (this.props.onChange) {
      this.props.onChange(unixTimestamp, date);
    }
  }
}
