import * as React from 'react';
import { DetailedReactHTMLElement } from 'react';
import { Form as BootstrapForm } from 'react-bootstrap';
import * as styles from '../css/main.scss';
import { Alert, IAlert } from './Alert';
import { Container, IContainer } from './Container';
import { Loading } from './Loading';
import { FormControl } from './FormControl';
import { FormContext } from '../contexts/FormContext';

interface IProps extends IContainer, IAlert {
  loading?: boolean;
  onSubmit?: () => void;
  horizontal?: boolean;
}

export class Form extends React.Component<IProps> {
  formControls: any[];

  constructor(props: IProps) {
    super(props);

    this._onSubmit = this._onSubmit.bind(this);
    this.onChildRef = this.onChildRef.bind(this);

    this.formControls = [];
  }

  public render() {
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
        <BootstrapForm
          horizontal={this.props.horizontal}
          className={styles.istoxForm}
          onSubmit={this._onSubmit}
        >
          <FormContext.Provider value={{ onRef: this.onChildRef }}>
            {this.props.children}
          </FormContext.Provider>
          {/* {children.map((child: DetailedReactHTMLElement<any, any>, i: number) => {
            return React.cloneElement(child, {
              key: i,
              ref: (ele: any) => {
                if (ele) this.formControls.push(ele);
              }
            });
          })} */}
        </BootstrapForm>
      </Container>
    );
  }

  private onChildRef(ref: any) {
    if (ref) {
      this.formControls.push(ref);
    }
  }

  public getInputValue(name: string): string {
    let value = '';
    this.formControls.forEach((formControl: any) => {
      if (formControl.getName && formControl.getValue) {
        if (formControl.getName() === name) {
          value = formControl.getValue();
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

  public getFormData(): FormData {
    const formData = new FormData();
    this.formControls.forEach((formControl: any) => {
      if (formControl.getName && formControl.getValue) {
        formData.append(formControl.getName(), formControl.getValue());
      }
    });
    return formData;
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
    let validated = true;
    this.formControls.forEach((formControl: any) => {
      if (formControl.validate) {
        const isValid = formControl.validate();
        if (validated) {
          validated = isValid;
        }
      }
    });

    if (validated && this.props.onSubmit) {
      this.props.onSubmit();
    }
  }
}
