import rowData from "../output.json"
import { Item } from "./types"
import { removeDynamoDBTypes } from "./removeDynamoDbTypes"

// jsonデータを整形する
export const analysisData: Item[] = removeDynamoDBTypes(rowData)
