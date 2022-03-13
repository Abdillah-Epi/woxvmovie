import React, { Suspense, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useViews from '../../../hooks/useViews';
import { movieSelectedAtom, ViewsAtom, ViewsAtomFamily } from '../../../store/movies';
import BannerLoader from '../../molecules/BannerLoader';
import Banner from '../../organisms/Banner';
import TDetails from '../../templates/Details';

type DetailsProps = {};

const Details: React.FC<DetailsProps> = () => {
    const selectedMovie = useRecoilValue(movieSelectedAtom);
    const setView = useSetRecoilState(ViewsAtomFamily(selectedMovie ? selectedMovie.id : -1));
    const setMovie = useSetRecoilState(ViewsAtom);

    const navigate = useNavigate();
    const { addToViews } = useViews();

    useEffect(() => {
        if (!selectedMovie) return;
        addToViews(selectedMovie).then(res => {
            if (typeof res === 'number') return;
            if (!res.success) return;
            setView(() => true);
            setMovie(c => [...c, selectedMovie]);
        });
    }, []);

    if (!selectedMovie) {
        navigate('/');
        return <div></div>;
    }

    return (
        <TDetails>
            <Suspense fallback={<BannerLoader />}>
                <Banner movie={selectedMovie} reactions={true} />
            </Suspense>
        </TDetails>
    );
};

export default Details;
