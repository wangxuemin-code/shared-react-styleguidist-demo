import * as React from 'react';
import { Container, FormControl } from '.';
import { FormComponent } from './FormComponent';
import { Controls } from '../index-prod';
import { TestControl2 } from './TestControl2';

export class TestControl extends FormComponent {
  constructor(props: any) {
    super(props);
  }
  componentDidMount() {
    React.Children.forEach(this.props.children, (child) => {
      if (child) {
        console.log('name =', child);
      }
    });
  }
  public render() {
    return super.formComponentRender(
      <Container>
        <FormControl required={true} type='text' name='bbb1' label='Inner Level1' />
        <FormControl
          required={true}
          type='text'
          name='bbb2'
          value={'GG'}
          label='Inner Level1-2'
          onInputChanged={(value) => {
            console.log(value);
          }}
        />
        <Controls.Clone
          deleteControl={<Controls.Container>Inner Deletion</Controls.Container>}
          name='passwords'
          addControlPosition={'top'}
          deleteControlPosition={'bottom'}
        >
          <>
            <TestControl2 />
          </>
        </Controls.Clone>
      </Container>
    );
  }
}

export default TestControl;
