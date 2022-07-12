import { useNavigate } from '@tanstack/react-location';
import React from 'react';
import { useRecoilValue } from 'recoil';
import useAuth from '../../../hooks/useAuth';
import { LocationGenerics } from '../../../router';
import { routeStatusAtom } from '../../../store/auth';
import Button from '../../atoms/Button';
import Hamburger from '../../atoms/Hamburger';
import Typography from '../../atoms/Typography';
import { LoggedNavAnimation } from './motion';

const LoggedNav: React.FC = ({ children }) => {
    const status = useRecoilValue(routeStatusAtom);
    const navigate = useNavigate<LocationGenerics>();
    const { logout, deleteAccount } = useAuth();

    const DeleteAccount = () => {
        deleteAccount();
        navigate({ to: '/landing' });
    };

    const Logout = () => {
        logout();
        navigate({ to: '/landing' });
    };

    return (
        <>
            {children}
            <LoggedNavAnimation className='h-7 w-[10%]'>
                {status === 'public' ? (
                    <Button
                        onClick={() => navigate({ to: '/signin' })}
                        theme='primary'
                        title={'Connectez-vous'}
                        className={'rounded-lg'}
                    />
                ) : (
                    <div className='flex space-x-5'>
                        <Typography
                            onClick={() => Logout()}
                            title={'Déconnexion'}
                            className='cursor-pointer font-light text-white'
                        />
                        <Typography
                            onClick={() => DeleteAccount()}
                            title={'Supprimer'}
                            className='cursor-pointer font-bold text-red-500'
                        />
                    </div>
                )}
                {<Hamburger className='lg:hidden' />}
            </LoggedNavAnimation>
        </>
    );
};

export default LoggedNav;
