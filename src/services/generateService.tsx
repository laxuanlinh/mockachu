import Column from "@/models/column";
import ColumnType from "@/models/columnType";
import firstnames from "@/mock/firstnames.json"
import lastnames from "@/mock/lastnames.json"

export const generateSQL = async (columns: Column[], count: number) => {
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
                const min: number = parseInt(new Map(Object.entries(col.options)).get("min")[0]);
                const max: number = parseInt(new Map(Object.entries(col.options)).get("max")[0]);
                keyValueMap.set(col.name, getRandomInteger(count, min, max));
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