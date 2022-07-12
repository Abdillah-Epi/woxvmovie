import { Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import { AnimatePresence } from 'framer-motion';
import { Outlet } from '@tanstack/react-location';

import useAutoAuth from './hooks/useAutoAuth';

import { routeStatusAtom } from './store/auth';

export const AuthWatcher = () => {
    useAutoAuth();
    return <div></div>;
};

const App = () => {
    const status = useRecoilValue(routeStatusAtom);

    return (
        <>
            {status === 'fetch' && (
                <Suspense fallback={<div></div>}>
                    <AuthWatcher />
                </Suspense>
            )}

            {status !== 'fetch' && (
                <AnimatePresence exitBeforeEnter initial={false}>
                    <Outlet />
                </AnimatePresence>
            )}
        </>
    );
};

export default App;
