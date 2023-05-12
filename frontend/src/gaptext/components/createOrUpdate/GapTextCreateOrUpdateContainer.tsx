import {boxStyleBorder} from "./GapTextCreateOrUpdateStyles";
import {Box, Grid} from "@mui/material";
import RowHeadline from "./RowHeadline";
import GapTextCreateOrUpdateRow from "./GapTextCreateOrUpdateRow";
import AddRow from "./AddRow";
import React from "react";
import {GapTextModel} from "../../models/GapTextModel";

type Props = {
    gapTexts: GapTextModel[],
    addEmptyRow: () => void,
    updateRow: (value: GapTextModel) => void,
    removeRow: (value: GapTextModel) => void
}

export default function GapTextCreateOrUpdateContainer(props: Props) {
    const {gapTexts, addEmptyRow, updateRow, removeRow} = props

    return (
        <Box sx={boxStyleBorder}>
            <Grid container m={2} spacing={2}>
                <RowHeadline/>
                {
                    gapTexts.map(gapText =>
                        <GapTextCreateOrUpdateRow
                            key={gapText.id}
                            gapText={gapText}
                            updateRow={updateRow}
                            removeRow={removeRow}
                        />)
                }
                <AddRow addEmptyRow={addEmptyRow} hasMoreThanSixRows={gapTexts.length > 6}/>
            </Grid>
        </Box>
    )
}