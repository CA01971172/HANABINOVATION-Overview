import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js"
import { Bar } from "react-chartjs-2"
import { BOOTH_ID_LIST, SCHOOL_DATA } from "./../utils/config"
import { countFireworkIds } from "../utils/usageStatistics"
import { analysisData } from "../utils/analysisData"

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

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
}


/* データの統計を取る */
// データの集計を取る
const countedData: Record<string, number> = countFireworkIds(analysisData)
console.log("analysisData", analysisData)
console.log("countedData", countedData)

// 学校名等のデータを定義する
const labels = BOOTH_ID_LIST.map((boothId) => SCHOOL_DATA[boothId].schoolName)
const backgroundColor = BOOTH_ID_LIST.map((boothId) => SCHOOL_DATA[boothId].color)
const data1 = Object.values(countedData)

const data = {
    labels, // x軸のラベルの配列
    datasets: [
    {
        label: "学校名", // データセットのラベル
        data: data1,      // データの配列(labelsと要素数同じ)
        backgroundColor // 各データポイントごとに異なる色を指定
        }
    ]
}

export default function UsageStatistics(){
    return (
        <Bar options={options} data={data} />
    )
}
