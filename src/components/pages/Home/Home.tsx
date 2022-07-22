import React, { useState } from 'react';
import Footer from '../../organisms/Footer';

import { useRecoilValue } from 'recoil';
import Banner from '../../organisms/Banner';
import useTrending from '../../../hooks/useTrending';
import { UserAtom } from '../../../store/user';
import MoviesAndSeries from '../../organisms/MoviesAndSeries';
import useRouteStatus from '../../../hooks/useRouteStatus';
import useSocket from '../../../hooks/useSocket';
import useBannerVideo from '../../../hooks/useBannerVideo';

const Home: React.FC = () => {
    // Check if the user is logged
    useRouteStatus();

    //--------------------- GET RANDOM MOVIE FOR THE BANNER --------------------
    const [index, setIndex] = useState(Math.floor(Math.random() * 9));
    const [trending, error] = useTrending('trainding');
    //--------------------- GET RANDOM MOVIE FOR THE BANNER --------------------

    const user = useRecoilValue(UserAtom);
    const [video, err] = useBannerVideo(trending[index], 'movie');

    useSocket();
    if (!trending || !video) return <div>Loading...</div>;

    return (
        <>
            <Banner video={video} movie={trending[index]} />
            <div className='my-28 space-y-16 sm:my-0 sm:mb-28 xl:my-16'>
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
            </div>
            <Footer />
        </>
    );
};

export default Home;
