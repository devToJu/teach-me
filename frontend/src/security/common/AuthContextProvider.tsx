import {ReactElement, useCallback, useEffect, useMemo, useState} from "react";
import {AuthContext, AuthContextProviderValue} from "./AuthContext";
import axios from "axios";
import {Run} from "../../components/models/CallbackTypes";
import {useMessageHandling} from "../../components/common/useMessageHandling";
import {useLoginInput} from "./useLoginInput";

type Props = {
    children: ReactElement
}

export default function AuthContextProvider({children}: Props) {
    const [token, setToken] = useState("")
    const {showAxiosError} = useMessageHandling()
    const {loginInputValues, loginData, clearInput} = useLoginInput()
    const tokenStorageKey = "authToken"
    const apiUrl = "/api/auth/login"

    useEffect(() => {
        const token = localStorage.getItem(tokenStorageKey)
        setToken(token || "")
    }, [])

    const saveToken = (token: string) => {
        localStorage.setItem(tokenStorageKey, token)
        setToken(token)
    }

    const login = useCallback((successCallback: Run, finishedCallback: Run) => {
        axios.post(apiUrl, loginData)
            .then(response => saveToken(response.data))
            .then(clearInput)
            .then(successCallback)
            .catch(reason => showAxiosError(reason))
            .finally(finishedCallback)
    }, [loginData, showAxiosError, clearInput])

    const logout = useCallback(() => {
        localStorage.removeItem(tokenStorageKey)
        setToken("")
    }, [])

    const providerValue: AuthContextProviderValue = useMemo(() => {
        return {
            isAuthenticated: token !== undefined && token !== "",
            authHeader: {headers: {Authorization: "Bearer " + token}},
            loginInputValues,
            login,
            logout
        }
    }, [token, loginInputValues, login, logout])

    return (
        <AuthContext.Provider value={providerValue}>
            {children}
        </AuthContext.Provider>
    )
}
