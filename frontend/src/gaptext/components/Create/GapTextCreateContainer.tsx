import {boxStyleBorder} from "./GapTextCreateStyles";
import {Box, Grid} from "@mui/material";
import RowHeadline from "./RowHeadline";
import GapTextCreateRow from "./GapTextCreateRow";
import AddRow from "./AddRow";
import React, {useContext} from "react";
import {GapTextCreateContext} from "../../contexts/GapTextCreateContext";

export default function GapTextCreateContainer() {
    const {gapTexts} = useContext(GapTextCreateContext)

    return (
        <Box sx={boxStyleBorder}>
            <Grid container m={2} spacing={2}>
                <RowHeadline/>
                {
                    gapTexts.map(gapText => <GapTextCreateRow key={gapText.id} gapText={gapText}/>)
                }
                <AddRow/>
            </Grid>
        </Box>
    )
}