import {ReactElement, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {AuthContext, AuthContextProviderValue} from "./AuthContext";
import axios from "axios";
import {LoginData} from "../models/LoginData";
import {Run} from "../../components/models/CallbackTypes";

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

    const saveToken = (data: string) => {
        localStorage.setItem(tokenStorageKey, data)
        setToken(data)
    }

    const saveTokenRef = useRef(saveToken)

    const loginData: LoginData = useMemo(() => {
        return {username, password}
    }, [username, password])

    const login = useCallback((successCallback: Run, finishedCallback: Run) => {
        axios.post(apiUrl, loginData)
            .then(response => saveTokenRef.current(response.data))
            .then(() => successCallback())
            .catch(reason => showError(reason.response.data))
            .finally(() => finishedCallback())
    }, [loginData])

    const providerValue: AuthContextProviderValue = useMemo(() => {
        return {
            token,
            loginInputValues: {username, password, setUsername, setPassword},
            login
        }
    }, [username, password, token, login])

    return (
        <AuthContext.Provider value={providerValue}>
            {children}
            <ToastContainer/>
        </AuthContext.Provider>
    )
}
