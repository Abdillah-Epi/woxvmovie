import React, { Suspense, useEffect, useState } from 'react';
import Footer from '../../organisms/Footer';
import BannerLoader from '../../molecules/BannerLoader';

import { useRecoilValue } from 'recoil';
import Banner from '../../organisms/Banner';
import { routeStatusAtom } from '../../../store/auth';
import { Navigate } from '@tanstack/react-location';
import useTrending from '../../../hooks/useTrending';
import { UserAtom } from '../../../store/user';
import MoviesAndSeries from '../../organisms/MoviesAndSeries';

const Home: React.FC = () => {
    //--------------------- GET RANDOM MOVIE FOR THE BANNER --------------------
    const [index, setIndex] = useState(Math.floor(Math.random() * 10));
    const [trending, error] = useTrending('trainding');
    useEffect(() => {
        setIndex(() => Math.floor(Math.random() * 10));
    }, []);
    //--------------------- GET RANDOM MOVIE FOR THE BANNER --------------------

    const status = useRecoilValue(routeStatusAtom);

    if (status !== 'success') return <Navigate to={'/landing'} />;

    const user = useRecoilValue(UserAtom);

    return (
        <>
            <Suspense fallback={<BannerLoader />}>
                {trending.length && <Banner on='movie' movie={trending[index]} />}
            </Suspense>
            <MoviesAndSeries on='movie' genre={user?.genres[0]!} />
            <MoviesAndSeries on='movie' genre={user?.genres[1]!} />
            <MoviesAndSeries on='top-movie' />
            <MoviesAndSeries on='movie' genre={user?.genres[2]!} />
            <MoviesAndSeries on='movie' genre={user?.genres[3]!} />
            <MoviesAndSeries on='tv' genre={user?.genres[0]!} />
            <MoviesAndSeries on='tv' genre={user?.genres[1]!} />
            <MoviesAndSeries on='top-tv' />
            <MoviesAndSeries on='tv' genre={user?.genres[2]!} />
            <MoviesAndSeries on='tv' genre={user?.genres[3]!} />
            <Footer />
        </>
    );
};

export default Home;
