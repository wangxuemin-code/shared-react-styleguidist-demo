import * as React from 'react';
import * as styles from '../css/main.scss';
import { Container, IContainer } from './Container';
import { Tabs as BootstrapTabs, Tab as BootstrapTab } from 'react-bootstrap';

interface ITab {
  title: any;
  tabName?: string;
  contents?: any;
  className?: string;
  icon?: string;
  disabled?: boolean;
}

interface IProps extends IContainer {
  selectedIndex?: number;
  tabs: ITab[];
  orientation?: 'vertical' | 'horizontal';
  align?: 'left' | 'middle' | 'right';
  basic?: boolean;
  onTabSelected?: (tabName: string) => void;
}

interface IState {
  selectedIndex: number;
}

export class Tabs extends React.Component<IProps, IState> {
  public static defaultProps = {
    selectedIndex: 0
  };

  constructor(props: IProps) {
    super(props);

    this.state = { selectedIndex: this.props.selectedIndex! };
    this.onTabChanged(this.props.tabs[this.props.selectedIndex || 0].tabName);
  }

  componentDidUpdate(prevProps: IProps) {
    if (prevProps.selectedIndex !== this.props.selectedIndex) {
      this.handleSelect(this.props.selectedIndex);
    }
  }

  public render() {
    let classes: string[] = [
      this.props.className ? this.props.className : '',
      this.props.orientation ? this.props.orientation : '',
      this.props.align ? this.props.align : '',
      this.props.basic ? styles.basic : ''
    ];

    classes = classes.filter(function(el) {
      return el != '';
    });

    if (this.props.classNames) {
      classes = classes.concat(this.props.classNames);
    }
    return (
      <Container {...this.props} className={styles.istoxTabsContainer}>
        <BootstrapTabs
          //className={styles.istoxTabs}
          className={classes.join(' ')}
          activeKey={this.state.selectedIndex}
          id='istox-tab'
          onSelect={this.handleSelect}
        >
          {this.props.children && <Container>{this.props.children}</Container>}
          {this.props.tabs.map((tab, i) => (
            <BootstrapTab key={i} eventKey={i} title={tab.title} disabled={tab.disabled}>
              {tab.contents}
            </BootstrapTab>
          ))}
        </BootstrapTabs>
      </Container>
    );
  }

  public goToNext() {
    const index = Math.min(this.state.selectedIndex + 1, this.props.tabs.length - 1);
    this.setState(
      {
        selectedIndex: index
      },
      () => {
        this.handleSelect(index);
      }
    );
  }

  public goToPrevious() {
    const index = Math.max(this.state.selectedIndex - 1, 0);
    this.setState(
      {
        selectedIndex: index
      },
      () => {
        this.handleSelect(index);
      }
    );
  }

  public goTo(index: number) {
    this.setState(
      {
        selectedIndex: index
      },
      () => {
        this.handleSelect(index);
      }
    );
  }

  private handleSelect = (index: any) => {
    if (this.state.selectedIndex != index) {
      this.setState({ selectedIndex: index });
    }

    this.onTabChanged(this.props.tabs[index].tabName);
  };

  private onTabChanged = (tabName?: string) => {
    if (tabName && this.props.onTabSelected) {
      this.props.onTabSelected(tabName);
    }
  };
}
