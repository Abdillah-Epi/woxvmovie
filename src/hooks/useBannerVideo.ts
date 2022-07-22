import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ErrorAccess, ErrorResponse } from '../error';
import { TVMovie, Videos } from '../store/types';
import { VideoSelector } from '../store/videos';
import useCredentials from './useCredentials';

const useBannerVideo = (movie: TVMovie | null = null, on: string) => {
    const { setAccessToken, setOAuth } = useCredentials();
    const data = useRecoilValue(VideoSelector({ id: movie ? movie.id : 438695, on: on }));

    const [video, setVideo] = useState<Videos>();
    const [error, setError] = useState<ErrorResponse>();

    useEffect(() => {
        setError(() => undefined);
        if (data === ErrorAccess.FORBIDDEN) return setOAuth(() => null);
        if (data === ErrorAccess.UNAUTHORIZED) return setAccessToken(() => null);
        if (!data.success) return setError(() => data);
        setVideo(() => data.video);
    }, [data]);

    return [video, error] as const;
};

export default useBannerVideo;
