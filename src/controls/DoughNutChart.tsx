import * as React from 'react';
import { IContainer, Container } from './Container';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as theme from '../css/theme/theme';
import { vertical } from '../css/main.scss';

interface IDoughnutChart extends IContainer {
  title?: string;
  subTitle?: string;
  labelName?: string;
  backgroundColor: string;
  height?: number;
  data: {
    name: string;
    y: number;
  }[];
}

export class DoughnutChart extends React.Component<IDoughnutChart> {
  private chart: any;
  componentDidMount() {
    setTimeout(function() {
      window.dispatchEvent(new Event('resize'));
    }, 100);
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
        type: 'pie',
        height: this.props.height
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
        verticalAlign: 'middle'
      },
      subtitle: {
        text: this.props.subTitle,
        y: 250
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
      <Container
        className={'pieChart'}
        width={this.props.width}
        height={this.props.height}
        {...this.props}
      >
        <HighchartsReact
          ref={(element: any) => (this.chart = element)}
          highcharts={Highcharts}
          options={options}
          callback={this.getChart}
        />
      </Container>
    );
  }

  handleResize = () => {};

  getChart = (obj: any) => {
    // this.chart = obj.chart;
    // console.log('b', this.chart);
    // this.chart.reflow();
  };
}
