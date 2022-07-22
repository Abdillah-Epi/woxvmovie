import React from 'react';

import { TitleAnimation } from './motion';
import { LocationGenerics } from '../../../router';
import { useNavigate } from '@tanstack/react-location';
import NavLinks from './NavLinks';
import LoggedNav from './LoggedNav';
import logo from '../../../assets/images/full-logo.svg';

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
        <div className='flex h-[10%] w-full items-center justify-between'>
            <LoggedNav>
                <NavLinks links={links}>
                    <TitleAnimation>
                        <div className='pl-8 sm:p-8'>
                            <img
                                onClick={() => navigate({ to: '/app' })}
                                src={logo}
                                className={'w-40 cursor-pointer sm:w-[200px]'}
                                width={200}
                                height={200}
                            />
                        </div>
                    </TitleAnimation>
                </NavLinks>
            </LoggedNav>
        </div>
    );
};

export default Nav;
