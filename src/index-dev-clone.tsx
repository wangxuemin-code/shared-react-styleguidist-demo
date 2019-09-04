import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Controls } from './index-prod';

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
      value: ''
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
                <Controls.FormControl
                  required
                  label={'Date'}
                  name='date'
                  type={'date'}
                  placeholder={'DD/MM/YYYY'}
                  dateOptions={{
                    // endDate: new Date('12/09/2019'),
                    // startDate: new Date(new Date().setFullYear(new Date().getFullYear() - 19)),
                    // endDate: new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
                    dateFormat: 'dd-MM-yyyy'
                  }}
                  append={
                    <Controls.Button
                      float={'left'}
                      textAlign={'center'}
                      type={'submit'}
                      onPress={() => {
                        this.setState({
                          value: 1562342400
                          // value: '2019-07-28T13:35:38.000Z'
                        });
                      }}
                    >
                      Change Date
                    </Controls.Button>
                  }
                  value={this.state.value}
                />
                <Controls.FormControl
                  required={true}
                  name={'dateformat'}
                  label={
                    <>
                      <h6>
                        Date <br /> (DD-MM-YYYY)
                      </h6>
                    </>
                  }
                  placeholder='Only DD-MM-YYYY format is allowed'
                  type={'date'}
                  dateOptions={{
                    dateFormat: 'dd-MM-yyyy'
                  }}
                />
                <Controls.FormControl
                  required
                  label={'DateTime'}
                  name='datetime'
                  type={'datetime'}
                  dateOptions={{
                    showTimeSelect: true
                  }}
                  onInputChanged={(value) => {
                    console.log(value);
                  }}
                />
                <Controls.FormControl
                  required
                  label={'DateRange'}
                  name='daterange'
                  type={'daterange'}
                  placeholder={''}
                  // value={Formatter.dateToUnixTimestamp(new Date())}
                  dateOptions={{
                    showTimeSelect: false
                  }}
                />
                <Controls.Clone
                  deleteControl={<Controls.Container>Delete ME!</Controls.Container>}
                  name='emails'
                  value={[
                    {
                      email: 'abc@gmail.com',
                      socials: [
                        {
                          social: 'facebook'
                        },
                        {
                          social: 'linkendin'
                        }
                      ]
                    },
                    {
                      email: 'cde@gmail.com'
                    }
                  ]}
                  addControlPosition={'top'}
                  deleteControlPosition={'bottom'}
                >
                  <>
                    <Controls.Container className='hahaha'>
                      <Controls.FormControl
                        type='text'
                        label={'Hello'}
                        placeholder='This is an sample!'
                        name='email'
                        required={true}
                      />
                    </Controls.Container>

                    <Controls.Clone
                      name='socials'
                      addControlPosition={'bottom'}
                      deleteControlPosition={'right'}
                      minItem={0}
                    >
                      <Controls.Container className={'hoho'}>
                        <Controls.FormControl
                          type='text'
                          label={'Social'}
                          placeholder='This is an sample!'
                          name='social'
                          required={true}
                        />
                      </Controls.Container>
                    </Controls.Clone>
                  </>
                </Controls.Clone>
                <Controls.Button type='submit'>Submit</Controls.Button>
                <Controls.Button
                  type='button'
                  onClick={() => {
                    console.log(this.form!.getFormJson());
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
