import { ErrorResponse } from '../error';
import { TVMovie } from '../store/types';
import useAuth from './useAuth';

const useViews = () => {
    const { setAccessToken, accessToken, oauth, setOAuth } = useAuth();

    const addToViews = async (movies: TVMovie, on: string) => {
        let res = await fetch(`${process.env.VITE_API_URL}/v1/api/app/views/add`, {
            headers: {
                'Content-Type': 'application/json',
                jwtToken: `Bearer ${accessToken}`,
                Authorization: `Bearer ${oauth}`
            },
            method: 'PUT',
            body: JSON.stringify({
                movies,
                on
            })
        });
        if (res.status === 403) {
            setOAuth(() => null);
            return 403;
        }
        if (res.status === 401) {
            setAccessToken(() => null);
            return 401;
        }
        return await res.json().then((r: { success: true; id: number } | ErrorResponse) => {
            return r;
        });
    };
    return { addToViews, setOAuth, setAccessToken };
};

export default useViews;
