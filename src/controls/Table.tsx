import * as React from 'react';
import * as styles from '../css/main.scss';
import { Container, IContainer } from './Container';
import { Icon } from './Icon';
import { Loading } from './Loading';
import { Item } from './Item';
import { Controls } from '../index-prod';
var uniqid = require('uniqid');

export interface TableHeaderModel {
  title: string;
  min?: boolean;
}

export interface TableRowModel {
  rowContents?: any[];
  rawRowContent?: any;
  rowActions?: TableActionsModel[];
  onClick?: () => void;
  groupId?: String;
  itemId?: String;
}

export interface TableRowHeaderModel {
  rowHeaderContents?: any[];
  rawRowHeaderContent?: any;
  groupId?: String;
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
  rows?: (TableRowModel | TableRowHeaderModel)[];
  basic?: boolean;
  selectable?: boolean;
  onSelectedItemsChanged?: (selectedItemIds: String[]) => void;
  selectedItemIds?: String[];
}

interface IState {
  selectedIds: String[];
}

export class Table extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { selectedIds: this.props.selectedItemIds || [] };
  }

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
              {this.props.selectable && (
                <td>
                  <Controls.FormControl
                    type={'checkbox'}
                    selectOptions={[
                      {
                        label: '',
                        value: '1'
                      }
                    ]}
                    value={this.isAllSelected() ? '1' : ''}
                    onInputChanged={this.onCheckboxChanged.bind(this, 'all', {})}
                  />
                </td>
              )}

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

  private getRowDesign(tableRowModel: TableRowModel | TableRowHeaderModel, index: number) {
    if (this.isRowHeader(tableRowModel)) {
      // is a table row header model
      const rowHeaderModel = tableRowModel as TableRowHeaderModel;
      if (rowHeaderModel.rowHeaderContents) {
        return (
          <tr key={index} className={styles.rowHeader}>
            {this.props.selectable && (
              <td className={styles.min}>
                <Controls.FormControl
                  type={'checkbox'}
                  selectOptions={[
                    {
                      label: '',
                      value: '1'
                    }
                  ]}
                  value={this.isGroupSelected(rowHeaderModel.groupId) ? '1' : ''}
                  onInputChanged={this.onCheckboxChanged.bind(this, 'group', {
                    groupId: rowHeaderModel.groupId
                  })}
                />
              </td>
            )}
            {rowHeaderModel.rowHeaderContents.map((rowHeaderContent) => (
              <td key={uniqid().toString()}>
                <Container>{rowHeaderContent}</Container>
              </td>
            ))}
          </tr>
        );
      } else {
        return rowHeaderModel.rawRowHeaderContent;
      }
    } else {
      // is a table row model
      const rowModel = tableRowModel as TableRowModel;

      if (rowModel.rowContents) {
        return (
          <tr key={index} onClick={rowModel.onClick}>
            {this.props.selectable && (
              <td className={styles.min}>
                <Controls.FormControl
                  type={'checkbox'}
                  selectOptions={[
                    {
                      label: '',
                      value: '1'
                    }
                  ]}
                  value={
                    rowModel.itemId
                      ? this.state.selectedIds.indexOf(rowModel.itemId) > -1
                        ? '1'
                        : ''
                      : ''
                  }
                  onInputChanged={this.onCheckboxChanged.bind(this, 'single', {
                    itemId: rowModel.itemId
                  })}
                />
              </td>
            )}

            {rowModel.rowContents.map((content, columnIndex) => {
              if (content.icon) {
                <Container>
                  {rowModel.rowActions &&
                    rowModel.rowActions.map((tableActionsModel) => {
                      return this.getActionDesign(tableActionsModel, uniqid().toString());
                    })}
                </Container>;
              } else {
                let min: boolean | undefined = false;
                if (this.props.columnHeaders && this.props.columnHeaders.length > columnIndex) {
                  min = this.props.columnHeaders[columnIndex].min;
                }

                return (
                  <td key={uniqid().toString()} className={min ? styles.min : ''}>
                    <Container>{content}</Container>
                  </td>
                );
              }
            })}

            {rowModel.rowActions && rowModel.rowActions.length > 0 && (
              <td className={styles.actionContainer} key='action'>
                <Container>
                  {rowModel.rowActions &&
                    rowModel.rowActions.map((tableActionsModel) => {
                      return this.getActionDesign(tableActionsModel, uniqid().toString());
                    })}
                </Container>
              </td>
            )}
          </tr>
        );
      } else {
        return rowModel.rawRowContent;
      }
    }
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

  private isRowHeader(tableRowModel: TableRowHeaderModel | TableRowModel) {
    if (
      (tableRowModel as TableRowHeaderModel).rowHeaderContents ||
      (tableRowModel as TableRowHeaderModel).rawRowHeaderContent
    ) {
      return true;
    } else return false;
  }

  private isAllSelected() {
    let result = true;
    if (this.props.rows) {
      this.props.rows.map((tableRowModel, i) => {
        if (!this.isRowHeader(tableRowModel)) {
          const itemId = (tableRowModel as TableRowModel).itemId;
          if (itemId && result && this.state.selectedIds.indexOf(itemId) < 0) {
            result = false;
          }
        }
      });
    }
    return result;
  }

  private isGroupSelected(checkGroupId?: String) {
    let result = true;
    if (this.props.rows) {
      this.props.rows.map((tableRowModel, i) => {
        if (!this.isRowHeader(tableRowModel)) {
          const itemId = (tableRowModel as TableRowModel).itemId;
          const groupId = (tableRowModel as TableRowModel).groupId;
          if (
            groupId === checkGroupId &&
            itemId &&
            result &&
            this.state.selectedIds.indexOf(itemId) < 0
          ) {
            result = false;
          }
        }
      });
    }
    return result;
  }

  private onCheckboxChanged = (
    type: 'single' | 'group' | 'all',
    idOption: { itemId?: string; groupId?: String } = {},
    value: string
  ) => {
    let selectedIds: String[] = this.state.selectedIds;
    if (this.props.rows) {
      if (type === 'all') {
        selectedIds = [];
        if (value === '1') {
          this.props.rows.map((tableRowModel, i) => {
            if (!this.isRowHeader(tableRowModel)) {
              const itemId = (tableRowModel as TableRowModel).itemId;
              if (itemId) {
                selectedIds.push(itemId);
              }
            }
          });
        }
      } else if (type === 'group') {
        if (value === '1') {
          this.props.rows.map((tableRowModel, i) => {
            if (!this.isRowHeader(tableRowModel)) {
              if ((tableRowModel as TableRowModel).groupId === idOption.groupId) {
                const itemId = (tableRowModel as TableRowModel).itemId;
                if (itemId) {
                  selectedIds.push(itemId);
                }
              }
            }
          });
        } else {
          this.props.rows.map((tableRowModel, i) => {
            if (!this.isRowHeader(tableRowModel)) {
              if ((tableRowModel as TableRowModel).groupId === idOption.groupId) {
                const itemId = (tableRowModel as TableRowModel).itemId;
                if (itemId && selectedIds.indexOf(itemId) > -1) {
                  selectedIds.splice(selectedIds.indexOf(itemId), 1);
                }
              }
            }
          });
        }
      } else {
        if (value === '1') {
          if (idOption.itemId) {
            selectedIds.push(idOption.itemId);
          }
        } else {
          if (idOption.itemId) {
            selectedIds.splice(selectedIds.indexOf(idOption.itemId), 1);
          }
        }
      }
    }

    // remove duplicate
    selectedIds = selectedIds.filter(function(item, pos) {
      return selectedIds.indexOf(item) == pos;
    });

    if (this.props.onSelectedItemsChanged) this.props.onSelectedItemsChanged(selectedIds);

    this.setState({ selectedIds });
  };
}
