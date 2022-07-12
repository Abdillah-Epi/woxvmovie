import { ErrorAccess, ErrorResponse } from '../error';
import { TVMovie } from '../store/types';

export const Search = async (q: string, oauth_token: string, access_token: string) => {
    const res = await fetch(`${process.env.VITE_API_URL}/v1/api/app/search/${q}`, {
        headers: {
            jwtToken: `Bearer ${access_token}`,
            Authorization: `Bearer ${oauth_token}`
        },
        method: 'GET'
    });
    if (res.status === 403) return ErrorAccess.FORBIDDEN;
    if (res.status === 401) return ErrorAccess.UNAUTHORIZED;

    return await res.json().then((r: { success: true; movies: TVMovie[] } | ErrorResponse) => {
        return r;
    });
};
