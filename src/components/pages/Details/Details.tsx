import { useNavigate } from '@tanstack/react-location';
import React, { Suspense, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import useViewsQueries from '../../../hooks/useViewsQueries';
import { LocationGenerics } from '../../../router';
import { movieSelectedAtom } from '../../../store/movies';
import BannerLoader from '../../molecules/BannerLoader';
import Banner from '../../organisms/Banner';

type DetailsProps = {};

const Details: React.FC<DetailsProps> = () => {
    const selectedMovie = useRecoilValue(movieSelectedAtom);
    const navigate = useNavigate<LocationGenerics>();
    const [addToViews, error] = useViewsQueries();

    useEffect(() => {
        if (!selectedMovie) return;
        addToViews(selectedMovie.movie, selectedMovie.on);
    }, []);

    if (!selectedMovie) {
        navigate({ to: '/app' });
        return <div></div>;
    }

    return (
        <div>
            <Suspense fallback={<BannerLoader />}>
                <Banner on={selectedMovie.on} movie={selectedMovie.movie} />
            </Suspense>
        </div>
    );
};

export default Details;
