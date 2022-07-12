import React from 'react';
import Nav from '../../molecules/Nav';
import Player from '../../atoms/Player';
import Description from '../../molecules/Description';
import { TVMovie } from '../../../store/types';
import Display from '../../atoms/Display';
import BannerLoader from '../../molecules/BannerLoader';
import { BannerContainerAnimation, DescriptionAnimation, PlayerAnimation } from './motion';
import links from '../../molecules/Nav/links.json';
import useBannerVideo from '../../../hooks/useBannerVideo';

type BannerProps = {
    movie: TVMovie;
    on: string;
};

const Banner: React.FC<BannerProps> = ({ movie, on }) => {
    const [video, error] = useBannerVideo(movie, on);

    // if error TODO
    if (!video) return <BannerLoader />;

    return (
        <BannerContainerAnimation className='relative h-[100vh] w-screen sm:h-[70vh] xl:h-screen'>
            <PlayerAnimation className='absolute inset-0 h-full w-full'>
                {video && video.results.key !== '' ? (
                    <Player id={video.results.key!} />
                ) : (
                    <div className='flex h-full items-center justify-center'>
                        <Display
                            theme='poster'
                            className='aspect-9/16 w-[30%]'
                            path={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        />
                    </div>
                )}
            </PlayerAnimation>
            <div className='absolute top-0 h-full w-full space-y-40 bg-black/30 p-10 xl:space-y-72'>
                <Nav links={links} />
                <DescriptionAnimation className='flex h-[70%] flex-col items-start justify-center space-y-6 xl:pl-20'>
                    <div className='w-[95%] sm:w-[70%] xl:w-[40%]'>
                        <Description title={movie.title} body={movie.overview} />
                    </div>
                </DescriptionAnimation>
            </div>
        </BannerContainerAnimation>
    );
};

export default Banner;
