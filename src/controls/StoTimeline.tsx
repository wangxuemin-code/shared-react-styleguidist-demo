import * as React from 'react';
import { Moment } from 'moment';
import moment = require('moment');
import * as styles from '../css/main.scss';
import { Container, IContainer } from './Container';

interface IStoDateTime {
  createdAt: string;
  bookbuildingStartTime: string;
  bookbuildingEndTime: string;
  preSaleStartTime: string;
  preSaleEndTime: string;
  publicSaleStartTime: string;
  publicSaleEndTime: string;
}

interface IProps extends IContainer {
  stoDateTime: IStoDateTime;
  onImportantDateClicked?: (type: string) => void;
  hideTitle?: boolean;
}

interface IState {
  selectedDateKey: string;
}

export class StoTimeLine extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);

    this.state = {
      selectedDateKey: ''
    };
  }

  render() {
    const phases: Array<{ title: string; date: Moment; key?: string; clickable: boolean }> = [];
    phases.push(
      {
        title: 'STO created',
        date: moment(this.props.stoDateTime.createdAt),
        clickable: this.hasDatePast(moment(this.props.stoDateTime.createdAt))
      },
      {
        title: 'Book Building',
        key: 'book_building',
        date: moment(this.props.stoDateTime.bookbuildingStartTime), // < cu
        clickable: this.hasDatePast(moment(this.props.stoDateTime.bookbuildingStartTime))
      },
      {
        title: 'Allocation',
        date: moment(this.props.stoDateTime.bookbuildingEndTime),
        clickable: false
      },
      {
        title: 'Pre-sale',
        key: 'presale',
        date: moment(this.props.stoDateTime.preSaleStartTime),
        clickable: this.hasDatePast(moment(this.props.stoDateTime.preSaleStartTime))
      },
      {
        title: 'Pre-sale closed',
        date: moment(this.props.stoDateTime.preSaleEndTime),
        clickable: false
      },
      {
        title: 'Public sale',
        key: 'public_sale',
        date: moment(this.props.stoDateTime.publicSaleStartTime),
        clickable: this.hasDatePast(moment(this.props.stoDateTime.publicSaleStartTime))
      },
      {
        title: 'Launch',
        key: 'confirmed',
        date: moment(this.props.stoDateTime.publicSaleEndTime),
        clickable: this.hasDatePast(moment(this.props.stoDateTime.publicSaleEndTime))
      }
    );

    return (
      <Container id='timeline' {...this.props}>
        {!this.props.hideTitle && (
          <Container className={styles.stoMainTitle} margin={{ bottomPx: 130 }}>
            STO Timeline
          </Container>
        )}
        <Container className={styles.stoTimelineContainer}>
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
                  classNames={[styles.dot, phase.clickable ? styles.big : '']}
                  style={{
                    cursor: !phase.clickable ? 'arrow' : 'pointer'
                  }}
                  onClick={phase.clickable ? this.onDateClicked.bind(this, phase.key || '') : undefined}
                >
                  {phase.clickable && <div className={styles.tick} />}
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

  hasDatePast(date: any) {
    return moment(date) <= moment();
  }

  getBarPercent(prevDate: any, nextDate: any): number {
    if (!prevDate) {
      return 0;
    }

    if (this.hasDatePast(nextDate)) {
      return 0;
    }

    const maxUnix = moment(nextDate).unix() - moment(prevDate).unix();
    const currentUnix = moment().unix() - moment(prevDate).unix();

    const percent = Math.min(100, 100 - (currentUnix / maxUnix) * 100);

    return percent;
  }

  onDateClicked = (key: string) => {
    if (this.props.onImportantDateClicked) {
      if (this.state.selectedDateKey === key) {
        this.setState({ selectedDateKey: '' });
        this.props.onImportantDateClicked('');
      } else {
        this.setState({ selectedDateKey: key });
        this.props.onImportantDateClicked(key);
      }
    }
  };

  getActiveStyle = (currentPhaseDate: Moment, nextPhaseDate: Moment | undefined, phaseKey: string) => {
    if (this.props.onImportantDateClicked) {
      if (this.hasDatePast(currentPhaseDate)) {
        return this.state.selectedDateKey === phaseKey ? styles.active : styles.halfActive;
      } else {
        return '';
      }
    } else if (nextPhaseDate !== undefined) {
      return this.hasDatePast(currentPhaseDate) && !this.hasDatePast(nextPhaseDate)
        ? styles.active
        : this.hasDatePast(currentPhaseDate)
        ? styles.completed
        : '';
    } else {
      return '';
    }
  };
}
