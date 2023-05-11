import {createContext} from "react";
import {GapTextModel} from "../models/GapTextModel";

export type GapTextCreateContextProviderValue = {
    description: string,
    gapTexts: GapTextModel[],
    setDescription: (value: string) => void,
    setGapTexts: (value: GapTextModel[]) => void

    addNewRow: () => void,
    removeRow: (rowToUpdate: GapTextModel) => void,
    updateRow: (rowToUpdate: GapTextModel) => void,

    clearContainer: () => void,
    saveContainer: () => void,
    updateContainer: (value: string) => void
}

export const GapTextCreateContext = createContext<GapTextCreateContextProviderValue>(
    {
        description: "",
        gapTexts: [],
        setDescription: () => {},
        setGapTexts: () => {},
        addNewRow: () => {},
        removeRow: () => {},
        updateRow: () => {},
        clearContainer: () => {},
        saveContainer: () => {},
        updateContainer: () => {}
    }
)