import React from 'react';
import Nav from '../../molecules/Nav';
import Player from '../../atoms/Player';
import Description from '../../molecules/Description';
import { TVMovie, Videos } from '../../../store/types';
import Display from '../../atoms/Display';
import BannerLoader from '../../molecules/BannerLoader';
import { BannerContainerAnimation, DescriptionAnimation, PlayerAnimation } from './motion';
import links from '../../molecules/Nav/links.json';

type BannerProps = {
    movie: TVMovie;
    video: Videos | undefined;
};

const Banner: React.FC<BannerProps> = ({ movie, video }) => {
    // if error TODO
    if (!video && !movie) return <BannerLoader />;

    return (
        <BannerContainerAnimation className='relative h-[45vh] w-screen sm:h-[70vh] xl:h-screen'>
            <PlayerAnimation className='absolute inset-0 h-full w-full'>
                {video && video.results.key !== '' ? (
                    <Player id={video.results.key!} />
                ) : (
                    <div className='flex h-full items-center justify-center'>
                        <Display
                            theme='poster'
                            className='aspect-9/16 w-[30%]'
                            path={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                        />
                    </div>
                )}
            </PlayerAnimation>
            <div className='absolute top-0 h-full w-full space-y-40 p-10 [background:linear-gradient(0deg,rgba(20,20,20,1)30%,rgba(20,20,20,0)54%,rgba(20,20,20,1)92%);] sm:[background:linear-gradient(0deg,rgba(20,20,20,1)30%,rgba(20,20,20,0)54%,rgba(20,20,20,1)92%);] xl:space-y-72 xl:[background:linear-gradient(0deg,rgba(20,20,20,1)15%,rgba(20,20,20,0)54%,rgba(20,20,20,1)92%);]'>
                <Nav links={links} />
                <DescriptionAnimation className='flex h-[70%] flex-col items-start justify-center space-y-6 xl:pl-20'>
                    <div className='w-[95%] sm:w-[70%] xl:w-[40%]'>
                        <Description title={movie?.title} body={movie?.overview} />
                    </div>
                </DescriptionAnimation>
            </div>
        </BannerContainerAnimation>
    );
};

export default Banner;
