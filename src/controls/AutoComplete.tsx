import * as React from 'react';
import { Ant, Controls } from '../index-prod';
import _ = require('lodash');

export interface IAutoComplete {
  data?: Array<{
    component: any;
    value: string;
  }>;
  loadingText?: string;
  getFetchPromise?: (
    searchText: string
  ) => Promise<
    Array<{
      component: any;
      value: string;
    }>
  >;
}

interface IProps {
  options?: IAutoComplete;
  value?: string;
  placeholder?: string;
  onChange: (newValues: string) => void;
}

interface IState {
  selectedValues: Array<String>;
  loading: boolean;
  data: Array<{
    component: any;
    value: string;
  }>;
}

export class AutoComplete extends React.Component<IProps, IState> {
  public static defaultProps: IProps = {
    options: {
      data: [],
      loadingText: 'Loading...'
    },
    onChange: () => {}
  };

  public constructor(props: IProps) {
    super(props);

    this.state = {
      data: this.props.options && this.props.options.data ? this.props.options.data : [],
      selectedValues: [],
      loading: false
    };

    this.fetchOptions = _.debounce(this.fetchOptions, 600);
  }

  public componentDidUpdate(prevProps: IProps) {
    if (this.props.options !== prevProps.options) {
      this.setState({
        data: this.props.options && this.props.options.data ? this.props.options.data : []
      });
    }
  }

  public render() {
    return (
      <React.Fragment>
        <Ant.Select
          style={{
            width: '100%'
          }}
          showSearch
          value={this.props.value}
          notFoundContent={
            this.state.loading ? (
              <Controls.Container>{this.props.options!.loadingText || 'Loading...'}</Controls.Container>
            ) : null
          }
          filterOption={false}
          onSearch={this.fetchOptions}
          onChange={this.onChanged}
          defaultActiveFirstOption={false}
          showArrow={false}
          placeholder={this.props.placeholder}
        >
          {this.state.data.map((d) => (
            <Ant.Select.Option key={d.value}>{d.component}</Ant.Select.Option>
          ))}
        </Ant.Select>
      </React.Fragment>
    );
  }

  private fetchOptions = async (text: string) => {
    if (this.props.options && this.props.options.getFetchPromise) {
      if (text) {
        this.setState({ loading: true, data: [] });
        const data = await this.props.options.getFetchPromise(text);
        this.setState({
          data,
          loading: false
        });
      } else {
        this.setState({ loading: false, data: [] });
      }
    }
  };

  private onChanged = (value: string) => {
    this.props.onChange(value);
  };
}
