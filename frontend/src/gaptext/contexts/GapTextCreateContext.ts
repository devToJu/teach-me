import {createContext} from "react";
import {GapTextModel} from "../models/GapTextModel";

export type GapTextCreateContextProviderValue = {
    description: string,
    gapTexts: GapTextModel[],
    setDescription: (value: string) => void,

    addNewRow: () => void,
    removeRow: (rowToUpdate: GapTextModel) => void,
    updateRow: (rowToUpdate: GapTextModel) => void,

    clearContainer: () => void,
    saveContainer: () => void
}

export const GapTextCreateContext = createContext<GapTextCreateContextProviderValue>(
    {
        description: "",
        gapTexts: [],
        setDescription: () => {},
        addNewRow: () => {},
        removeRow: () => {},
        updateRow: () => {},
        clearContainer: () => {},
        saveContainer: () => {}
    }
)