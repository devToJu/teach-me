import {AxiosError} from "axios";
import {ApiError} from "../models/ApiError";
import {toast} from "react-toastify";

export function useMessageHandling() {
    const showAxiosError = (error: any) => {
        const axiosError = error as AxiosError
        if (axiosError === undefined) {
            console.dir("Unknown Error", error)
            toast.error("Unknown Error!")
            return
        }

        const apiError = error.response?.data as ApiError
        if (apiError === undefined || apiError.messages === undefined) {
            console.dir("Unknown Response", error.response)
            toast.error("Unknown Error!")
            return
        }

        let message: string = ""
        apiError.messages.forEach(msg => message += msg + '\n')
        toast.error(message)
    }

    const showError = (message: string) => {
        toast.error(message)
    }

    const showSuccess = (message: string) => {
        toast.success(message)
    }

    return {showAxiosError, showError, showSuccess}
}