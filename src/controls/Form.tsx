import * as React from 'react';
import { DetailedReactHTMLElement } from 'react';
import { Form as ReactForm } from 'antd';
import * as styles from '../css/main.scss';
import { Alert, IAlert } from './Alert';
import { Container, IContainer } from './Container';
import { FormControl } from './FormControl';
import { Loading } from './Loading';

interface IProps extends IContainer, IAlert {
  loading?: boolean;
  onSubmit?: () => void;
  horizontal?: boolean;
}

export class Form extends React.Component<IProps> {
  formControls: any[];

  constructor(props: IProps) {
    super(props);
  }

  public render() {
    this.formControls = [];
    let children: DetailedReactHTMLElement<any, any>[] = [];
    if (this.props.children instanceof Array) {
      children = children.concat(this.props.children);
    } else {
      children.push(this.props.children);
    }

    return (
      <Container {...this.props}>
        <Loading loading={this.props.loading} />
        <Alert success={this.props.success} info={this.props.info} error={this.props.error} />
        <ReactForm
          layout={this.props.horizontal ? 'horizontal' : 'vertical'}
          className={styles.istoxForm}
          onSubmit={this._onSubmit.bind(this)}
        >
          {this.recursiveCloneChildren(this.props.children)}
        </ReactForm>
      </Container>
    );
  }

  private recursiveCloneChildren(children: any) {
    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;
      var childProps: any = {
        ref: (ele: any) => {
          if (ele) this.formControls.push(ele);
        }
      };
      childProps.children = this.recursiveCloneChildren((child.props as any).children);
      return React.cloneElement(child, childProps);
    });
  }

  public onSaved() {
    this.formControls.forEach((formControl: any) => {
      if (formControl.onSaved) {
        formControl.onSaved();
      }
    });
  }

  public getInputValue(name: string): string {
    let value = '';
    this.formControls.forEach((formControl: any) => {
      if (formControl.getName && formControl.getValue) {
        if (formControl.getName() === name) {
          value = formControl.getValue(true);
        }
      }
    });
    return value.trim();
  }

  public getFormControl(name: string): FormControl {
    let result: any = null;
    this.formControls.forEach((formControl: any) => {
      if (formControl.getName && formControl.getValue) {
        if (formControl.getName() === name) {
          result = formControl;
        }
      }
    });
    return result;
  }

  public getFormControls(): FormControl[] {
    let result: FormControl[] = [];
    this.formControls.forEach((formControl: any) => {
      if (formControl.getName && formControl.getValue) {
        result.push(formControl);
      }
    });
    return result;
  }

  public getFormData(): FormData {
    const formData = new FormData();
    this.formControls.forEach((formControl: any) => {
      if (formControl.getName && formControl.getValue && formControl.isIncludeInFormData) {
        formData.append(formControl.getName(), formControl.getValue(false));
      }
    });
    return formData;
  }

  public getFormJson(): string {
    var object: any = {};
    this.formControls.forEach((formControl: any) => {
      if (formControl.getName && formControl.getValue && formControl.isIncludeInFormData) {
        object[formControl.getName()] = formControl.getValue(false);
      }
    });

    return JSON.stringify(object);
  }

  public reset() {
    this.formControls.forEach((formControl: any) => {
      if (formControl.reset) {
        formControl.reset();
      }
    });
  }

  private _onSubmit(e: React.FormEvent<Form>) {
    e.preventDefault();

    if (this.validate(true) && this.props.onSubmit) {
      this.props.onSubmit();
    }
  }

  public validate(setErrorState: boolean = true): boolean {
    let validated = true;
    this.formControls.forEach((formControl: any) => {
      if (formControl.validate) {
        const isValid = formControl.validate(setErrorState);
        if (validated) {
          validated = isValid;
        }
      }
    });

    return validated;
  }
}
