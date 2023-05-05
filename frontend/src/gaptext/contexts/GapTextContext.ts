import {createContext} from "react";
import {GapTextContainerWithoutIdModel} from "../models/GapTextContainerWithoutIdModel";
import {GapTextContainerModel} from "../models/GapTextContainerModel";

export type GapTextContextProviderValue = {
    gapTextContainers: GapTextContainerModel[],
    saveGapTextContainer: (newContainer: GapTextContainerWithoutIdModel, successCallback: () => void) => void
}

export const GapTextContext = createContext<GapTextContextProviderValue>(
    {
        gapTextContainers: [],
        saveGapTextContainer: () => {}
    }
);