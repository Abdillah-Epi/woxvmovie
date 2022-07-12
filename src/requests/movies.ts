import { ErrorAccess, ErrorResponse } from '../error';
import { CategoriesData } from '../store/categories';
import { TVMovieResponse } from '../store/types';

const url = process.env.VITE_API_URL as string;

export const getTVMovie = async (
    genre: string,
    oauth_token: string,
    access_token: string,
    path: 'popular/tv' | 'popular'
) => {
    let res: Response = await fetch(`${url}/v1/api/app/${path}/${genre}`, {
        headers: {
            Authorization: `Bearer ${oauth_token}`,
            jwtToken: `Bearer ${access_token}`
        },
        method: 'GET'
    });
    if (res.status === 403) return ErrorAccess.FORBIDDEN;
    if (res.status === 401) return ErrorAccess.UNAUTHORIZED;

    return await res.json().then((res: TVMovieResponse) => {
        return res;
    });
};

type ResponsePayload = { success: true } | ErrorResponse;

export const UpdateUserGenres = async (oauth_token: string, access_token: string, selected: CategoriesData[]) => {
    const res = await fetch(`${process.env.VITE_API_URL}/v1/api/app/genres`, {
        headers: {
            'Content-Type': 'application/json',
            jwtToken: `Bearer ${access_token}`,
            Authorization: `Bearer ${oauth_token}`
        },
        method: 'PUT',
        body: JSON.stringify({
            genres: selected.map(m =>
                m.name === 'Action & Adventure' ? 'Action' : m.name === 'Fantasy & Sci-Fi' ? 'Fantasy' : m.name
            )
        })
    });

    if (res.status === 403) return ErrorAccess.FORBIDDEN;
    if (res.status === 401) return ErrorAccess.UNAUTHORIZED;

    return await res.json().then((r: ResponsePayload) => {
        return r;
    });
};
