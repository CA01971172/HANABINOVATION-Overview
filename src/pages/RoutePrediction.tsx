import { CSSProperties, useState } from "react";
import { Item } from "../utils/types"
import mapBooth from "../images/マップピン/map_booth.png";
import { SCHOOL_DATA, BOOTH_ID_LIST } from "../utils/config";
import createdHanabiPin from "../images/マップピン/花火作成済みマップピン.png";
import { analysisData } from "../utils/analysisData";
import { Doughnut } from 'react-chartjs-2';

// 名前変更
const SCHOOL_NAME: { [boothId: string]: { schoolName: string } } = {
    "HF5W2T": {
        schoolName: "電子ビジネス　　"
    },
    "Y6XBJH": {
        schoolName: "外語観光・製菓　"
    },
    "7JDZVP": {
        schoolName: "大原簿記　　　　"
    },
    "SHSQ4A": {
        schoolName: "アイペット　　　"
    },
    "FZVSW0": {
        schoolName: "医療大学校　　　"
    },
    "WA067Z": {
        schoolName: "医療福祉　　　　"
    },
    "94VPFZ": {
        schoolName: "ビューティモード"
    },
    "5HGS6W": {
        schoolName: "デザイン・アート"
    },
    "HDE5W4": {
        schoolName: "松山デザイナー　"
    },
    "Y9KFFH": {
        schoolName: "医療（新居浜校）"
    }
};
// 次に行く地点のタイムスタンプをまとめたオブジェクトを初期化して作成する関数
function getInitializedBoothData(): Record<string, Record<string, number>>{
    const result: Record<string, Record<string, number>> = {};
    BOOTH_ID_LIST.forEach(boothId => {
        const newBoothData: Record<string, number> = {};
        BOOTH_ID_LIST.forEach(boothId2 => {
            if(!newBoothData[boothId2] && boothId !== boothId2){
                newBoothData[boothId2] = 0;
            }
        })
        result[boothId] = newBoothData;
    });
    return result;
};

// ユーザーIDからユーザーの花火データを取得する関数
function getUserData(userId: string): Item | null {
    return analysisData.find(data => {
        return data.id === userId;
    }) || null;
}

const initializedBoothData = getInitializedBoothData()
// ブースごとに
function calcPercentagesByBooth(userId: string, boothId: string){
    const userData = getUserData(userId)
    if(!userData) return
    if(Object.keys(userData.fireworksData).length < 2) return
    const object: {createdAtNear: number, boothId: string | null} = {createdAtNear: Infinity, boothId: null}
    for(const boothIdLoop in userData.fireworksData){
        if(boothId === boothIdLoop) continue;
        const diference: number = userData.fireworksData[boothIdLoop].createdAt - userData.fireworksData[boothId].createdAt;
        if(diference > 0 && diference < object.createdAtNear){
            object.createdAtNear = userData.fireworksData[boothIdLoop].createdAt;
            object.boothId = boothIdLoop;
        }
    }
    if(object.boothId === null) return;
    initializedBoothData[boothId][object.boothId]++;
}

function calcPercentagesRatio(userId: string) {
    const userData = analysisData.find(data => data.id === userId);
    if (!userData) return;
    for (const boothIdLoop in userData.fireworksData) {
        calcPercentagesByBooth(userId, boothIdLoop);
    }
}
function calculateAllUsers() {
    analysisData.forEach(user => {
        calcPercentagesRatio(user.id);
    });
}

// 例として関数を呼び出して実行
calculateAllUsers();

const percentageData: Record<string, Record<string, string>> = {};
// 移動割合を計算する関数
function calculatePercentages() {
    for (const boothId in initializedBoothData) {
        const totalMoves = Object.values(initializedBoothData[boothId]).reduce((acc, count) => acc + count, 0);
        percentageData[boothId] = {};
        if (totalMoves > 0) {
            for (const subBoothId in initializedBoothData[boothId]) {
                // 割合の計算を小数第1位までにフォーマット
                percentageData[boothId][subBoothId] = ((initializedBoothData[boothId][subBoothId] / totalMoves) * 100).toFixed(1);
            }
        } else {
            // 移動がない場合は割合を"0.0"に設定
            for (const subBoothId in initializedBoothData[boothId]) {
                percentageData[boothId][subBoothId] = "0.0";
            }
        }
    }
}
// 移動割合の計算を実行
calculatePercentages();
console.log(percentageData);

// percentageDataからデータを取り出して表示する
interface NavigationPercentageProps {
    boothId: string;
    pinX: number;
    pinY: number;
}

// percentageDataの取得と円グラフの表示
function NavigationPercentage({ boothId, pinX, pinY }: NavigationPercentageProps) {
    const percentages = percentageData[boothId];
    // percentagesのデータを数値の大きい順にソートし、上位3つを取り出す
    const sortedBoothIds = Object.entries(percentages)
    .map(([boothId, value]) => ({ boothId, percentage: parseFloat(value) }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 9)
    .map(entry => entry.boothId);
    // 上位3つのboothIdを変数に代入
    const top1: string = sortedBoothIds[0] || "";
    const top2: string = sortedBoothIds[1] || "";
    const top3: string = sortedBoothIds[2] || "";
    const top4: string = sortedBoothIds[3] || "";
    const top5: string = sortedBoothIds[4] || "";
    const top6: string = sortedBoothIds[5] || "";
    const top7: string = sortedBoothIds[6] || "";
    const top8: string = sortedBoothIds[7] || "";
    const top9: string = sortedBoothIds[8] || "";
    const top10: string = sortedBoothIds[9] || "";
    // SCHOOL_NAMEからschoolNameを、SCHOOL_DATAからcolorを取得
    const labels = [SCHOOL_NAME[top1].schoolName, SCHOOL_NAME[top2].schoolName, SCHOOL_NAME[top3].schoolName];
    const backgroundColor = [SCHOOL_DATA[top1].color, SCHOOL_DATA[top2].color, SCHOOL_DATA[top3].color,SCHOOL_DATA[top4].color, SCHOOL_DATA[top5].color, SCHOOL_DATA[top6].color,SCHOOL_DATA[top7].color, SCHOOL_DATA[top8].color, SCHOOL_DATA[top9].color, SCHOOL_DATA[top10]?.color || "#FFA500"];
    // チャートデータの設定
    const data = {
        labels: labels,
        datasets: [
            {
                data: [
                    parseFloat(percentages[top1]) || 0,
                    parseFloat(percentages[top2]) || 0,
                    parseFloat(percentages[top3]) || 0,
                    parseFloat(percentages[top4]) || 0,
                    parseFloat(percentages[top5]) || 0,
                    parseFloat(percentages[top6]) || 0,
                    parseFloat(percentages[top7]) || 0,
                    parseFloat(percentages[top8]) || 0,
                    parseFloat(percentages[top9]) || 0,
                    parseFloat(percentages[top10]) || 0
                ],
                backgroundColor: backgroundColor,
            },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "top" as const,
            },
            tooltip: {
                callbacks: {
                    label: function(context: any) {
                        return `${context.label}: ${context.raw}%`;
                    }
                }
            }
        }
    };
    return (
        <div
            style={{
                position: "absolute",
                top: `${pinY - 10}vh`,
                left: `${pinX+4.9}vw`,
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                padding: "1vw",
                borderRadius: "10px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                zIndex: 1000,
                fontSize: "1vw",
                textAlign: "center",
                width: "12vw",
            }}
        >
            <Doughnut data={data} options={options} />
        </div>
    );
}

export default function RoutePrediction() {
    const [postedBoothIdList] = useState<string[]>([]);
    const [hoveredBoothId, setHoveredBoothId] = useState<string | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState({ pinX: 0, pinY: 0 });
    const getPinStyle = (pinX: number, pinY: number, boothId: string): CSSProperties => ({
        position: "absolute" as "absolute",
        top: `${pinY}vh`,
        left: `${pinX}vw`,
        width: "5vw",
        filter: "drop-shadow(5px 5px 0px rgba(0, 0, 0, 0.5))",
        animation: 
            postedBoothIdList.includes(boothId) ? (
                "none"
            ) : (
                "floatUpDown 2s ease-in-out infinite"
            )
    });
    const getAnimationStyle = () => {
        return `
        @keyframes floatUpDown {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-10px);
        }
        }`;
    };

    const handleMouseEnter = (boothId: string, pinX: number, pinY: number) => { // ピンにカーソルが乗ったとき
        setHoveredBoothId(boothId);
        setTooltipPosition({ pinX, pinY });
    };
    const handleMouseLeave = () => { // 離れたときの処理
        setHoveredBoothId(null);
    };
    return (
        <div>
            <div>スタンプポイントの経路予測</div>
            <style>{getAnimationStyle()}</style>
            <div>
                <div
                    style={{
                        maxHeight: "100%",
                        width: "100%",
                        height: "100%",
                        position: "relative",
                        display: "flex",
                        justifyContent: "center",
                        textAlign: "center"
                    }}
                >
                    <img 
                        src={mapBooth}
                        style={{width: "70%", height: "100vh", zIndex: -1}}
                    />
                </div>
                <div>
                    {Object.entries(SCHOOL_DATA).map(([boothId, schoolInfo], index) => (
                        <div key={index}>
                            <img
                                src={postedBoothIdList.includes(boothId) ? (
                                    createdHanabiPin) : (
                                        `${schoolInfo.mapData.pinImageSrc}`
                                    )
                                }
                                style={getPinStyle(schoolInfo.mapData.pinX, schoolInfo.mapData.pinY, boothId)}
                                onMouseEnter={() => handleMouseEnter(boothId, schoolInfo.mapData.pinX, schoolInfo.mapData.pinY)} // マウスオーバーイベントを追加
                                onMouseLeave={handleMouseLeave} // マウスアウトイベントを追加
                            />
                            <div
                                style={{
                                    position: "absolute",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    userSelect: "none",
                                    top: `${schoolInfo.mapData.schoolNameY}vh`,
                                    left: `${schoolInfo.mapData.schoolNameX}vw`,
                                    ...(schoolInfo.mapData.writingMode.includes("vertical")) ? (
                                        { height: `${schoolInfo.mapData.schoolNameWidth}vh` }
                                    ) : (
                                        { width: `${schoolInfo.mapData.schoolNameWidth}vw` }
                                    ),
                                    fontSize: "1vw",
                                    color: "#000000",
                                    writingMode: schoolInfo.mapData.writingMode,
                                }}
                            >
                                {schoolInfo.schoolName}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* ピンがカーソルに乗ったら、確率を表示 */}
            {hoveredBoothId && (
                <NavigationPercentage boothId={hoveredBoothId} pinX={tooltipPosition.pinX} pinY={tooltipPosition.pinY} />
            )}
        </div>
    )
}
