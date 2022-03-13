import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const OAuth2 = () => {
    const param = useParams();
    const { GetAccess } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        GetAccess(param.token!, location.pathname === `/signup/oauth2/${param.token}` ? 'signup' : 'signin').then(
            res => {
                if (typeof res === 'number' || !res.success) navigate('/');
                if (location.pathname === `/signup/oauth2/${param.token}`) {
                    navigate('/genres');
                } else {
                    navigate('/');
                }
            }
        );
    }, []);
    return <div></div>;
};

export default OAuth2;
