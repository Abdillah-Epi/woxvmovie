import { useRecoilValue } from "recoil";
import { FavoritesAtom } from "../../../store/movies";
import ListMaker from "../../molecules/ListMaker";
import Nav from "../../molecules/Nav";

const OFavorites = () => {
    const movies = useRecoilValue(FavoritesAtom);

    return (
        <section className='h-[100vh] w-screen sm:h-[70vh] xl:h-screen'>
            <div className='space-y h-full w-full overflow-y-scroll bg-black/80  p-10'>
                <div className='h-[10%]'>
                    <Nav
                        styles={"flex space-x-10 items-center justify-between xl:w-[30%]"}
                        fontSize='sm:text-4xl text-2xl'
                        links={true}
                        animation={false}
                    />
                </div>
                <div className='flex flex-col items-start justify-center space-y-6 xl:pl-20'>
                    {movies && <ListMaker movies={movies} />}
                </div>
            </div>
        </section>
    );
};

export default OFavorites;
