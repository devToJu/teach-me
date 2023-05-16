import {useState} from "react";

export function useDialogInProgress() {
    const [isOpen, setIsOpen] = useState(false)

    const openDialog = () => {
        setIsOpen(true)
    }

    const closeDialog = () => {
        setIsOpen(false)
    }

    return {isOpen, openDialog, closeDialog}
}