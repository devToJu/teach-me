import {useContext, useEffect, useRef, useState} from "react";
import {GapTextContext} from "./GapTextContext";
import {GapTextContainerDtoModel} from "../models/GapTextContainerDtoModel";
import {GapTextContainerModel} from "../models/GapTextContainerModel";
import {GapTextModel} from "../models/GapTextModel";
import {useGapTexts} from "./useGapTexts";
import {useParams} from "react-router-dom";
import {toast} from "react-toastify";

export function useGapTextContainer() {
    const {loadGapTextContainerById, saveGapTextContainer, updateGapTextContainer} = useContext(GapTextContext)
    const {gapTexts, setGapTexts, addEmptyRow, removeRow, updateRow} = useGapTexts()
    const [description, setDescription] = useState<string>("")
    const {id} = useParams()

    const isCreateContainer = id === undefined
    const loadContainerById = useRef(loadGapTextContainerById)

    const updateContainerAttributes = useRef(
        (description: string, gapTexts: GapTextModel[]) => {
            setDescription(description)
            setGapTexts(gapTexts)
        }
    )

    useEffect(() => {
        isCreateContainer ?
            updateContainerAttributes.current("", []) :
            loadContainerById.current(id, updateContainerAttributes.current)
    }, [id, isCreateContainer])

    const clearContainer = () => {
        setGapTexts([])
        setDescription("")
    }

    const saveContainer = (finishedCallback: () => void) => {
        const containerDTO: GapTextContainerDtoModel = {
            gapTexts: gapTexts,
            description: description
        }

        saveGapTextContainer(containerDTO, clearContainer)
        finishedCallback()
    }

    const updateContainer = (successCallback: () => void, errorCallback: () => void) => {
        if (id === undefined) {
            toast.error("Could not update gap text: ID is undefined")
            errorCallback()
            return
        }

        const updateContainer: GapTextContainerModel = {
            id: id,
            description: description,
            gapTexts: gapTexts
        }

        updateGapTextContainer(updateContainer)
        successCallback()
    }

    return {
        description,
        gapTexts,
        isCreateContainer,
        setDescription,
        addEmptyRow,
        removeRow,
        updateRow,
        clearContainer,
        saveContainer,
        updateContainer
    }
}