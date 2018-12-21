import * as React from 'react';
import * as styles from '../css/main.scss';
import { Container, IContainer } from './Container';
import { Tabs as BootstrapTabs, Tab as BootstrapTab } from 'react-bootstrap';

interface ITab {
  title: string;
  contents?: any;
}

interface IProps extends IContainer {
  defaultSelectedIndex?: number;
  tabs: ITab[];
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
    return (
      <Container {...this.props}>
        <BootstrapTabs className={styles.istoxTabs} defaultActiveKey={this.state.selectedIndex}>
          {this.props.tabs.map((tab, i) => (
            <BootstrapTab eventKey={i} title={tab.title}>
              {tab.contents}
            </BootstrapTab>
          ))}
        </BootstrapTabs>
      </Container>
    );
  }
}
