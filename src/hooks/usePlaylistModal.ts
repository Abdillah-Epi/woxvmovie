import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { movieSelectedAtom } from '../store/movies';
import { PlaylistModalAtom, PlaylistsAtom } from '../store/playlist';
import usePlaylistQueries from './usePlaylistQueries';

const usePlaylistModal = () => {
    const [state, setState] = useRecoilState(PlaylistModalAtom);
    const movie = useRecoilValue(movieSelectedAtom);
    const playlist = useRecoilValue(PlaylistsAtom);
    const { addInPlaylist } = usePlaylistQueries();

    const AddInPlaylist = (id: string) => {
        if (!movie || !id) return;
        addInPlaylist(id, movie.movie);
        setState(() => false);
    };

    useEffect(() => {
        if (!state) return;

        if (playlist.length) return;

        setState(() => false);
    }, [state, playlist]);

    return [state, setState, playlist, AddInPlaylist] as const;
};

export default usePlaylistModal;
