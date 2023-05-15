import {GapTextContainerModel} from "../models/GapTextContainerModel";
import GapText from "./GapText";
import React, {useContext, useState} from "react";
import {Button, Card, CardContent, Divider, Grid, Stack, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {urlGapText} from "../../components/navigation/PageModel";
import DialogYesNo, {PopupDialogYesNoProps} from "../../components/DialogYesNo";
import {GapTextContext} from "../common/GapTextContext";

type Props = {
    gapText: GapTextContainerModel,
    number: number
}

export default function GapTextCard(props: Props) {
    const {gapText, number} = props
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const {deleteGapTextContainer} = useContext(GapTextContext)
    const navigation = useNavigate()

    const goTo = () => {
        navigation(urlGapText + "/" + gapText.id)
    }

    const handleYes = () => {
        deleteGapTextContainer(gapText.id)
        setIsDialogOpen(false)
    }

    const popupDialogYesNoProps : PopupDialogYesNoProps = {
        title: "Delete Gap Text",
        description: "Should the container be permanently deleted along with its data?",
        isOpen: isDialogOpen,
        handleYes,
        handleNo: () => setIsDialogOpen(false)
    }

    return (
        <Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
            <DialogYesNo value={popupDialogYesNoProps} />
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
                <Button variant="outlined" onClick={() => setIsDialogOpen(true)}>Delete</Button>
                <Button variant="outlined" onClick={goTo}>Edit</Button>
            </Stack>
        </Card>
    )
}