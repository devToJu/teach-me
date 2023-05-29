import {defaultLoginInputValues, LoginInputValues} from "../models/LoginInputValues";
import {createContext} from "react";
import {Run} from "../../components/models/CallbackTypes";
import {AxiosRequestConfig} from "axios";

export type AuthContextProviderValue = {
    username: string,
    isAuthenticated: boolean
    authHeader: AxiosRequestConfig
    loginInputValues: LoginInputValues
    login: (successCallback: Run, finishedCallback: Run) => void
    logout: Run
}

export const AuthContext = createContext<AuthContextProviderValue>({
    username: "",
    isAuthenticated: false,
    authHeader: {},
    loginInputValues: defaultLoginInputValues,
    login: () => Promise.resolve(),
    logout: () => {}
})
