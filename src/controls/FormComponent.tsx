import * as React from 'react';
import { MyComponent } from '.';

interface IProps {
  injectControlFn?: Function;
  parentCloneNames?: Array<String>;
}

export class FormComponent<P = {}, S = {}> extends MyComponent<P & IProps, S> {
  public static defaultProps = {
    parentCloneNames: []
  };

  public formComponentRender(children: any) {
    return this.recursiveCloneChildren(children);
  }

  private recursiveCloneChildren(children: any) {
    return React.Children.map(children, (child) => {
      var childProps: any = {
        ref: (ele: any) => {
          if (ele && ele.getName && ele.getValue && this.props.injectControlFn) {
            this.props.injectControlFn(ele);
          }
        }
      };
      if (!React.isValidElement(child)) return child;
      childProps.children = this.recursiveCloneChildren((child.props as any).children);
      if (this.props.injectControlFn) {
        childProps.injectControlFn = this.props.injectControlFn;
      }
      childProps.parentCloneNames = this.props.parentCloneNames;
      return React.cloneElement(child, childProps);
    });
  }
}
