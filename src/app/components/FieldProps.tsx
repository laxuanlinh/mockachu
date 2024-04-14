import ColumnType from "@/models/columnType";

interface FieldProps {
    name: string;
    type: ColumnType;
    handleAddRow: Function;
    handleRemoveRow: Function;
    handleChangeType: Function;
    handleChangeName: Function;
    handleChangeOption: Function;
    index: number;
}

export default FieldProps;