import { ErrorAccess } from '../error';
import { VideosResponse } from '../store/types';

const url = process.env.VITE_API_URL as string;

export const GetVideo = async (id: number, on: string, oauth_token: string, access_token: string) => {
    const res = await fetch(`${url}/v1/api/app/video/${id}/${on}`, {
        headers: {
            Authorization: `Bearer ${oauth_token}`,
            jwtToken: `Bearer ${access_token}`
        },
        method: 'GET'
    });

    if (res.status === 403) return ErrorAccess.FORBIDDEN;
    if (res.status === 401) return ErrorAccess.UNAUTHORIZED;

    return await res.json().then((res: VideosResponse) => {
        return res;
    });
};
