import useFavorites from '../../../hooks/useFavorites';
import fav from '../../../assets/images/favorites.svg';
import ListMaker from '../../organisms/ListMaker';

const Favorites = () => {
    const [favorites] = useFavorites();

    return (
        <div className='flex flex-col items-start justify-center space-y-6 '>
            <ListMaker movies={favorites} />
            {!favorites.length && (
                <div className='flex h-full w-full items-center justify-center'>
                    <img className='w-1/2' src={fav} alt='' />
                </div>
            )}
        </div>
    );
};

export default Favorites;
