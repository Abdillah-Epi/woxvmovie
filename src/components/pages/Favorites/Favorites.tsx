import fav from '../../../assets/images/favorites.svg';
import useFavorites from '../../../hooks/useFavorites';
import useRouteStatus from '../../../hooks/useRouteStatus';
import ListMaker from '../../organisms/ListMaker';

const Favorites = () => {
    // Check if the user is logged
    useRouteStatus();

    const [favorites, error] = useFavorites();

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
