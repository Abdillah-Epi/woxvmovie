import { useMatch } from '@tanstack/react-location';
import { useSetRecoilState } from 'recoil';
import { LocationGenerics } from '../router';
import { movieSelectedAtom } from '../store/movies';
import { PlaylistModalAtom } from '../store/playlist';
import { TVMovie } from '../store/types';
import usePlaylistQueries from './usePlaylistQueries';

const usePlaylistAction = () => {
    const openModal = useSetRecoilState(PlaylistModalAtom);
    const selectMovie = useSetRecoilState(movieSelectedAtom);

    const params = useMatch<LocationGenerics>().params;
    const { removeFromPlaylist } = usePlaylistQueries();

    const onClick = (movie: TVMovie, on: string) => {
        if (!params.id) {
            openModal(c => !c);
            selectMovie(() => ({ movie, on }));
        } else {
            let id = params.id;
            removeFromPlaylist(id, movie.id);
        }
    };

    return [onClick] as const;
};

export default usePlaylistAction;
