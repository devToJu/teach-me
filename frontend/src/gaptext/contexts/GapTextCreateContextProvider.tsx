import {GapTextCreateContext, GapTextCreateContextProviderValue} from "./GapTextCreateContext";
import {ReactElement, useContext, useState} from "react";
import {GapTextModel} from "../models/GapTextModel";
import {GapTextContext} from "./GapTextContext";
import {v4 as uuidv4} from "uuid";
import {GapTextContainerWithoutIdModel} from "../models/GapTextContainerWithoutIdModel";

type Props = {
    children: ReactElement
}

export default function GapTextCreateContextProvider(props: Props) {
    const [description, setDescription] = useState<string>("")
    const [gapTexts, setGapTexts] = useState<GapTextModel[]>([])
    const {saveGapTextContainer} = useContext(GapTextContext)

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
        const newGapTextContainer: GapTextContainerWithoutIdModel = {
            gapTexts: gapTexts,
            description: description
        }

        saveGapTextContainer(newGapTextContainer, clearContainer)
    }

    const providerValue: GapTextCreateContextProviderValue = {
        description: description,
        gapTexts: gapTexts,
        setDescription: setDescription,
        addNewRow: addNewRow,
        removeRow: removeRow,
        updateRow: updateRow,
        clearContainer: clearContainer,
        saveContainer: saveContainer
    }

    return (
        <GapTextCreateContext.Provider value={providerValue}>
            {props.children}
        </GapTextCreateContext.Provider>
    )
}