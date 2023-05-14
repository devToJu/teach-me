import {boxStyleBorder} from "./GapTextCreateOrUpdateStyles";
import {Box, Grid} from "@mui/material";
import RowHeadline from "./RowHeadline";
import GapTextCreateOrUpdateRow from "./GapTextCreateOrUpdateRow";
import AddRow from "./AddRow";
import React from "react";
import {GapTextModel} from "../../models/GapTextModel";

export type GapTextCreateOrUpdateContainerProps = {
    gapTexts: GapTextModel[],
    addEmptyRow: () => void,
    updateRow: (value: GapTextModel) => void,
    removeRow: (value: GapTextModel) => void
}

type Props = {
    values: GapTextCreateOrUpdateContainerProps
}

export default function GapTextCreateOrUpdateContainer(props: Props) {
    const {gapTexts, addEmptyRow, updateRow, removeRow} = props.values

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
                <AddRow addEmptyRow={addEmptyRow} maxRowCountReached={gapTexts.length >= 6}/>
            </Grid>
        </Box>
    )
}