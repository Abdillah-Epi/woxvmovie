import React, { Suspense } from 'react';
import Header from '../../atoms/Typography/Header';
import Regular from '../../atoms/Typography/Regular';
import infos from '../../../assets/images/infos.svg';
import Button from '../../atoms/Button';
import { Like, Playlist } from '../PosterInfos';
import { useRecoilValue } from 'recoil';
import { movieSelectedAtom } from '../../../store/movies';
import { LikeWatcher } from '../../organisms/Category';

type DescriptionProps = {
    title: string;
    body: string;
    mores?: string;
    reactions?: boolean;
};

const Actions = () => {
    const selectedMovie = useRecoilValue(movieSelectedAtom);

    return (
        <>
            <Suspense fallback={<div></div>}>
                <LikeWatcher on={selectedMovie?.on!} movie={selectedMovie?.movie!} />
            </Suspense>
            <div className='flex w-[80%] items-center space-x-6'>
                <Like movie={selectedMovie?.movie!} />
                <Playlist on={selectedMovie?.on!} movie={selectedMovie?.movie!} />
            </div>
        </>
    );
};

const Description: React.FC<DescriptionProps> = ({ title, body, mores, reactions = false }) => {
    return (
        <div className='w-full space-y-6'>
            <div>
                <Header text={title} color='text-white' />
            </div>
            <div className='2xl:w-[70%]'>
                <Regular
                    styles='font-light text-justify'
                    fontSize='text-xs lg:text-base'
                    text={body}
                    color='text-white'
                />
            </div>
            <div className='w-[70%] sm:w-[40%]'>
                {!reactions ? (
                    <Button
                        textStyles={{ styles: 'text-xs 2xl:text-base', textPos: 'center', textColor: 'text-white' }}
                        styles='rounded-sm bg-woxvmovie-4/50'
                        text="Plus d'informations"
                        icon={{ icon: infos, pos: 'left', styles: 'w-3 h-3 sm:w-4 sm:h-4' }}
                    />
                ) : (
                    <Actions />
                )}
            </div>
        </div>
    );
};

export default Description;
