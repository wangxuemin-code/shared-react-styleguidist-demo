import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Controls } from './index-prod';

class Main extends Controls.MyComponent<
  any,
  {
    success: string[] | string;
    error: string;
    loading: boolean;
    showModal: boolean;
    modalWidth: number;
    value?: string | number;
    selectOptions: any[];
    email: string;
    imageUrl: string;
    imageFooterChanged: boolean;
  }
> {
  tabs: any;
  form: any;
  imageForm: any;
  formControls: any[];
  variantStates: string[];
  tabsContent: any[];
  tabsEmptyContent: any[];
  tabsContentWithIcons: any[];

  public constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <Controls.RootContainer>
        <Controls.Container margin={{ bottomRem: 6, leftRightRem: 4 }}>
          <h4 style={{ marginBottom: '80px' }}>STO Timeline</h4>
          <Controls.FormControl
            type='date'
            label={'Date'}
            name='date'
            value={1287446400}
            dateOptions={{
              useUtc: true
            }}
            onInputChanged={(value) => {
              console.log(value);
            }}
          />
        </Controls.Container>
      </Controls.RootContainer>
    );
  }
}

const render = () => {
  ReactDOM.render(<Main />, document.getElementById('reactContainer'));
};

render();
