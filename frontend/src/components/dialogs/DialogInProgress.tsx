import React from "react";
import {Box, CircularProgress, Dialog, DialogContent, DialogContentText} from "@mui/material";

type Props = {
    isOpen: boolean
}

export default function DialogInProgress(props: Props) {
    const {isOpen} = props

    const boxStyle = {
        display: 'flex',
        justifyContent: 'center',
        pt: 2
    }

    return (
        <Dialog open={isOpen} aria-describedby="alert-dialog-description">
            <DialogContent>
                <Box sx={boxStyle}>
                    <CircularProgress/>
                </Box>
                <DialogContentText id="alert-dialog-description">
                    Processing data...
                </DialogContentText>
            </DialogContent>
        </Dialog>
    )
}