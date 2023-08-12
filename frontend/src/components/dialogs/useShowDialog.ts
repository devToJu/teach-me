import {useState} from "react";

export function useShowDialog() {
    const [isOpen, setIsOpen] = useState(false)

    const openDialog = () => {
        setIsOpen(true)
    }

    const closeDialog = () => {
        setIsOpen(false)
    }

    return {isOpen, openDialog, closeDialog}
}