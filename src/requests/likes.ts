import { ErrorAccess } from '../error';
import { FavoritesResponse, IsMovieLikedResponse, TVMovie, TVMovieCached, ViewsResponse } from '../store/types';
const url = process.env.VITE_API_URL as string;

export const GetFavorites = async (access_token: string, oauth_token: string) => {
    const res = await fetch(`${url}/v1/api/app/favorites`, {
        headers: {
            'Content-Type': 'application/json',
            jwtToken: `Bearer ${access_token}`,
            Authorization: `Bearer ${oauth_token}`
        }
    });

    if (res.status === 401) return ErrorAccess.UNAUTHORIZED;
    if (res.status === 403) return ErrorAccess.FORBIDDEN;

    return await res.json().then((res: FavoritesResponse) => {
        return res;
    });
};

export const ToggleLike = async (movie: TVMovie, access_token: string, oauth_token: string) => {
    let response: Response = await fetch(`${url}/v1/api/app/like/action`, {
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
    if (response.status === 403) return ErrorAccess.FORBIDDEN;
    if (response.status === 401) return ErrorAccess.UNAUTHORIZED;

    return await response.json().then((res: IsMovieLikedResponse) => {
        return res;
    });
};

export const IsMovieLiked = async (access_token: string, oauth_token: string, id: number) => {
    let response: Response = await fetch(`${url}/v1/api/app/is-liked/${id}`, {
        headers: {
            jwtToken: `Bearer ${access_token}`,
            Authorization: `Bearer ${oauth_token}`
        },
        method: 'GET'
    });
    if (response.status === 403) return ErrorAccess.FORBIDDEN;
    if (response.status === 401) return ErrorAccess.UNAUTHORIZED;
    return await response.json().then((res: FavoritesResponse) => {
        return res;
    });
};
