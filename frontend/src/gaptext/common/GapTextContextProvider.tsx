import {ReactElement, useCallback, useContext, useMemo, useState} from "react";
import axios from "axios";
import {GapTextContainerModel} from "../models/GapTextContainerModel";
import {GapTextContext, GapTextContextProviderValue} from "./GapTextContext"
import {GapTextContainerCreateDtoModel} from "../models/GapTextContainerCreateDtoModel";
import {GapTextModel} from "../models/GapTextModel";
import {AuthContext} from "../../security/common/AuthContext";
import {Run} from "../../components/models/CallbackTypes";
import {useMessageHandling} from "../../components/common/useMessageHandling";
import {stringIsBlank} from "../../components/common/StringUtils";
import {GapTextContainerUpdateDtoModel} from "../models/GapTextContainerUpdateDtoModel";

export type LoadByIdSuccessCallback = (description: string, gapTexts: GapTextModel[]) => void

type Props = {
    children: ReactElement
}

export default function GapTextContextProvider({children}: Props) {
    const {username, authHeader} = useContext(AuthContext)
    const {showAxiosError, showSuccess} = useMessageHandling()

    const [gapTextContainers, setGapTextContainers] = useState<GapTextContainerModel[]>([])
    const apiUrl: string = "/api/gaptext"

    const loadAllGapTextContainers = useCallback(() => {
        if (stringIsBlank(username)) {
            return
        }

        const url = apiUrl + "/all/" + username
        axios.get<GapTextContainerModel[]>(url, authHeader)
            .then(response => response.data)
            .then(containers => containers.map(c => GapTextContainerModel.of(c)))
            .then(result => setGapTextContainers(result))
            .catch(reason => showAxiosError(reason))
    }, [authHeader, username, showAxiosError])

    const loadGapTextContainerById = useCallback((id: string, successCallback: LoadByIdSuccessCallback) => {
        axios.get(apiUrl + "/" + id, authHeader)
            .then(response => response.data)
            .then(data => successCallback(data.description, data.gapTexts))
            .catch(error => showAxiosError(error))
    }, [authHeader, showAxiosError])

    const saveGapTextContainer = useCallback((
        newContainerDTO: GapTextContainerCreateDtoModel,
        successCallback: Run
    ) => {
        axios.post(apiUrl, newContainerDTO, authHeader)
            .then(response => response.data)
            .then(data => GapTextContainerModel.of(data))
            .then(container => setGapTextContainers(prevState => [...prevState, container]))
            .then(() => showSuccess("Gap Text saved successfully!"))
            .then(successCallback)
            .catch(reason => showAxiosError(reason))
    }, [authHeader, showAxiosError, showSuccess])

    const updateGapTextContainer = useCallback((updateContainer: GapTextContainerUpdateDtoModel) => {
        const putUrl = apiUrl + "/" + updateContainer.id
        axios.put(putUrl, updateContainer, authHeader)
            .then(response => response.data)
            .then(data => GapTextContainerModel.of(data))
            .then(newContainer =>
                setGapTextContainers(prevState =>
                    prevState.map(container =>
                        container.id === updateContainer.id ?
                            newContainer :
                            container
                    )
                )
            )
            .then(() => showSuccess("Gap Text updated successfully!"))
            .catch(reason => showAxiosError(reason))
    }, [authHeader, showAxiosError, showSuccess])

    const deleteGapTextContainer = useCallback((id: string) => {
        const url = apiUrl + "/" + id
        axios.delete(url, authHeader)
            .then(() => setGapTextContainers(prevState =>
                prevState.filter(container => container.id !== id)))
            .catch(reason => showAxiosError(reason))
    }, [authHeader, showAxiosError])

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
            {children}
        </GapTextContext.Provider>
    )
}