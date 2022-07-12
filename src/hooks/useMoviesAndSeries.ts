import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ErrorAccess, ErrorResponse } from '../error';
import { MoviesSelectorFamily } from '../store/movies';
import { TVMovie } from '../store/types';
import useCredentials from './useCredentials';

const useMoviesAndSeries = (genre: string, path: 'popular/tv' | 'popular' = 'popular') => {
    const { setOAuth, setAccessToken } = useCredentials();
    const data = useRecoilValue(MoviesSelectorFamily({ genre, path }));
    const [list, setList] = useState<TVMovie[]>([]);
    const [error, setError] = useState<ErrorResponse>();

    useEffect(() => {
        setError(() => undefined);

        if (data === ErrorAccess.FORBIDDEN) return setOAuth(() => null);
        if (data === ErrorAccess.UNAUTHORIZED) return setAccessToken(() => null);

        data.success && setList(() => data.movies);
        !data.success && setError(() => data);
    }, [data]);

    return [list, error] as const;
};

export default useMoviesAndSeries;
