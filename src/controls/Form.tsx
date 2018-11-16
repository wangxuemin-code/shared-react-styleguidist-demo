import * as React from 'react';
import { TSMap } from 'typescript-map';
import { Form as BootstrapForm, FormGroup, Col, FormControl } from 'react-bootstrap';
import { Container, Text, Input } from '.';
import { IContainer } from './Container';
import { Button } from './Button';

export interface IFormItem {
  title?: string;
  value?: string | number;
  name?: string;
  type?: 'text' | 'label' | 'number' | 'money' | 'submit';
  placeholder?: string;
  hint?: string;
  inputWidth?: number; // width in bootstrap layout system
  disabled?: boolean;
  inputAppend?: any;
  onChanged?: (newValue: string | number) => void;
}

interface IProps extends IContainer {
  formItems: IFormItem[];
  labelWidth?: number; // width in bootstrap layout system
  onSubmit?: (e: React.FormEvent<Form>) => void;
}

export interface IFormData {
  [key: string]: string | number;
}

export class Form extends React.Component<IProps> {
  public static defaultProps: IProps = {
    formItems: [],
    labelWidth: 2
  };

  private inputs: TSMap<string, Input> = new TSMap<string, Input>();

  public render() {
    const labelWidth: number = this.props.labelWidth as number;

    return (
      <Container {...this.props}>
        <BootstrapForm horizontal={true} onSubmit={this.props.onSubmit}>
          {this.props.formItems.map((formItem, i) => {
            this.initiateFormItemUndefinedProps(formItem);
            return (
              <FormGroup key={i}>
                <Col sm={labelWidth}>
                  <Text fontWeight='bold' lineHeight={33} fontSize={12}>
                    {formItem.title}
                  </Text>
                </Col>
                <Col
                  sm={
                    formItem.inputWidth && formItem.inputWidth > 0
                      ? formItem.inputWidth
                      : 12 - labelWidth
                  }
                >
                  {formItem.type === 'label' && (
                    <Text lineHeight={32} fontSize={12}>
                      {formItem.value}
                    </Text>
                  )}
                  {formItem.type === 'number' && (
                    <span>
                      <Input
                        type='number'
                        name={formItem.name ? formItem.name : ''}
                        placeholder={formItem.placeholder}
                        defaultValue={formItem.value}
                        disabled={formItem.disabled}
                        ref={(ref: Input) => {
                          if (formItem.name) {
                            this.inputs.set(formItem.name, ref);
                          }
                        }}
                        append={formItem.inputAppend}
                        onInputChanged={formItem.onChanged}
                      />
                    </span>
                  )}
                  {formItem.type === 'money' && (
                    <span>
                      <Input
                        type='money'
                        name={formItem.name ? formItem.name : ''}
                        placeholder={formItem.placeholder}
                        defaultValue={formItem.value}
                        disabled={formItem.disabled}
                        ref={(ref: Input) => {
                          if (formItem.name) {
                            this.inputs.set(formItem.name, ref);
                          }
                        }}
                        append={formItem.inputAppend}
                        onInputChanged={formItem.onChanged}
                      />
                    </span>
                  )}
                  {formItem.type === 'submit' && (
                    <Button floatRight={true} buttonStyle={'two'} type='submit'>
                      {formItem.value}
                    </Button>
                  )}
                  {formItem.hint && (
                    <Text fontSize={11} color={'#9a9a9a'}>
                      {formItem.hint}
                    </Text>
                  )}
                </Col>
              </FormGroup>
            );
          })}
          {this.props.children}
        </BootstrapForm>
      </Container>
    );
  }

  public getInputValue(name: string) {
    return this.inputs.get(name).getValue();
  }

  private initiateFormItemUndefinedProps(formItem: IFormItem) {
    if (!formItem.type) {
      formItem.type = 'text';
    }
  }
}
