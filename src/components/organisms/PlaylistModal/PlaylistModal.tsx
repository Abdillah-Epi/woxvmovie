import React from 'react';
import PlaylistItem from '../../molecules/PlaylistItem';
import close from '../../../assets/images/close.svg';
import { ContainerItemAnimation, ItemAnimation } from './motion';
import usePlaylistModal from '../../../hooks/usePlaylistModal';

const PlaylistModal: React.FC = () => {
    const [state, setState, playlist, AddInPlaylist] = usePlaylistModal();

    if (!state) return <></>;

    return (
        <div className='fixed  inset-0 flex h-full w-full flex-col items-center justify-center bg-black/80'>
            <div className='flex w-full justify-end py-5 pr-10'>
                <img
                    onClick={() => setState(() => false)}
                    className='h-4 w-4 cursor-pointer lg:h-8 lg:w-8'
                    src={close}
                    alt=''
                />
            </div>
            <div className='h-full w-full xl:w-[60%]'>
                <ContainerItemAnimation className='pointer-events-auto flex h-full w-full flex-col items-center justify-center space-y-2'>
                    {playlist.map((p, key) => {
                        return (
                            <ItemAnimation
                                key={key}
                                custom={key}
                                onClick={() => AddInPlaylist(p.id)}
                                className='w-[90%]'
                            >
                                <PlaylistItem text={p.name} />
                            </ItemAnimation>
                        );
                    })}
                </ContainerItemAnimation>
            </div>
        </div>
    );
};

export default PlaylistModal;
