import Column from "@/models/column";
import ColumnType from "@/models/columnType";
import firstnames from "@/mock/firstnames.json"
import lastnames from "@/mock/lastnames.json"
import Graph from "./graph"

const functionMap: Map<string, RegExp> = new Map<string, RegExp>([
    ["col", new RegExp("^(col\(.*\))$")],
    ["string", new RegExp("^('.*')$")]
])

export const generateSQL = async (columns: Column[], count: number) => {
    const keyValueMap: Map<string, string[]> = new Map();
    const executionOrder = getExecutionOrder(columns);
    const newColumns: Column[] = [];
    for (let index of executionOrder){
        for (let col of columns){
            if (index === col.index) {
                newColumns.push(col);
            }
        }
    }
    for(let col of newColumns){
        switch (col.type){
            case ColumnType.FIRST_NAME:
                keyValueMap.set(col.name, await getFirstName(count));
                break;
            case ColumnType.LAST_NAME:
                keyValueMap.set(col.name, await getLastName(count));
                break;
            case ColumnType.EMAIL:
                //This is why javascript/typescript is stupid
                //it can't even read a map from JSON 
                keyValueMap.set(col.name, await getEmail(count, new Map(Object.entries(col.options)).get("domains")))
                break;
            case ColumnType.USERNAME:
                keyValueMap.set(col.name, await getUsername(count));
                break;
            case ColumnType.SERIAL:
                keyValueMap.set(col.name, getSerial(count));
                break;
            case ColumnType.INTEGER:
                const minInt: number = parseInt(new Map(Object.entries(col.options)).get("min")[0]);
                const maxInt: number = parseInt(new Map(Object.entries(col.options)).get("max")[0]);
                keyValueMap.set(col.name, getRandomInteger(count, minInt, maxInt));
                break;
            case ColumnType.FLOAT:
                const minFloat: number = parseInt(new Map(Object.entries(col.options)).get("min")[0]);
                const maxFloat: number = parseInt(new Map(Object.entries(col.options)).get("max")[0]);
                const decimal: number = parseInt(new Map(Object.entries(col.options)).get("decimal")[0]);
                keyValueMap.set(col.name, getRandomFloat(count, minFloat, maxFloat, decimal));
                break;
            case ColumnType.FORMULA:
                const value: string = new Map(Object.entries(col.options)).get("value");
                keyValueMap.set(col.name, getFormula(count, value, keyValueMap));
                break;
            default:
                throw new Error(`Type ${col.type} is not supported`);
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

const getExecutionOrder = (columns: Column[]) => {
    let g = new Graph(columns.length);
    for (let i = 0; i<columns.length; i++) {
        columns[i].index = i;
    }
    dfs(columns[0], g, columns)
    return g.SCC();
}

const dfs = (column: Column, g: Graph, columns: Column[]) => {
    if (column.type !== ColumnType.FORMULA){
        return
    }
    const value: string = new Map(Object.entries(column.options)).get("value");
    const strArr = value.split("+");
    for (let str of strArr ){
        if (functionMap?.get("col")?.test(str)){
            const neighbour = getColumn(columns, str.match(/col\('(.*?)'\)/)![1]);
            g.addEdge(column.index, neighbour.index);
            dfs(neighbour, g, columns);
        }
    }
}

const getColumn = (columns: Column[], colName: string) => {
    for (let column of columns){
        if (column.name === colName) {
            return column;
        }
    }
    throw new Error("Column "+colName+" doesn't exist");
}

const getFirstName = async (count: number) => {
    const result: string[] = [];
    for (let i = 0; i < count; i++){
        result.push("'" + firstnames[getRandom(0, firstnames.length - 1)] + "'");
    }
    return result;
}

const getLastName = async (count: number) => {
    const result: string[] = [];
    for (let i = 0; i < count; i++){
        result.push("'" + lastnames[getRandom(0, lastnames.length - 1)] + "'");
    }
    return result;
}

const getEmail = async (count: number, domains: string[]) => {
    const result: string[] = [];
    for (let i=0; i< count; i++){
        result.push(
            "'" + firstnames[getRandom(0, firstnames.length - 1)].toLowerCase() + 
            "." + lastnames[getRandom(0, lastnames.length - 1)].toLowerCase() +
            "@" + await getRandomDomain(domains)+"'")
    }
    return result;
}

const getRandomDomain = async (domains: string[]) => {
    return domains[getRandom(0, domains.length - 1)];
}

const getUsername = async (count: number) => {
    const result: string[] = [];
    for (let i=0; i< count; i++){
        result.push(
            "'" + firstnames[getRandom(0, firstnames.length - 1)].toLowerCase() 
            + lastnames[getRandom(0, lastnames.length - 1)].toLowerCase()
            + getRandom(0, 999)+"'")
    }
    return result;
}

const getSerial = (count: number) => {
    const result: string[] = [];
    for (let i=1; i<= count; i++){
        result.push(""+i+"")
    }
    return result;
}

const getRandomInteger = (count: number, min: number, max: number) => {
    const result: string[] = []; 
    for (let i=0; i< count; i++){
        result.push(""+getRandom(min, max)+"")
    }
    return result;
}

const getRandom = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomFloat = (count: number, min: number, max: number, decimal: number) => {
    const result: string[] = [];
    for (let i=0; i< count; i++){
        result.push(""+(Math.random() * (max - min) + min).toFixed(decimal) + "")
    }
    return result;
}

const getFormula = (count: number, value: string, keyValueMap: Map<string, string[]>) => {
    const result: string[] = [];
    const valueArr = value.split("+");
    for (let i=0; i<count; i++){
        let str = "";
        for (let item of valueArr){
            item = item.trim();
            if (functionMap?.get("col")?.test(item)){
                let colValue = keyValueMap?.get(item?.match(/col\('(.*?)'\)/)![1])![i];
                if (colValue[0]==="'" && colValue[colValue.length-1]==="'"){
                    str += removeQuote(colValue);
                } else {
                    str += colValue;
                }
            } else if (functionMap?.get("string")?.test(item)) {
                str += item?.match(/'(.*?)'/)![1];
            }
        }
        result.push("'"+str+"'");
    }
    
    return result;
}

const removeQuote = (value: string) => {
    return value.substring(1, value.length - 1);
}