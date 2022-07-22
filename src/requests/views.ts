import { ErrorAccess, ErrorResponse } from '../error';
import { TVMovie, ViewsResponse } from '../store/types';

const url = process.env.VITE_API_URL as string;

export const GetViewMovies = async (access_token: string, oauth_token: string) => {
    const res = await fetch(`${url}/v1/api/app/views`, {
        headers: {
            jwtToken: `Bearer ${access_token}`,
            Authorization: `Bearer ${oauth_token}`
        },
        method: 'GET'
    });

    if (res.status === 403) return ErrorAccess.FORBIDDEN;
    if (res.status === 401) return ErrorAccess.UNAUTHORIZED;

    return await res.json().then((res: ViewsResponse) => {
        return res;
    });
};

export const AddToViewsList = async (movie: TVMovie, access_token: string, oauth_token: string) => {
    const res = await fetch(`${process.env.VITE_API_URL}/v1/api/app/views/add`, {
        headers: {
            'Content-Type': 'application/json',
            jwtToken: `Bearer ${access_token}`,
            Authorization: `Bearer ${oauth_token}`
        },
        method: 'PUT',
        body: JSON.stringify({
            id: movie.id
        })
    });

    if (res.status === 401) return ErrorAccess.UNAUTHORIZED;
    if (res.status === 403) return ErrorAccess.FORBIDDEN;

    return await res.json().then((r: { success: true; id: number } | ErrorResponse) => {
        return r;
    });
};
