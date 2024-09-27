import { SchoolInfo } from "./types";
import pin_image_denshi from "./../images/マップピン/河原電子ビジネスマップピン.png";
import pin_image_gaigoseika from "./../images/マップピン/河原外語・製菓マップピン.png";
import pin_image_ooharaboki from "./../images/マップピン/大原簿記公務員マップピン.png";
import pin_image_aipetto from "./../images/マップピン/河原アイペットワールドマップピン.png";
import pin_image_iryou from "./../images/マップピン/河原医療大学校マップピン.png";
import pin_image_iryouhukushi from "./../images/マップピン/河原医療福祉マップピン.png";
import pin_image_beauti from "./../images/マップピン/河原ビューティ.png";
import pin_image_design from "./../images/マップピン/河原デザイン・アートマップピン.png";
import pin_image_matsuyamadesigner from "./../images/マップピン/松山デザイナーマップピン.png";
import pin_image_iryou_niihama from "./../images/マップピン/河原医療大学校新居浜校マップピン.png"

// 各学校の設定データ
export const SCHOOL_DATA: { [boothId: string]: SchoolInfo } = {
    "HF5W2T": {
        schoolName: "河原電子ビジネス専門学校",
        color: "#00FFFF",
        mapData: {
            pinX: 46,
            pinY: 19,
            schoolNameX: 12,
            schoolNameY: 26,
            schoolNameWidth: 52,
            writingMode: "horizontal-tb",
            pinImageSrc: pin_image_denshi
        }
    },
    "Y6XBJH": {
        schoolName: "河原外語観光・製菓専門学校",
        color: "#4800FF",
        mapData: {
            pinX: 3,
            pinY: 5,
            schoolNameX: 5,
            schoolNameY: 5,
            schoolNameWidth: 25,
            writingMode: "horizontal-tb",
            pinImageSrc: pin_image_gaigoseika
        }
    },
    "7JDZVP": {
        schoolName: "大原簿記公務員専門学校 愛媛校",
        color: "#FF0000",
        mapData: {
            pinX: 40,
            pinY: 5,
            schoolNameX: 35,
            schoolNameY: 5,
            schoolNameWidth: 26,
            writingMode: "horizontal-tb",
            pinImageSrc: pin_image_ooharaboki
        }
    },
    "SHSQ4A": {
        schoolName: "河原アイペットワールド専門学校",
        color: "#FFA500",
        mapData: {
            pinX: 72,
            pinY: 5,
            schoolNameX: 86,
            schoolNameY: 6,
            schoolNameWidth: 30,
            writingMode: "vertical-rl",
            pinImageSrc: pin_image_aipetto
        }
    },
    "FZVSW0": {
        schoolName: "河原医療大学校",
        color: "#00FF00",
        mapData: {
            pinX: 13,
            pinY: 31.5,
            schoolNameX: 25,
            schoolNameY: 34,
            schoolNameWidth: 26,
            writingMode: "horizontal-tb",
            pinImageSrc: pin_image_iryou
        }
    },
    "WA067Z": {
        schoolName: "河原医療福祉専門学校",
        color: "#CDFF00",
        mapData: {
            pinX: 22,
            pinY: 47,
            schoolNameX: 12,
            schoolNameY: 53,
            schoolNameWidth: 35,
            writingMode: "horizontal-tb",
            pinImageSrc: pin_image_iryouhukushi
        }
    },
    "94VPFZ": {
        schoolName: "河原ビューティモード専門学校",
        color: "#FF00FF",
        mapData: {
            pinX: 40,
            pinY: 60,
            schoolNameX: 32,
            schoolNameY: 60,
            schoolNameWidth: 38,
            writingMode: "horizontal-tb",
            pinImageSrc: pin_image_beauti
        }
    },
    "5HGS6W": {
        schoolName: "河原デザイン・アート専門学校",
        color: "#FFFF00",
        mapData: {
            pinX: 80,
            pinY: 42,
            schoolNameX: 91,
            schoolNameY: 48,
            schoolNameWidth: 35,
            writingMode: "vertical-rl",
            pinImageSrc: pin_image_design
        }
    },
    "HDE5W4": {
        schoolName: "松山デザイナー専門学校",
        color: "#0000FF",
        mapData: {
            pinX: 8,
            pinY: 60,
            schoolNameX: 6,
            schoolNameY: 60,
            schoolNameWidth: 22,
            writingMode: "horizontal-tb",
            pinImageSrc: pin_image_matsuyamadesigner
        }
    },
    "Y9KFFH": {
        schoolName: "河原医療大学校 新居浜校",
        color: "#00FFAC",
        mapData: {
            pinX: 49,
            pinY: 50,
            schoolNameX: 55,
            schoolNameY: 52,
            schoolNameWidth: 26,
            writingMode: "horizontal-tb",
            pinImageSrc: pin_image_iryou_niihama
        }
    }
};

// ブースIDのリスト
export const BOOTH_ID_LIST: string[] = Object.keys(SCHOOL_DATA);
