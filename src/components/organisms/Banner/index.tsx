import React, { useEffect } from 'react';
import Nav from '../../molecules/Nav';
import Player from '../../atoms/Player';
import Description from '../../molecules/Description';
import { VideoSelector } from '../../../store/movies';
import { useRecoilValue } from 'recoil';
import { TVMovie } from '../../../store/types';
import useAuth from '../../../hooks/useAuth';
import Poster from '../../atoms/Poster';
import BannerLoader from '../../molecules/BannerLoader';
import { motion } from 'framer-motion';
import { variantsBanner } from './motion';

type BannerProps = {
    reactions?: boolean;
    movie: TVMovie;
};

const Banner: React.FC<BannerProps> = ({ movie, reactions = false }) => {
    const video = useRecoilValue(VideoSelector(movie ? movie.id : 438695));
    const { setOAuth, setAccessToken } = useAuth();

    useEffect(() => {
        if (video === 403) setOAuth(() => null);
        if (video === 401) setAccessToken(() => null);
    }, [video]);

    return typeof video === 'number' ? (
        <BannerLoader />
    ) : (
        <motion.section
            initial='hidden'
            animate='show'
            exit='exit'
            className='relative h-[100vh] w-screen sm:h-[70vh] xl:h-screen'
        >
            <motion.div variants={variantsBanner} className='absolute inset-0 h-full w-full'>
                {video && video.results.key !== '' ? (
                    <Player id={video.results.key!} />
                ) : (
                    <Poster styles='aspect-video' url={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                )}
            </motion.div>
            <div className='absolute top-0 h-full w-full space-y-40 bg-black/30 p-10 xl:space-y-72'>
                <Nav
                    styles={'flex space-x-10 items-center justify-between xl:w-[30%]'}
                    fontSize='sm:text-4xl text-2xl'
                    links={true}
                    animation={false}
                />
                <motion.div
                    variants={variantsBanner}
                    className='flex h-[70%] flex-col items-start justify-center space-y-6 xl:pl-20'
                >
                    <div className='w-[95%] sm:w-[70%] xl:w-[40%]'>
                        <Description reactions={reactions} title={movie.title} body={movie.overview} />
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default Banner;
