import { atom, selector } from 'recoil';
import { ErrorAccess } from '../error';
import { GetUser } from '../requests/user';
import { AccessTokenAtom } from './auth';
import { OAuthAtom } from './authorization';

export type CurrentUser = {
    success: boolean;
    id: string;
    email: string;
    genres: string[];
};

export const UserAtom = atom<CurrentUser | null>({
    key: 'UserAtom',
    default: null
});

export const UserSelector = selector({
    key: 'UserSelector',
    get: async ({ get }) => {
        const oauth_token = get(OAuthAtom);
        const access_token = get(AccessTokenAtom);

        if (!oauth_token) return ErrorAccess.FORBIDDEN;
        if (!access_token) return ErrorAccess.UNAUTHORIZED;

        const res = await GetUser(access_token, oauth_token);

        return res;
    },
    set: ({ set }) => {
        set(UserAtom, null);
    }
});
