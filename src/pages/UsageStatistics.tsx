import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const
        },
        title: {
            display: true,
            text: "スタンプポイント毎のスタンプが押された量の統計"
        }
    }
};


/* データの統計を取る */

const labels = ["January", "February", "March", "April", "May", "June", "July"];
const data1 = [12, 11, 14, 52, 14, 32, 36];

const data = {
    labels, // x軸のラベルの配列
    datasets: [
    {
        label: "学校名", // データセットのラベル
        data: data1,      // データの配列(labelsと要素数同じ)
        backgroundColor: [ // 各データポイントごとに異なる色を指定
            "rgba(255, 99, 132, 0.5)",
            "rgba(54, 162, 235, 0.5)",
            "rgba(75, 192, 192, 0.5)",
            "rgba(153, 102, 255, 0.5)",
            "rgba(255, 159, 64, 0.5)",
            "rgba(255, 205, 86, 0.5)",
            "rgba(201, 203, 207, 0.5)"
            ],
        },
    ],
};

export default function UsageStatistics(){
    return (
        <Bar options={options} data={data} />
    )
}
