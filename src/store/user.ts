import { atom, selector } from "recoil";
import { AccessTokenAtom } from "./auth";
import { OAuthAtom } from "./authorization";

export type CurrentUser = {
    success: boolean;
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    genres: string[];
};

export const UserAtom = atom<CurrentUser | null>({
    key: "UserAtom",
    default: null
});

export const UserSelector = selector<CurrentUser | null | number>({
    key: "UserSelector",
    get: async ({ get }) => {
        const oauth_token = get(OAuthAtom);
        const access_token = get(AccessTokenAtom);
        const user = get(UserAtom);

        if (!oauth_token || !access_token || access_token === "refresh") return null;
        if (user) return user;

        const url = process.env.VITE_API_URL as string;
        const response = await fetch(`${url}/v1/api/app/me`, {
            headers: {
                Authorization: `Bearer ${oauth_token}`,
                jwtToken: `Bearer ${access_token}`
            },
            method: "GET"
        });
        if (response.status === 403 || response.status === 401) {
            return response.status;
        }
        const body: CurrentUser = await response.json();
        return body;
    },
    set: ({ set }) => {
        set(UserAtom, null);
    }
});
