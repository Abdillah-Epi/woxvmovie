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
        if (!data.success) return setError(() => data);
        if (!data.movies) return;

        setList(() => data.movies!);
    }, [data]);

    return [list, error] as const;
};

export default useMoviesAndSeries;
