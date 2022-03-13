import { atom, selector } from "recoil";
import { AuthResponse } from "../hooks/useAuth";
import { getOAuthSelector, OAuthAtom } from "./authorization";
import { cleanMovieSelector } from "./movies";
import { UserSelector } from "./user";

export const routeStatusAtom = atom<"fetching" | "public" | "success">({
    key: "routeStatusAtom",
    default: "fetching"
});

export const AccessTokenAtom = atom<string | null>({
    key: "AccessTokenAtom",
    default: null,
    effects_UNSTABLE: [
        ({ setSelf, onSet }) => {
            setSelf(() => localStorage.getItem("access_token_woxvmovie"));
            onSet(newValue => {
                if (!newValue) {
                    localStorage.removeItem("access_token_woxvmovie");
                } else {
                    localStorage.setItem("access_token_woxvmovie", newValue);
                }
            });
        }
    ]
});

export const RefreshTokenAtom = atom<string | null>({
    key: "RefreshTokenAtom",
    default: null,
    effects_UNSTABLE: [
        ({ setSelf, onSet }) => {
            setSelf(() => localStorage.getItem("refresh_token_woxvmovie"));
            onSet(newValue => {
                if (!newValue) {
                    localStorage.removeItem("refresh_token_woxvmovie");
                } else {
                    localStorage.setItem("refresh_token_woxvmovie", newValue);
                }
            });
        }
    ]
});

export const CleanAuthSelector = selector({
    key: "CleanAuthSelector",
    get: () => "",
    set: ({ set }) => {
        set(cleanMovieSelector, "");
        set(getOAuthSelector, "");
        set(UserSelector, 1);
        set(RefreshTokenAtom, null);
        set(AccessTokenAtom, null);
        //window.location.pathname = "/"
    }
});

export const RefreshSelector = selector<AuthResponse | null>({
    key: "RefreshSelector",
    get: async ({ get }) => {
        const oauth_token = get(OAuthAtom);
        const access_token = get(AccessTokenAtom);
        const refresh_token = get(RefreshTokenAtom);

        if (!oauth_token || !access_token || access_token !== "refresh") return null;

        const url = process.env.VITE_API_URL as string;

        let response: Response = await fetch(`${url}/v1/api/refresh`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${oauth_token}`
            },
            method: "POST",
            body: JSON.stringify({
                refresh_token: refresh_token
            })
        });
        if (response.status === 403) {
            return null;
        }
        const res = await response.json().then((res: AuthResponse) => {
            return res;
        });
        return res;
    }
});
