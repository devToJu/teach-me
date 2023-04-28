import React, {useContext} from "react";
import {GapTextContext} from "../contexts/GapTextContext";
import {Container, Grid} from "@mui/material";
import GapTextCard from "./GapTextCard";

export default function GapTextGallery() {
    const {gapTextContainers} = useContext(GapTextContext)

    return (
        <Container sx={{py: 8}} maxWidth="lg">
            <Grid container spacing={4}>
                {
                    gapTextContainers.map((gapText, index) =>
                        <Grid item key={gapText.id} xs={12} sm={6} md={4}>
                            <GapTextCard gapText={gapText} number={index + 1}/>
                        </Grid>
                    )
                }
            </Grid>
        </Container>
    )
}