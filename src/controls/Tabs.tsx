// import * as React from 'react';
// import * as styles from '../css/main.scss';
// import { Container, IContainer } from './Container';
// import { Grid } from './Grid';
// import {
//   Tabs as BootstrapTabs,
//   Tab as BootstrapTab,
//   Nav as BootstrapNav,
//   NavItem as BootstrapNavItem
// } from 'react-bootstrap';

// interface ITab {
//   title: any;
//   tabName?: string;
//   contents?: any;
//   className?: string;
//   icon?: string;
//   disabled?: boolean;
// }

// interface IProps extends IContainer {
//   variant?: 'primary' | 'secondary' | 'info' | 'disabled' | 'success' | 'warning' | 'danger';
//   selectedIndex?: number;
//   tabs: ITab[];
//   orientation?: 'vertical' | 'horizontal';
//   tabsContentOrientation?: 'stacked' | 'inline';
//   align?: 'left' | 'middle' | 'right';
//   basic?: boolean;
//   onTabSelected?: (tabName: string) => void;
//   id?: string;
// }

// interface IState {
//   selectedIndex: number;
// }

// export class Tabs extends React.Component<IProps, IState> {
//   public static defaultProps = {
//     selectedIndex: 0,
//     orientation: 'horizontal',
//     tabsContentOrientation: 'inline'
//   };

//   constructor(props: IProps) {
//     super(props);

//     this.state = { selectedIndex: this.props.selectedIndex! };
//     this.onTabChanged(this.props.tabs[this.props.selectedIndex || 0].tabName);
//   }

//   componentDidUpdate(prevProps: IProps) {
//     if (prevProps.selectedIndex !== this.props.selectedIndex) {
//       this.handleSelect(this.props.selectedIndex);
//     }
//   }

//   public render() {
//     let classes: string[] = [
//       this.props.className ? this.props.className : '',
//       this.props.orientation ? this.props.orientation : '',
//       this.props.align ? this.props.align : '',
//       this.props.basic ? styles.basic : '',
//       this.props.variant || '',
//       this.props.tabsContentOrientation ? this.props.tabsContentOrientation : ''
//     ];

//     classes = classes.filter(function(el) {
//       return el != '';
//     });

//     if (this.props.classNames) {
//       classes = classes.concat(this.props.classNames);
//     }
//     let filteredProps = {
//       ...this.props,
//       ...{ id: undefined }
//     };
//     return (
//       <Container {...filteredProps} className={styles.istoxTabsContainer}>
//         {this.props.orientation === 'horizontal' && (
//           <BootstrapTabs
//             id={this.props.id || 'istox-tabs'}
//             className={classes.join(' ')}
//             activeKey={this.state.selectedIndex}
//             onSelect={this.handleSelect}
//           >
//             {this.props.children && <Container>{this.props.children}</Container>}
//             {this.props.tabs.map((tab, i) => (
//               <BootstrapTab key={i} eventKey={i} title={tab.title} disabled={tab.disabled}>
//                 {tab.contents}
//               </BootstrapTab>
//             ))}
//           </BootstrapTabs>
//         )}
//         {this.props.orientation === 'vertical' && (
//           <BootstrapTab.Container
//             id={this.props.id || 'istox-tabs'}
//             defaultActiveKey={this.state.selectedIndex}
//           >
//             <Grid className={classes.join(' ')}>
//               <Grid.Row fitted>
//                 <Grid.Col col={3}>
//                   {this.props.children && <Container>{this.props.children}</Container>}
//                   <BootstrapNav className='nav-tabs'>
//                     {this.props.tabs.map((tab, i) => (
//                       <BootstrapNavItem key={i} eventKey={i}>
//                         {tab.title}
//                       </BootstrapNavItem>
//                     ))}
//                   </BootstrapNav>
//                 </Grid.Col>
//                 <Grid.Col col={9}>
//                   <BootstrapTab.Content animation>
//                     {this.props.tabs.map((tab, i) => (
//                       <BootstrapTab.Pane key={i} eventKey={i}>
//                         {tab.contents}
//                       </BootstrapTab.Pane>
//                     ))}
//                   </BootstrapTab.Content>
//                 </Grid.Col>
//               </Grid.Row>
//             </Grid>
//           </BootstrapTab.Container>
//         )}
//       </Container>
//     );
//   }

//   public goToNext() {
//     const index = Math.min(this.state.selectedIndex + 1, this.props.tabs.length - 1);
//     this.setState(
//       {
//         selectedIndex: index
//       },
//       () => {
//         this.handleSelect(index);
//       }
//     );
//   }

//   public goToPrevious() {
//     const index = Math.max(this.state.selectedIndex - 1, 0);
//     this.setState(
//       {
//         selectedIndex: index
//       },
//       () => {
//         this.handleSelect(index);
//       }
//     );
//   }

//   public goTo(index: number) {
//     this.setState(
//       {
//         selectedIndex: index
//       },
//       () => {
//         this.handleSelect(index);
//       }
//     );
//   }

//   private handleSelect = (index: any) => {
//     if (this.state.selectedIndex != index) {
//       this.setState({ selectedIndex: index });
//     }

//     this.onTabChanged(this.props.tabs[index].tabName);
//   };

//   private onTabChanged = (tabName?: string) => {
//     if (tabName && this.props.onTabSelected) {
//       this.props.onTabSelected(tabName);
//     }
//   };
// }
