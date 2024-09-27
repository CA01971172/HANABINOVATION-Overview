import { createContext, ReactNode } from "react";

/* 型定義 */
// contextに渡すデータの型
type DataContent = {
    analysis: any
};

/* Provider */
const initialData: DataContent = {
    analysis: null
}

export const DataContext = createContext<DataContent>(initialData);

// 花火やユーザーの設定データを管理するProvider
export function DataProvider({children}: {children: ReactNode}){

    return (
        <DataContext.Provider
            value={{
                analysis
            }}
        >
            {children}
        </DataContext.Provider>
    )
}
