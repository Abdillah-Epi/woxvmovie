import { useRecoilValue } from 'recoil';
import { ViewsAtom } from '../../../store/movies';
import ListMaker from '../../molecules/ListMaker';
import Nav from '../../molecules/Nav';
import view from '../../../assets/images/views.svg';

const OViews = () => {
    const movies = useRecoilValue(ViewsAtom);

    return typeof movies === 'number' ? (
        <></>
    ) : (
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
                {movies.length && <ListMaker movies={movies} />}
                {!movies.length && (
                    <div className='flex h-full w-full items-center justify-center'>
                        <img className='w-1/2' src={view} alt='' />
                    </div>
                )}
            </div>
        </div>
    );
};

export default OViews;
