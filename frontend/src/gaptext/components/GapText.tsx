import {GapTextModel} from "../models/GapTextModel";
import {Typography} from "@mui/material";
import React from "react";

type Props = {
    gapText: GapTextModel
}

export default function GapText(props: Props) {
    const {gapText} = props;

    return (
        gapText.isGap ?
            <Typography display="inline" sx={{p: 1, border: 1}} color="text.secondary">
                {gapText.value}
            </Typography>
            :
            <Typography sx={{p: 1}} color="text.primary">
                {gapText.value}
            </Typography>
    )
}