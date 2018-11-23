import { DetailedReactHTMLElement } from 'react';
import * as React from 'react';
import * as styles from '../css/main.scss';
import { Form as BootstrapForm } from 'react-bootstrap';
import { Container, IContainer } from './Container';
import { FormControl } from './FormControl';
import { IAlert, Alert } from './Alert';

interface IProps extends IContainer, IAlert {
  onSubmit?: (e: React.FormEvent<Form>) => void;
  horizontal?: boolean;
}

export class Form extends React.Component<IProps> {
  formControls: FormControl[];

  constructor(props: IProps) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.formControls = [];
  }

  public render() {
    return (
      <Container {...this.props}>
        <Alert success={this.props.success} info={this.props.info} error={this.props.error} />
        <BootstrapForm
          horizontal={this.props.horizontal}
          className={styles.istoxForm}
          onSubmit={this.onSubmit}
        >
          {this.props.children.map((child: DetailedReactHTMLElement<any, any>, i: number) => {
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

  public getInputValue(name: string) {
    this.formControls.forEach((formControl: FormControl) => {
      if (formControl.getName() === name) {
        return formControl.getValue();
      }
    });
  }

  private onSubmit(e: React.FormEvent<Form>) {
    e.preventDefault();
    this.formControls.forEach((formControl: FormControl) => {
      formControl.validate();
    });
  }
}
