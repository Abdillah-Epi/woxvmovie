import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ErrorAccess, ErrorResponse } from '../error';
import { PlaylistsAtom, PlaylistSelector } from '../store/playlist';
import useCredentials from './useCredentials';

const useUserPlaylists = () => {
    const data = useRecoilValue(PlaylistSelector);
    const [error, setError] = useState<ErrorResponse>();
    const { setAccessToken, setOAuth } = useCredentials();
    const setPlaylists = useSetRecoilState(PlaylistsAtom);

    useEffect(() => {
        if (data === ErrorAccess.FORBIDDEN) return setOAuth(() => null);
        if (data === ErrorAccess.UNAUTHORIZED) return setAccessToken(() => null);
        if (!data.success) return setError(() => data);
        if (!data.playlists) return;

        setPlaylists(() => data.playlists!);
    }, [data]);

    return [error] as const;
};

export default useUserPlaylists;
