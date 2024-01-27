import ColumnType from "./columnType";

interface Column {
    name: string,
    type: ColumnType,
    options: Map<string, string[]>,
    index: number
}
export default Column;