import {createContext} from "react";
import {GapTextContainerModel} from "../models/GapTextContainerModel";

export type GapTextFunctions = {
    getAllGapTextContainers: () => GapTextContainerModel[];
}

export const ApiFunctionsContext = createContext<GapTextFunctions>(
    {
        getAllGapTextContainers: () => []
    }
);