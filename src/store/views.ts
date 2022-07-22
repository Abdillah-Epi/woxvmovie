import { atom, atomFamily, selector } from 'recoil';
import { ErrorAccess } from '../error';
import { GetViewMovies } from '../requests/views';
import { AccessTokenAtom } from './auth';
import { OAuthAtom } from './authorization';
import { movieSelectedAtom } from './movies';
import { TVMovieCached } from './types';

export const ViewsAtom = atom<TVMovieCached[]>({
    key: 'ViewsAtom',
    default: []
});

export const ViewsAtomFamily = atomFamily<boolean, number>({
    key: 'ViewsAtomFamily',
    default: false
});

export const ViewsSelector = selector({
    key: 'ViewsSelector',
    get: async ({ get }) => {
        const oauth_token = get(OAuthAtom);
        const access_token = get(AccessTokenAtom);
        get(movieSelectedAtom);

        if (!oauth_token) return ErrorAccess.FORBIDDEN;
        if (!access_token) return ErrorAccess.UNAUTHORIZED;

        const res = await GetViewMovies(access_token, oauth_token);
        return res;
    }
});
