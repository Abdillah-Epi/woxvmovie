import { atom, atomFamily, selector } from 'recoil';
import { ErrorAccess } from '../error';
import { GetFavoriteMovies } from '../requests/likes';
import { AccessTokenAtom } from './auth';
import { OAuthAtom } from './authorization';
import { TVMovie } from './types';

export const FavoritesAtom = atom<TVMovie[]>({
    key: 'FavoritesAtom',
    default: []
});

export const FavoritesAtomFamily = atomFamily<boolean, number>({
    key: 'FavoritesAtomFamily',
    default: false
});

export const FavoritesSelector = selector({
    key: 'FavoritesSelector',
    get: async ({ get }) => {
        const oauth_token = get(OAuthAtom);
        const access_token = get(AccessTokenAtom);
        const likes = get(FavoritesAtom);

        if (!oauth_token) return ErrorAccess.FORBIDDEN;
        if (!access_token) return ErrorAccess.UNAUTHORIZED;

        const res = await GetFavoriteMovies(access_token, oauth_token);
        return res;
    }
});
