import { atom, atomFamily, DefaultValue, selector, selectorFamily } from 'recoil';
import { ErrorAccess } from '../error';
import { GetFavorites } from '../requests/likes';
import { AccessTokenAtom } from './auth';
import { OAuthAtom } from './authorization';
import { SocketAtom } from './socket';
import { TVMovieCached } from './types';
import { UserAtom } from './user';

// export const FavoritesAtom = atom<TVMovieCached[]>({
//     key: 'FavoritesAtom',
//     default: []
// });

export const FavoritesAtomFamily = atomFamily<boolean, number>({
    key: 'FavoritesAtomFamily',
    default: false
});

export const FavoritesSelectorFamily = selectorFamily<void, number>({
    key: 'FavoritesSelectorFamily',
    get:
        id =>
        async ({ get }) => {
            get(FavoritesAtomFamily(id));
            const user = get(UserAtom);
            const socket = get(SocketAtom);
            socket?.send(JSON.stringify({ id: id, user_id: user?.id }));
        }
});

export const IsMovieLikedSelector = selector<{ id: number; status: boolean }>({
    key: ' IsMovieLikedSelector ',
    get: () => ({ id: 0, status: false }),
    set: ({ set }, data) => {
        if (data instanceof DefaultValue) return;
        set(FavoritesAtomFamily(data.id), data.status);
    }
});

export const FavoritesSelector = selector({
    key: 'FavoritesSelector',
    get: async ({ get }) => {
        const oauth_token = get(OAuthAtom);
        const access_token = get(AccessTokenAtom);

        if (!oauth_token) return ErrorAccess.FORBIDDEN;
        if (!access_token) return ErrorAccess.UNAUTHORIZED;

        const res = await GetFavorites(access_token, oauth_token);

        return res;
    }
});
