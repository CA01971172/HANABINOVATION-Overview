import rowData from "../output.json"
import { DynamoDBData, Item } from "./types"
import { removeDynamoDBTypes } from "./removeDynamoDbTypes"

// jsonデータを整形する
const convertedData: DynamoDBData = removeDynamoDBTypes(rowData)

export const analysisData: Item[] = convertedData.Items
