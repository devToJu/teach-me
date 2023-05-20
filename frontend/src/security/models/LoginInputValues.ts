import {Consumer} from "../../components/models/CallbackTypes";

export type LoginInputValues = {
    username: string,
    setUsername: Consumer<string>
    password: string,
    setPassword: Consumer<string>
}

export const defaultLoginInputValues: LoginInputValues = {
    username: '',
    setUsername: () => {},
    password: '',
    setPassword: () => {},
}
