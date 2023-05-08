import {Checkbox, Grid, IconButton, TextField} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {ChangeEvent, useContext, useState} from "react";
import {GapTextModel} from "../../models/GapTextModel";
import {GapTextCreateContext} from "../../contexts/GapTextCreateContext";

type Props = {
    gapText: GapTextModel
}

export default function GapTextCreateRow(props: Props) {
    const {removeRow, updateRow} = useContext(GapTextCreateContext)
    const [gapText, setGapText] = useState<GapTextModel>(props.gapText)
    const nameGapTextIsGap = "isGap"
    const nameGapTextValue = "value"

    const update = (event: ChangeEvent<HTMLInputElement>) => {
        const attributeName = event.target.name
        const value = attributeName === nameGapTextIsGap ? event.target.checked : event.target.value
        const newGapText = {...gapText, [attributeName]: value}

        setGapText(newGapText)
        updateRow(newGapText)
    }

    return (
        <>
            <Grid item xs={2}>
                <Checkbox
                    name={nameGapTextIsGap}
                    value={gapText.isGap}
                    onChange={update}
                />
            </Grid>
            <Grid item xs={8}>
                <TextField
                    required
                    fullWidth
                    name={nameGapTextValue}
                    value={gapText.value}
                    onChange={update}
                />
            </Grid>
            <Grid item container xs={2} justifyContent="flex-end">
                <IconButton
                    aria-label="delete"
                    onClick={() => removeRow(gapText)}
                    size="large"
                >
                    <DeleteIcon/>
                </IconButton>
            </Grid>
        </>
    )
}
