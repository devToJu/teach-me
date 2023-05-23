import {createContext} from "react";
import {GapTextContainerDtoModel} from "../models/GapTextContainerDtoModel";
import {GapTextContainerModel} from "../models/GapTextContainerModel";
import {LoadByIdSuccessCallback} from "./GapTextContextProvider";
import {Consumer, Run} from "../../components/models/CallbackTypes";

export type GapTextContextProviderValue = {
    gapTextContainers: GapTextContainerModel[],
    loadAllGapTextContainers: Run
    loadGapTextContainerById: (id: string, successCallback: LoadByIdSuccessCallback) => void,
    saveGapTextContainer: (newContainerDTO: GapTextContainerDtoModel, successCallback: Run) => void,
    updateGapTextContainer: Consumer<GapTextContainerModel>,
    deleteGapTextContainer: Consumer<string>
}

export const GapTextContext = createContext<GapTextContextProviderValue>(
    {
        gapTextContainers: [],
        loadAllGapTextContainers: () => {},
        loadGapTextContainerById: () => {},
        saveGapTextContainer: () => {},
        updateGapTextContainer: () => {},
        deleteGapTextContainer: () => {}
    }
);