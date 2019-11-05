import * as Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import React = require('react');

export class CandleStickChart extends React.Component<any, any> {
  componentDidMount() {
    // must trigger an resize event else highcharts will give wrong dimension
    window.dispatchEvent(new Event('resize'));
  }
  public render() {
    const options = {
      title: {
        text: 'AAPL stock price by minute'
      },

      rangeSelector: {
        buttons: [
          {
            type: 'hour',
            count: 1,
            text: '1h'
          },
          {
            type: 'day',
            count: 1,
            text: '1D'
          },
          {
            type: 'all',
            count: 1,
            text: 'All'
          }
        ],
        selected: 1,
        inputEnabled: false
      },

      series: [
        {
          name: 'AAPL',
          type: 'candlestick',
          data: [
            [1317888000000, 372.5101, 375, 372.2, 372.52],
            [1317888060000, 372.4, 373, 372.01, 372.16],
            [1317888120000, 372.16, 372.4, 371.39, 371.62],
            [1317888180000, 371.62, 372.16, 371.55, 371.75],
            [1317888240000, 371.75, 372.4, 371.57, 372],
            [1317888300000, 372, 372.3, 371.8, 372.24],
            [1317888360000, 372.22, 372.45, 372.22, 372.3],
            [1317888420000, 372.3, 373.25, 372.3, 373.15],
            [1317888480000, 373.01, 373.5, 373, 373.24],
            [1317888540000, 373.36, 373.88, 373.19, 373.88],
            [1317888600000, 373.8, 374.34, 373.75, 374.29],
            [1317888660000, 374.29, 374.43, 374, 374.01]
          ] as any,
          tooltip: {
            valueDecimals: 2
          }
        }
      ]
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
  }
}
