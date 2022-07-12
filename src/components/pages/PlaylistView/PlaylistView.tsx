import usePlaylistView from '../../../hooks/usePlaylistView';
import img_movie from '../../../assets/images/movie.svg';
import ListMaker from '../../organisms/ListMaker';

const PlaylistView = () => {
    const [list, error] = usePlaylistView();

    return (
        <div className='flex flex-col items-start justify-center space-y-6 xl:pl-20'>
            <ListMaker movies={list} />
            {!list.length && (
                <div className='flex h-full w-full items-center justify-center'>
                    <img className='w-1/2' src={img_movie} alt='' />
                </div>
            )}
        </div>
    );
};

export default PlaylistView;
