import React, {useContext} from "react";
import {ApiFunctionsContext} from "../contexts/ApiFunctionsContext";
import {Container, Grid} from "@mui/material";
import GapTextCard from "./GapTextCard";

export default function GapTextGallery() {
    const {getAllGapTextContainers} = useContext(ApiFunctionsContext)

    return (
        <Container sx={{py: 8}} maxWidth="lg">
            <Grid container spacing={4}>
                {
                    getAllGapTextContainers().map((gapText, index) =>
                        <Grid item key={gapText.id} xs={12} sm={6} md={4}>
                            <GapTextCard gapText={gapText} number={index + 1}/>
                        </Grid>
                    )
                }
            </Grid>
        </Container>
    )
}