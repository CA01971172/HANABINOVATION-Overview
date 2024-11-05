import { CSSProperties, useState } from "react";
import { Item } from "../utils/types"
import mapBooth from "../images/マップピン/map_booth.png";
import { SCHOOL_DATA, BOOTH_ID_LIST } from "../utils/config"; // SCHOOK_DATA削除かも
import createdHanabiPin from "../images/マップピン/花火作成済みマップピン.png";
import { analysisData } from "../utils/analysisData";

function getInitializedBoothData(): Record<string, Record<string, number>>{
    const result: Record<string, Record<string, number>> = {}
    BOOTH_ID_LIST.forEach(boothId => {
        const newBoothData: Record<string, number> = {}
        BOOTH_ID_LIST.forEach(boothId2 => {
            if(!newBoothData[boothId] && boothId !== boothId2){
                newBoothData[boothId] = 0;
            }
        })
        result[boothId] = newBoothData;
    });
    return result;
};

const idData = getBoothIdAndCreatedAt(analysisData);
console.log(idData);

const calculateNavigationPercentages = (navigationData: Record<string, Record<string, number>>, boothId: string): number[] => {
    const nextBooths = navigationData[boothId];
    if (!nextBooths) return [0, 0]; // 次のブースがない場合は0％で返す

    const totalMoves = Object.values(nextBooths).reduce((sum, count) => sum + count, 0);
    const percentages = Object.values(nextBooths).map(count => Math.round((count / totalMoves) * 100));
    
    return percentages;
};
// メインの表示処理
const App = () => {
    const navigationData = getBoothIdAndCreatedAt(analysisData);
    const boothId = "HF5W2T"; // テスト用のブースIDを指定します（動的に設定できます）

    // boothId から次のブースへの移動確率を計算
    const percentages = calculateNavigationPercentages(navigationData, boothId);

    return (
        <div>
            {/* ナビゲーション確率を表示 */}
            <NavigationPercentage
                percentages={percentages}
                pinX={SCHOOL_DATA[boothId].mapData.pinX}
                pinY={SCHOOL_DATA[boothId].mapData.pinY}
            />
        </div>
    );
};


// 確率表示用のコンポーネント
function NavigationPercentage({ percentages, pinX, pinY, }: { percentages: number[],  pinX: number, pinY: number }) {
// function NavigationPercentage({ pinX, pinY }: { pinX: number, pinY: number }) {
    return (
        <div style={{
            position: "absolute",
            top: `${pinY - 10}vh`, // ピンの上に表示するよう調整
            left: `${pinX}vw`,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            padding: "1vw",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
            fontSize: "1vw",
            textAlign: "center",
            width: "12vw"
        }}>
            <div style={{color: "#FFA500"}}>🔥 {percentages[0]}%</div>
            <div style={{color: "#00BFFF"}}>💧 {percentages[1]}%</div>
            {/* <div style={{color: "#32CD32"}}>🍃 {idCount["id"]}%</div> */}
        </div>
    );
}

export default function RoutePrediction() {
    const [postedBoothIdList] = useState<string[]>([]);
    const [hoveredBoothId, setHoveredBoothId] = useState<string | null>(null);
    const [percentages] = useState<number[]>([50, 20, 100]); // %の中身
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

    const handleMouseEnter = (boothId: string, pinX: number, pinY: number) => {
        // ピンにカーソルが乗ったときの処理
        setHoveredBoothId(boothId);
        setTooltipPosition({ pinX, pinY });
    };
    const handleMouseLeave = () => {
        // ピンからカーソルが離れたときの処理
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
                <NavigationPercentage percentages={percentages} pinX={tooltipPosition.pinX} pinY={tooltipPosition.pinY} />
            )}
        </div>
    )
}
