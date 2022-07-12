import { useCallback, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { ErrorResponse } from '../error';
import { PlaylistsAtom } from '../store/playlist';
import usePlaylistQueries from './usePlaylistQueries';

//
const usePlaylist = () => {
    const { createPlaylist, deletePlaylist } = usePlaylistQueries();
    const [name, setName] = useState('');
    const updatePlaylist = useSetRecoilState(PlaylistsAtom);
    const [error, setError] = useState<ErrorResponse>();

    const Create = useCallback(async () => {
        setError(() => undefined);
        const res = await createPlaylist(name);
        if (!res) return;
        if (!res.success) return setError(() => res);
        setName(() => '');
        updatePlaylist(c => [...c, { id: res.id, name: name }]);
    }, [name]);

    const Delete = useCallback(async (id: string) => {
        setError(() => undefined);
        const res = await deletePlaylist(id);
        if (!res) return;
        if (!res.success) return setError(() => res);
        updatePlaylist(c => c.filter(p => p.id !== id));
    }, []);

    return { name, setName, Create, Delete, error };
};

export default usePlaylist;
