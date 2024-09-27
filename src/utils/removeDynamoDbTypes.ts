import { Firework, Item } from "./types";

// DynamoDBから返却された型のデータを通常のオブジェクトに変換する関数
export function removeDynamoDBTypes(data: any): Item[]{
    console.log(data)
    const result: Item[] = []

    data.Items.forEach((item: any) => {
        const fireworksData = item.fireworksData.M
        const convertedFireworksData: Record<string, Firework> = Object.keys(fireworksData).reduce((acc, key) => {
            acc[key] = {
                createdAt: fireworksData[key].M.createdAt.N,
                sparksType: fireworksData[key].M.sparksType.N,
                fireworkType: fireworksData[key].M.fireworkType.N,
                ...((fireworksData[key].M.fireworkDesign?.S !== undefined) && { fireworkDesign: fireworksData[key].M.fireworkDesign.S })
            };
            return acc;
        }, {} as Record<string, Firework>);

        const convertedData: Item = {
            id: item.id.S,
            fireworksData: convertedFireworksData,
            ...((item.profile !== undefined) && {
                profile: {
                    isWinner: item.profile.M.isWinner.BOOL, 
                    receipt: item.profile.M.receipt.S
                }
            })
        }

        result.push(convertedData)
    });

    return result
};
