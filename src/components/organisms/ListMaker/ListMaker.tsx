import React from 'react';
import { TVMovie } from '../../../store/types';
import { AnimatePresence } from 'framer-motion';
import Display from '../../atoms/Display';
import PosterActions from '../../molecules/PosterActions';
import { SharedElements } from '../MoviesAndSeries/motion';
import useLikeAction from '../../../hooks/useLikeAction';
import usePlaylistAction from '../../../hooks/usePlaylistAction';

type ListMakerProps = {
    movies: TVMovie[];
    on?: string;
};

const ListMaker: React.FC<ListMakerProps> = ({ movies, on }) => {
    const [setLike] = useLikeAction();
    const [OpenModal] = usePlaylistAction();

    return (
        <div className='grid w-full grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5'>
            <AnimatePresence>
                {movies.map((m, key) => {
                    return (
                        <SharedElements
                            key={key}
                            movieKey={`${m.title}-${m.id}`}
                            className={`relative min-w-[10rem]`}
                            theme={'poster'}
                        >
                            <Display theme='poster' className='rounded-lg' path={m.poster_path} />
                            <PosterActions
                                PlaylistCallback={OpenModal}
                                LikeCallback={setLike}
                                on={m.on ? m.on : on!}
                                title={m.title}
                                movie={m}
                            />
                        </SharedElements>
                    );
                })}
            </AnimatePresence>
        </div>
    );
};

export default ListMaker;
