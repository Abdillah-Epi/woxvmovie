import { useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ErrorAccess, ErrorResponse } from '../error';
import { TopsTrendingSelectorFamily } from '../store/trending';
import { TVMovie } from '../store/types';
import useCredentials from './useCredentials';

const useTrending = (path: 'trainding' | 'top/tv') => {
    const data = useRecoilValue(TopsTrendingSelectorFamily(path));
    const { setOAuth, setAccessToken } = useCredentials();
    const [list, setList] = useState<TVMovie[]>([]);
    const [error, setError] = useState<ErrorResponse>();
    const trending = useMemo(() => {
        return list;
    }, [list]);

    useEffect(() => {
        if (data === ErrorAccess.FORBIDDEN) return setOAuth(() => null);
        if (data === ErrorAccess.UNAUTHORIZED) return setAccessToken(() => null);

        data.success && setList(() => data.movies);
        !data.success && setError(() => data);
    }, [data]);

    return [trending, error] as const;
};

export default useTrending;
