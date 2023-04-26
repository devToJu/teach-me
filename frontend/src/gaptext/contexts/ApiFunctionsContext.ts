import {createContext} from "react";
import {GapTextContainerModel} from "../models/GapTextContainerModel";

export type GapTextFunctions = {
    getAllGapTexts: () => GapTextContainerModel[];
}

export const ApiFunctionsContext = createContext<GapTextFunctions>(
    {
        getAllGapTexts: () => []
    }
);