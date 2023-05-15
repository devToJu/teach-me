import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

export type PopupDialogYesNoProps = {
    title: string
    description: string,
    isOpen: boolean,
    handleYes: () => void,
    handleNo: () => void
}

type Props = {
    value: PopupDialogYesNoProps
}

export default function DialogYesNo(props: Props) {
    const {title, description, isOpen, handleYes, handleNo} = props.value

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
                <Button onClick={handleNo}>No</Button>
                <Button onClick={handleYes}>Yes</Button>
            </DialogActions>
        </Dialog>
    )
}
