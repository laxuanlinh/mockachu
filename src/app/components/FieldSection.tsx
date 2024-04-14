'use client'

import ColumnType from "@/models/columnType";
import { useState } from "react";
import Field from "./Field";
import { primaryButtonStyle } from "./Navbar";  
import MapifyTs from "mapify-ts";

export default function FieldSection() {

    const [result, setResult] = useState("");
    const defaultColumn = {
        type: ColumnType.FIRST_NAME,
        name: "first_name",
        options: new Map<string, string[]>()
    }

    const [columns, setColumns] = useState([{...defaultColumn}]);

    const fieldSectionStyle = {
        width: "100%",
        backgroundColor: "#D3D3D3",
        padding: "20px",
        display: "flex",
        justifyContent: "center"
    }

    const submitSectionStyle = {
        marginTop: "20px",
        marginLeft: "350px"
    }

    const resultSectionStyle = {
        display: "flex",
        justifyContent: "center"
    }

    const resultDisplay = {
        width: "800px",
        height: "300px"
    }

    const handleAddRow = () => {
        setColumns(prev => (
            [...prev, {...defaultColumn}]
        ))
    }

    const handleRemoveRow = (index: number) => {
        let cloned = [...columns];
        cloned.splice(index, 1);
        setColumns([...cloned])
    }

    const handleChangeType = (index: number, type: ColumnType) => {
        let cloned = [...columns];
        cloned[index].type = type;
        cloned[index].options = new Map<string, string[]>();
        setColumns([...cloned]);
    }

    const handleChangeName = (index: number, name: string) => {
        let cloned = [...columns];
        cloned[index].name = name;
        setColumns([...cloned]);
    }

    const handleChangeOption = (index: number, optionName: string, optionValue: string) => {
        let cloned = [...columns];
        cloned[index].options.set(optionName, [optionValue]);
        setColumns([...cloned]);
    }

    const handleSubmit = () => {
        fetch("http://localhost:3000/api/generate", {
            method: "POST",
            body: JSON.stringify(MapifyTs.serialize(columns))
        }).then(res => res.json())
        .then(res => {
            let temp: string = "";
            for (const line of res) {
                temp += line +"\n";
            }
            setResult(temp);
        });
    }

    return (
        <>
        <div style={fieldSectionStyle}>
            <div>
            <h1>Select column name and type:</h1>
            {
            columns.map((col, index) =>
                <Field 
                    key={index} 
                    index={index} 
                    name={col.name} 
                    type={col.type} 
                    handleChangeType={handleChangeType}
                    handleChangeName={handleChangeName}
                    handleChangeOption={handleChangeOption}
                    handleAddRow={handleAddRow} 
                    handleRemoveRow={handleRemoveRow}/>)
            }
            <div style={submitSectionStyle}>
                <button onClick={handleSubmit} style={primaryButtonStyle}>Submit</button>
            </div>
            <div style={resultSectionStyle}>
                <textarea style={resultDisplay} readOnly={true} value={result}/>
            </div>
            </div>
        </div>
        </>
    )
}