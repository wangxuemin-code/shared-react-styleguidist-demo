import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Controls } from './index-prod';
import TestControl from './controls/TestControl';

class Main extends Controls.MyComponent<
  any,
  {
    value?: string | number;
  }
> {
  private form?: Controls.Form;

  public constructor(props: any) {
    super(props);
    this.state = {
      value: 'a'
    };
  }

  public render() {
    return (
      <React.Fragment>
        <Controls.RootContainer>
          <Controls.WrapperContainer>
            <Controls.Container margin={{ topPx: 200 }}>
              <Controls.Form
                ref={(ref) => {
                  if (ref) {
                    this.form = ref;
                  }
                }}
              >
                <Controls.Clone
                  deleteControl={<Controls.Container>Delete ME!</Controls.Container>}
                  name='emails'
                  addControlPosition={'top'}
                  deleteControlPosition={'bottom'}
                >
                  <>
                    <TestControl />
                  </>
                </Controls.Clone>

                <Controls.FormControl type='text' value='aaaa' name='ggg' />

                <Controls.Button type='submit'>Submit</Controls.Button>
                <Controls.Button
                  type='button'
                  onClick={() => {
                    console.log(this.form!.getFormJson());
                    console.log(this.form!.getFormControls());
                    let object = this.form!.getFormObject();
                    console.log(object);
                  }}
                >
                  Test
                </Controls.Button>
              </Controls.Form>
            </Controls.Container>
          </Controls.WrapperContainer>
        </Controls.RootContainer>
        <Controls.Footer detailed />
      </React.Fragment>
    );
  }

  private function = () => {
    console.log('this is a callback');
  };
}

const render = () => {
  ReactDOM.render(<Main />, document.getElementById('reactContainer'));
};

render();
