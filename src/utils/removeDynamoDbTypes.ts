// DynamoDBから返却された型のデータを通常のオブジェクトに変換する関数
export function removeDynamoDBTypes(item: any): any{
    if (typeof item !== 'object' || item === null) {
        return item;
    }

    if (Array.isArray(item)) {
        return item.map(removeDynamoDBTypes);
    }

    const keys = Object.keys(item);
    if (keys.length === 1) {
        const type = keys[0];
        const value = item[type];
        switch (type) {
            case 'S':
            case 'N':
            case 'BOOL':
                return value;
            case 'M':
                return removeDynamoDBTypes(value);
            case 'L':
                return value.map(removeDynamoDBTypes);
            default:
                return item;
        }
    }

    const result: any = {};
    for (const key of keys) {
        result[key] = removeDynamoDBTypes(item[key]);
    }
    return result;
};
