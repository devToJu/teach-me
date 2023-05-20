import {defaultLoginInputValues, LoginInputValues} from "../models/LoginInputValues";
import {createContext} from "react";
import {Run} from "../../components/models/CallbackTypes";

export type AuthContextProviderValue = {
    token: string
    isAuthenticated: boolean,
    loginInputValues: LoginInputValues
    login: (successCallback: Run, finishedCallback: Run) => void
}

export const AuthContext = createContext<AuthContextProviderValue>({
    token: "",
    isAuthenticated: false,
    loginInputValues: defaultLoginInputValues,
    login: () => {
    }
})