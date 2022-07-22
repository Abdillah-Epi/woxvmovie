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

type LoggedNavProps = React.HTMLAttributes<HTMLDivElement>;

const LoggedNav: React.FC<LoggedNavProps> = ({ children }) => {
    const status = useRecoilValue(routeStatusAtom);
    const navigate = useNavigate<LocationGenerics>();
    const { logout, deleteAccount } = useAuth();

    const DeleteAccount = () => {
        deleteAccount();
    };

    const Logout = () => {
        logout();
    };

    return (
        <>
            {children}
            <LoggedNavAnimation className='h-7 w-[10%]'>
                {status !== 'public' && (
                    <div className='hidden xl:flex space-x-5'>
                        <Typography
                            onClick={() => Logout()}
                            title={'Logout'}
                            className='cursor-pointer font-light text-white'
                        />
                        <Typography
                            onClick={() => DeleteAccount()}
                            title={'Delete'}
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
