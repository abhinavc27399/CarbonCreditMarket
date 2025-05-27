import { ApiEndpoint } from "./apiEndpoint";
import { ApiMethod } from "./apiMethod";
import { apiRequest } from "./apiServiceLayer";

/**
 * Common params for the REST API calls to the backend server app 
 */
interface CallApiParams {
    /**
     * Server-side app apiEndpoints for REST API Calls
     */
    apiEndpoint: ApiEndpoint;
    /**
     * HTTP method to use (GET by default)
     */
    method: ApiMethod;
    /**
     * Optional request body (for POST/PUT)
     */
    data?: Record<string, any>;
    /**
     * Optional custom headers
     */
    headers?: Record<string, any>;
    /**
     * Whether this call requires an auth token header
     */
    requiresAuth?: boolean;
    /**
     * Optional abort signal if required 
     */
    signal?: AbortSignal
}

export async function CallApi<T = any>({
    apiEndpoint,
    method = ApiMethod.GET,
    data = {},
    headers = {},
    requiresAuth,
    signal,
}: CallApiParams): Promise<T | null> {

    if (!apiEndpoint) {
        throw new Error(`Invalid Api Endpoint "${apiEndpoint}" - not found in ApiEndpoints.`);
    }

    // Make the request via our shared `apiRequest` function
    const result = await apiRequest(apiEndpoint, method, data, headers, signal);

    // Return the response data (or null if there's an error caught inside `apiRequest`)
    return result;

}