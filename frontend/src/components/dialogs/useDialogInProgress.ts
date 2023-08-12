import {useShowDialog} from "./useShowDialog";

export function useDialogInProgress() {
    const {isOpen, openDialog, closeDialog} = useShowDialog()

    return {isOpen, openDialog, closeDialog}
}