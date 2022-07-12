import { useMatch, useNavigate } from '@tanstack/react-location';
import { useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import { LocationGenerics } from '../../../router';

const OAuth2 = () => {
    const param = useMatch<LocationGenerics>().params;
    const { getAccess, error } = useAuth();
    const navigate = useNavigate<LocationGenerics>();
    const location = useMatch<LocationGenerics>();

    useEffect(() => {
        getAccess(param.token!, location.pathname === `/signup/oauth2/${param.token}` ? 'signup' : 'signin').then(
            res => {
                if (res && !res.success) navigate({ to: '/landing' });
                if (location.pathname === `/signup/oauth2/${param.token}`) {
                    navigate({ to: '/genres' });
                } else {
                    navigate({ to: '/landing' });
                }
            }
        );
    }, []);
    return <div></div>;
};

export default OAuth2;
