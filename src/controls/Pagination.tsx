// import * as React from 'react';
// import * as styles from '../css/main.scss';
// import { Container, IContainer } from './Container';
// import { Pagination as ReactPagination } from 'react-bootstrap';
// import { number } from 'prop-types';

// interface IItem {
//     content?: string;
//     type: 'first' | 'prev' | 'content' | 'next' | 'last' | 'ellipsis';
// }

// interface IProps extends IContainer {
//     selectedIndex?: number;
//     items: IItem[];
//     size?: 'sm' | 'lg';
//     onItemSelected?: (content: string) => void;
// }

// interface IState {
//     selectedIndex: number;
// }

// export class Pagination extends React.Component<IProps, IState> {
//     public static defaultProps = {
//         selectedIndex: 0
//     }

//     constructor(props: IProps) {
//         super(props);

//         this.state = { selectedIndex: this.props.selectedIndex! };
//         this.onItemChanged(this.props.items[this.props.selectedIndex || 0].content);
//     }

//     componentDidUpdate(prevProps: IProps) {
//         if (prevProps.selectedIndex !== this.props.selectedIndex) {
//             this.handleSelect(this.props.selectedIndex);
//         }
//     }

//     public goToText() {
//         const index = Math.min(this.state.selectedIndex + 1, this.props.items.length - 1);
//         this.setState(
//             {
//                 selectedIndex: index
//             },
//             () => {
//                 this.handleSelect(index);
//             }
//         );
//     }

//     public goToPrevious() {
//         const index = Math.max(this.state.selectedIndex - 1, 0);
//         this.setState(
//             {
//                 selectedIndex: index
//             },
//             () => {
//                 this.handleSelect(index);
//             }
//         );
//     }

//     public goFirst() {
//         this.setState(
//             {
//                 selectedIndex: 0
//             },
//             () => {
//                 this.handleSelect(0);
//             }
//         );
//     }

//     public goLast() {
//         this.setState(
//             {
//                 selectedIndex: this.props.items.length - 1
//             },
//             () => {
//                 this.handleSelect(this.props.items.length - 1);
//             }
//         );
//     }

//     public goTo(index: number) {
//         this.setState(
//             {
//                 selectedIndex: index
//             },
//             () => {
//                 this.handleSelect(index);
//             }
//         );
//     }

//     //TO-DO: move to selected page 
//     private handleSelect = (index: any) => {
//         if (this.state.selectedIndex != index) {
//             this.setState({ selectedIndex: index });
//         }

//         this.onItemChanged(this.props.items[index].content);
//     };

//     private onItemChanged = (content?: string) => {
//         if (content && this.props.onItemSelected) {
//             this.props.onItemSelected(content);
//         }
//     };
// }
