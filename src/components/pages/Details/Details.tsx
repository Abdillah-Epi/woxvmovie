import { Navigate } from '@tanstack/react-location';
import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import useBannerVideo from '../../../hooks/useBannerVideo';
import useRouteStatus from '../../../hooks/useRouteStatus';
import useViewsQueries from '../../../hooks/useViewsQueries';
import { movieSelectedAtom } from '../../../store/movies';
import Banner from '../../organisms/Banner';

type DetailsProps = {};

const Details: React.FC<DetailsProps> = () => {
    // Check if the user is logged
    useRouteStatus();

    const selectedMovie = useRecoilValue(movieSelectedAtom);
    const [addToViews, error] = useViewsQueries();

    useEffect(() => {
        if (!selectedMovie) return;
        addToViews(selectedMovie.movie);
    }, []);

    const [video, err] = useBannerVideo(null, 'movie');

    if (!selectedMovie) return <Navigate to={'/app'} />;
    return (
        <div>
            <Banner video={video} movie={selectedMovie!.movie} />
        </div>
    );
};

export default Details;
