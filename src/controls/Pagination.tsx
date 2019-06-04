import * as React from 'react';
import {IContainer} from './Container';
import ReactPaginate from 'react-paginate';

interface IProps extends IContainer {
    pageCount: number;
    pageRangeDisplayed: number;
    marginPagesDisplayed: number;
    previousLabel?: string;
    nextLabel?: string;
    breakLabel?: string;
}

export class Pagination extends React.Component<IProps> {
    public constructor(props: IProps) {
        super(props);
    }

    public render() {
        var previousLabel = this.props.previousLabel == null ? '<<' : this.props.previousLabel;
        var nextLabel = this.props.nextLabel == null ? '>>' : this.props.nextLabel;
        var breakLabel = this.props.breakLabel == null ? '...' : this.props.breakLabel;
        return(
            <ReactPaginate 
                pageCount={this.props.pageCount}
                pageRangeDisplayed={this.props.pageRangeDisplayed}
                marginPagesDisplayed={this.props.marginPagesDisplayed}
                previousLabel={previousLabel}
                nextLabel={nextLabel}
                breakLabel={breakLabel}
                breakClassName={'break-me'}
                containerClassName={'pagination'}
                activeClassName={'active'}
            />
        );
    }

}