import {AxiosError} from "axios";
import {ApiError} from "../models/ApiError";
import {toast} from "react-toastify";
import {useCallback} from "react";

export function useMessageHandling() {
    const showAxiosError = useCallback((error: any) => {
        const axiosError = error as AxiosError
        if (axiosError === undefined) {
            toast.error("Unknown Error!")
            return
        }

        const apiError = error.response?.data as ApiError
        if (apiError === undefined || apiError.messages === undefined) {
            toast.error("Error: " + error.message)
            return
        }

        let message: string = ""
        apiError.messages.forEach(msg => message += msg + '\n')
        toast.error(message)
    }, [])

    const showError = useCallback((message: string) => {
        toast.error(message)
    }, [])

    const showSuccess = useCallback((message: string) => {
        toast.success(message)
    }, [])

    return {showAxiosError, showError, showSuccess}
}