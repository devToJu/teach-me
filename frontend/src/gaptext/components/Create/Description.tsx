import {TextField} from "@mui/material";
import React, {useContext} from "react";
import {GapTextCreateContext} from "../../contexts/GapTextCreateContext";

export default function Description() {
    const {description, setDescription} = useContext(GapTextCreateContext)

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