import * as React from 'react';
import * as styles from '../css/main.scss';
import ReactTabs from 'antd/es/tabs';
import { Container, IContainer } from '.';

interface ITab {
  title: any;
  tabName?: string;
  contents?: any;
  className?: string;
  icon?: string;
  disabled?: boolean;
}

interface IProps extends IContainer {
  variant?: 'primary' | 'secondary' | 'info' | 'disabled' | 'light' | 'dark' | 'success' | 'warning' | 'danger';
  selectedIndex?: number;
  tabs: ITab[];
  orientation?: 'vertical' | 'horizontal';
  align?: 'left' | 'middle' | 'right';
  basic?: boolean;
  onTabSelected?: (tabName: string) => void;
  onSelectedIndexChanged?: (selectedIndex: number) => void;
  id?: string;
  extraControls?: any;
  animated?: boolean | { inkBar: boolean; tabPane: boolean };
  lazyLoad?: boolean;
}

interface IState {
  selectedIndex: number;
}

export class Tabs extends React.Component<IProps, IState> {
  public static defaultProps = {
    selectedIndex: 0,
    orientation: 'horizontal',
    tabsContentOrientation: 'inline',
    lazyLoad: false
  };

  constructor(props: IProps) {
    super(props);

    this.state = { selectedIndex: this.props.selectedIndex || 0 };
    this.onTabChanged(this.props.selectedIndex || 0, this.props.tabs[this.props.selectedIndex || 0].tabName);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ selectedIndex: this.state.selectedIndex });
    }, 1000);
  }

  componentDidUpdate(prevProps: IProps) {
    if (prevProps.selectedIndex !== this.props.selectedIndex) {
      this.handleSelect(this.props.selectedIndex);
    }
  }

  public render() {
    let classes: string[] = [
      styles.istoxTabs,
      this.props.className ? this.props.className : '',
      this.props.orientation ? this.props.orientation : '',
      this.props.align ? this.props.align : '',
      this.props.basic ? styles.basic : '',
      this.props.variant || ''
    ];

    classes = classes.filter(function(el) {
      return el != '';
    });

    if (this.props.classNames) {
      classes = classes.concat(this.props.classNames);
    }

    let filteredProps = {
      ...this.props
    };
    const { TabPane } = ReactTabs;
    return (
      <Container id={this.props.id || 'istox-tabs'} {...filteredProps} className={classes.join(' ')}>
        <ReactTabs
          tabBarExtraContent={this.props.extraControls}
          tabPosition={this.props.orientation === 'vertical' ? 'left' : 'top'}
          activeKey={this.state.selectedIndex.toString()}
          onChange={this.handleSelect}
          tabBarGutter={0}
          type={this.props.basic ? 'line' : 'card'}
          animated={this.props.animated}
        >
          {this.props.children && <Container>{this.props.children}</Container>}
          {this.props.tabs.map((tab, i) => (
            <TabPane key={i.toString()} tab={tab.title} disabled={tab.disabled} forceRender={!this.props.lazyLoad}>
              {tab.contents}
            </TabPane>
          ))}
        </ReactTabs>
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
    // console.log(index);
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
    // console.log(this.state.selectedIndex, index);
    if (this.state.selectedIndex != index) {
      this.setState({ selectedIndex: index });
    }
    this.onTabChanged(index, this.props.tabs[index].tabName);
  };

  private onTabChanged = (index: number, tabName?: string) => {
    if (tabName && this.props.onTabSelected) {
      this.props.onTabSelected(tabName);
    }

    if (this.props.onSelectedIndexChanged) {
      this.props.onSelectedIndexChanged(index);
    }
  };
}
