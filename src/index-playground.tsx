import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Controls } from './index-prod';
import ReactSelect from 'antd/es/select';
const { Option, OptGroup } = ReactSelect;

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
          <Controls.Form>
            <Controls.FormControl type='text' label='ABC'></Controls.FormControl>

            <Controls.FormControl
              type='select'
              selectOptions={[
                {
                  label: 'abc',
                  value: 'cde'
                },
                {
                  label: 'ggg',
                  value: 'ggg'
                }
              ]}
            ></Controls.FormControl>
          </Controls.Form>
        </Controls.Container>

        <ReactSelect notFoundContent={'No Results'} showSearch={true}>
          <Option value={'aa'}>aa</Option>

          <Option value={'bb'}>bb</Option>
        </ReactSelect>
      </Controls.RootContainer>
    );
  }
}

const render = () => {
  ReactDOM.render(<Main />, document.getElementById('reactContainer'));
};

render();
