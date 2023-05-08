import {ReactElement, useCallback, useEffect, useState} from "react";
import axios from "axios";
import {GapTextContainerModel} from "../models/GapTextContainerModel";
import {toast, ToastContainer} from "react-toastify";
import {GapTextContext, GapTextContextProviderValue} from "./GapTextContext"
import {GapTextContainerDtoModel} from "../models/GapTextContainerDtoModel";

type Props = {
    children: ReactElement
}

export default function GapTextContextProvider(props: Props) {
    const [gapTextContainers, setGapTextContainers] = useState<GapTextContainerModel[]>([])
    const apiUrl: string = "/api/gaptextcontainer"

    const showError = (reason: any) => {
        if (reason.type === undefined)
            return

        const msg = `ERROR ${reason.response.status}:   
                ${reason.response.statusText} \n
                ${reason.request.responseURL}`

        toast.error(msg)
    }

    const loadAllGapTextContainersCallback = useCallback(() => {
            axios.get(apiUrl)
                .then(response => setGapTextContainers(response.data))
                .catch(reason => showError(reason))
        },
        []
    )

    const saveGapTextContainer = ((newContainerDTO: GapTextContainerDtoModel, successCallback: () => void) => {
            axios.post(apiUrl, newContainerDTO)
                .then(response => setGapTextContainers(prevState => [...prevState, response.data]))
                .then(() => successCallback())
                .catch(reason => showError(reason))
        }
    )

    useEffect(
        () => loadAllGapTextContainersCallback(),
        [loadAllGapTextContainersCallback]
    )

    const providerValue: GapTextContextProviderValue = {
        gapTextContainers: gapTextContainers,
        saveGapTextContainer: saveGapTextContainer
    }

    return (
        <GapTextContext.Provider value={providerValue}>
            {props.children}
            <ToastContainer/>
        </GapTextContext.Provider>
    )
}