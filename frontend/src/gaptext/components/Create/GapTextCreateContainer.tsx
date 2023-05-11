import {boxStyleBorder} from "./GapTextCreateStyles";
import {Box, Grid} from "@mui/material";
import RowHeadline from "./RowHeadline";
import GapTextCreateRow from "./GapTextCreateRow";
import AddRow from "./AddRow";
import React, {useContext, useEffect} from "react";
import {GapTextCreateContext} from "../../contexts/GapTextCreateContext";
import {useParams} from "react-router-dom";
import {GapTextContext} from "../../contexts/GapTextContext";

export default function GapTextCreateContainer() {
    const {id} = useParams()
    const {gapTextContainers} = useContext(GapTextContext)
    const {gapTexts, setGapTexts} = useContext(GapTextCreateContext)

    useEffect(() => {
        if (id) {
            const container = gapTextContainers.find(item => item.id === id)
            setGapTexts(container?.gapTexts || [])
        }
    }, [])

    const getGapTexts = () => {
        const container = gapTextContainers.find(item => item.id === id)
        return container?.gapTexts || []
    }

    const currentGapTexts = id ? getGapTexts() : gapTexts

    return (
        <Box sx={boxStyleBorder}>
            <Grid container m={2} spacing={2}>
                <RowHeadline/>
                {
                    currentGapTexts.map(gapText => <GapTextCreateRow key={gapText.id} gapText={gapText}/>)
                }
                <AddRow/>
            </Grid>
        </Box>
    )
}