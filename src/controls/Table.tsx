import * as React from 'react';
import * as styles from '../css/main.scss';
import { Container, IContainer } from './Container';
import { Icon } from './Icon';
import { Transition } from './Transition';
import { Loading } from './Loading';
var uniqid = require('uniqid');

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
  basic?: boolean;
}

export class Table extends React.Component<IProps, any> {
  public render() {
    let classes: string[] = [
      styles.istoxTable,
      this.props.className ? this.props.className : '',
      this.props.basic ? styles.basic : ''
    ];
    return (
      <Container {...this.props} className={classes.join(' ')}>
        <table>
          <thead>
            <tr>
              {this.props.headers &&
                this.props.headers.map((tableHeaderModel) => {
                  return this.getHeaderDesign(tableHeaderModel, uniqid().toString());
                })}
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
        {tableRowModel.rowContents.map((content) => {
          if (content.icon) {
            <Transition>
              {tableRowModel.rowActions &&
                tableRowModel.rowActions.map((tableActionsModel) => {
                  return this.getActionDesign(tableActionsModel, uniqid().toString());
                })}
            </Transition>;
          } else {
            return (
              <td key={uniqid().toString()}>
                <Transition>{content}</Transition>
              </td>
            );
          }
        })}
        <td className={styles.actionContainer} key='action'>
          <Transition>
            {tableRowModel.rowActions &&
              tableRowModel.rowActions.map((tableActionsModel) => {
                return this.getActionDesign(tableActionsModel, uniqid().toString());
              })}
          </Transition>
        </td>
      </tr>
    );
  }

  private getActionDesign(tableActionsModel: TableActionsModel, index: number) {
    if (tableActionsModel.loading) {
      return <Loading key={index} loading={true} backDrop={false} />;
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
