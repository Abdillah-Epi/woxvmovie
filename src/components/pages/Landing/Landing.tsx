import React from 'react';
import LandingPage from '../../templates/LandingPage';
import FeaturesWalkThrough from '../../organisms/FeaturesWalkThrough';
import FAQ from '../../organisms/FAQ';
import Footer from '../../organisms/Footer';
import { Navigate } from '@tanstack/react-location';
import { routeStatusAtom } from '../../../store/auth';
import { useRecoilValue } from 'recoil';
import cover from '../../../assets/images/cover.webp';

const Landing: React.FC = () => {
    const status = useRecoilValue(routeStatusAtom);

    if (status === 'success') return <Navigate to={'/app'} />;

    return (
        <LandingPage cover={cover} links={[{ path: '/signin', text: 'Login' }]}>
            <FeaturesWalkThrough />
            <FAQ />
            <Footer />
        </LandingPage>
    );
};

export default Landing;
