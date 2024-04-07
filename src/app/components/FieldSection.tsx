'use client'

import ColumnType from "@/models/columnType";
import { useState } from "react";

export default function FieldSection() {
    const defaultColumn = {
        type: ColumnType.FIRST_NAME,
        name: "first_name"
    }

    const [columns, setColumns] = useState([defaultColumn]);

    const fieldSectionStyle = {
        width: "100%",
        minHeight: "500px",
        backgroundColor: "#D3D3D3",
        padding: "20px"
    }
    const buttonStyle = {
        width: "30px",
        height: "30px",
        lineHeight: "30px",
        border: "1px solid black",
        borderRadius: "5px",
        fontSize: "24px"
    }

    const handleNameChange = (e: any) => {
        const value = e.target.value
    }

    return (
        <div style={fieldSectionStyle}>
            <h1>Select column name and type:</h1>
            {columns.map((col, index) => <div key={index}>
                Type: 
                <select value={col.type}>
                    <option value={ColumnType.FIRST_NAME}>First name</option>
                    <option value={ColumnType.LAST_NAME}>Last name</option>
                    <option value={ColumnType.USERNAME}>Username</option>
                    <option value={ColumnType.EMAIL}>Email</option>
                    <option value={ColumnType.SERIAL}>Serial</option>
                    <option value={ColumnType.INTEGER}>Integer</option>
                    <option value={ColumnType.FLOAT}>Float</option>
                </select>
                Column name:
                <input type="text" value={col.name} onChange={(e) => handleNameChange(e)}/>
                <button style={buttonStyle}>+</button>
                <button style={buttonStyle}>-</button>
            </div>)}
        </div>
    )
}