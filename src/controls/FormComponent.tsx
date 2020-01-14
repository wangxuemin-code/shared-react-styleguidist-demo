import * as React from 'react';
import { MyComponent, FormControl } from '.';
import _ = require('lodash');
import { Clone } from './Clone';

interface IProps {
  injectControlFn?: Function;
  uninjectControlFn?: Function;
  parentCloneNames?: Array<String>;
  value?: any;
  oldValue?: any;
  onInputChanged?: any;
  cloneName?: string;
  static?: boolean;
  cloneLabel?: boolean;
  cloneIndex?: number;
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

      if (this.props.uninjectControlFn) {
        childProps.uninjectControlFn = this.props.uninjectControlFn;
      }

      if (child.type === FormControl) {
        const fullPath = [this.props.cloneName]
          .concat((child.props as any).name)
          .filter((item: any) => !!item)
          .join('.');

        if (!childProps.excludeFromFormData) {
          childProps.value = _.get(this.props.value, fullPath, (child.props as any).value);
          childProps.oldValue = _.get(this.props.oldValue, fullPath, (child.props as any).oldValue);
        }

        childProps.onInputChanged2 = this.props.onInputChanged;
        childProps.onUnmount = this.props.uninjectControlFn;

        if (!this.props.cloneLabel && this.props.cloneIndex != 0) {
          childProps.label = '';
        }
      } else if (child.type === Clone) {
        childProps.value = _.get(this.props.value, this.props.cloneName!, undefined);
        childProps.oldValue = _.get(this.props.oldValue, this.props.cloneName!, undefined);
        childProps.cloneLabel = this.props.cloneLabel;
      }

      childProps.static = this.props.static;
      childProps.parentCloneNames = this.props.parentCloneNames;
      return React.cloneElement(child, childProps);
    });
  }
}
