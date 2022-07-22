import React, { useState } from 'react';
import useMoviesAndSeries from '../../../hooks/useMoviesAndSeries';
import usePlaylistAction from '../../../hooks/usePlaylistAction';
import Display from '../../atoms/Display';
import Typography from '../../atoms/Typography';
import PosterActions from '../../molecules/PosterActions';
import { MotionDragContainer, SharedElements } from './motion';

type CarouselProps = {
    title: string;
    genre: string;
    path: 'popular/tv' | 'popular';
    on: string;
    theme: 'backdrop' | 'poster';
};

const Carousel: React.FC<CarouselProps> = ({ genre, path, title, on, theme = 'poster' }) => {
    const [pointerEvent, setPointer] = useState<boolean>(() => false);
    const [OpenModal] = usePlaylistAction();

    const [list] = useMoviesAndSeries(genre, path);

    return (
        <div className='space-y-16'>
            <div className='px-10'>
                <Typography className='text-xl text-white sm:text-5xl' title={title} />
            </div>
            <MotionDragContainer setPointer={setPointer} className='h-full w-full cursor-grab overflow-hidden '>
                {!list.length && <div className='h-[568.88px] w-[320px]'></div>}
                {list.map((m, key) => {
                    return (
                        <SharedElements
                            key={key}
                            movieKey={`${title}-${m.id}`}
                            theme={theme}
                            className={`w-24 ${pointerEvent ? 'pointer-events-none' : ''} relative`}
                        >
                            <Display
                                theme='poster'
                                className={`${theme === 'poster' && 'aspect-9/16'} rounded-lg`}
                                path={theme === 'poster' ? m.poster_path : m.backdrop_path}
                            />
                            <PosterActions PlaylistCallback={OpenModal} on={on} title={title} movie={m} />
                        </SharedElements>
                    );
                })}
            </MotionDragContainer>
        </div>
    );
};

export default Carousel;
