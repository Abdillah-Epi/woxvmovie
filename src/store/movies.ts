import { atom, atomFamily, selector, selectorFamily } from 'recoil';
import { ErrorAccess } from '../error';
import { getTVMovie } from '../requests/movies';
import { AccessTokenAtom } from './auth';
import { OAuthAtom } from './authorization';
import { categoriesSelectedAtom } from './categories';
import { TVMovieResponse, TVMovie } from './types';

export const movieHoveredAtom = atom<string | null>({
    key: 'movieHoveredAtom',
    default: null
});

export const movieSelectedAtom = atom<{ movie: TVMovie; on: string } | null>({
    key: 'movieSelectedAtom',
    default: null
});

export const cleanMovieSelector = selector({
    key: 'cleanMovieSelector',
    set: ({ set }) => {
        set(categoriesSelectedAtom, []);
        set(movieSelectedAtom, null);
        set(movieHoveredAtom, null);
    },
    get: () => ''
});

export const MoviesSelectorFamily = selectorFamily<
    TVMovieResponse | ErrorAccess.FORBIDDEN | ErrorAccess.UNAUTHORIZED,
    { genre: string; path: 'popular/tv' | 'popular' }
>({
    key: 'MoviesSelectorFamily',
    get:
        ({ genre, path }) =>
        async ({ get }) => {
            const oauth_token = get(OAuthAtom);
            const access_token = get(AccessTokenAtom);

            if (!oauth_token) return ErrorAccess.FORBIDDEN;
            if (!access_token) return ErrorAccess.UNAUTHORIZED;
            const res = await getTVMovie(genre, oauth_token, access_token, path);

            return res;
        }
});
