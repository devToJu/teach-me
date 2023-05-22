import {ReactElement, useCallback, useEffect, useMemo, useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {AuthContext, AuthContextProviderValue} from "./AuthContext";
import axios from "axios";
import {LoginData} from "../models/LoginData";
import {Consumer, Run} from "../../components/models/CallbackTypes";

type Props = {
    children: ReactElement
}

export default function AuthContextProvider(props: Props) {
    const {children} = props
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("")
    const tokenStorageKey = "authToken"
    const apiUrl = "/api/auth/login"

    useEffect(() => {
        const token = localStorage.getItem(tokenStorageKey)
        setToken(token || "")
    }, [])

    const showError = (data: any) => {
        data.messages.forEach((message: string) => {
            toast.error(message)
        })
    }

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

    const login = useCallback((successCallback: Consumer<string>, finishedCallback: Run) => {
        axios.post(apiUrl, loginData)
            .then(response => {
                const token = response.data
                saveToken(token)
                successCallback(token)
            })
            .then(clearInput)
            .catch(reason => showError(reason.response.data))
            .finally(finishedCallback)
    }, [loginData])

    const logout = useCallback(() => {
        localStorage.removeItem(tokenStorageKey)
        setToken("")
    }, [])

    const providerValue: AuthContextProviderValue = useMemo(() => {
        return {
            isAuthenticated: token !== undefined && token !== "",
            loginInputValues: {username, password, setUsername, setPassword},
            login,
            logout
        }
    }, [username, password, token, login, logout])

    return (
        <AuthContext.Provider value={providerValue}>
            {children}
            <ToastContainer/>
        </AuthContext.Provider>
    )
}
