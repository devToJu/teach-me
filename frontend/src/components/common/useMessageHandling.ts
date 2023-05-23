import {AxiosError} from "axios";
import {ApiError} from "../models/ApiError";
import {toast} from "react-toastify";

export function useMessageHandling() {
    const showAxiosError = (error: AxiosError) => {
        const apiError = error.response?.data as ApiError
        if (apiError === undefined)
            return

        toast.error(error.message)
    }

    const showError = (message: string) => {
        toast.error(message)
    }

    const showSuccess = (message: string) => {
        toast.success(message)
    }

    return {showAxiosError, showError, showSuccess}
}