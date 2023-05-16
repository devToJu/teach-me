import {Container, Paper, Typography} from "@mui/material";
import React, {FormEvent} from "react";
import {formStyle} from "./GapTextCreateOrUpdateStyles";
import GapTextCreateOrUpdateContainer, {GapTextCreateOrUpdateContainerProps} from "./GapTextCreateOrUpdateContainer";
import Description from "./Description";
import ButtonMenu from "./ButtonMenu";
import {useGapTextContainer} from "../../common/useGapTextContainer";
import {useNavigate} from "react-router-dom";
import {urlGapText} from "../../../components/navigation/PageModel";
import DialogInProgress from "../../../components/dialogs/DialogInProgress";
import {useDialogInProgress} from "../../../components/dialogs/useDialogInProgress";

export default function GapTextCreateOrUpdate() {
    const {isOpen, openDialog, closeDialog} = useDialogInProgress()
    const navigate = useNavigate()

    const {
        description,
        gapTexts,
        isCreateContainer,
        setDescription,
        addEmptyRow,
        removeRow,
        updateRow,
        clearContainer,
        saveContainer,
        updateContainer
    } = useGapTextContainer()

    const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        openDialog()

        isCreateContainer ?
            saveContainer(closeDialog) :
            updateContainer(onUpdateFinished, closeDialog)
    }

    const onUpdateFinished = () => {
        closeDialog()
        navigate(urlGapText)
    }

    const gapTextCreateOrUpdateContainerProps: GapTextCreateOrUpdateContainerProps = {
        gapTexts,
        addEmptyRow,
        updateRow,
        removeRow
    }

    return (
        <Container sx={{py: 8}} maxWidth="lg">
            <Paper elevation={12}>
                <Typography
                    align="center"
                    pt={5}
                    variant="h6"
                >
                    {isCreateContainer ? "Create a Gap Text" : "Update a Gap Text"}
                </Typography>
                <form onSubmit={handleOnSubmit} style={formStyle}>
                    <Description description={description} setDescription={setDescription}/>
                    <GapTextCreateOrUpdateContainer values={gapTextCreateOrUpdateContainerProps}/>
                    <ButtonMenu clearContainer={clearContainer} isCreateContainer={isCreateContainer}/>
                </form>
                <DialogInProgress isOpen={isOpen}/>
            </Paper>
        </Container>
    )
}