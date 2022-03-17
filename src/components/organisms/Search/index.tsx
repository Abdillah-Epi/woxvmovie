import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import useDebounced from '../../../hooks/useDebounced';
import useSearch from '../../../hooks/useSearch';
import { InputAtomFamily } from '../../../store/inputs';
import { TVMovie } from '../../../store/types';
import ListMaker from '../../molecules/ListMaker';
import Nav from '../../molecules/Nav';
import MSearch from '../../molecules/Search';

const OSearch = () => {
    const q = useRecoilValue(InputAtomFamily('search'));
    const { qDebounce } = useDebounced(q.value);
    const [movies, setMovies] = useState<TVMovie[]>([]);
    const { Search } = useSearch();
    useEffect(() => {
        Search(qDebounce).then(res => {
            if (typeof res === 'number' || !res || !res.success) return;
            setMovies(() => res.movies);
        });
    }, [qDebounce]);

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
                <MSearch />
                <ListMaker on='movie' movies={movies} />
            </div>
        </div>
    );
};

export default OSearch;
