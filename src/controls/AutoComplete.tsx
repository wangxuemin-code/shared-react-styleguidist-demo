import * as React from 'react';
const debounce = require('lodash/debounce');
import Select from 'antd/es/select';
import { Container, Alert } from '.';

export interface IAutoComplete {
  data?: Array<{
    component: any;
    value: string;
  }>;
  minSearchCharacters?: number;
  loadingText?: string;
  noRecordText?: string;
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
  error?: string;
  searchText?: string;
  data: Array<{
    component: any;
    value: string;
  }>;
}

const DEFAULT_MIN_SEARCH_CHARS = 3;

export class AutoComplete extends React.Component<IProps, IState> {
  public static defaultProps: IProps = {
    options: {
      data: [],
      loadingText: 'Loading...',
      minSearchCharacters: DEFAULT_MIN_SEARCH_CHARS
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

    this.fetchOptions = debounce(this.fetchOptions, 600);
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
        <Select
          style={{
            width: '100%'
          }}
          showSearch
          value={this.props.value ? this.props.value : undefined}
          notFoundContent={
            this.state.loading ? (
              <Container>{this.props.options!.loadingText || 'Loading...'}</Container>
            ) : this.state.searchText ? (
              <Container>{this.props.options!.noRecordText || 'No record found'}</Container>
            ) : null
          }
          filterOption={false}
          onSearch={this.fetchOptions}
          onChange={this.onChanged}
          defaultActiveFirstOption={true}
          showArrow={false}
          placeholder={this.props.placeholder}
        >
          {this.state.error && (
            <Select.Option key='error' disabled={true}>
              <Alert error={this.state.error} />
            </Select.Option>
          )}

          {this.state.data.map((d) => (
            <Select.Option key={d.value}>{d.component}</Select.Option>
          ))}
        </Select>
      </React.Fragment>
    );
  }

  private fetchOptions = async (text: string) => {
    if (
      !text ||
      text.length <
        (this.props.options
          ? this.props.options.minSearchCharacters || DEFAULT_MIN_SEARCH_CHARS
          : DEFAULT_MIN_SEARCH_CHARS)
    ) {
      this.setState({ loading: false, data: [], error: undefined, searchText: undefined });
    } else {
      if (this.props.options && this.props.options.getFetchPromise) {
        this.setState({ loading: true, data: [], error: undefined, searchText: text });
        try {
          const data = await this.props.options.getFetchPromise(text);
          this.setState({
            data,
            loading: false
          });
        } catch (ex) {
          this.setState({
            loading: false,
            error: ex
          });
        }
      }
    }
  };

  private onChanged = (value: string) => {
    this.props.onChange(value);
  };
}
