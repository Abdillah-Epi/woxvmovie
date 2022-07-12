import { useMatch } from '@tanstack/react-location';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ErrorAccess, ErrorResponse } from '../error';
import { LocationGenerics } from '../router';
import { PlaylistSelectorFamily } from '../store/playlist';
import { TVMovie } from '../store/types';
import useCredentials from './useCredentials';

const usePlaylistView = () => {
    const params = useMatch<LocationGenerics>().params;
    const data = useRecoilValue(PlaylistSelectorFamily(params.id));
    const { setAccessToken, setOAuth } = useCredentials();
    const [error, setError] = useState<ErrorResponse>();
    const [list, setList] = useState<TVMovie[]>([]);

    useEffect(() => {
        setError(() => undefined);

        if (data === ErrorAccess.FORBIDDEN) return setOAuth(() => null);
        if (data === ErrorAccess.UNAUTHORIZED) return setAccessToken(() => null);
        if (!data.success) return setError(() => data);

        setList(() => data.movies);
    }, [data]);

    return [list, error] as const;
};

export default usePlaylistView;
