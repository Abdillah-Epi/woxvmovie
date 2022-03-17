import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
    FavoritesAtomFamily,
    LikeActionAtomFamily,
    movieHoveredAtom,
    movieSelectedAtom,
    OpenPlaylistMenuAtom,
    PlaylistSelectedAtom,
    ViewsAtomFamily
} from '../../../store/movies';
import Average from '../../atoms/Average';
import Regular from '../../atoms/Typography/Regular';
import SubHeader from '../../atoms/Typography/SubHeader';
import eye from '../../../assets/images/eye.svg';
import eye_blue from '../../../assets/images/eye-blue.svg';
import heart from '../../../assets/images/heart.svg';
import heart_pink from '../../../assets/images/heart-pink.svg';

import addpl from '../../../assets/images/addpl.svg';
import inpl from '../../../assets/images/inpl.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { TVMovie } from '../../../store/types';

type PosterInfosProps = {
    movie: TVMovie;
    title: string;
    on: string;
};

type LikeProps = {
    movie: TVMovie;
};

export const Like: React.FC<LikeProps> = ({ movie }) => {
    const setClick = useSetRecoilState(LikeActionAtomFamily(movie.id));
    const isLike = useRecoilValue(FavoritesAtomFamily(movie.id));

    return (
        <img
            onClick={() => setClick(() => (isLike ? 'unlike' : 'like'))}
            className='h-5 w-5 cursor-pointer'
            src={isLike ? heart_pink : heart}
            alt=''
        />
    );
};

type PlaylistProps = {
    movie: TVMovie;
};

export const Playlist: React.FC<PlaylistProps> = ({ movie }) => {
    const setActive = useSetRecoilState(OpenPlaylistMenuAtom);
    const selectPlaylist = useSetRecoilState(PlaylistSelectedAtom);

    const params = useParams();

    const onClick = () => {
        if (!params.id) {
            setActive(c => ({ state: !c.state, id: movie.id }));
        } else {
            let id = params.id;
            selectPlaylist(() => ({ id: id, mid: movie.id, state: false }));
        }
    };
    return <img onClick={() => onClick()} className='h-7 w-7 cursor-pointer' src={params.id ? inpl : addpl} alt='' />;
};

const PosterInfos: React.FC<PosterInfosProps> = ({ title, movie, on }) => {
    const selectedID = useRecoilValue(movieHoveredAtom);
    const selectMovie = useSetRecoilState(movieSelectedAtom);
    const navigate = useNavigate();
    const isViewed = useRecoilValue(ViewsAtomFamily(movie.id));
    return (
        <>
            {selectedID === `${title}-${movie.id}` && (
                <div className='absolute inset-0 flex h-full w-full flex-col items-center justify-center space-y-10 bg-black/80'>
                    <div className='w-[70%]'>
                        <SubHeader
                            fontSize='sm:text-xl text-lg'
                            styles='text-center'
                            text={movie.title}
                            color={'text-white'}
                        />
                    </div>
                    <Average average={movie.vote_average} />
                    <div className='w-[80%]'>
                        <Regular styles='text-xs text-justify' text={movie.overview} color={'text-white'} />
                    </div>
                    <div className='flex w-[80%] items-center space-x-6'>
                        <Like movie={movie} />
                        <img
                            onClick={() => {
                                selectMovie(() => ({ movie, on }));
                                navigate('/details');
                            }}
                            className={`h-6 w-6 cursor-pointer fill-amber-500`}
                            src={isViewed ? eye_blue : eye}
                            alt=''
                        />
                        <Playlist movie={movie} />
                    </div>
                </div>
            )}
            {!selectedID && (
                <div className='absolute inset-0 flex h-full w-full flex-col items-center justify-center space-y-10 xl:hidden'>
                    <div className='flex h-[90%] w-full items-end justify-center space-x-6'>
                        <div className='flex w-full items-center justify-center space-x-6'>
                            <Like movie={movie} />
                            <img
                                onClick={() => {
                                    selectMovie(() => ({ movie, on }));
                                    navigate('/details');
                                }}
                                className={`h-6 w-6 cursor-pointer fill-amber-500`}
                                src={isViewed ? eye_blue : eye}
                                alt=''
                            />
                            <Playlist movie={movie} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PosterInfos;
