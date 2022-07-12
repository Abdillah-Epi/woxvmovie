import React from 'react';
import { useRecoilState } from 'recoil';
import { SideNavAtom } from '../../../store/nav';
import logo from '../../../assets/images/logo.svg';
import Button from '../../atoms/Button';
import arrowr from '../../../assets/images/arrowr.svg';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from '@tanstack/react-location';
import { LocationGenerics } from '../../../router';
import { SlideAnimation } from './motion';

export type Links = {
    text: string;
    path: string;
};

type SidenavProps = {
    links: Links[];
};

const Sidenav: React.FC<SidenavProps> = ({ links = [] }) => {
    const [isOpen, OpenSideNav] = useRecoilState(SideNavAtom);
    const navigate = useNavigate<LocationGenerics>();
    return (
        <AnimatePresence exitBeforeEnter>
            {isOpen && (
                <SlideAnimation className='h-screen w-full bg-white'>
                    <div className='flex h-full w-full flex-col items-center space-y-28 py-10'>
                        <img className='h-20 w-20' src={logo} alt='' />
                        <div className='w-[99%] space-y-0.5'>
                            {links.map((item, key) => {
                                return (
                                    <div
                                        onClick={() => {
                                            OpenSideNav(() => false);
                                            navigate({ to: item.path });
                                        }}
                                        key={key}
                                        className='h-12 w-full'
                                    >
                                        <Button title={item.text} theme='primary' />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </SlideAnimation>
            )}
        </AnimatePresence>
    );
};

export default Sidenav;
