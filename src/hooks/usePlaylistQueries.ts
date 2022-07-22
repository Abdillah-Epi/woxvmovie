import { ErrorAccess } from '../error';
import {
    AddInPlaylist,
    CreatePlaylist,
    DeletePlaylist,
    GetPlaylistMoveByID,
    RemoveFromPlaylist
} from '../requests/playlists';
import { TVMovie } from '../store/types';
import useCredentials from './useCredentials';

const usePlaylistQueries = () => {
    const { setAccessToken, accessToken, oauth, setOAuth } = useCredentials();

    const createPlaylist = async (name: string) => {
        if (!accessToken) return;
        if (!oauth) return;
        const res = await CreatePlaylist(name, accessToken, oauth);
        if (res === ErrorAccess.FORBIDDEN) return setOAuth(() => null);
        if (res === ErrorAccess.UNAUTHORIZED) return setAccessToken(() => null);
        if (!res.success) return res;
        return res;
    };
    const deletePlaylist = async (id: string) => {
        if (!accessToken) return;
        if (!oauth) return;
        const res = await DeletePlaylist(id, accessToken, oauth);
        if (res === ErrorAccess.FORBIDDEN) return setOAuth(() => null);
        if (res === ErrorAccess.UNAUTHORIZED) return setAccessToken(() => null);
        if (!res.success) return res;
        return res;
    };

    const removeFromPlaylist = async (id: string, mid: number) => {
        if (!accessToken) return null;
        if (!oauth) return null;
        const res = await RemoveFromPlaylist(id, mid, accessToken, oauth);
        res === ErrorAccess.FORBIDDEN && setOAuth(() => null);
        res === ErrorAccess.UNAUTHORIZED && setAccessToken(() => null);
    };
    const addInPlaylist = async (id: string, movie: TVMovie) => {
        if (!accessToken) return null;
        if (!oauth) return null;
        const res = await AddInPlaylist({ id, movie, access_token: accessToken, oauth_token: oauth });
        res === ErrorAccess.FORBIDDEN && setOAuth(() => null);
        res === ErrorAccess.UNAUTHORIZED && setAccessToken(() => null);
    };
    const getPlaylistMoveByID = async (id: string) => {
        if (!accessToken) return null;
        if (!oauth) return null;
        const res = await GetPlaylistMoveByID(id, accessToken, oauth);
        res === ErrorAccess.FORBIDDEN && setOAuth(() => null);
        res === ErrorAccess.UNAUTHORIZED && setAccessToken(() => null);
    };

    return {
        createPlaylist,
        deletePlaylist,
        addInPlaylist,
        getPlaylistMoveByID,
        removeFromPlaylist
    };
};

export default usePlaylistQueries;
