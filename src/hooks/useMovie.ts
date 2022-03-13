import { useRecoilValue } from "recoil";
import { categoriesSelectedAtom } from "../store/movies";
import useAuth from "./useAuth";

const useMovie = () => {
    const { setUser, accessToken, oauth, setOAuth, setAccessToken } = useAuth();
    const selected = useRecoilValue(categoriesSelectedAtom);

    const updateUserGenres = async () => {
        let res = await fetch(`${process.env.VITE_API_URL}/v1/api/app/genres`, {
            headers: {
                "Content-Type": "application/json",
                jwtToken: `Bearer ${accessToken}`,
                Authorization: `Bearer ${oauth}`
            },
            method: "PUT",
            body: JSON.stringify({
                genres: selected.map(m =>
                    m.name === "Action & Adventure" ? "Action" : m.name === "Fantasy & Sci-Fi" ? "Fantasy" : m.name
                )
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
        return await res.json().then((r: { success: boolean }) => {
            if (res) {
                setUser(
                    c =>
                        c && {
                            ...c,
                            genres: selected.map(m =>
                                m.name === "Action & Adventure"
                                    ? "Action"
                                    : m.name === "Fantasy & Sci-Fi"
                                    ? "Fantasy"
                                    : m.name
                            )
                        }
                );
            }
            return r;
        });
    };

    return { updateUserGenres, setOAuth, setAccessToken };
};

export default useMovie;
