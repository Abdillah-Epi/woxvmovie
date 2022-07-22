import React from 'react';
import { TVMovieCached } from '../../../store/types';
import { AnimatePresence } from 'framer-motion';
import Display from '../../atoms/Display';
import PosterActions from '../../molecules/PosterActions';
import { SharedElements } from '../MoviesAndSeries/motion';
import usePlaylistAction from '../../../hooks/usePlaylistAction';

type ListMakerProps = {
    movies: TVMovieCached[];
    on?: string;
};

const ListMaker: React.FC<ListMakerProps> = ({ movies, on }) => {
    const [OpenModal] = usePlaylistAction();

    return (
        <div className='grid w-full grid-cols-1 gap-4 sm:grid-cols-3 xl:grid-cols-5'>
            <AnimatePresence>
                {movies.map((m, key) => {
                    return (
                        <SharedElements
                            key={key}
                            movieKey={`${m.movie.title}-${m.movie.id}`}
                            className={`relative min-w-[10rem]`}
                            theme={'poster'}
                        >
                            <Display theme='poster' className='rounded-lg' path={m.movie.poster_path} />
                            <PosterActions
                                PlaylistCallback={OpenModal}
                                on={m.on ? m.on : on!}
                                title={m.movie.title}
                                movie={m.movie}
                            />
                        </SharedElements>
                    );
                })}
            </AnimatePresence>
        </div>
    );
};

export default ListMaker;
