import * as React from 'react';
import { Container, FormControl } from '.';

export class TestControl extends React.Component<any, any> {
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
    return (
      <Container>
        <FormControl type='text' name='test4' value='12345' />
      </Container>
    );
  }
}

export default TestControl;
