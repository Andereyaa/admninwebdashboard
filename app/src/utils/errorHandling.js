import * as Sentry from '@sentry/browser';
import { configureScope } from "../config/sentry"

export const logError = (error, errorInfo = null) => {  
    if (process.env.NODE_ENV !== 'production') {
        console.warn(error)
    } else {
        configureScope()
        if (typeof error === "string") error = new Error(error)
        Sentry.captureException(error, errorInfo);
    }
}

