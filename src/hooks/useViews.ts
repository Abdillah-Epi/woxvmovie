import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ErrorAccess } from '../error';
import { ViewsAtom, ViewsSelector } from '../store/views';

const useViews = () => {
    const data = useRecoilValue(ViewsSelector);
    const [views, setViews] = useRecoilState(ViewsAtom);

    useEffect(() => {
        if (data === ErrorAccess.FORBIDDEN) return setViews(() => []);
        if (data === ErrorAccess.UNAUTHORIZED) return setViews(() => []);
        if (!data.success) return setViews(() => []);

        setViews(() => data.movies);
    }, [data]);

    return [views] as const;
};

export default useViews;
