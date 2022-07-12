import { ErrorAccess, ErrorResponse } from '../error';

export interface SignupParams {
    email: string;
    password: string;
}

export interface AuthSuccess {
    access_token: string;
    refresh_token: string;
    success: true;
}

export type AuthResponse = AuthSuccess | ErrorResponse;

export const SignUp = async (payload: SignupParams, oauth_token: string) => {
    const res = await fetch(`${process.env.VITE_API_URL}/v1/api/signup`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${oauth_token}`
        },
        method: 'POST',
        body: JSON.stringify({
            ...payload
        })
    });

    if (res.status === 403) return ErrorAccess.FORBIDDEN;

    return await res.json().then((res: AuthResponse) => {
        return res;
    });
};

export const SignupWithGoogle = async (oauth_token: string) => {
    let res = await fetch(`${process.env.VITE_API_URL}/v1/api/signup/google`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${oauth_token}`,
            'Access-Control-Allow-Origin': '*'
        },
        method: 'GET',
        redirect: 'follow'
    });

    if (res.status === 403) return ErrorAccess.FORBIDDEN;

    return await res.json().then((r: { success: boolean; url: string }) => {
        window.location.href = r.url;
        return;
    });
};

export const SignInWithGoogle = async (oauth_token: string) => {
    let res = await fetch(`${process.env.VITE_API_URL}/v1/api/signin/google`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${oauth_token}`,
            'Access-Control-Allow-Origin': '*'
        },
        method: 'GET',
        redirect: 'follow'
    });

    if (res.status === 403) return ErrorAccess.FORBIDDEN;
    return await res.json().then((r: { success: boolean; url: string }) => {
        window.location.href = r.url;
        return;
    });
};

export const GetAccess = async (token: string, type: 'signup' | 'signin', oauth_token: string) => {
    let res = await fetch(`${process.env.VITE_API_URL}/v1/api/${type}/access/${token}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${oauth_token}`
        },
        method: 'GET'
    });
    if (res.status === 403) return ErrorAccess.FORBIDDEN;
    return await res.json().then((r: AuthResponse) => {
        return r;
    });
};

export const SignIn = async (email: string, password: string, oauth_token: string) => {
    let res = await fetch(`${process.env.VITE_API_URL}/v1/api/signin`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${oauth_token}`
        },
        method: 'POST',
        body: JSON.stringify({
            email,
            password
        })
    });
    if (res.status === 403) return ErrorAccess.FORBIDDEN;
    return await res.json().then((r: AuthResponse) => {
        return r;
    });
};

// TODO: implement access_token
export const Logout = async (access_token: string, oauth_token: string) => {
    let res = await fetch(`${process.env.VITE_API_URL}/v1/api/logout`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${oauth_token}`
        },
        method: 'POST'
    });
    if (res.status === 403) return ErrorAccess.FORBIDDEN;
    if (res.status === 401) return ErrorAccess.UNAUTHORIZED;
    return { success: true };
};

export const DeleteAccount = async (access_token: string, oauth_token: string) => {
    let res = await fetch(`${process.env.VITE_API_URL}/v1/api/app/account`, {
        headers: {
            'Content-Type': 'application/json',
            jwtToken: `Bearer ${access_token}`,
            Authorization: `Bearer ${oauth_token}`
        },
        method: 'DELETE'
    });

    if (res.status === 403) return ErrorAccess.FORBIDDEN;
    if (res.status === 401) return ErrorAccess.UNAUTHORIZED;
    return { success: true };
};

export const SendRequest = async (email: string, oauth_token: string) => {
    let res = await fetch(`${process.env.VITE_API_URL}/v1/api/rest-password`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${oauth_token}`
        },
        method: 'POST',
        body: JSON.stringify({
            email
        })
    });

    if (res.status === 403) return ErrorAccess.FORBIDDEN;
    if (res.status === 202) return 202;
    return await res.json().then((r: ErrorResponse) => {
        return r;
    });
};

export const UpdatePassword = async (password: string, oauth_token: string, token: string) => {
    let res = await fetch(`${process.env.VITE_API_URL}/v1/api/update-password/${token}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${oauth_token}`
        },
        method: 'PUT',
        body: JSON.stringify({
            password
        })
    });

    if (res.status === 403) return ErrorAccess.FORBIDDEN;
    return await res.json().then((r: { success: true } | ErrorResponse) => {
        return r;
    });
};

export const Refresh = async (oauth_token: string, refresh_token: string) => {
    const res: Response = await fetch(`${process.env.VITE_API_URL}/v1/api/refresh`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${oauth_token}`
        },
        method: 'POST',
        body: JSON.stringify({
            refresh_token: refresh_token
        })
    });

    if (res.status === 403) return ErrorAccess.FORBIDDEN;
    return await res.json().then((r: AuthResponse) => {
        return r;
    });
};
