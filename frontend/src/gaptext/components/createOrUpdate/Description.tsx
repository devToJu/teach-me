import {TextField} from "@mui/material";
import React from "react";

type Props = {
    description: string
    setDescription: (value: string) => void
}

export default function Description(props: Props) {
    const {description, setDescription} = props

    return (
        <TextField
            required
            fullWidth
            label="Description"
            sx={{mt: 5}}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
        />
    )
}