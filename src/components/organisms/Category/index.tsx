import { AnimatePresence, motion } from 'framer-motion';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import useAuth from '../../../hooks/useAuth';
import useBreakpoint from '../../../hooks/useBreakPoint';
import {
    FavoritesAtom,
    FavoritesAtomFamily,
    FavoritesSelectorFamily,
    LikeActionAtomFamily,
    movieHoveredAtom,
    MoviesAtomFamily,
    MoviesSelectorFamily
} from '../../../store/movies';
import { TVMovie } from '../../../store/types';
import Poster from '../../atoms/Poster';
import SubHeader from '../../atoms/Typography/SubHeader';
import PosterInfos from '../../molecules/PosterInfos';

type CategoryProps = {
    title: string;
    infos: { genre: string; path: string };
    on: string;
};

type LikeWatcherProps = {
    movie: TVMovie;
    on: string;
};

export const LikeWatcher: React.VFC<LikeWatcherProps> = ({ movie, on }) => {
    const { setOAuth, setAccessToken } = useAuth();

    //make a family of movie to simplify playlist trigger
    const setFamily = useSetRecoilState(MoviesAtomFamily(movie.id));
    useEffect(() => {
        setFamily(() => movie);
    }, []);

    const [click, setClick] = useRecoilState(LikeActionAtomFamily(movie.id));
    const movies = useRecoilValue(FavoritesSelectorFamily({ id: movie.id, movie, on }));

    const setStateFav = useSetRecoilState(FavoritesAtomFamily(movie.id));
    const updateFavoritesList = useSetRecoilState(FavoritesAtom);

    useEffect(() => {
        if (movies === 403) setOAuth(() => null);
        if (movies === 401) setAccessToken(() => null);
        if (typeof movies === 'number' || !movies) return;

        const isLike = movies.find(movies => movies.id === movie.id) ? true : false;
        setStateFav(() => isLike);
        updateFavoritesList(() => movies);
    }, [movies]);

    useEffect(() => {
        if (click === 'none') return;
        setClick(() => 'none');
    }, [click]);
    return <></>;
};

const Category: React.FC<CategoryProps> = ({ infos, title, on }) => {
    const [width, setWidth] = useState<number>(0);
    const [w, setW] = useState<number>(0);
    const carousel = useRef<HTMLDivElement | null>(null);
    const [pointerEvent, setPointer] = useState<boolean>(false);
    const { windowSize } = useBreakpoint();

    //---------------- ON MOUNT CALCULATE CAROUSEL LENGTH -------------
    useEffect(() => {
        if (carousel && carousel.current) {
            const scrollWidth = carousel.current.scrollWidth;
            const w = scrollWidth - carousel.current.offsetWidth;
            setW(() => scrollWidth);
            setWidth(() => w);
        }
    }, [windowSize]);
    //---------------- ON MOUNT CALCULATE CAROUSEL LENGTH -------------

    const movie = useRecoilValue(MoviesSelectorFamily(infos));

    const movieHovered = useSetRecoilState(movieHoveredAtom);
    const { setOAuth, setAccessToken } = useAuth();
    useEffect(() => {
        if (movie === 403) setOAuth(() => null);
        if (movie === 401) setAccessToken(() => null);
    }, [movie]);

    return typeof movie === 'number' ? (
        <></>
    ) : !movie ? (
        <></>
    ) : (
        <div className='my-16 space-y-16'>
            <div className='px-10'>
                <SubHeader styles='sm:text-5xl text-xl' text={title} color={'text-white'} />
            </div>
            <motion.div
                ref={carousel}
                className='h-full w-full cursor-grab overflow-hidden '
                whileTap={{ cursor: 'grabbing' }}
            >
                <motion.div
                    onDragStartCapture={() => setPointer(() => true)}
                    onDragEndCapture={() => setPointer(() => false)}
                    drag='x'
                    dragConstraints={{ right: 0, left: -width }}
                    style={{ width: w }}
                    className={`flex space-x-10`}
                >
                    <AnimatePresence>
                        {movie.map((m, key) => {
                            return (
                                <motion.div
                                    key={key}
                                    layoutId={`${m.id}`}
                                    onHoverEnd={() => movieHovered(() => null)}
                                    onHoverStart={() => movieHovered(() => `${title}-${m.id}`)}
                                    className={`aspect-9/16 w-24 min-w-[20rem] ${
                                        pointerEvent ? 'pointer-events-none' : ''
                                    } relative`}
                                >
                                    <Suspense fallback={<div></div>}>
                                        <LikeWatcher on={on} movie={m} />
                                    </Suspense>
                                    <Poster
                                        styles='rounded-lg aspect-9/16'
                                        url={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
                                    />
                                    <PosterInfos on={on} title={title} movie={m} />
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Category;
