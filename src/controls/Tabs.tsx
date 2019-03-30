import * as React from 'react';
import * as styles from '../css/main.scss';
import { Container, IContainer } from './Container';
import { Tabs as BootstrapTabs, Tab as BootstrapTab } from 'react-bootstrap';

interface ITab {
  title: any;
  contents?: any;
  className?: string;
  icon?: string;
}

interface IProps extends IContainer {
  defaultSelectedIndex?: number;
  tabs: ITab[];
  orientation?: 'vertical' | 'horizontal';
  align?: 'left' | 'middle' | 'right';
  basic?: boolean;
}

interface IState {
  selectedIndex: number;
}

export class Tabs extends React.Component<IProps, IState> {
  public static defaultProps = {
    defaultSelectedIndex: 0
  };

  constructor(props: IProps) {
    super(props);

    this.state = { selectedIndex: this.props.defaultSelectedIndex! };
  }

  public render() {
    let classes: string[] = [this.props.className ? this.props.className : ''];

    if (this.props.orientation) {
      classes.push(this.props.orientation);
    }
    if (this.props.align) {
      classes.push(this.props.align);
    }
    if (this.props.basic) {
      classes.push('basic');
    }
    if (this.props.classNames) {
      classes = classes.concat(this.props.classNames);
    }
    return (
      <Container {...this.props} className={styles.istoxTabsContainer}>
        <BootstrapTabs
          //className={styles.istoxTabs}
          className={classes.join(' ')}
          defaultActiveKey={this.state.selectedIndex}
          id='istox-tab'
        >
          {this.props.tabs.map((tab, i) => (
            <BootstrapTab key={i} eventKey={i} title={tab.title}>
              {tab.contents}
            </BootstrapTab>
          ))}
        </BootstrapTabs>
      </Container>
    );
  }
}
