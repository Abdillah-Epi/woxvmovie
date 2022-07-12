export interface ErrorResponse {
    error: string | Error[];
    error_code: string;
    success: false;
}

export interface Error {
    [key: string]: string;
}

export enum ErrorAccess {
    FORBIDDEN = 'forbidden',
    UNAUTHORIZED = 'unauthorized',
    REFRESH_TOKEN_EXPIRE = 'expire'
}
