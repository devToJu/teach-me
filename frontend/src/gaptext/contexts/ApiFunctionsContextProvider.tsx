import {ReactElement, useEffect, useMemo, useState} from "react";
import axios from "axios";
import {GapTextContainerModel} from "../models/GapTextContainerModel";
import {toast, ToastContainer} from "react-toastify";
import {ApiFunctionsContext} from "./ApiFunctionsContext"

type Props = {
    children: ReactElement
}

export default function ApiFunctionsContextProvider(props: Props) {
    const [gapTextContainers, setGapTextContainers] = useState<GapTextContainerModel[]>([]);

    const showError = (reason: any) => {
        if (reason.type === undefined)
            return;

        const msg = `ERROR ${reason.response.status}:   
                ${reason.response.statusText} \n
                ${reason.request.responseURL}`;

        toast.error(msg);
    }

    useEffect(
        () => loadAllGapTextContainersFromApi(),
        // eslint-disable-next-line
        []
    )

    function loadAllGapTextContainersFromApi(): void {
        axios.get("/api/gaptextcontainer")
            .then(response => setGapTextContainers(response.data))
            .catch(reason => showError(reason))
    }

    function getAllGapTextContainers(): GapTextContainerModel[] {
        return gapTextContainers;
    }

    const gapTextFunctions = useMemo(() => ({
            getAllGapTextContainers: getAllGapTextContainers
        }
    ), []);

    return (
        <ApiFunctionsContext.Provider value={gapTextFunctions}>
            {props.children}
            <ToastContainer/>
        </ApiFunctionsContext.Provider>
    )
}