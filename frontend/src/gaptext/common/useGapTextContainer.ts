import {useContext, useEffect, useRef, useState} from "react";
import {GapTextContext} from "./GapTextContext";
import {GapTextContainerDtoModel} from "../models/GapTextContainerDtoModel";
import {GapTextContainerModel} from "../models/GapTextContainerModel";
import {GapTextModel} from "../models/GapTextModel";
import {useGapTexts} from "./useGapTexts";
import {useParams} from "react-router-dom";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        console.log("useGapTextContainer => useEffect called twice? id: ", id, " REMOVE FROM DEPLOY WITH NEXT FEATURE!")
        isCreateContainer ?
            updateContainerAttributes.current("", []) :
            loadContainerById.current(id, updateContainerAttributes.current)
    }, [id])

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