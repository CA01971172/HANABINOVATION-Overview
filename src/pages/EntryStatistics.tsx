import {
    Chart as ChartJS,
    ArcElement,
    Title,
    Tooltip,
    Legend
} from "chart.js"
import { Pie } from "react-chartjs-2"
import { BOOTH_ID_LIST, SCHOOL_DATA } from "./../utils/config"
import { analysisData } from "../utils/analysisData"
import { Item } from "../utils/types"

ChartJS.register(
    ArcElement,
    Title,
    Tooltip,
    Legend
)

function getFirstData(userData: Item): string {
    const fireworksData = userData.fireworksData
    let result: string = ""
    let youngest: number | null = null
    for (const fireworkId in fireworksData) {
        if (youngest === null) { //1回目の処理
            result = fireworkId
            youngest = fireworksData[fireworkId].createdAt
        } else { //2回目以降の処理
            if (youngest > fireworksData[fireworkId].createdAt) {
                result = fireworkId
                youngest = fireworksData[fireworkId].createdAt
            }
        }
    }
    return result
}

const listData = analysisData.map(getFirstData)
console.log({ listData })

//カウント格納オブジェクト
const countMap: { [key: string]: number } = {}

for (const item of listData) {
    if (countMap[item]) {
        countMap[item] += 1;
    } else {
        countMap[item] = 1;
    }
}

console.log(countMap)

//データ集計とソート
const sortedEntries = Object.entries(countMap).sort(([, countA], [, countB]) => countB - countA);
const labels = sortedEntries.map(([id]) => SCHOOL_DATA[id]?.schoolName || id);
const dataValues = sortedEntries.map(([, count]) => count);

//色分け
const backgroundColor = BOOTH_ID_LIST.map((boothId) => SCHOOL_DATA[boothId].color);

//円グラフ設定
const data = {
    labels: labels,
    datasets: [
        {
            label: "スタンプポイントごとのカウント",
            data: dataValues,
            backgroundColor,
        }
    ]
}

//グラフのオプション
const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const,
        },
        title: {
            display: true,
            text: "一番最初に押されたスタンプポイントの統計",
        },
    },
}

export default function EntryStatistics() {
    return (
        <Pie options={options} data={data} />
    )
}