import React, { Component } from 'react';
import CanvasJSReact from '../../assets/Charts/canvasjs.react';
import { useSelector } from 'react-redux';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const ColumnChart = props => {
    const {bills} = useSelector(store => store.bill);
    const points = [];
    bills.map(bill => {
        points.push({label: bill.date, y: Number(bill.amount)});
    });
    points.sort((a, b) => {
        const s1 = a.label.split('-'), s2 = b.label.split('-');
        const d1 = new Date(Number(s1[2]), Number(s1[1]), Number(s1[0]));
        const d2 = new Date(Number(s2[2]), Number(s2[1]), Number(s2[0]));
        if(d1 <= d2)
            return -1;
        else
            return 1;
    });

    const options = {
        title: {
            text: "Monthly Bill Chart"
        },
        animationEnabled: true,
        data: [
        {
            type: "column",
            dataPoints: points
        }
        ]
    }
    
    return (
    <div>
        <CanvasJSChart options = {options} />
    </div>
    );
}

export default ColumnChart;