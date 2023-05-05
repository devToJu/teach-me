import {Button, Grid} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, {useContext} from "react";
import {GapTextCreateContext} from "../../contexts/GapTextCreateContext";

export default function AddRow() {
    const {gapTexts, addNewRow} = useContext(GapTextCreateContext)

    return (
        <Grid item xs={2}>
            <Button
                variant="outlined"
                startIcon={<AddIcon/>}
                onClick={addNewRow}
                disabled={gapTexts.length >= 6}
            >
                Add
            </Button>
        </Grid>
    )
}