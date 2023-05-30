import {useMemo, useState} from "react";
import {LoginData} from "../models/LoginData";
import {LoginInputValues} from "../models/LoginInputValues";

export function useLoginInput() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const clearInput = () => {
        setUsername("")
        setPassword("")
    }

    const loginData: LoginData = useMemo(() => {
        return {username, password}
    }, [username, password])

    const loginInputValues: LoginInputValues = {
        username,
        password,
        setUsername,
        setPassword
    }

    return {clearInput, loginData, loginInputValues}
}