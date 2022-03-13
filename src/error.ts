export interface ErrorResponse {
    error: string | Error[];
    error_code: string;
    success: false;
}

export interface Error {
    [key: string]: string;
}
