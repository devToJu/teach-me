import {ReactElement, useCallback, useMemo, useState} from "react";
import axios from "axios";
import {GapTextContainerModel} from "../models/GapTextContainerModel";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {GapTextContext, GapTextContextProviderValue} from "./GapTextContext"
import {GapTextContainerDtoModel} from "../models/GapTextContainerDtoModel";
import {GapTextModel} from "../models/GapTextModel";

export type LoadByIdSuccessCallback = (description: string, gapTexts: GapTextModel[]) => void

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

    const loadAllGapTextContainers = useCallback((token: string) => {
        axios.get(apiUrl, {headers: {Authorization: "Bearer " + token}})
            .then(response => setGapTextContainers(response.data))
            .catch(reason => showError(reason))
    }, [])

    const loadGapTextContainerById = useCallback((id: string, successCallback: LoadByIdSuccessCallback) => {
        axios.get(apiUrl + "/" + id)
            .then(response => successCallback(response.data.description, response.data.gapTexts))
            .catch(reason => showError(reason))
    }, [])

    const saveGapTextContainer = useCallback((
        newContainerDTO: GapTextContainerDtoModel,
        successCallback: () => void) => {
        axios.post(apiUrl, newContainerDTO)
            .then(response => setGapTextContainers(prevState => [...prevState, response.data]))
            .then(() => toast.success("Container saved successfully!"))
            .then(() => successCallback())
            .catch(reason => showError(reason))
    }, [])

    const updateGapTextContainer = useCallback((container: GapTextContainerModel) => {
        const putUrl = apiUrl + "/" + container.id
        axios.put(putUrl, container)
            .then(response =>
                setGapTextContainers(prevState =>
                    prevState.map(item => {
                        return item.id === container.id ? response.data : item
                    })
                )
            )
            .then(() => toast.success("Container updated successfully!"))
            .catch(reason => showError(reason))
    }, [])

    const deleteGapTextContainer = useCallback((id: string) => {
        const url = apiUrl + "/" + id
        axios.delete(url)
            .then(() => setGapTextContainers(prevState =>
                prevState.filter(container => container.id !== id)))
            .catch(reason => showError(reason))
    }, [])

    const providerValue: GapTextContextProviderValue = useMemo(() => {
            return {
                gapTextContainers,
                loadAllGapTextContainers,
                loadGapTextContainerById,
                saveGapTextContainer,
                updateGapTextContainer,
                deleteGapTextContainer
            }
        },
        [
            gapTextContainers,
            loadAllGapTextContainers,
            loadGapTextContainerById,
            saveGapTextContainer,
            updateGapTextContainer,
            deleteGapTextContainer
        ]
    )

    return (
        <GapTextContext.Provider value={providerValue}>
            {props.children}
            <ToastContainer/>
        </GapTextContext.Provider>
    )
}