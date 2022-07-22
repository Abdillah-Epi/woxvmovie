import { useNavigate } from '@tanstack/react-location';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { LocationGenerics } from '../router';
import { routeStatusAtom } from '../store/auth';

const useRouteStatus = (s: string = 'public', path: string = '/signin') => {
    const status = useRecoilValue(routeStatusAtom);
    const navigate = useNavigate<LocationGenerics>();

    useEffect(() => {
        if (status === s) {
            navigate({ to: path });
        }
    }, [status]);
};

export default useRouteStatus;
