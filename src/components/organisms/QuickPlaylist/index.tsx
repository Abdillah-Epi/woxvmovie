import React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { MoviesAtomFamily, OpenPlaylistMenuAtom, PlaylistsAtom, PlaylistSelectedAtom } from '../../../store/movies';
import Playlist from '../../molecules/Playlist';
import close from '../../../assets/images/close.svg';
import { motion } from 'framer-motion';
import { variantPlaylist } from './motion';

type QuickPlaylistProps = {};

const QuickPlaylist: React.FC<QuickPlaylistProps> = ({}) => {
    const [state, setState] = useRecoilState(OpenPlaylistMenuAtom);
    const playlist = useRecoilValue(PlaylistsAtom);
    const selectPlaylist = useSetRecoilState(PlaylistSelectedAtom);
    const movie = useRecoilValue(MoviesAtomFamily(state.id));
    const onClick = (id: string) => {
        if (!movie || !id) return;
        selectPlaylist(() => ({ movie, id, state: true }));
        setState(() => ({ id: -1, state: false }));
    };
    return (
        <>
            {state.state && playlist.length && (
                <div className='fixed  inset-0 flex h-full w-full flex-col items-center justify-center bg-black/80'>
                    <div className='flex w-full justify-end py-5 pr-10'>
                        <img
                            onClick={() => setState(() => ({ id: -1, state: false }))}
                            className='h-4 w-4 lg:h-8 lg:w-8'
                            src={close}
                            alt=''
                        />
                    </div>
                    <div className='h-full w-full xl:w-[60%]'>
                        <motion.div
                            initial='hidden'
                            animate='show'
                            exit='exit'
                            className='pointer-events-auto flex h-full w-full flex-col items-center justify-center space-y-2'
                        >
                            {playlist.map((p, key) => {
                                return (
                                    <motion.div
                                        variants={variantPlaylist}
                                        key={key}
                                        custom={key}
                                        onClick={() => {
                                            onClick(p.id);
                                        }}
                                        className='w-[90%]'
                                    >
                                        <Playlist key={key} text={p.name} fontSize={'text-xs'} styles={'h-16'} />
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </div>
            )}
        </>
    );
};

export default QuickPlaylist;
