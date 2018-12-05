import * as React from 'react';
import * as styles from '../css/main.scss';
import { Container, IContainer } from './Container';
import { Icon } from './Icon';
import { Transition } from './Transition';

export interface TableHeaderModel {
  title: string;
}

export interface TableRowModel {
  rowContents: any[];
  rowActions?: TableActionsModel[];
}

export interface TableActionsModel {
  icon?: any;
  tooltip?: string;
  callback?: () => void;
}

interface IProps extends IContainer {
  headers?: TableHeaderModel[];
  rows?: TableRowModel[];
}

export class Table extends React.Component<IProps, any> {
  public render() {
    return (
      <Container {...this.props} className={styles.istoxTable}>
        <table>
          <tr>
            {this.props.headers &&
              this.props.headers.map((tableHeaderModel) => {
                return this.getHeaderDesign(tableHeaderModel);
              })}
            <th />
          </tr>
          <tbody>
            {this.props.rows &&
              this.props.rows.map((tableRowModel) => {
                return this.getRowDesign(tableRowModel);
              })}
          </tbody>
        </table>
      </Container>
    );
  }

  private getHeaderDesign(tableHeaderModel: TableHeaderModel) {
    return <th>{tableHeaderModel.title}</th>;
  }

  private getRowDesign(tableRowModel: TableRowModel) {
    return (
      <tr>
        {tableRowModel.rowContents.map((content) => {
          return (
            <td>
              <Transition>{content}</Transition>
            </td>
          );
        })}
        <td className={styles.actionContainer}>
          <Transition>
            {tableRowModel.rowActions &&
              tableRowModel.rowActions.map((tableActionsModel) => {
                return this.getActionDesign(tableActionsModel);
              })}
          </Transition>
        </td>
      </tr>
    );
  }

  private getActionDesign(tableActionsModel: TableActionsModel) {
    return (
      <Icon
        icon={tableActionsModel.icon}
        classNames={[styles.action]}
        tooltip={tableActionsModel.tooltip}
        onClick={tableActionsModel.callback}
      />
    );
  }
}
