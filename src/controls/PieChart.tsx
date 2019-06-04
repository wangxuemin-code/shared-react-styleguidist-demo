import * as React from 'react';
import { IContainer } from './Container';
var DoughnutChart = require("react-chartjs").Doughnut;

interface IProps extends IContainer {
    severe: number;
    moderate: number;
    mild: number;
}

export class PieChart extends React.Component<IProps> {
    public constructor(props: IProps) {
        super(props);
    }

    public render() {
        var outterData = [
            {
                value: this.props.severe,
                color:"#DC3545",
                highlight: "#DC3545",
                label: "fake data"
            },
            {
                value: this.props.moderate,
                color: "#FFC107",
                highlight: "#FFC107",
                label: "unmatched/blurred data"
            },
            {
                value: this.props.mild,
                color: "#28A745",
                highlight: "#28A745",
                label: "verfied/matched data"
            }
        ]


        var innerData = [
            {
                value: this.props.severe,
                color: 'rgba(231, 123, 129, 1)'
            }, {
                value: this.props.moderate,
                color: 'rgba(255, 243, 205, 1)'
            }, {
                value: this.props.mild,
                color: 'rgba(95, 224, 125, 1)'

            }
        ]

        var outterOption = {
            segmentShowStroke : false,
            segmentStrokeWidth : 0,
            animateRotate : false,
            percentageInnerCutout : 80
        }

        var innerOption ={
            segmentShowStroke : false,
            segmentStrokeWidth : 0,
            animateRotate : false,
            percentageInnerCutout : 0
        }

        return(
            <div>
                <DoughnutChart data={outterData} options={outterOption}/>
                <DoughnutChart data={innerData} options={innerOption} />
            </div>
            
        );

    }
}