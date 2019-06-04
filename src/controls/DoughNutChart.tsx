import * as React from 'react';
import { IContainer } from './Container';
var DoughnutChart = require("react-chartjs").Doughnut;

interface IProps extends IContainer {
    severe: number;
    moderate: number;
    mild: number;
    
}

export class DoughNutChart extends React.Component<IProps> {
    public constructor(props: IProps) {
        super(props);
    }

    public render() {
        var data = [
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

        var option = {
            segmentShowStroke : false,
            segmentStrokeWidth : 0,
            animateRotate : false,
            percentageInnerCutout : 80
        }

        return(
            <div>
                <DoughnutChart data={data} options={option}/>
            </div>
        );

    }
}