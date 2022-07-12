import { atom, selector } from 'recoil';
import { ErrorAccess } from '../error';
import { AuthResponse, Refresh } from '../requests/auth';
import { getOAuthSelector, OAuthAtom } from './authorization';
import { cleanMovieSelector } from './movies';
import { UserSelector } from './user';

export const routeStatusAtom = atom<'public' | 'success' | 'fetch'>({
    key: 'routeStatusAtom',
    default: 'fetch'
});

export const AccessTokenAtom = atom<string | null>({
    key: 'AccessTokenAtom',
    default: null,
    effects_UNSTABLE: [
        ({ setSelf, onSet }) => {
            setSelf(() => localStorage.getItem('access_token_woxvmovie'));
            onSet(newValue => {
                if (!newValue) {
                    localStorage.removeItem('access_token_woxvmovie');
                } else {
                    localStorage.setItem('access_token_woxvmovie', newValue);
                }
            });
        }
    ]
});

export const RefreshTokenAtom = atom<string | null>({
    key: 'RefreshTokenAtom',
    default: null,
    effects_UNSTABLE: [
        ({ setSelf, onSet }) => {
            setSelf(() => localStorage.getItem('refresh_token_woxvmovie'));
            onSet(newValue => {
                if (!newValue) {
                    localStorage.removeItem('refresh_token_woxvmovie');
                } else {
                    localStorage.setItem('refresh_token_woxvmovie', newValue);
                }
            });
        }
    ]
});

export const CleanAuthSelector = selector({
    key: 'CleanAuthSelector',
    get: () => '',
    set: ({ set }) => {
        set(cleanMovieSelector, '');
        set(getOAuthSelector, '');
        set(UserSelector, ErrorAccess.FORBIDDEN);
        set(RefreshTokenAtom, null);
        set(AccessTokenAtom, null);
    }
});

export const RefreshSelector = selector<AuthResponse | ErrorAccess>({
    key: 'RefreshSelector',
    get: async ({ get }) => {
        const oauth_token = get(OAuthAtom);
        const access_token = get(AccessTokenAtom);
        const refresh_token = get(RefreshTokenAtom);

        if (!refresh_token) return ErrorAccess.REFRESH_TOKEN_EXPIRE;
        if (!oauth_token) return ErrorAccess.FORBIDDEN;
        if (!access_token) return ErrorAccess.UNAUTHORIZED;

        const res = await Refresh(oauth_token, refresh_token);
        return res;
    }
});
