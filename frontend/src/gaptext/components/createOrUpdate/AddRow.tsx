import {Button, Grid} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";

type Props = {
    addEmptyRow: () => void
    hasMoreThanSixRows: boolean,
}

export default function AddRow(props: Props) {
    const {addEmptyRow, hasMoreThanSixRows} = props
    return (
        <Grid item xs={2}>
            <Button
                variant="outlined"
                startIcon={<AddIcon/>}
                onClick={addEmptyRow}
                disabled={hasMoreThanSixRows}
            >
                Add
            </Button>
        </Grid>
    )
}