import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import usePlaylist from '../../../hooks/usePlaylist';
import { PlaylistsMoviesAtomFamily } from '../../../store/movies';
import { TVMovie } from '../../../store/types';
import ListMaker from '../../molecules/ListMaker';
import Nav from '../../molecules/Nav';
import img_movie from '../../../assets/images/movie.svg';

const OPlaylistView = () => {
    const params = useParams();
    const movies = useRecoilValue(PlaylistsMoviesAtomFamily(params.id!));
    const { getPlaylistMoveByID } = usePlaylist();
    const [backup, setBackup] = useState<TVMovie[]>([]);

    useEffect(() => {
        if (movies.length > 1) return;
        getPlaylistMoveByID(params.id!).then(res => {
            if (typeof res === 'number' || !res.success || !res.movies) return;
            const r = res.movies;
            setBackup(() => r);
        });
    }, [movies]);

    return (
        <div className='space-y h-full w-full overflow-y-scroll bg-black/80  p-10'>
            <div className='h-[10%]'>
                <Nav
                    styles={'flex space-x-10 items-center justify-between xl:w-[30%]'}
                    fontSize='sm:text-4xl text-2xl'
                    links={true}
                    animation={false}
                />
            </div>
            <div className='flex flex-col items-start justify-center space-y-6 xl:pl-20'>
                {movies.length > 0 && <ListMaker show={true} movies={movies} />}
                {backup.length > 0 && movies.length < 1 && <ListMaker show={true} movies={backup} />}
                {!movies.length && !backup.length && (
                    <div className='flex h-full w-full items-center justify-center'>
                        <img className='w-1/2' src={img_movie} alt='' />
                    </div>
                )}
            </div>
        </div>
    );
};

export default OPlaylistView;
