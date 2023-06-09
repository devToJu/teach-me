import {Checkbox, Grid, IconButton, TextField} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {ChangeEvent} from "react";
import {GapTextModel} from "../../models/GapTextModel";

type Props = {
    gapText: GapTextModel,
    updateRow: (value: GapTextModel) => void,
    removeRow: (value: GapTextModel) => void
}

export default function GapTextCreateOrUpdateRow(props: Props) {
    const nameGapTextIsGap = "isGap"
    const nameGapTextValue = "value"
    const {gapText, updateRow, removeRow} = props

    const update = (event: ChangeEvent<HTMLInputElement>) => {
        const attributeName = event.target.name
        const value = attributeName === nameGapTextIsGap ? event.target.checked : event.target.value
        const newGapText = {...gapText, [attributeName]: value}

        updateRow(newGapText)
    }

    return (
        <>
            <Grid item xs={2}>
                <Checkbox
                    name={nameGapTextIsGap}
                    value={gapText.isGap}
                    checked={gapText.isGap}
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
