import * as React from 'react';
import { IContainer } from './Container';
var DoughnutChart = require("react-chartjs").Doughnut;

interface IProps extends IContainer {
    displayType: 'severe' | 'moderate' |'mild';
    
}

export class PieChart extends React.Component<IProps> {
    public constructor(props: IProps) {
        super(props);
    }

    public render() {
        var typeColor = this.getColor();
        var data = [
            {
                value: 1,
                color: typeColor,
                highlight: typeColor
            }
        ]

        var option = {
            segmentShowStroke : false,
            segmentStrokeWidth : 0,
            animateRotate : false,
            percentageInnerCutout : 0
        }

        return(
            <div>
                <DoughnutChart data={data} options={option}/>
            </div>
        );

    }

    public getColor() {
        var color = '#ffffff';
        switch (this.props.displayType) {
            case 'severe':
                color = 'rgba(231, 123, 129, 1)';
                break;
            case 'moderate':
                color = 'rgba(255, 243, 205, 1)';
                break;
            case 'mild':
                color = 'rgba(95, 224, 125, 1)';
                break;
        }
        return color;
    }
}