import {Grid, Typography} from "@mui/material";
import React from "react";

export default function RowHeadline() {
    return (
        <>
            <Grid item xs={2}>
                <Typography>Is Gap</Typography>
            </Grid>
            <Grid item xs={8}>
                <Typography>Text Value</Typography>
            </Grid>
            <Grid item container xs={2} justifyContent="flex-end">
                <Typography>Delete</Typography>
            </Grid>
        </>
    )
}