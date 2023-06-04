import {createContext} from "react";
import {GapTextContainerCreateDtoModel} from "../models/GapTextContainerCreateDtoModel";
import {GapTextContainerModel} from "../models/GapTextContainerModel";
import {LoadByIdSuccessCallback} from "./GapTextContextProvider";
import {Consumer, Run} from "../../components/models/CallbackTypes";
import {GapTextContainerUpdateDtoModel} from "../models/GapTextContainerUpdateDtoModel";

export type GapTextContextProviderValue = {
    gapTextContainers: GapTextContainerModel[],
    loadAllGapTextContainers: Run
    loadGapTextContainerById: (id: string, successCallback: LoadByIdSuccessCallback) => void,
    saveGapTextContainer: (newContainerDTO: GapTextContainerCreateDtoModel, successCallback: Run) => void,
    updateGapTextContainer: Consumer<GapTextContainerUpdateDtoModel>,
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