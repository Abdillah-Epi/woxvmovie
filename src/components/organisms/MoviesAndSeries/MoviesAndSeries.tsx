import React, { Suspense } from 'react';
import Carousel from './Carousel';
import MoviesLoaderTemplate from '../../molecules/MoviesLoaderTemplate';
import TopsLoaderTemplate from '../../molecules/TopsLoaderTemplate';
import Top from '../Top';

type MoviesAndSeriesProps = {
    on?: 'movie' | 'tv' | 'top-tv' | 'top-movie' | 'suggestion';
    genre?: string;
};

const MoviesAndSeries: React.FC<MoviesAndSeriesProps> = ({ genre, on }) => {
    switch (on) {
        case 'movie':
            return (
                <Suspense fallback={<MoviesLoaderTemplate />}>
                    <Carousel theme='poster' on={on} genre={genre!} path={'popular'} title={`${genre} Movies`} />
                </Suspense>
            );
        case 'tv':
            return (
                <Suspense fallback={<MoviesLoaderTemplate />}>
                    <Carousel theme='poster' on={on} genre={genre!} path={'popular/tv'} title={`${genre} TV Shows`} />
                </Suspense>
            );
        case 'top-tv':
            return (
                <Suspense fallback={<TopsLoaderTemplate />}>
                    <Top path='top/tv' title='Top Rated TV Shows' />
                </Suspense>
            );
        case 'top-movie':
            return (
                <Suspense fallback={<TopsLoaderTemplate />}>
                    <Top title='Popular Movies' path='trainding' />
                </Suspense>
            );
        default:
            return <></>;
    }
};

export default MoviesAndSeries;
