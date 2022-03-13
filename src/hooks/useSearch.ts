import { ErrorResponse } from "../error";
import { TVMovie } from "../store/types";
import useAuth from "./useAuth";

const useSearch = () => {
    const { setAccessToken, accessToken, oauth, setOAuth } = useAuth();

    const Search = async (q: string) => {
        let res = await fetch(`${process.env.VITE_API_URL}/v1/api/app/search/${q}`, {
            headers: {
                jwtToken: `Bearer ${accessToken}`,
                Authorization: `Bearer ${oauth}`
            },
            method: "GET"
        });
        if (res.status === 403) {
            setOAuth(() => null);
            return 403;
        }
        if (res.status === 401) {
            setAccessToken(() => null);
            return 401;
        }
        return await res.json().then((r: { success: true; movies: TVMovie[] } | ErrorResponse) => {
            return r;
        });
    };
    return { Search, setOAuth, setAccessToken };
};

export default useSearch;
