import {ReactElement, useCallback, useContext, useMemo, useState} from "react";
import axios from "axios";
import {GapTextContainerModel} from "../models/GapTextContainerModel";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {GapTextContext, GapTextContextProviderValue} from "./GapTextContext"
import {GapTextContainerDtoModel} from "../models/GapTextContainerDtoModel";
import {GapTextModel} from "../models/GapTextModel";
import {AuthContext} from "../../security/common/AuthContext";
import {Run} from "../../components/models/CallbackTypes";

export type LoadByIdSuccessCallback = (description: string, gapTexts: GapTextModel[]) => void

type Props = {
    children: ReactElement
}

export default function GapTextContextProvider(props: Props) {
    const {authHeader} = useContext(AuthContext)
    const [gapTextContainers, setGapTextContainers] = useState<GapTextContainerModel[]>([])
    const apiUrl: string = "/api/gaptextcontainer"

    const showError = (data: any) => {
        if (data.messages === undefined)
            return

        data.messages.forEach((message: string) => {
            toast.error(message)
        })
    }

    const loadAllGapTextContainers = useCallback(() => {
        axios.get(apiUrl, authHeader)
            .then(response => setGapTextContainers(response.data))
            .catch(reason => showError(reason.response.data))
    }, [authHeader])

    const loadGapTextContainerById = useCallback((id: string, successCallback: LoadByIdSuccessCallback) => {
        axios.get(apiUrl + "/" + id, authHeader)
            .then(response => successCallback(response.data.description, response.data.gapTexts))
            .catch(reason => showError(reason.response.data))
    }, [authHeader])

    const saveGapTextContainer = useCallback((
        newContainerDTO: GapTextContainerDtoModel,
        successCallback: Run
    ) => {
        axios.post(apiUrl, newContainerDTO, authHeader)
            .then(response => setGapTextContainers(prevState => [...prevState, response.data]))
            .then(() => toast.success("Gap Text saved successfully!"))
            .then(successCallback)
            .catch(reason => showError(reason.response.data))
    }, [authHeader])

    const updateGapTextContainer = useCallback((container: GapTextContainerModel) => {
        const putUrl = apiUrl + "/" + container.id
        axios.put(putUrl, container, authHeader)
            .then(response =>
                setGapTextContainers(prevState =>
                    prevState.map(item => {
                        return item.id === container.id ? response.data : item
                    })
                )
            )
            .then(() => toast.success("Container updated successfully!"))
            .catch(reason => showError(reason.response.data))
    }, [authHeader])

    const deleteGapTextContainer = useCallback((id: string) => {
        const url = apiUrl + "/" + id
        axios.delete(url, authHeader)
            .then(() => setGapTextContainers(prevState =>
                prevState.filter(container => container.id !== id)))
            .catch(reason => showError(reason.response.data))
    }, [authHeader])

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