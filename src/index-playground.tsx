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
          <Controls.StoTimeLine
            stoDateTime={{
              createdAt: '2019-08-10T01:36:48Z',
              bookbuildingStartTime: '2019-08-14T10:20:24Z',
              bookbuildingEndTime: '2019-08-24T10:20:24Z',
              preSaleStartTime: '2019-08-28T10:20:24Z',
              preSaleEndTime: '2019-09-15T10:20:24Z',
              publicSaleStartTime: '2019-09-20T10:20:24Z',
              publicSaleEndTime: '2019-09-26T00:20:24Z',
              issueDateTime: '2019-09-28T00:20:24Z'
            }}
            hideTitle
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
