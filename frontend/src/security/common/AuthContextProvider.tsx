import {ReactElement, useCallback, useEffect, useMemo, useState} from "react";
import {AuthContext, AuthContextProviderValue} from "./AuthContext";
import axios from "axios";
import {LoginData} from "../models/LoginData";
import {Run} from "../../components/models/CallbackTypes";
import {useMessageHandling} from "../../components/common/useMessageHandling";

type Props = {
    children: ReactElement
}

export default function AuthContextProvider({children}: Props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("")
    const {showError} = useMessageHandling()
    const tokenStorageKey = "authToken"
    const apiUrl = "/api/auth/login"

    useEffect(() => {
        const token = localStorage.getItem(tokenStorageKey)
        setToken(token || "")
    }, [])

    const clearInput = () => {
        setUsername("")
        setPassword("")
    }

    const saveToken = (token: string) => {
        localStorage.setItem(tokenStorageKey, token)
        setToken(token)
    }

    const loginData: LoginData = useMemo(() => {
        return {username, password}
    }, [username, password])

    const login = useCallback((successCallback: Run, finishedCallback: Run) => {
        axios.post(apiUrl, loginData)
            .then(response => saveToken(response.data))
            .then(clearInput)
            .then(successCallback)
            .catch(reason => showError(reason))
            .finally(finishedCallback)
    }, [loginData])

    const logout = useCallback(() => {
        localStorage.removeItem(tokenStorageKey)
        setToken("")
    }, [])

    const providerValue: AuthContextProviderValue = useMemo(() => {
        return {
            isAuthenticated: token !== undefined && token !== "",
            authHeader: {headers: {Authorization: "Bearer " + token}},
            loginInputValues: {username, password, setUsername, setPassword},
            login,
            logout
        }
    }, [username, password, token, login, logout])

    return (
        <AuthContext.Provider value={providerValue}>
            {children}
        </AuthContext.Provider>
    )
}
