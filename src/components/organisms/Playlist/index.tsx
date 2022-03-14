import React, { Suspense, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import useAuth from '../../../hooks/useAuth';
import usePlaylist from '../../../hooks/usePlaylist';
import { isClickedAtomFamily } from '../../../store/button';
import { InputAtomFamily } from '../../../store/inputs';
import { PlaylistsAtom, PlaylistsSelectorFamily } from '../../../store/movies';
import InputCreator from '../../molecules/InputCreator';
import Nav from '../../molecules/Nav';
import Playlist from '../../molecules/Playlist';
import trash from '../../../assets/images/trash.svg';
import { motion } from 'framer-motion';
import { variantPlaylist } from './../QuickPlaylist/motion';

type OPlaylistProps = {};

type PlaylistWatcherProps = {
    id: string;
};

const PlaylistWatcher: React.FC<PlaylistWatcherProps> = ({ id }) => {
    const [movies, initFamily] = useRecoilState(PlaylistsSelectorFamily(id));
    const { setOAuth, setAccessToken } = useAuth();

    useEffect(() => {
        if (typeof movies === 'number') {
            if (movies === 403) setOAuth(() => null);
            if (movies === 401) setAccessToken(() => null);
            return;
        }
        if (!movies) return;
        initFamily(() => movies);
    }, [movies]);
    return <div></div>;
};

const OPlaylist: React.FC<OPlaylistProps> = ({}) => {
    const [isClicked, resetClick] = useRecoilState(isClickedAtomFamily('CRÉER'));
    const [name, resetName] = useRecoilState(InputAtomFamily('playlist'));
    const [playlist, updatePlaylist] = useRecoilState(PlaylistsAtom);
    const { createPlaylist, deletePlaylist, setOAuth, setAccessToken } = usePlaylist();
    useEffect(() => {
        if (!isClicked) return;
        resetClick(() => false);
        createPlaylist(name.value).then(res => {
            if (typeof res === 'number') {
                if (res === 403) setOAuth(() => null);
                if (res === 401) setAccessToken(() => null);
                return;
            }
            if (!res.success) return;
            updatePlaylist(c => [...c, { id: res.playlists, name: name.value }]);
            resetName(() => ({ value: '', error: null }));
        });
    }, [isClicked]);

    const [id, setID] = useState<string | null>(null);
    useEffect(() => {
        if (!id) return;
        deletePlaylist(id).then(res => {
            if (typeof res === 'number') {
                if (res === 403) setOAuth(() => null);
                if (res === 401) setAccessToken(() => null);
                return;
            }
            if (!res.success) return;
            updatePlaylist(c => c.filter(m => m.id !== id));
        });
    }, [id]);
    const navigate = useNavigate();

    return (
        <div className='h-full w-full space-y-20 overflow-y-scroll p-10'>
            <div className='h-[10%]'>
                <Nav
                    styles={'flex space-x-10 items-center justify-between xl:w-[30%]'}
                    fontSize='sm:text-4xl text-2xl'
                    links={true}
                    animation={false}
                />
            </div>
            <div className='flex h-[90%] w-full flex-col items-center justify-center space-y-6 xl:pl-20'>
                <motion.div initial='hidden' animate='show' exit='exit' className='w-full space-y-10 xl:w-[30%]'>
                    <motion.div variants={variantPlaylist}>
                        <InputCreator type='text' id='playlist' btn='CREATE' placeHolder='Name' />
                    </motion.div>
                    <motion.div initial='hidden' animate='show' exit='exit' className='w-full space-y-5 '>
                        {playlist.map((p, key) => {
                            return (
                                <motion.div
                                    variants={variantPlaylist}
                                    custom={key + 0.4}
                                    key={key}
                                    className='flex w-full items-center justify-center space-x-3'
                                >
                                    <div onClick={() => navigate(`/playlist/view/${p.id}`)} className='w-full'>
                                        <Playlist text={p.name} />
                                    </div>
                                    <img
                                        onClick={() => setID(() => p.id)}
                                        className={'h-5 w-5 xl:h-8 xl:w-8'}
                                        src={trash}
                                        alt=''
                                    />
                                    <Suspense fallback={<div></div>}>
                                        <PlaylistWatcher id={p.id} />
                                    </Suspense>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default OPlaylist;
