import {Container, Paper, Typography} from "@mui/material";
import React, {FormEvent, useState} from "react";
import {formStyle} from "./GapTextCreateOrUpdateStyles";
import GapTextCreateOrUpdateContainer, {GapTextCreateOrUpdateContainerProps} from "./GapTextCreateOrUpdateContainer";
import Description from "./Description";
import ButtonMenu, {ButtonMenuProps} from "./ButtonMenu";
import {useGapTextContainer} from "../../common/useGapTextContainer";

export default function GapTextCreateOrUpdate() {
    const [savingIsInProgress, setSavingIsInProgress] = useState(true)
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
        setSavingIsInProgress(true)

        isCreateContainer ?
            saveContainer(() => setSavingIsInProgress(false)) :
            updateContainer(() => setSavingIsInProgress(false))
    }

    const gapTextCreateOrUpdateContainerProps: GapTextCreateOrUpdateContainerProps = {
        gapTexts,
        addEmptyRow,
        updateRow,
        removeRow
    }

    const buttonMenuProps: ButtonMenuProps = {
        isCreateContainer,
        savingIsInProgress: savingIsInProgress,
        clearContainer
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
                    <ButtonMenu values={buttonMenuProps}/>
                </form>
            </Paper>
        </Container>
    )
}