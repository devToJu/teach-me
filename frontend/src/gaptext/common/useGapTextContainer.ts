import {useContext, useEffect, useRef, useState} from "react";
import {GapTextContext} from "./GapTextContext";
import {GapTextContainerCreateDtoModel} from "../models/GapTextContainerCreateDtoModel";
import {GapTextModel} from "../models/GapTextModel";
import {useGapTexts} from "./useGapTexts";
import {useParams} from "react-router-dom";
import {Run} from "../../components/models/CallbackTypes";
import {useMessageHandling} from "../../components/common/useMessageHandling";
import {AuthContext} from "../../security/common/AuthContext";
import {GapTextContainerUpdateDtoModel} from "../models/GapTextContainerUpdateDtoModel";

export function useGapTextContainer() {
    const {loadGapTextContainerById, saveGapTextContainer, updateGapTextContainer} = useContext(GapTextContext)
    const {username} = useContext(AuthContext)
    const {gapTexts, setGapTexts, addEmptyRow, removeRow, updateRow} = useGapTexts()
    const {showError} = useMessageHandling()
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

    const saveContainer = (finishedCallback: Run) => {
        const containerDTO: GapTextContainerCreateDtoModel = {
            gapTexts: gapTexts,
            description: description,
            creator: username
        }

        saveGapTextContainer(containerDTO, clearContainer)
        finishedCallback()
    }

    const updateContainer = (successCallback: Run, errorCallback: Run) => {
        if (id === undefined) {
            showError("Could not update gap text: ID is undefined")
            errorCallback()
            return
        }

        const updateContainer: GapTextContainerUpdateDtoModel = {
            id: id,
            description: description,
            gapTexts: gapTexts,
            creator: username
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