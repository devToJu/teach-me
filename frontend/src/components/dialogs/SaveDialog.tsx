import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {Run} from "../models/CallbackTypes";
import React from "react";

const dialogStyles = {
    width:"90%",
    height: "90%",
    margin: "auto"
}

type Props = {
    isOpen: boolean
    children?: React.ReactNode
    save: Run
    cancel: Run
}

export default function SaveDialog(props: Props) {
    const {isOpen, children, cancel, save} = props

    return (
        <Dialog fullScreen open={isOpen} sx={dialogStyles}>
            <DialogTitle>Select Task Items</DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
            <DialogActions>
                <Button onClick={cancel}>Cancel</Button>
                <Button onClick={save}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}