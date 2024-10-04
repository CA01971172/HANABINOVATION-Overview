import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import data1 from "../output.json";

const initialDayCounts = {
    eightcount: 0,
    ninecount: 0,
    tencount: 0,
    elevencount: 0,
    twelvecount: 0,
    thirteencount: 0,
    fourteencount: 0,
    fifteencount: 0,
    sixteencount: 0,
    seventeencount: 0
};

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

export default function UsageFrequency() {
    const [dayonecount, setDayonecount] = useState(initialDayCounts);
    const [daytwocount, setDaytwocount] = useState(initialDayCounts);
    const dayonetime = 1720819200000; //日本時間の2024-07-13
    const daytwotime = 1720896000000; //日本時間の2024-07-14
    const hour = 3600000; 

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

    useEffect(() => {
        data1.Items.forEach(item => {
            const fireworksKeys = Object.keys(item.fireworksData.M);
            fireworksKeys.forEach(key => {
                const createdAt = parseInt(item.fireworksData.M[key].M.createdAt.N);
                // 8時から9時までのカウント
                if (createdAt >= dayonetime && createdAt < dayonetime + 1 * hour) {
                    setDayonecount(prevCounts => ({
                        ...prevCounts,
                        eightcount: prevCounts.eightcount + 1
                    }))
                }
                else if (createdAt >= dayonetime + 1 * hour && createdAt < dayonetime + 2 * hour) {
                    setDayonecount(prevCounts => ({
                        ...prevCounts,
                        ninecount: prevCounts.ninecount + 1
                    }))
                }
                else if (createdAt >= dayonetime + 2 * hour && createdAt < dayonetime + 3 * hour) {
                    setDayonecount(prevCounts => ({
                        ...prevCounts,
                        tencount: prevCounts.tencount + 1
                    }))
                }
                else if (createdAt >= dayonetime + 3 * hour && createdAt < dayonetime + 4 * hour) {
                    setDayonecount(prevCounts => ({
                        ...prevCounts,
                        elevencount: prevCounts.elevencount + 1
                    }))
                }
                else if (createdAt >= dayonetime + 4 * hour && createdAt < dayonetime + 5 * hour) {
                    setDayonecount(prevCounts => ({
                        ...prevCounts,
                        twelvecount: prevCounts.twelvecount + 1
                    }))
                }
                else if (createdAt >= dayonetime + 5 * hour && createdAt < dayonetime + 6 * hour) {
                    setDayonecount(prevCounts => ({
                        ...prevCounts,
                        thirteencount: prevCounts.thirteencount + 1
                    }))
                }
                else if (createdAt >= dayonetime + 6 * hour && createdAt < dayonetime + 7 * hour) {
                    setDayonecount(prevCounts => ({
                        ...prevCounts,
                        fourteencount: prevCounts.fourteencount + 1
                    }))
                }
                else if (createdAt >= dayonetime + 7 * hour && createdAt < dayonetime + 8 * hour) {
                    setDayonecount(prevCounts => ({
                        ...prevCounts,
                        fifteencount: prevCounts.fifteencount + 1
                    }))
                }
                else if (createdAt >= dayonetime + 8 * hour && createdAt < dayonetime + 9 * hour) {
                    setDayonecount(prevCounts => ({
                        ...prevCounts,
                        sixteencount: prevCounts.sixteencount + 1
                    }))
                }
                else if (createdAt >= dayonetime + 9 * hour && createdAt < dayonetime + 10 * hour) {
                    setDayonecount(prevCounts => ({
                        ...prevCounts,
                        seventeencount: prevCounts.seventeencount + 1
                    }))
                }
                else if (createdAt >= daytwotime && createdAt < daytwotime + 1 * hour) {
                    setDaytwocount(prevCounts => ({
                        ...prevCounts,
                        eightcount: prevCounts.eightcount + 1
                    }))
                }
                else if (createdAt >= daytwotime + 1 * hour && createdAt < dayonetime + 2 * hour) {
                    setDaytwocount(prevCounts => ({
                        ...prevCounts,
                        ninecount: prevCounts.ninecount + 1
                    }))
                }
                else if (createdAt >= daytwotime + 2 * hour && createdAt < daytwotime + 3 * hour) {
                    setDaytwocount(prevCounts => ({
                        ...prevCounts,
                        tencount: prevCounts.tencount + 1
                    }))
                }
                else if (createdAt >= daytwotime + 3 * hour && createdAt < daytwotime + 4 * hour) {
                    setDaytwocount(prevCounts => ({
                        ...prevCounts,
                        elevencount: prevCounts.elevencount + 1
                    }))
                }
                else if (createdAt >= daytwotime + 4 * hour && createdAt < daytwotime + 5 * hour) {
                    setDaytwocount(prevCounts => ({
                        ...prevCounts,
                        twelvecount: prevCounts.twelvecount + 1
                    }))
                }
                else if (createdAt >= daytwotime + 5 * hour && createdAt < daytwotime + 6 * hour) {
                    setDaytwocount(prevCounts => ({
                        ...prevCounts,
                        thirteencount: prevCounts.thirteencount + 1
                    }))
                }
                else if (createdAt >= daytwotime + 6 * hour && createdAt < daytwotime + 7 * hour) {
                    setDaytwocount(prevCounts => ({
                        ...prevCounts,
                        fourteencount: prevCounts.fourteencount + 1
                    }))
                }
                else if (createdAt >= daytwotime + 7 * hour && createdAt < daytwotime + 8 * hour) {
                    setDaytwocount(prevCounts => ({
                        ...prevCounts,
                        fifteencount: prevCounts.fifteencount + 1
                    }))
                }
                else if (createdAt >= daytwotime + 8 * hour && createdAt < daytwotime + 9 * hour) {
                    setDaytwocount(prevCounts => ({
                        ...prevCounts,
                        sixteencount: prevCounts.sixteencount + 1
                    }))
                }
                else if (createdAt >= daytwotime + 9 * hour && createdAt < daytwotime + 10 * hour) {
                    setDaytwocount(prevCounts => ({
                        ...prevCounts,
                        seventeencount: prevCounts.seventeencount + 1
                    }))
                }
            });
        });
    }, []);

    const labels = ["7","8", "9", "10", "11", "12", "13", "14", "15", "16", "17","18"];
    const graphData = {
        labels: labels,
        datasets: [
            {
                label: "2024-07-13",
                data: [
                    0,
                    dayonecount.eightcount,
                    dayonecount.ninecount,
                    dayonecount.tencount,
                    dayonecount.elevencount,
                    dayonecount.twelvecount,
                    dayonecount.thirteencount,
                    dayonecount.fourteencount,
                    dayonecount.fifteencount,
                    dayonecount.sixteencount,
                    dayonecount.seventeencount,
                    0
                ],
                borderColor: "rgb(75, 192, 192)",
            },
            {
                label: "2024-07-14",
                data: [
                    0,
                    daytwocount.eightcount,
                    daytwocount.ninecount,
                    daytwocount.tencount,
                    daytwocount.elevencount,
                    daytwocount.twelvecount,
                    daytwocount.thirteencount,
                    daytwocount.fourteencount,
                    daytwocount.fifteencount,
                    daytwocount.sixteencount,
                    daytwocount.seventeencount,
                    0
                ],
                borderColor: "rgb(75, 100, 192)",
            },
        ],
    };

    return (
        <div style={divStyle}>
            時間帯ごとのスタンプが押される頻度
            <Line
                data={graphData}
                options={options}
                id="chart-key"
            />
        </div>
    );
}