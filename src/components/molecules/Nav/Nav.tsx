import React from 'react';

import { TitleAnimation } from './motion';
import { LocationGenerics } from '../../../router';
import { useNavigate } from '@tanstack/react-location';
import Typography from '../../atoms/Typography';
import NavLinks from './NavLinks';
import LoggedNav from './LoggedNav';

type NavProps = {
    links?: {
        text: string;
        color: string;
        path: string;
        styles: string;
    }[];
};

const Nav: React.FC<NavProps> = ({ links }) => {
    const navigate = useNavigate<LocationGenerics>();

    return (
        <div className='flex w-full items-center justify-between'>
            <LoggedNav>
                <NavLinks links={links}>
                    <TitleAnimation>
                        <Typography
                            onClick={() => navigate({ to: '/landing' })}
                            theme='title'
                            title={'WOXVMOVIE'}
                            className={'cursor-pointer text-3xl text-woxvmovie-3 sm:text-6xl xl:text-6xl '}
                        />
                    </TitleAnimation>
                </NavLinks>
            </LoggedNav>
        </div>
    );
};

export default Nav;
