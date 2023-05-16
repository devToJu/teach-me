import {Button, Grid} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";

type Props = {
    addEmptyRow: () => void
    maxRowCountReached: boolean,
}

export default function AddRow(props: Props) {
    const {addEmptyRow, maxRowCountReached} = props
    return (
        <Grid item xs={2}>
            <Button
                variant="outlined"
                startIcon={<AddIcon/>}
                onClick={addEmptyRow}
                disabled={maxRowCountReached}
            >
                Add
            </Button>
        </Grid>
    )
}