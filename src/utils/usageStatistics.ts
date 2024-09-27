/* スタンプポイント毎のスタンプが押された量の統計に必要な関数 */
import { BOOTH_ID_LIST } from "./config";
import { Item } from "./types";

//文字列配列のそれぞれの文字列をキーとし、値を特定の値とするオブジェクトを作成する
function createObjectFromArray<T>(arr: string[], value: T): { [key: string]: T }{
    return arr.reduce((acc, cur) => {
        acc[cur] = value;
        return acc;
    }, {} as { [key: string]: T });
};

// データを集計する関数
export function countFireworkIds(items: Item[]){
    const idCount: Record<string, number> = createObjectFromArray(BOOTH_ID_LIST, 0);

    items.forEach(item => {
        const fireworkIds = Object.keys(item.fireworksData);

        fireworkIds.forEach(id => {
            if(idCount[id]){
                idCount[id]++;
            }
        });
    });

    return idCount;
};
