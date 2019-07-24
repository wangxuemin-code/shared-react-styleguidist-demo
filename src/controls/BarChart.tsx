import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Container, IContainer } from '.';
import * as theme from '../css/theme/theme';
import React = require('react');

interface IBarChart extends IContainer {
  type?: 'column' | 'bar';
  title?: string;
  subTitle?: string;
  yTitle?: string;
  xTitle?: string;
  width?: number;
  height?: number;
  series: {
    name?: string;
    data: number[];
  }[];
  colors?: string[];
  isYAxis?: boolean;
  categories: string[];
  plotOptions?: {
    column?: {
      pointPadding?: 0.2,
      borderWidth?: 0
    }
  },
}

export class BarChart extends React.Component<IBarChart, any> {
  private chart: any;
  public static defaultProps = {
    colors: [theme.stylings.colors.primary, theme.stylings.colors.primaryGrey]
  };

  componentDidMount() {
    if (this.props.width || this.props.height) {
      this.chart.chart.setSize(this.props.width, this.props.height, false);
      this.chart.chart.reflow();
    }
    // must trigger an resize event else highcharts will give wrong dimension
    window.dispatchEvent(new Event('resize'));
  }

  public render() {
    const props = this.props;

    const options = {
      colors: this.props.colors,
      chart: {
        type: 'column'
      },
      title: {
        text: this.props.title
      },
      subtitle: {
        text: this.props.subTitle
      },
      yAxis: {
        min: 0,
        title: {
          text: ''
        },
        labels: {
          enabled: true,
          formatter: function() {
            return '';
          }
        }
      },
      xAxis: {
        title: {
          text: this.props.xTitle
        },
        tickInterval: 1,
        labels: {
          enabled: true,
          formatter: function() {
            return props.categories[this.pos];
          }
        },
        crosshair: true,
        categories: this.props.categories
      },
      plotOptions: this.props.plotOptions ? this.props.plotOptions : {},
      legend: {
        enabled: false
      },
      series: this.props.series
    };

    return (
      <Container {...this.props}>
        <HighchartsReact
          ref={(element: any) => (this.chart = element)}
          highcharts={Highcharts}
          options={options}
          callback={this.getChart}
        />
      </Container>
    );
  }

  getChart = (obj: any) => {
    this.chart = obj;
  };
}
