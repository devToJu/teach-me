import {createContext} from "react";
import {GapTextContainerDtoModel} from "../models/GapTextContainerDtoModel";
import {GapTextContainerModel} from "../models/GapTextContainerModel";

export type GapTextContextProviderValue = {
    gapTextContainers: GapTextContainerModel[],
    saveGapTextContainer: (newContainerDTO: GapTextContainerDtoModel, successCallback: () => void) => void,
    updateGapTextContainer: (container: GapTextContainerModel) => void
}

export const GapTextContext = createContext<GapTextContextProviderValue>(
    {
        gapTextContainers: [],
        saveGapTextContainer: () => {},
        updateGapTextContainer: () => {}
    }
);