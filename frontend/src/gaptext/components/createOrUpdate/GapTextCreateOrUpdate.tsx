import {Container, Paper, Typography} from "@mui/material";
import React, {FormEvent} from "react";
import {formStyle} from "./GapTextCreateOrUpdateStyles";
import GapTextCreateOrUpdateContainer from "./GapTextCreateOrUpdateContainer";
import Description from "./Description";
import ButtonMenu from "./ButtonMenu";
import useGapTextContainer from "../../common/useGapTextContainer";

export default function GapTextCreateOrUpdate() {
    const {
        description,
        gapTexts,
        setDescription,
        addEmptyRow,
        removeRow,
        updateRow,
        isCreateContainer,
        clearContainer,
        saveContainer,
        updateContainer
    } = useGapTextContainer()

    const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        isCreateContainer ?
            saveContainer() :
            updateContainer()
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
                    <GapTextCreateOrUpdateContainer
                        gapTexts={gapTexts}
                        addEmptyRow={addEmptyRow}
                        updateRow={updateRow}
                        removeRow={removeRow}
                    />
                    <ButtonMenu clearContainer={clearContainer} isCreateContainer={isCreateContainer}/>
                </form>
            </Paper>
        </Container>
    )
}