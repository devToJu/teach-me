import {createContext} from "react";
import {GapTextContainerDtoModel} from "../models/GapTextContainerDtoModel";
import {GapTextContainerModel} from "../models/GapTextContainerModel";
import {LoadByIdSuccessCallback} from "./GapTextContextProvider";

export type GapTextContextProviderValue = {
    gapTextContainers: GapTextContainerModel[],
    loadGapTextContainerById: (id: string, successCallback: LoadByIdSuccessCallback) => void,
    saveGapTextContainer: (newContainerDTO: GapTextContainerDtoModel, successCallback: () => void) => void,
    updateGapTextContainer: (container: GapTextContainerModel) => void,
    deleteGapTextContainer: (id: string) => void
}

export const GapTextContext = createContext<GapTextContextProviderValue>(
    {
        gapTextContainers: [],
        loadGapTextContainerById: () => {},
        saveGapTextContainer: () => {},
        updateGapTextContainer: () => {},
        deleteGapTextContainer: () => {}
    }
);