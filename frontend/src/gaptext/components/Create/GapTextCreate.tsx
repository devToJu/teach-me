import {Container, Paper, Typography} from "@mui/material";
import React, {FormEvent, useContext} from "react";
import {formStyle} from "./GapTextCreateStyles";
import GapTextCreateContainer from "./GapTextCreateContainer";
import {GapTextCreateContext} from "../../contexts/GapTextCreateContext";
import Description from "./Description";
import ButtonMenu from "./ButtonMenu";

export default function GapTextCreate() {
    const {saveContainer} = useContext(GapTextCreateContext)

    const save = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        saveContainer();
    }

    return (
        <Container sx={{py: 8}} maxWidth="lg">
            <Paper elevation={12}>
                <Typography
                    align="center"
                    pt={5}
                    variant="h6"
                >
                    Create a Gap Text
                </Typography>
                <form onSubmit={save} style={formStyle}>
                    <Description/>
                    <GapTextCreateContainer/>
                    <ButtonMenu/>
                </form>
            </Paper>
        </Container>
    )
}