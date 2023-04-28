import {createContext} from "react";
import {GapTextContainerModel} from "../models/GapTextContainerModel";

export type GapTextContextProviderValue = {
    gapTextContainers: GapTextContainerModel[];
}

export const GapTextContext = createContext<GapTextContextProviderValue>(
    {
        gapTextContainers: []
    }
);