import {TextField} from "@mui/material";
import React from "react";
import {Consumer} from "../../../components/models/CallbackTypes";

const textFieldStyle = {
    mb: 2
}

type Props = {
    label: string
    value: string
    setValue: Consumer<string>
}

export default function TaskInputField(props: Props) {
    const {label, value, setValue} = props

    return(
        <TextField
            fullWidth
            size="small"
            label={label}
            sx={textFieldStyle}
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    )
}