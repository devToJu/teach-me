import {GapTextCreateContext, GapTextCreateContextProviderValue} from "./GapTextCreateContext";
import {ReactElement, useContext, useMemo, useState} from "react";
import {GapTextModel} from "../models/GapTextModel";
import {GapTextContext} from "./GapTextContext";
import {v4 as uuidv4} from "uuid";
import {GapTextContainerDtoModel} from "../models/GapTextContainerDtoModel";
import {GapTextContainerModel} from "../models/GapTextContainerModel";

type Props = {
    children: ReactElement
}

export default function GapTextCreateContextProvider(props: Props) {
    const [description, setDescription] = useState<string>("")
    const [gapTexts, setGapTexts] = useState<GapTextModel[]>([])
    const {saveGapTextContainer, updateGapTextContainer} = useContext(GapTextContext)

    const addNewRow = () => {
        const newGapText: GapTextModel = {
            id: uuidv4(),
            isGap: false,
            value: "",
            rowPosition: gapTexts.length + 1
        }

        setGapTexts([...gapTexts, newGapText])
    }

    const removeRow = (rowToRemove: GapTextModel) => {
        setGapTexts(prevState => prevState
            .filter(row => row.id !== rowToRemove.id)
            .map((row, index) => {
                return {...row, rowPosition: index + 1}
            })
        )
    }

    const updateRow = (rowToUpdate: GapTextModel) => {
        setGapTexts(prevState => prevState
            .map(row => row.id === rowToUpdate.id ? rowToUpdate : row)
        )
    }

    const clearContainer = () => {
        setGapTexts([])
        setDescription("")
    }

    const saveContainer = () => {
        const newGapTextContainerDTO: GapTextContainerDtoModel = {
            gapTexts: gapTexts,
            description: description
        }

        saveGapTextContainer(newGapTextContainerDTO, clearContainer)
    }

    const updateContainer = (id: string) => {
        const updateContainer: GapTextContainerModel = {
            id: id,
            description: description,
            gapTexts: gapTexts
        }

        updateGapTextContainer(updateContainer)
    }

    const providerValue: GapTextCreateContextProviderValue = useMemo(() => {
            return {
                description: description,
                gapTexts: gapTexts,
                setDescription: setDescription,
                setGapTexts: setGapTexts,
                addNewRow: addNewRow,
                removeRow: removeRow,
                updateRow: updateRow,
                clearContainer: clearContainer,
                saveContainer: saveContainer,
                updateContainer: updateContainer
            }
        },
        [
            description,
            gapTexts,
            setDescription,
            addNewRow,
            removeRow,
            updateRow,
            clearContainer,
            saveContainer,
            updateContainer
        ]
    )

    return (
        <GapTextCreateContext.Provider value={providerValue}>
            {props.children}
        </GapTextCreateContext.Provider>
    )
}