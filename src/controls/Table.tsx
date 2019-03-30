import * as React from 'react';
import * as styles from '../css/main.scss';
import { Container, IContainer } from './Container';
import { Icon } from './Icon';
import { Transition } from './Transition';
import { Loading } from './Loading';

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
  loading?: boolean;
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
          <thead>
            <tr>
              {this.props.headers &&
                this.props.headers.map((tableHeaderModel, i) => {
                  return this.getHeaderDesign(tableHeaderModel, i);
                })}
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.rows &&
              this.props.rows.map((tableRowModel, i) => {
                return this.getRowDesign(tableRowModel, i);
              })}
          </tbody>
        </table>
      </Container>
    );
  }

  private getHeaderDesign(tableHeaderModel: TableHeaderModel, index: number) {
    return <th key={index}>{tableHeaderModel.title}</th>;
  }

  private getRowDesign(tableRowModel: TableRowModel, index: number) {
    return (
      <tr key={index}>
        {tableRowModel.rowContents.map((content, i) => {
          if (content.icon) {
            <Transition>
              {tableRowModel.rowActions &&
                tableRowModel.rowActions.map((tableActionsModel, i) => {
                  return this.getActionDesign(tableActionsModel, i);
                })}
            </Transition>;
          } else {
            return (
              <td key={i}>
                <Transition>{content}</Transition>
              </td>
            );
          }
        })}
        <td className={styles.actionContainer} key='action'>
          <Transition>
            {tableRowModel.rowActions &&
              tableRowModel.rowActions.map((tableActionsModel, i) => {
                return this.getActionDesign(tableActionsModel, i);
              })}
          </Transition>
        </td>
      </tr>
    );
  }

  private getActionDesign(tableActionsModel: TableActionsModel, index: number) {
    if (tableActionsModel.loading) {
      return <Loading loading={true} backDrop={false} />;
    } else {
      return (
        <Icon
          key={index}
          icon={tableActionsModel.icon}
          classNames={[styles.action]}
          tooltip={tableActionsModel.tooltip}
          onClick={tableActionsModel.callback}
        />
      );
    }
  }
}
