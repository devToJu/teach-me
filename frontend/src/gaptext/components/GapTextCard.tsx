import {GapTextContainerModel} from "../models/GapTextContainerModel";
import GapText from "./GapText";
import React from "react";
import {Card, CardContent, Divider, Grid, Typography} from "@mui/material";

type Props = {
    gapText: GapTextContainerModel,
    number: number
}

export default function GapTextCard(props: Props) {
    const {gapText, number} = props

    return (
        <Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
            <CardContent sx={{flexGrow: 1}}>
                <Typography gutterBottom variant="h5" component="h2">
                    Gap Text #{number}
                </Typography>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    {gapText.id}
                </Typography>
                <Divider sx={{mt: 2, mb: 2}}/>
                <Typography sx={{mb: 1.5}} color="text.primary">
                    {gapText.description}
                </Typography>
                <Divider sx={{mt: 2, mb: 2}}/>
                <Grid container spacing={1}>
                    {
                        gapText.gapTexts.map(gapText =>
                                <GapText key={gapText.rowPosition} gapText={gapText}/>
                        )
                    }
                </Grid>
            </CardContent>
        </Card>
    )
}