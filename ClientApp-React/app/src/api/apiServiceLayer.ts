import axios, { AxiosRequestConfig } from "axios";
import { environment } from "../environments/environment";
import { ApiMethod } from "./apiMethod";
import { ApiEndpoint } from "./apiEndpoint";

// Initialize Base API URL
const API_BASE_URL = environment.serverAppUrl;

// Create Axios Instance
const api = axios.create({
    baseURL: API_BASE_URL,
});

// Generic API Request Function
export const apiRequest = async (
    apiEndpoint: ApiEndpoint,
    method: ApiMethod,
    dataOrParams?: object,
    headers?: object,
    signal?: AbortSignal
) => {
    try {

        const customHeaders = {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
        const config: AxiosRequestConfig = {
            method,
            url: apiEndpoint,
            ...(method === ApiMethod.GET ? { params: dataOrParams } : { data: dataOrParams }),
            headers: {
                ...customHeaders,
                ...headers
            },
            signal
        };

        const response = await api(config);
        return response.data;

    } catch (error) {
        console.error(`API Request Error [${method.toUpperCase()} ${apiEndpoint}]:`, error);
        return null;
    }
};