import * as React from 'react';
import { IContainer, Container } from './Container';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as theme from '../css/theme/theme';
import { vertical } from '../css/main.scss';

interface IDoughnutChart extends IContainer {
  title?: any;
  subTitle?: string;
  labelName?: string;
  backgroundColor: string;
  width?: number;
  height?: number;
  data: {
    name: string;
    y: number;
  }[];
}

export class DoughnutChart extends React.Component<IDoughnutChart> {
  private chart: any;
  private pieChartContainer: any;
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    if (this.props.width || this.props.height) {
      this.chart.chart.setSize(this.props.width, this.props.height, false);
      this.chart.chart.reflow();
    }
    window.dispatchEvent(new Event('resize'));
  }

  public render() {
    const props = this.props;
    const defaultColors = [
      theme.stylings.colors.danger,
      theme.stylings.colors.warning,
      theme.stylings.colors.success
    ];
    var len = this.props.data.length;

    const options = {
      backgroundColor: this.props.backgroundColor,
      colors: defaultColors,
      credits: {
        enabled: false
      },
      chart: {
        type: 'pie'
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: false
          }
        }
      },
      title: {
        text: this.props.title,
        verticalAlign: 'middle',
        useHTML: true
      },
      series: [
        {
          type: 'pie',
          enableMouseTracking: false,
          data: [
            {
              y: 1,
              color: this.props.backgroundColor
            }
          ]
        },
        {
          minPointSize: 10,
          innerSize: '80%',
          zMin: 0,
          name: this.props.labelName,
          data: this.props.data
        }
      ]
    };

    return (
      <Container className={'pieChart'} {...this.props}>
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
