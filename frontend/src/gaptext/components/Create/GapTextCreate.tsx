import {Container, Paper, Typography} from "@mui/material";
import React, {FormEvent, useContext} from "react";
import {formStyle} from "./GapTextCreateStyles";
import GapTextCreateContainer from "./GapTextCreateContainer";
import {GapTextCreateContext} from "../../contexts/GapTextCreateContext";
import Description from "./Description";
import ButtonMenu from "./ButtonMenu";
import {useParams} from "react-router-dom";

export default function GapTextCreate() {
    const {id} = useParams()
    const {saveContainer, updateContainer} = useContext(GapTextCreateContext)

    const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        id ? updateContainer(id) : saveContainer()
    }

    return (
        <Container sx={{py: 8}} maxWidth="lg">
            <Paper elevation={12}>
                <Typography
                    align="center"
                    pt={5}
                    variant="h6"
                >
                    {id ? "Update a Gap Text" : "Create a Gap Text"}
                </Typography>
                <form onSubmit={handleOnSubmit} style={formStyle}>
                    <Description/>
                    <GapTextCreateContainer/>
                    <ButtonMenu/>
                </form>
            </Paper>
        </Container>
    )
}