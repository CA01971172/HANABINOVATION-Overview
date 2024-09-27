export type Firework = {
    createdAt: number;
    sparksType: number;
    fireworkType: number;
    fireworkDesign?: string;
};

export type Profile = {
    isWinner: boolean;
    receipt: string;
};

export type Item = {
    id: string;
    fireworksData: Record<string, Firework>;
    profile?: Profile;
};

export type DynamoDBData = {
    Items: Item[];
};

// 各学校の設定データ
type WritingMode = 'horizontal-tb' | 'vertical-rl' | 'vertical-lr' | 'sideways-rl' | 'sideways-lr';
export type SchoolInfo = {
    schoolName: string; // 学校名
    color: string; // 学校のテーマカラー(カラーコード)
    mapData: {
        pinX: number; //マップのピン横軸 単位は%
        pinY: number; //マップのピン縦軸 単位は%
        schoolNameX: number; //表示される学校名の縦軸 単位は%
        schoolNameY: number; //表示される学校名の横軸 単位は%
        schoolNameWidth: number; //表示される学校名の文字サイズ 単位はvw
        writingMode: WritingMode; // 表示する学校名の向き
        pinImageSrc: string; // ピンの画像ファイルのパス
    }
}
