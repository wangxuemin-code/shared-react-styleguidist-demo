import * as React from 'react';
import * as styles from '../css/main.scss';
import { Container, IContainer } from './Container';
import { Icon } from './Icon';
import { Transition } from './Transition';
import { Loading } from './Loading';
import { Item } from './Item';
var uniqid = require('uniqid');

export interface TableHeaderModel {
  title: string;
}

export interface TableRowModel {
  rowContents: any[];
  rowActions?: TableActionsModel[];
  onClick?: () => void;
}

export interface TableActionsModel {
  icon?: any;
  tooltip?: string;
  callback?: () => void;
  loading?: boolean;
}

interface IProps extends IContainer {
  header?: any;
  footer?: any;
  columnHeaders?: TableHeaderModel[];
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
    classes = classes.filter(function(el) {
      return el != '';
    });
    return (
      <Container {...this.props} className={classes.join(' ')}>
        {typeof this.props.header === 'string' && (
          <Container padding={{ allRem: 1 }}>
            <h5>{this.props.header}</h5>
          </Container>
        )}
        {typeof this.props.header !== 'string' && <Container>{this.props.header}</Container>}
        <table>
          <thead>
            <tr>
              {this.props.columnHeaders &&
                this.props.columnHeaders.map((tableHeaderModel) => {
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
        {typeof this.props.footer === 'string' && (
          <Container padding={{ allRem: 1 }}>
            <h5>{this.props.footer}</h5>
          </Container>
        )}
        {typeof this.props.footer !== 'string' && <Container>{this.props.footer}</Container>}
      </Container>
    );
  }

  private getHeaderDesign(tableHeaderModel: TableHeaderModel, index: number) {
    return <th key={index}>{tableHeaderModel.title}</th>;
  }

  private getRowDesign(tableRowModel: TableRowModel, index: number) {
    return (
      <tr key={index} onClick={tableRowModel.onClick}>
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

        {tableRowModel.rowActions && tableRowModel.rowActions.length > 0 && (
          <td className={styles.actionContainer} key='action'>
            <Transition>
              {tableRowModel.rowActions &&
                tableRowModel.rowActions.map((tableActionsModel) => {
                  return this.getActionDesign(tableActionsModel, uniqid().toString());
                })}
            </Transition>
          </td>
        )}
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
