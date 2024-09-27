import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// 必要な要素を登録
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function UsageFrequency(){
    const labels = ["1 月", "2 月", "3 月", "4 月", "5 月", "6 月"];
    const graphData = {
        labels: labels,
        datasets: [
        {
            label: "A社",
            data: [65, 59, 60, 81, 56, 55],
            borderColor: "rgb(75, 192, 192)",
        },
        {
            label: "B社",
            data: [60, 55, 57, 61, 75, 50],
            borderColor: "rgb(75, 100, 192)",
        },
        ],
    };

    const options: {} = {
        maintainAspectRatio: false,
    };

    const divStyle: React.CSSProperties = {
        marginLeft: "auto",
        marginRight: "auto",
        margin: "10px",
        width: "500px",
        height: "300px",
        maxHeight: "300px"
    };

    return (
        <div style={divStyle}>時間帯ごとのスタンプが押される頻度
            <Line
                data={graphData}
                options={options}
                id="chart-key"
            />
        </div>
    );
}