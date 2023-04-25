import {Box, Typography} from "@mui/material";
import React from "react";
import {BsSignStopFill} from "react-icons/bs";

export default function UrlNotFound() {
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        m: 2,
                        width: "100%",
                    },
                    mt: 20
                }}
            >
                <BsSignStopFill size={100}/>
                <Typography variant="h4" sx={{textAlign: "center"}}>
                    URL NOT FOUND
                </Typography>
            </Box>
        </>
    );
}