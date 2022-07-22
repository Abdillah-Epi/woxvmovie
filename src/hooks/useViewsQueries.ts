import { useState } from 'react';
import { ErrorAccess, ErrorResponse } from '../error';
import { AddToViewsList } from '../requests/views';
import { TVMovie } from '../store/types';
import useCredentials from './useCredentials';

const useViewsQueries = () => {
    const { setAccessToken, accessToken, oauth, setOAuth } = useCredentials();
    const [error, setError] = useState<ErrorResponse>();

    const addToViews = async (movie: TVMovie) => {
        if (!accessToken || !oauth) return;
        AddToViewsList(movie, accessToken, oauth).then(res => {
            if (res === ErrorAccess.FORBIDDEN) return setOAuth(() => null);
            if (res === ErrorAccess.UNAUTHORIZED) return setAccessToken(() => null);
            if (!res.success) return setError(() => res);
        });
    };
    return [addToViews, error] as const;
};

export default useViewsQueries;
