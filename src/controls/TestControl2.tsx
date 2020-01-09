import * as React from 'react';
import { Container, FormControl } from '.';
import { FormComponent } from './FormComponent';
import { Controls } from '../index-prod';

export class TestControl2 extends FormComponent {
  constructor(props: any) {
    super(props);
  }
  public render() {
    return super.formComponentRender(
      <Container>
        <FormControl required={true} type='text' name='ccc1' value='ccc' />
      </Container>
    );
  }
}

export default TestControl2;
