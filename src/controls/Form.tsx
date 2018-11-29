import { DetailedReactHTMLElement } from 'react';
import * as React from 'react';
import * as styles from '../css/main.scss';
import { Form as BootstrapForm } from 'react-bootstrap';
import { Container, IContainer } from './Container';
import { FormControl } from './FormControl';
import { IAlert, Alert } from './Alert';
import { Loading } from './Loading';

interface IProps extends IContainer, IAlert {
  loading?: boolean;
  onSubmit?: () => void;
  horizontal?: boolean;
}

export class Form extends React.Component<IProps> {
  formControls: FormControl[];

  constructor(props: IProps) {
    super(props);

    this._onSubmit = this._onSubmit.bind(this);
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
          {children.map((child: DetailedReactHTMLElement<any, any>, i: number) => {
            return React.cloneElement(child, {
              key: i,
              ref: (ele: any) => {
                if (ele.constructor.name === 'FormControl') {
                  this.formControls.push(ele);
                }
              }
            });
          })}
        </BootstrapForm>
      </Container>
    );
  }

  public getInputValue(name: string): string {
    this.formControls.forEach((formControl: FormControl) => {
      if (formControl.getName() === name) {
        return formControl.getValue();
      }
    });
    return '';
  }

  private _onSubmit(e: React.FormEvent<Form>) {
    e.preventDefault();
    let validated = true;
    this.formControls.forEach((formControl: FormControl) => {
      const isValid = formControl.validate();
      if (validated) {
        validated = isValid;
      }
    });

    if (validated && this.props.onSubmit) {
      this.props.onSubmit();
    }
  }
}
