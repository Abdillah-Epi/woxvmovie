import { ErrorAccess } from '../error';
import { CurrentUser } from '../store/user';

export const GetUser = async (access_token: string, oauth_token: string) => {
    const res = await fetch(`${process.env.VITE_API_URL}/v1/api/app/me`, {
        headers: {
            Authorization: `Bearer ${oauth_token}`,
            jwtToken: `Bearer ${access_token}`
        },
        method: 'GET'
    });

    if (res.status === 403) return ErrorAccess.FORBIDDEN;
    if (res.status === 401) return ErrorAccess.UNAUTHORIZED;
    return await res.json().then((res: CurrentUser) => {
        return res;
    });
};
