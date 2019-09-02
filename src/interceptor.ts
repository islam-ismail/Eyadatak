import axios from "axios";
import { getLocale, setLocale, getJWT } from "./app/util/helpersFunc";
import { apiBaseUrl_development, apiBaseUrl_production } from "./app/util/constants";

let baseURL: string;
if (process.env.NODE_ENV !== "production") {
    baseURL = apiBaseUrl_development;
} else {
    baseURL = apiBaseUrl_production;
}

axios.interceptors.request.use(
    config => {
        // Do something before request is sent
        let locale = getLocale();
        if (!locale) {
            setLocale("ar");
            locale = getLocale();
        }

        config.baseURL = baseURL + `${locale}/`;

        const token = getJWT();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    error => {
        // Do something with request error
        return Promise.reject(error);
    }
);
