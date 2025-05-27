/**
 * Collection of api endpoints for backend server-side application for REST API Calls
 */
export enum ApiEndpoint{
    UserSignUp = "v1/user/signup",
    UserLogIn = "v1/user/login",
    UserLogOut= "v1/user/loginout",
    FetchCertificateSuggestion = "v1/certificates/suggestions/fetch",
    FetchCertificates = "v1/certificates/fetch",
}