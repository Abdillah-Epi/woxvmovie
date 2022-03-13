import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import ChooseCategories from './components/pages/ChooseCategories';
import Details from './components/pages/Details';
import Favorites from './components/pages/Favorites';
import Home from './components/pages/Home';
import Landing from './components/pages/Landing';
import OAuth2 from './components/pages/OAuth2';
import Playlist from './components/pages/Playlist';
import PlaylistView from './components/pages/PlaylistView';
import ResetPassword from './components/pages/ResetPassword/Index';
import Search from './components/pages/Search';
import SendRequest from './components/pages/SendRequest';
import Signin from './components/pages/Signin/Index';
import Signup from './components/pages/Signup/Index';
import Views from './components/pages/Views';
import { BackgroundFetching } from './components/templates/Home';
import useAutoAuth from './hooks/useAutoAuth';
import { routeStatusAtom } from './store/auth';

export const AuthWatcher = () => {
    useAutoAuth();
    return <div></div>;
};

const App = () => {
    const location = useLocation();
    const status = useRecoilValue(routeStatusAtom);

    return (
        <>
            <Suspense fallback={<div></div>}>
                <AuthWatcher />
            </Suspense>
            {status === 'public' && (
                <AnimateSharedLayout>
                    <AnimatePresence exitBeforeEnter>
                        <Routes location={location} key={location.pathname}>
                            <Route path='/' element={<Landing />} />
                            <Route path='/signin' element={<Signin />} />
                            <Route path='/signup' element={<Signup />} />
                            <Route path='/password_update/:token' element={<ResetPassword />} />
                            <Route path='/reset-password' element={<SendRequest />} />
                            <Route path='/signup/oauth2/:token' element={<OAuth2 />} />
                            <Route path='/signin/oauth2/:token' element={<OAuth2 />} />
                            <Route path='/*' element={<Landing />} />
                        </Routes>
                    </AnimatePresence>
                </AnimateSharedLayout>
            )}
            {status === 'success' && (
                <>
                    <Suspense fallback={<div></div>}>
                        <BackgroundFetching />
                    </Suspense>
                    <AnimateSharedLayout>
                        <AnimatePresence exitBeforeEnter>
                            <Routes location={location} key={location.pathname}>
                                <Route path='/genres' element={<ChooseCategories />} />
                                <Route path='/' element={<Home />} />
                                <Route path='/details' element={<Details />} />
                                <Route path='/views' element={<Views />} />
                                <Route path='/favorites' element={<Favorites />} />
                                <Route path='/playlist' element={<Playlist />} />
                                <Route path='/playlist/view/:id' element={<PlaylistView />} />
                                <Route path='/search' element={<Search />} />
                            </Routes>
                        </AnimatePresence>
                    </AnimateSharedLayout>
                </>
            )}
        </>
    );
};

export default App;
