import React, { Suspense, useEffect, useState } from 'react';
import THome, { Movies, TV } from '../../templates/Home';
import Footer from '../../organisms/Footer';
import BannerLoader from '../../molecules/BannerLoader';
import { TopsTraindingAtom } from '../../../store/movies';
import { useRecoilValue } from 'recoil';
import Banner from '../../organisms/Banner';

const Home: React.FC = () => {
    //--------------------- GET RANDOM MOVIE FOR THE BANNER --------------------
    const [index, setIndex] = useState(Math.floor(Math.random() * 10));
    const top = useRecoilValue(TopsTraindingAtom);

    useEffect(() => {
        setIndex(() => Math.floor(Math.random() * 10));
    }, []);
    //--------------------- GET RANDOM MOVIE FOR THE BANNER --------------------

    return (
        <THome>
            <Suspense fallback={<BannerLoader />}>
                {top.length >= index && <Banner on='movie' movie={top[index]} />}
            </Suspense>
            <Movies />
            <TV />
            <Footer />
        </THome>
    );
};

export default Home;
