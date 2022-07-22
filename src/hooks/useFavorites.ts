import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ErrorAccess, ErrorResponse } from '../error';
import { FavoritesSelector } from '../store/linkes';
import { TVMovieCached } from '../store/types';
import useCredentials from './useCredentials';

const useFavorites = () => {
    const data = useRecoilValue(FavoritesSelector);
    const [error, setError] = useState<ErrorResponse>();
    const { setOAuth, setAccessToken } = useCredentials();
    const [favorites, setFavorites] = useState<TVMovieCached[]>([]);

    useEffect(() => {
        if (data === ErrorAccess.FORBIDDEN) return setOAuth(() => null);
        if (data === ErrorAccess.UNAUTHORIZED) return setAccessToken(() => null);
        if (!data.success) return setError(() => data);
        if (!data.movies) return;

        setFavorites(() => data.movies!);
    }, [data]);

    return [favorites, error] as const;
};

export default useFavorites;
