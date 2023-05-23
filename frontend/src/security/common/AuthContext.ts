import {defaultLoginInputValues, LoginInputValues} from "../models/LoginInputValues";
import {createContext} from "react";
import {Consumer, Run} from "../../components/models/CallbackTypes";

export type AuthContextProviderValue = {
    isAuthenticated: boolean,
    loginInputValues: LoginInputValues
    login: (successCallback: Consumer<string>, finishedCallback: Run) => void
}

export const AuthContext = createContext<AuthContextProviderValue>({
    isAuthenticated: false,
    loginInputValues: defaultLoginInputValues,
    login: () => {}
})
