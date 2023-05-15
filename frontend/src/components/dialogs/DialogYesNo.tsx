import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

export type DialogYesNoPropValue = {
    title: string
    description: string,
    isOpen: boolean
    openDialog: () => void,
    closeDialog: () => void
}

type Props = {
    value: DialogYesNoPropValue,
    onYesCallback: () => void
}

export default function DialogYesNo(props: Props) {
    const {title, description, isOpen, closeDialog} = props.value

    const handleOnYes = () => {
        closeDialog()
        props.onYesCallback()
    }

    return (
        <Dialog
            open={isOpen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog}>No</Button>
                <Button onClick={handleOnYes}>Yes</Button>
            </DialogActions>
        </Dialog>
    )
}
