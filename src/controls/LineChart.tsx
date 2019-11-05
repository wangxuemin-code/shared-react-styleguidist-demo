import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { stylings } from '../css/theme';
import React = require('react');
import { Container, IContainer } from '.';

interface ILineChart extends IContainer {
  title?: string;
  subTitle?: string;
  yTitle?: string;
  xTitle?: string;
  series: {
    name?: string;
    data: number[];
  }[];
  xLabels: string[];
  colors?: string[];
}

export class LineChart extends React.Component<ILineChart, any> {
  public static defaultProps = {
    colors: [stylings.colors.primary, stylings.colors.primaryGrey]
  };

  componentDidMount() {
    // must trigger an resize event else highcharts will give wrong dimension
    window.dispatchEvent(new Event('resize'));
  }

  public render() {
    const props = this.props;

    const options = {
      colors: this.props.colors,
      title: {
        text: this.props.title
      },
      subtitle: {
        text: this.props.subTitle
      },
      yAxis: {
        title: {
          text: this.props.yTitle
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
            return props.xLabels[this.pos];
          }
        }
      },
      legend: {
        enabled: false
      },
      series: this.props.series
    };

    return (
      <Container {...this.props}>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </Container>
    );
  }
}
