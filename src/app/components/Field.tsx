'use client'

import ColumnType from "@/models/columnType";
import { FC } from "react";
import { FieldSelection as options } from "./FieldSelection";
import FieldProps from "./FieldProps";
import type { Property } from 'csstype';

const Field: FC<FieldProps> = ({ name, 
                                type, 
                                handleAddRow, 
                                index, 
                                handleRemoveRow, 
                                handleChangeName,
                                handleChangeOption, 
                                handleChangeType }): JSX.Element => {
    const buttonStyle = {
        width: "30px",
        height: "30px",
        lineHeight: "30px",
        border: "1px solid black",
        borderRadius: "5px",
        fontSize: "24px"
    }
    const rowDirection : Property.FlexDirection = "row";
    const columnDirection : Property.FlexDirection = "column";
    const fieldContainerStyle = {
        display: "flex",
        flexDirection: rowDirection,
        padding: "20px"
    }
    const optionContainer = {
        padding: "5px",
        marginRight: "10px"
    }
    const buttonContainer = {
        display: "flex",
        flexDirection: columnDirection,
        marginRight: "5px"
    }
    return (
    <>
        <div style={fieldContainerStyle}>
            <div style={optionContainer}>
                <p>Type:</p>
                <select value={type} onChange={(e) => handleChangeType(index, e.target.value)}>
                    {options.map((option, index) => <option key={index} value={option.type}>{option.typeName}</option>)}
                </select>
            </div>
            <div style={optionContainer}>
                <p>Column name:</p>
                <input value={name} type="text" onChange={(e) => handleChangeName(index, e.target.value)}/>
            </div>
            {type === ColumnType.EMAIL && 
                <div style={optionContainer}>
                    <p>Domains</p>
                    <input type="text" onChange={(e) => handleChangeOption(index, "domains", e.target.value)}/>
                </div>
                                }
            {(type === ColumnType.INTEGER || type === ColumnType.FLOAT) &&
                <>
                <div style={optionContainer}>
                    <p>Min</p>
                    <input type="number" onChange={(e) => handleChangeOption(index, "min", e.target.value)}/>
                </div>
                <div style={optionContainer}>
                    <p>Max</p>
                    <input type="number" onChange={(e) => handleChangeOption(index, "max", e.target.value)}/>
                </div>
                {
                    type === ColumnType.FLOAT && 
                    <div style={optionContainer}>
                        <p>Decimal</p>
                        <input type="number" onChange={(e) => handleChangeOption(index, "decimal", e.target.value)}/>
                    </div>
                }
                </>
            }
            <div style={buttonContainer}>
                <br></br>
                <button style={buttonStyle} onClick={() => handleAddRow()}>+</button>
            </div>
            <div style={buttonContainer}>
                <br></br>
                <button style={buttonStyle} onClick={() => handleRemoveRow(index)}>-</button>
            </div>
        </div>
    </>
    )
}

export default Field;