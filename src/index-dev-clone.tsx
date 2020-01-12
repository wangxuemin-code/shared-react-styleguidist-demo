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
                  cloneLabel={false}
                  value={{
                    emails: [
                      {
                        bbb1: 'abc',
                        passwords: [
                          {
                            ccc1: 'haha'
                          },
                          {
                            ccc1: 'hehehe'
                          }
                        ]
                      },
                      {
                        bbb1: 'cw2',
                        passwords: []
                      }
                    ]
                  }}
                >
                  <>
                    <TestControl />

                    <Controls.FormControl type='text' name='aaab' />
                  </>
                </Controls.Clone>

                <Controls.Button type='submit'>Submit</Controls.Button>
                <Controls.Button
                  type='button'
                  onClick={() => {
                    console.log(this.form!.getFormJson());
                    console.log(this.form!.getFormControls());
                    let object = this.form!.getFormObject();
                    console.log(object);

                    console.log(this.form!.getInputValue('emails'));
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
