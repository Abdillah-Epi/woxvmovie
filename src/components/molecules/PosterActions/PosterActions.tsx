import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { movieSelectedAtom } from '../../../store/movies';
import eye from '../../../assets/images/eye.svg';
import eye_blue from '../../../assets/images/eye-blue.svg';
import heart from '../../../assets/images/heart.svg';
import heart_pink from '../../../assets/images/heart-pink.svg';

import addpl from '../../../assets/images/addpl.svg';
import inpl from '../../../assets/images/inpl.svg';
import { TVMovie } from '../../../store/types';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { LocationGenerics } from '../../../router';
import PosterHovered from '../PosterHovered';
import { LikeAction } from '../../../hooks/useLikeAction';
import { ViewsAtomFamily } from '../../../store/views';
import { FavoritesAtomFamily } from '../../../store/linkes';

type PosterInfosProps = {
    movie: TVMovie;
    title: string;
    on: string;
    LikeCallback: React.Dispatch<React.SetStateAction<LikeAction | undefined>>;
    PlaylistCallback: (movie: TVMovie, on: string) => void;
};

const PosterActions: React.FC<PosterInfosProps> = ({ title, movie, on, LikeCallback, PlaylistCallback }) => {
    const selectMovie = useSetRecoilState(movieSelectedAtom);
    const navigate = useNavigate<LocationGenerics>();
    const params = useMatch<LocationGenerics>().params;
    const isViewed = useRecoilValue(ViewsAtomFamily(movie.id));
    const isLike = useRecoilValue(FavoritesAtomFamily(movie.id));

    return (
        <PosterHovered
            className='absolute inset-0 flex h-full w-full flex-col items-center justify-center space-y-10'
            movie={movie}
            on={on}
            title={title}
        >
            <img
                onClick={() => LikeCallback({ action: isLike ? 'unlike' : 'like', movie: movie })}
                className='h-5 w-5 cursor-pointer'
                src={isLike ? heart_pink : heart}
                alt=''
            />
            <img
                onClick={() => {
                    selectMovie(() => ({ movie, on }));
                    navigate({ to: '/app/details' });
                }}
                className={`h-6 w-6 cursor-pointer fill-amber-500`}
                src={isViewed ? eye_blue : eye}
                alt=''
            />
            <img
                onClick={() => PlaylistCallback(movie, on)}
                className='h-7 w-7 cursor-pointer'
                src={params.id ? inpl : addpl}
                alt=''
            />
        </PosterHovered>
    );
};

export default PosterActions;
