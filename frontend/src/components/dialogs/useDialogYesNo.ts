import {useState} from "react";
import {DialogYesNoPropValue} from "./DialogYesNo";

export function useDialogYesNo(title: string, description: string) {
    const [isOpen, setIsOpen] = useState(false)

    const openDialog = () => {
        setIsOpen(true)
    }

    const closeDialog = () => {
        setIsOpen(false)
    }

    const dialogProps: DialogYesNoPropValue = {
        title,
        description,
        isOpen,
        openDialog,
        closeDialog
    }

    return {dialogProps}
}