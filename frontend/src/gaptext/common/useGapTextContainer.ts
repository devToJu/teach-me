import {useContext, useEffect, useState} from "react";
import {GapTextContext} from "./GapTextContext";
import {GapTextContainerDtoModel} from "../models/GapTextContainerDtoModel";
import useGapTexts from "./useGapTexts";
import {GapTextContainerModel} from "../models/GapTextContainerModel";
import {useParams} from "react-router-dom";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function useGapTextContainer() {
    const {gapTextContainers, saveGapTextContainer, updateGapTextContainer} = useContext(GapTextContext)
    const {gapTexts, setGapTexts, addEmptyRow, removeRow, updateRow} = useGapTexts()
    const [description, setDescription] = useState<string>("")
    const {id} = useParams()

    useEffect(() => {
        if (id !== undefined) {
            const currentContainer = gapTextContainers.find(container => container.id === id);
            setDescription(currentContainer?.description || "")
            setGapTexts(currentContainer?.gapTexts || [])
        } else {
            setDescription("")
            setGapTexts([])
        }
    }, [])

    const clearContainer = () => {
        setGapTexts([])
        setDescription("")
    }

    const saveContainer = () => {
        const containerDTO: GapTextContainerDtoModel = {
            gapTexts: gapTexts,
            description: description
        }

        saveGapTextContainer(containerDTO, clearContainer)
    }

    const updateContainer = () => {
        if (id === undefined) {
            toast.error("Could not update container: ID is undefined")
            return
        }

        const updateContainer: GapTextContainerModel = {
            id: id,
            description: description,
            gapTexts: gapTexts
        }

        updateGapTextContainer(updateContainer)
    }

    const isCreateContainer = () => {
        return id === undefined
    }

    return {
        description,
        gapTexts,
        setDescription,
        addEmptyRow,
        removeRow,
        updateRow,
        isCreateContainer,
        clearContainer,
        saveContainer,
        updateContainer
    }
}