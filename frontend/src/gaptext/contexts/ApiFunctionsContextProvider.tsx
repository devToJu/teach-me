import {ReactElement, useEffect, useState} from "react";
import axios from "axios";
import {GapTextContainerModel} from "../models/GapTextContainerModel";
import {toast, ToastContainer} from "react-toastify";
import {GapTextFunctions, ApiFunctionsContext} from "./ApiFunctionsContext"

type Props = {
    children: ReactElement
}

export default function ApiFunctionsContextProvider(props: Props) {
    const [gapTexts, setGapTexts] = useState<GapTextContainerModel[]>([]);

    const showError = (reason: any) => {
        if (reason.type === undefined)
            return;

        const msg = `ERROR ${reason.response.status}:   
                ${reason.response.statusText} \n
                ${reason.request.responseURL}`;

        toast.error(msg, {theme: "dark"});
    }

    useEffect(() => loadAllGapTextsFromApi(), [])

    function loadAllGapTextsFromApi(): void {
        axios.get("/api/gaptextcontainer")
            .then(response => setGapTexts(response.data))
            .catch(reason => showError(reason))
    }

    function getAllTapTexts(): GapTextContainerModel[] {
        return gapTexts;
    }

    const gapTextFunctions: GapTextFunctions = {
        getAllGapTexts: getAllTapTexts
    }

    return (
        <ApiFunctionsContext.Provider value={gapTextFunctions}>
            {props.children}
            <ToastContainer/>
        </ApiFunctionsContext.Provider>
    )
}