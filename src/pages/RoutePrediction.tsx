import { CSSProperties,  useState } from "react";
import mapBooth from "../images/マップピン/map_booth.png";
import { SCHOOL_DATA } from "../utils/config";
import createdHanabiPin from "../images/マップピン/花火作成済みマップピン.png";
// import { analysisData } from "../utils/analysisData";, setPostedBoothIdList
 
export default function RoutePrediction(){
    const [ postedBoothIdList ] = useState<string[]>([]);
    const getPinStyle = ( pinX:number, pinY:number, boothId:string ): CSSProperties => ({
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

    const getAnimationStyle = () => { //ピンの上下移動を高さを指定する関数
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
                        >
                        </img>
                    </div>
                    <div>
                        {Object.entries(SCHOOL_DATA).map(([boothId, schoolInfo], index) => (
                            <div key={index}>
                                <img
                                    src={
                                            postedBoothIdList.includes(boothId) ? (
                                                createdHanabiPin
                                            ) : (
                                                `${schoolInfo.mapData.pinImageSrc}`
                                            )
                                        }
                                    style={
                                        getPinStyle(
                                            schoolInfo.mapData.pinX,
                                            schoolInfo.mapData.pinY,
                                            boothId
                                        )
                                    }
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
        </div>
    )
}