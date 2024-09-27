import { createContext, ReactNode, useState } from "react"
import rowData from "../output.json"
import { DynamoDBData, Item } from "../utils/types"
import { removeDynamoDBTypes } from "../utils/removeDynamoDbTypes"

/* jsonデータを整形する */
const convertedData: DynamoDBData = removeDynamoDBTypes(rowData)

/* 型定義 */
// contextに渡すデータの型
type DataContent = {
    analysisData: Item[]
};

/* Provider */
const initialData: DataContent = {
    analysisData: []
}

export const DataContext = createContext<DataContent>(initialData);

// 花火やユーザーの設定データを管理するProvider
export function DataProvider({children}: {children: ReactNode}){
    const [analysisData, _setAnalysisData] = useState<Item[]>(convertedData.Items)

    console.log(analysisData)

    return (
        <DataContext.Provider
            value={{
                analysisData
            }}
        >
            {children}
        </DataContext.Provider>
    )
}
