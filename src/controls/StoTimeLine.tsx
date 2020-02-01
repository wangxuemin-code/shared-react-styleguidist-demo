import * as React from 'react';
import { Moment } from 'moment';
import moment = require('moment');
import * as styles from '../css/main.scss';
import { Container, IContainer } from '.';

interface IStoDateTime {
  bookbuildingStartTime?: string;
  bookbuildingEndTime?: string;
  offeringCreatedTime?: string;
  preSaleStartTime: string;
  preSaleEndTime: string;
  publicSaleStartTime: string;
  publicSaleEndTime: string;
  issueDateTime: string;
  terminatedAt?: string;
}

interface IProps extends IContainer {
  stoDateTime: IStoDateTime;
  defaultPhase?: string;
  onImportantDateClicked?: (type: string) => void;
  hideTitle?: boolean;
}

type Phases = Array<{
  title: any;
  date: Moment;
  key?: string;
  clickable: boolean;
  isBig: boolean;
}>;

interface IState {
  selectedDateKey: string;
  phases: Phases;
}

export class StoTimeLine extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);

    const phases: Phases = [];

    if (this.props.stoDateTime.offeringCreatedTime) {
      phases.push({
        title: <>Offering Created</>,
        key: 'offering_created',
        date: moment(this.props.stoDateTime.offeringCreatedTime),
        clickable: false,
        isBig: false
      });
    }

    if (this.props.stoDateTime.bookbuildingStartTime) {
      phases.push({
        title: (
          <>
            Start Of
            <br />
            Book Building
          </>
        ),
        key: 'book_building',
        date: moment(this.props.stoDateTime.bookbuildingStartTime),
        clickable: this.hasDatePast(moment(this.props.stoDateTime.bookbuildingStartTime)),
        isBig: true
      });
    }
    if (this.props.stoDateTime.bookbuildingEndTime) {
      phases.push({
        title: (
          <>
            End Of
            <br />
            Book Building
          </>
        ),
        key: 'allocation',
        date: moment(this.props.stoDateTime.bookbuildingEndTime),
        clickable: true,
        isBig: false
      });
    }
    if (this.props.stoDateTime.preSaleStartTime) {
      phases.push({
        title: (
          <>
            Start Of <br /> Pre-Sale
          </>
        ),
        key: 'presale',
        date: moment(this.props.stoDateTime.preSaleStartTime),
        clickable: this.hasDatePast(moment(this.props.stoDateTime.preSaleStartTime)),
        isBig: true
      });
    }
    if (this.props.stoDateTime.preSaleEndTime) {
      phases.push({
        title: (
          <>
            End Of <br /> Pre-Sale
          </>
        ),
        date: moment(this.props.stoDateTime.preSaleEndTime),
        clickable: false,
        isBig: false
      });
    }
    if (this.props.stoDateTime.publicSaleStartTime) {
      phases.push({
        title: (
          <>
            Start Of <br /> Public Sale
          </>
        ),
        key: 'public_sale',
        date: moment(this.props.stoDateTime.publicSaleStartTime),
        clickable: this.hasDatePast(moment(this.props.stoDateTime.publicSaleStartTime)),
        isBig: true
      });
    }
    if (this.props.stoDateTime.publicSaleEndTime) {
      phases.push({
        title: (
          <>
            End Of <br /> Public Sale
          </>
        ),
        date: moment(this.props.stoDateTime.publicSaleEndTime),
        clickable: false,
        isBig: false
      });
    }
    if (this.props.stoDateTime.issueDateTime) {
      phases.push({
        title: (
          <>
            Start Of <br /> Secondary Trading
          </>
        ),
        key: 'confirmed',
        date: moment(this.props.stoDateTime.issueDateTime),
        clickable: this.hasDatePast(moment(this.props.stoDateTime.issueDateTime)),
        isBig: true
      });
    }

    this.state = {
      selectedDateKey: this.props.defaultPhase || '',
      phases: phases
    };
  }

  render() {
    const { phases } = this.state;

    return (
      <Container id='timeline' {...this.props}>
        {!this.props.hideTitle && (
          <Container className={styles.stoMainTitle} margin={{ bottomPx: 130 }}>
            Offering Timeline
          </Container>
        )}
        <Container
          classNames={[styles.stoTimelineContainer, this.props.stoDateTime.terminatedAt ? styles.disabled : '']}
          style={{ gridTemplateColumns: `0px repeat(${phases.length - 1}, auto)` }}
        >
          {phases.map((phase, i) => {
            const nextPhaseDate = i < phases.length - 1 ? phases[i + 1].date : undefined;
            return (
              <Container
                key={i}
                classNames={[styles.point, this.getActiveStyle(phase.date, nextPhaseDate, phase.key || 'empty')]}
              >
                <Container
                  className={styles.inner}
                  style={{
                    width: `${this.getBarPercent(i === 0 ? null : phases[i - 1].date, phase.date)}%`
                  }}
                />
                <Container
                  classNames={[styles.dot, phase.isBig ? styles.big : '']}
                  style={{
                    cursor: !phase.clickable ? 'arrow' : 'pointer'
                  }}
                  onClick={phase.clickable ? this.onDateClicked.bind(this, phase.key || '') : undefined}
                >
                  {this.shouldShowTick(phase.date, nextPhaseDate) && <div className={styles.tick} />}
                  <Container className={styles.textContainer}>
                    <Container className={styles.date}>{phase.date.format('D MMM YYYY')}</Container>
                    <Container className={styles.time}>{phase.date.format('hh:mm A')}</Container>
                    <Container className={styles.title}>{phase.title}</Container>
                  </Container>
                </Container>
              </Container>
            );
          })}
        </Container>
      </Container>
    );
  }

  private getRelativeMoment() {
    if (this.props.stoDateTime.terminatedAt) {
      return moment(this.props.stoDateTime.terminatedAt);
    } else {
      return moment();
    }
  }

  hasDatePast(date: any) {
    return moment(date) <= this.getRelativeMoment();
  }

  getBarPercent(prevDate: any, nextDate: any): number {
    if (!prevDate) {
      return 0;
    }

    if (this.hasDatePast(nextDate)) {
      return 0;
    }

    const maxUnix = moment(nextDate).unix() - moment(prevDate).unix();
    const currentUnix = this.getRelativeMoment().unix() - moment(prevDate).unix();

    const percent = Math.min(100, 100 - (currentUnix / maxUnix) * 100);

    return percent;
  }

  onDateClicked = (key: string) => {
    if (this.props.onImportantDateClicked) {
      this.setState({ selectedDateKey: key });
      this.props.onImportantDateClicked(key);
    }
  };

  shouldShowTick = (currentPhaseDate: Moment, nextPhaseDate: Moment | undefined) => {
    if (nextPhaseDate === undefined && this.hasDatePast(currentPhaseDate)) {
      return true;
    } else if (nextPhaseDate === undefined && !this.hasDatePast(currentPhaseDate)) {
      return false;
    } else {
      return this.hasDatePast(nextPhaseDate);
    }
  };

  getActiveStyle = (currentPhaseDate: Moment, nextPhaseDate: Moment | undefined, phaseKey: string) => {
    if (this.props.onImportantDateClicked) {
      if (
        this.hasDatePast(currentPhaseDate) &&
        !this.hasDatePast(nextPhaseDate) &&
        this.state.selectedDateKey === phaseKey
      ) {
        return styles.active;
      } else if (this.hasDatePast(currentPhaseDate) && this.state.selectedDateKey === phaseKey) {
        return `${styles.completed} ${styles.textActive}`;
      } else if (
        this.hasDatePast(currentPhaseDate) &&
        !this.hasDatePast(nextPhaseDate) &&
        this.state.selectedDateKey !== phaseKey
      ) {
        return styles.halfActive;
      } else if (this.hasDatePast(currentPhaseDate)) {
        return styles.completed;
      } else {
        return '';
      }
    } else {
      return this.hasDatePast(currentPhaseDate) && nextPhaseDate && !this.hasDatePast(nextPhaseDate)
        ? styles.active
        : this.hasDatePast(currentPhaseDate)
        ? styles.completed
        : '';
    }
  };
}