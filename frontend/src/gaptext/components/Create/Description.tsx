import {TextField} from "@mui/material";
import React, {useContext, useEffect} from "react";
import {GapTextCreateContext} from "../../contexts/GapTextCreateContext";
import {useParams} from "react-router-dom";
import {GapTextContext} from "../../contexts/GapTextContext";

export default function Description() {
    const {id} = useParams()
    const {description, setDescription} = useContext(GapTextCreateContext)
    const {gapTextContainers} = useContext(GapTextContext)

    useEffect(() => {
        if(id !== "") {
            const currentGapText = gapTextContainers.find(value => value.id === id)
            setDescription(currentGapText?.description || "")
        }
    }, [id])

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