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
}

interface IProps extends IContainer {
  defaultSelectedIndex?: number;
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
    defaultSelectedIndex: 0
  };

  constructor(props: IProps) {
    super(props);

    this.state = { selectedIndex: this.props.defaultSelectedIndex! };
    this.onTabChanged(this.props.tabs[this.props.defaultSelectedIndex || 0].tabName);
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
          defaultActiveKey={this.state.selectedIndex}
          id='istox-tab'
          onSelect={this.handleSelect}
        >
          {this.props.children && <Container>{this.props.children}</Container>}
          {this.props.tabs.map((tab, i) => (
            <BootstrapTab key={i} eventKey={i} title={tab.title}>
              {tab.contents}
            </BootstrapTab>
          ))}
        </BootstrapTabs>
      </Container>
    );
  }

  private handleSelect = (index: any) => {
    this.onTabChanged(this.props.tabs[index].tabName);
  };

  private onTabChanged = (tabName?: string) => {
    if (tabName && this.props.onTabSelected) {
      this.props.onTabSelected(tabName);
    }
  };
}
