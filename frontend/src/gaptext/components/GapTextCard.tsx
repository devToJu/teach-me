import {GapTextContainerModel} from "../models/GapTextContainerModel";
import GapText from "./GapText";
import React, {useContext} from "react";
import {Button, Card, CardContent, Divider, Grid, Stack, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {urlGapText} from "../../components/navigation/PageModel";
import DialogYesNo from "../../components/dialogs/DialogYesNo";
import {useDialogYesNo} from "../../components/dialogs/useDialogYesNo";
import {GapTextContext} from "../common/GapTextContext";

type Props = {
    gapText: GapTextContainerModel,
    number: number
}

const dialogTitle = "Delete Gap Text"
const dialogDescription = "Should the container be permanently deleted along with its data?"

export default function GapTextCard(props: Props) {
    const {gapText, number} = props
    const {deleteGapTextContainer} = useContext(GapTextContext)
    const {dialogProps} = useDialogYesNo(dialogTitle, dialogDescription)
    const navigation = useNavigate()

    const goTo = () => {
        navigation(urlGapText + "/" + gapText.id)
    }

    return (
        <Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
            <DialogYesNo value={dialogProps} onYesCallback={() => deleteGapTextContainer(gapText.id)}/>
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
                <Button variant="outlined" onClick={dialogProps.openDialog}>Delete</Button>
                <Button variant="outlined" onClick={goTo}>Edit</Button>
            </Stack>
        </Card>
    )
}