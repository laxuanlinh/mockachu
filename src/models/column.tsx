import ColumnType from "./columnType";

interface Column {
    name: string,
    type: ColumnType,
    options: Map<string, string[]>
}
export default Column;