import Column from "@/models/column";
import ColumnType from "@/models/columnType";
import firstnames from "@/mock/firstnames.json"
import lastnames from "@/mock/lastnames.json"

export const generateSQL = async (columns: Column[], count: number) => {
    const insertStr = "insert into table ("
    const keyValueMap: Map<string, string[]> = new Map();
    
    for(let col of columns){
        switch (col.type){
            case ColumnType.FIRST_NAME:
                keyValueMap.set(col.name, await getFirstName(count));
                break;
            case ColumnType.LAST_NAME:
                keyValueMap.set(col.name, await getLastName(count));
                break;
            case ColumnType.EMAIL:
                break;
            case ColumnType.INTEGER:
                break;
            case ColumnType.FLOAT:
                break;
            default:
                break;
        }
    }

    let left = "insert into table (";
    let index: number = 0;

    for (let [key, values] of Array.from(keyValueMap.entries())) {
        left = left+key;
        if (index < keyValueMap.size - 1){
            left += ", "
        } else {
            left += ") values ("
        }
        index++;
    }

    const results: string[] = [];

    for (let i = 0; i < count; i++){
        results.push(left);
    }

    for (let i = 0; i < count; i++){
        for (let [key, values] of Array.from(keyValueMap.entries())){
            results[i] += values[i] + ", ";
        }
        results[i] = results[i].substring(0, results[i].length - 2);
        results[i] += ")"
    }

    return results;
}

const getFirstName = async (count: number) => {
    const result: string[] = [];
    for (let i = 0; i < count; i++){
        result.push("'" + firstnames[getRandomInt(0, count)] + "'");
    }
    return result;
}

const getLastName = async (count: number) => {
    const result: string[] = [];
    for (let i = 0; i < count; i++){
        result.push("'" + lastnames[getRandomInt(0, count)] + "'");
    }
    return result;
}

const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}