import { faTrash } from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';
import { stylings } from '../css/theme';
import { FormControl, Button, Icon, Container, IContainer } from '.';

/////////// IMPORTANT, Clone children must be single node only,
/////////// do wrap it with React.Fragment for multiple nodes

interface IProps extends IContainer {
  name: string;
  index?: number;
  value?: any[];
  oldValue?: any[];
  addControlPosition?: 'top' | 'bottom';
  deleteControlPosition?: 'top' | 'right' | 'bottom' | 'left';
  addControl?: any;
  deleteControl?: any;
  cloneLabel?: boolean;
  isIncludeInFormData?: boolean;
  minItem?: number;
  static?: boolean;
  parentCloneNames?: Array<String>;
}

interface IState {
  value: any[];
}

export class Clone extends React.Component<IProps, IState> {
  private innerClones: Clone[];

  public static defaultProps = {
    deleteControlPosition: 'right',
    addControlPosition: 'bottom',
    cloneLabel: false,
    index: 0,
    minItem: 1,
    parentCloneNames: []
  };

  public constructor(props: IProps) {
    super(props);

    this.state = {
      value: this.maintainMinItems(this.props.value)
    };
  }

  public componentDidUpdate(prevProps: IProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({
        value: this.maintainMinItems(this.props.value)
      });
    }
  }

  public render() {
    return <>{this.renderComponents()}</>;
  }

  public getIndex = () => {
    return this.props.index;
  };

  public getName = () => {
    return this.props.name;
  };

  public isIncludeInFormData = () => {
    return this.props.isIncludeInFormData;
  };

  public getValue = (includeKey: boolean) => {
    let obj: any = {};
    const value = this.state.value;

    this.innerClones.map((clone: Clone) => {
      value[clone.getIndex()!] = Object.assign({}, value[clone.getIndex()!], clone.getValue(true));
    });

    if (includeKey) {
      obj[this.props.name] = value;
      return obj;
    } else {
      return value;
    }
  };

  private renderComponents() {
    const count = this.state.value.length;
    this.innerClones = [];

    const results = [];

    const topContainer = <Container fluid>{this.props.addControlPosition === 'top' && this.getAddControl()}</Container>;

    results.push(topContainer);

    for (let i = 0; i < count; i++) {
      const result = (
        <>
          <Container fluid>{this.props.deleteControlPosition === 'top' && this.getDeleteControl(i)}</Container>

          {this.props.deleteControlPosition == 'right' && (
            <Container
              fluid={true}
              display='grid'
              style={{
                gridTemplateColumns: 'auto max-content'
              }}
            >
              {this.recursiveCloneChildren(this.props.children, i, 0, 0)}
              <Container heightPercent={100}>{this.getDeleteControl(i)}</Container>
            </Container>
          )}
          {this.props.deleteControlPosition != 'right' && (
            <>{this.recursiveCloneChildren(this.props.children, i, 0, 0)}</>
          )}
        </>
      );

      results.push(result);
    }

    const bottomContainer = (
      <Container fluid>{this.props.addControlPosition === 'bottom' && this.getAddControl()}</Container>
    );

    results.push(bottomContainer);

    return results;
  }

  private recursiveCloneChildren(children: any, index: number, cloneLevel: number, level: number) {
    return React.Children.map(children, (child, i) => {
      if (!React.isValidElement(child)) return child;
      var childProps: any = {};

      if (child.type === FormControl && cloneLevel === 0) {
        const originalName = (child.props as any).name;

        childProps.name = (child.props as any).name + '_' + index;
        childProps.value =
          this.state.value && this.state.value.length > index ? this.state.value[index][originalName] : undefined;
        childProps.oldValue =
          this.props.oldValue && this.props.oldValue.length > index
            ? this.props.oldValue[index][originalName]
            : undefined;
        childProps.onInputChanged = this.onInputChanged.bind(this, originalName);

        if (!this.props.cloneLabel && index != 0) {
          childProps.label = '';
        }
      } else if (child.type === Clone && cloneLevel === 0) {
        childProps.index = index;
        const originalName = (child.props as any).name;
        childProps.value =
          this.state.value && this.state.value.length > index ? this.state.value[index][originalName] : undefined;
        childProps.oldValue =
          this.props.oldValue && this.props.oldValue.length > index
            ? this.props.oldValue[index][originalName]
            : undefined;
        childProps.ref = (ref: any) => {
          if (ref) {
            this.innerClones.push(ref);
          }
        };
      }

      childProps.parentCloneNames = this.props.parentCloneNames!.concat(this.props.name + '[' + index + ']');
      childProps.cloneIndex = index;

      childProps.children = this.recursiveCloneChildren(
        (child.props as any).children,
        index,
        child.type === Clone ? cloneLevel + 1 : cloneLevel,
        level + 1
      );

      if (level === 0 && i == children.length - 1) {
        if (this.props.deleteControlPosition == 'bottom') {
          childProps.children.push(<Container fluid={true}>{this.getDeleteControl(index)}</Container>);
        }
      }

      return React.cloneElement(child, childProps);
    });
  }

  private onInputChanged = (originalName: string, newValue: string | number, name: string) => {
    const arr = name.split('_');
    const index = parseInt(arr[arr.length - 1], 10);

    const value = this.state.value;
    value[index][originalName] = newValue;

    this.setState({ value: ([] as any[]).concat(value) });
  };

  private getAddControl() {
    if (this.props.oldValue || this.props.static) return null;

    let component = null;
    if (!this.props.addControl) {
      component = <Button>Add</Button>;
    } else {
      component = this.props.addControl;
    }

    return this.recursiveCloneButton(component, 0, this.onAddButtonPressed);
  }

  private getDeleteControl(index: number) {
    if (this.props.oldValue || this.props.static || this.state.value.length <= this.props.minItem!) return null;

    let component = null;
    if (!this.props.deleteControl) {
      component = <Icon icon={faTrash} fontColor={stylings.colors.primary} />;
    } else {
      component = this.props.deleteControl;
    }

    return this.recursiveCloneButton(component, 0, this.onDeleteButtonPressed.bind(this, index));
  }

  private onAddButtonPressed() {
    const value = this.state.value;
    value.push({});

    this.setState({ value: value });
  }

  private onDeleteButtonPressed(index: number) {
    const value = this.state.value;
    this.innerClones.map((clone: Clone) => {
      value[clone.getIndex()!] = Object.assign({}, value[clone.getIndex()!], clone.getValue(true));
    });

    value.splice(index, 1);
    const newValue = this.maintainMinItems(value);

    this.setState({ value: newValue });
  }

  private recursiveCloneButton(children: any, level: number, onClick: (index: number) => void) {
    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;
      var childProps: any = {};
      if (level == 0) {
        childProps.onClick = onClick.bind(this);
      }

      childProps.children = this.recursiveCloneButton((child.props as any).children, level + 1, onClick);
      return React.cloneElement(child, childProps);
    });
  }

  private maintainMinItems(value?: any[]) {
    if (value && value.length > 0) {
      return value;
    } else {
      const results = [];
      for (let i = 0; i < this.props.minItem!; i++) {
        results.push({});
      }
      return results;
    }
  }
}
