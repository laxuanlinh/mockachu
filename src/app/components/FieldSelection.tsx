import ColumnType from "@/models/columnType";

export const FieldSelection = [
    {
        type: ColumnType.FIRST_NAME,
        typeName: "First Name",
        defaultName: "first_name"
    },
    {
        type: ColumnType.LAST_NAME,
        typeName: "Last Name",
        defaultName: "last_name"
    },
    {
        type: ColumnType.USERNAME,
        typeName: "Username",
        defaultName: "username"
    },
    {
        type: ColumnType.EMAIL,
        typeName: "Email",
        defaultName: "email"
    },
    {
        type: ColumnType.SERIAL,
        typeName: "Serial",
        defaultName: "serial"
    },
    {
        type: ColumnType.INTEGER,
        typeName: "Integer",
        defaultName: "integer"
    },
    {
        type: ColumnType.FLOAT,
        typeName: "Float",
        defaultName: "float"
    },
]