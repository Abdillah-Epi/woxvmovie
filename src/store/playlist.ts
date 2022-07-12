import { atom, selectorFamily } from 'recoil';
import { ErrorAccess } from '../error';
import { GetPlaylistMoveByID } from '../requests/playlists';
import { AccessTokenAtom } from './auth';
import { OAuthAtom } from './authorization';
import { PlaylistsName, PlaylistsResponse } from './types';

export const PlaylistsAtom = atom<PlaylistsName[]>({
    key: 'PlaylistsAtom',
    default: []
});

export const PlaylistModalAtom = atom<boolean>({
    key: 'PlaylistModalAtom',
    default: false
});

export const PlaylistSelectorFamily = selectorFamily<
    ErrorAccess.FORBIDDEN | PlaylistsResponse | ErrorAccess.UNAUTHORIZED,
    string
>({
    key: 'PlaylistSelectorFamily',
    get:
        (id: string) =>
        async ({ get }) => {
            const oauth_token = get(OAuthAtom);
            const access_token = get(AccessTokenAtom);

            if (!oauth_token) return ErrorAccess.FORBIDDEN;
            if (!access_token) return ErrorAccess.UNAUTHORIZED;

            const res = await GetPlaylistMoveByID(id, access_token, oauth_token);
            return res;
        }
});
