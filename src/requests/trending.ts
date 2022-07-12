import { ErrorAccess } from '../error';
import { TVMovieResponse } from '../store/types';

const url = process.env.VITE_API_URL as string;

export const GetTopTrending = async (path: 'trainding' | 'top/tv', access_token: string, oauth_token: string) => {
    let response: Response = await fetch(`${url}/v1/api/app/${path}`, {
        headers: {
            Authorization: `Bearer ${oauth_token}`,
            jwtToken: `Bearer ${access_token}`
        },
        method: 'GET'
    });
    if (response.status === 403) return ErrorAccess.FORBIDDEN;
    if (response.status === 401) return ErrorAccess.UNAUTHORIZED;

    return await response.json().then((res: TVMovieResponse) => {
        return res;
    });
};
