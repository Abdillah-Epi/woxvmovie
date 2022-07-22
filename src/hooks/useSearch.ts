import { useEffect, useState } from 'react';
import { ErrorAccess, ErrorResponse } from '../error';
import { Search } from '../requests/search';
import { TVMovieCached } from '../store/types';
import useCredentials from './useCredentials';

const useSearch = (q: string) => {
    const { setAccessToken, accessToken, oauth, setOAuth } = useCredentials();
    const [movies, setMovies] = useState<TVMovieCached[]>([]);
    const [error, setError] = useState<ErrorResponse>();

    useEffect(() => {
        if (!q) return;
        search(q);
    }, [q]);

    const search = async (q: string) => {
        setError(() => undefined);
        if (!accessToken) return null;
        if (!oauth) return null;
        const res = await Search(q, oauth, accessToken);

        if (res === ErrorAccess.FORBIDDEN) return setOAuth(() => null);
        if (res === ErrorAccess.UNAUTHORIZED) return setAccessToken(() => null);
        if (!res.success) return setError(res);

        setMovies(() => res.movies.map(m => ({ movie: m, on: 'movie' })));
    };

    return [movies, error] as const;
};

export default useSearch;
