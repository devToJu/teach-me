import {GapTextContainerModel} from "../models/GapTextContainerModel";
import GapText from "./GapText";
import React from "react";
import {Button, Card, CardContent, Divider, Grid, Stack, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {urlGapText} from "../../components/navigation/PageModel";

type Props = {
    gapText: GapTextContainerModel,
    number: number
}

export default function GapTextCard(props: Props) {
    const navigation = useNavigate()
    const {gapText, number} = props

    const goTo = () => {
        navigation(urlGapText + "/" + gapText.id)
    }

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
            <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{mb: 2, mr: 2}}>
                <Button variant="outlined" onClick={goTo}>Edit</Button>
            </Stack>
        </Card>
    )
}