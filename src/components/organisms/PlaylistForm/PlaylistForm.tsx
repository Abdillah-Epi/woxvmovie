import React from 'react';
import { useRecoilValue } from 'recoil';
import { PlaylistsAtom } from '../../../store/playlist';
import PlaylistItem from '../../molecules/PlaylistItem';
import trash from '../../../assets/images/trash.svg';
import { useNavigate } from '@tanstack/react-location';
import { LocationGenerics } from '../../../router';
import InputCreator from '../../molecules/InputCreator';
import usePlaylist from '../../../hooks/usePlaylist';
import { ContainerAnimation, ItemContainerAnimation, SlideAnimation } from './motion';

const PlaylistForm: React.FC = () => {
    const playlist = useRecoilValue(PlaylistsAtom);
    const { name, setName, Create, Delete } = usePlaylist();

    const navigate = useNavigate<LocationGenerics>();

    return (
        <ContainerAnimation className='w-full space-y-10 xl:w-[30%]'>
            <SlideAnimation>
                <InputCreator
                    type='text'
                    titleBtn='CREATE'
                    placeholder='Name'
                    onChange={e => setName(() => e.target.value)}
                    value={name}
                    submitCallback={Create}
                />
            </SlideAnimation>
            <ItemContainerAnimation className='w-full space-y-5 '>
                {playlist.map((p, key) => {
                    return (
                        <SlideAnimation
                            custom={key + 0.4}
                            key={key}
                            className='flex w-full items-center justify-center space-x-3'
                        >
                            <div onClick={() => navigate({ to: `/app/playlist/view/${p.id}` })} className='w-full'>
                                <PlaylistItem text={p.name} />
                            </div>
                            <img onClick={() => Delete(p.id)} className={'h-5 w-5 xl:h-8 xl:w-8'} src={trash} alt='' />
                        </SlideAnimation>
                    );
                })}
            </ItemContainerAnimation>
        </ContainerAnimation>
    );
};

export default PlaylistForm;
