import useDebounced from '../../../hooks/useDebounced';
import useRouteStatus from '../../../hooks/useRouteStatus';
import useSearch from '../../../hooks/useSearch';
import SearchInput from '../../molecules/SearchInput';
import ListMaker from '../../organisms/ListMaker';

const Search = () => {
    // Check if the user is logged
    useRouteStatus();

    const [q, setQ] = useDebounced();
    const [movies, error] = useSearch(q);

    return (
        <div className='flex flex-col items-start justify-center space-y-6 xl:pl-20'>
            <SearchInput
                onChange={e => setQ(() => e.target.value)}
                className='h-12 w-full rounded-lg p-3 focus:outline-none'
            />
            <ListMaker on='movie' movies={movies} />
        </div>
    );
};

export default Search;
