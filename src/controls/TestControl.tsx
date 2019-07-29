import * as React from 'react';
import * as styles from '../css/main.scss';
import { Controls } from '../index-prod';

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
      <Controls.Container>
        <Controls.FormControl type='text' name='test4' value='12345' />
      </Controls.Container>
    );
  }
}

export default TestControl;
