import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ErrorAccess, ErrorResponse } from '../error';
import { FavoritesSelector } from '../store/linkes';
import { TVMovie } from '../store/types';
import useCredentials from './useCredentials';

const useFavorites = () => {
    const data = useRecoilValue(FavoritesSelector);
    const { setAccessToken, setOAuth } = useCredentials();
    const [error, setError] = useState<ErrorResponse>();
    const [favorites, setFavorites] = useState<TVMovie[]>([]);

    useEffect(() => {
        setError(() => undefined);

        if (data === ErrorAccess.FORBIDDEN) return setOAuth(() => null);
        if (data === ErrorAccess.UNAUTHORIZED) return setAccessToken(() => null);
        if (!data.success) return setError(() => data);

        setFavorites(() => data.movies);
    }, [data]);

    return [favorites, error] as const;
};

export default useFavorites;
