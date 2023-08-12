import {DialogYesNoPropValue} from "./DialogYesNo";
import {useShowDialog} from "./useShowDialog";

export function useDialogYesNo(title: string, description: string) {
    const {isOpen, openDialog, closeDialog} = useShowDialog()

    const dialogProps: DialogYesNoPropValue = {
        title,
        description,
        isOpen,
        openDialog,
        closeDialog
    }

    return {dialogProps}
}