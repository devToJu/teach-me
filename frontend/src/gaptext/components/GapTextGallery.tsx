import React, {useContext, useEffect} from "react";
import {GapTextContext} from "../common/GapTextContext";
import {Container, Grid} from "@mui/material";
import GapTextCard from "./GapTextCard";
import {AuthContext} from "../../security/common/AuthContext";

export default function GapTextGallery() {
    const {gapTextContainers, loadAllGapTextContainers} = useContext(GapTextContext)
    const {isAuthenticated} = useContext(AuthContext)

    useEffect(() => {
        if (!isAuthenticated) {
            return
        }

        loadAllGapTextContainers()
    }, [isAuthenticated, loadAllGapTextContainers])

    return (
        <Container sx={{py: 8}} maxWidth="lg">
            <Grid container spacing={4}>
                {
                    gapTextContainers.map((gapText, index) =>
                        <Grid
                            item
                            key={gapText.id}
                            xs={12}
                            sm={6}
                            md={4}
                        >
                            <GapTextCard gapText={gapText} number={index + 1}/>
                        </Grid>
                    )
                }
            </Grid>
        </Container>
    )
}