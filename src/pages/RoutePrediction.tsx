import { CSSProperties, useState } from "react";
import mapBooth from "../images/マップピン/map_booth.png";
import { SCHOOL_DATA } from "../utils/config";
import createdHanabiPin from "../images/マップピン/花火作成済みマップピン.png";
import { analysisData } from "../utils/analysisData";

// 確率表示用のコンポーネント
function NavigationPercentage({ percentages, movements, pinX, pinY }: { percentages: number[], movements: {toBoothId: string, probability: number}[], pinX: number, pinY: number }) {
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
            <div style={{color: "#32CD32"}}>🍃 {percentages[2]}%</div>
            <div style={{ marginTop: "1vw" }}>
                <h4>移動先の確率</h4>
                <ul style={{ listStyleType: "none", padding: 0 }}>
                    {movements.map((movement, index) => (
                        <li key={index}>
                            {SCHOOL_DATA[movement.toBoothId].schoolName}: {movement.probability}%
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default function RoutePrediction() {
    const [postedBoothIdList, setPostedBoothIdList] = useState<string[]>([]);
    const [selectedBoothId, setSelectedBoothId] = useState<string | null>(null);
    const [percentages, setPercentages] = useState<number[]>([0, 0, 0]);
    const [movements, setMovements] = useState<{toBoothId: string, probability: number}[]>([]);
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

    const handlePinClick = (boothId: string, pinX: number, pinY: number) => {
        // ピンがクリックされたときの処理
        setSelectedBoothId(boothId);
        setTooltipPosition({ pinX, pinY });

        // analysisData から対応するデータを取得し、state に設定
        const boothData = analysisData.find(data => data.boothId === boothId);
        if (boothData) {
            setPercentages([boothData.visitPercentage, boothData.usePercentage, boothData.otherPercentage]);
            setMovements(boothData.movement); // 移動確率を設定
        }
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
                                src={postedBoothIdList.includes(boothId) ? createdHanabiPin : `${schoolInfo.mapData.pinImageSrc}`}
                                style={getPinStyle(schoolInfo.mapData.pinX, schoolInfo.mapData.pinY, boothId)}
                                onClick={() => handlePinClick(boothId, schoolInfo.mapData.pinX, schoolInfo.mapData.pinY)} // クリックイベントを追加
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
            {/* ピンがクリックされたら、確率を表示 */}
            {selectedBoothId && (
                <NavigationPercentage percentages={percentages} movements={movements} pinX={tooltipPosition.pinX} pinY={tooltipPosition.pinY} />
            )}
        </div>
    )
}
