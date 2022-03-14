import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import useAuth from '../../../hooks/useAuth';
import useBreakpoint from '../../../hooks/useBreakPoint';
import { isClickedAtomFamily } from '../../../store/button';
import Button from '../../atoms/Button';
import Hamburger from '../../atoms/Hamburger';
import Link from '../../atoms/Link';
import Header from '../../atoms/Typography/Header';
import Regular from '../../atoms/Typography/Regular';
import navlinks from './links.json';
import { motion } from 'framer-motion';
import { variantBtn, variantHeader, variantLinks } from './motion';

type Links = {
    text: string;
    color: string;
    path: string;
    styles?: string;
};

type NavProps = {
    hideRightSide?: boolean;
    links?: boolean;
    styles?: string;
    fontSize?: string;
    animation?: boolean;
};

const Nav: React.FC<NavProps> = ({
    hideRightSide = false,
    links = false,
    styles,
    animation = true,
    fontSize = 'sm:text-6xl text-3xl'
}) => {
    const { breakpoint: size } = useBreakpoint();

    const [isHomeClicled, resetHome] = useRecoilState(isClickedAtomFamily('WOXVMOVIE'));
    const [isSigninClicked, resetSigin] = useRecoilState(isClickedAtomFamily('Login'));
    const [isLogoutClicked, resetLogout] = useRecoilState(isClickedAtomFamily('Déconnexion'));
    const [isDeleteClicked, resetDelete] = useRecoilState(isClickedAtomFamily('Delete'));

    const { user, logout, deleteAccount } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (!isDeleteClicked) return;
        resetDelete(() => false);
        deleteAccount();
        navigate('/');
    }, [isDeleteClicked]);

    useEffect(() => {
        if (!isLogoutClicked) return;
        resetLogout(() => false);
        logout();
        navigate('/');
    }, [isLogoutClicked]);

    useEffect(() => {
        if (!isSigninClicked) return;
        resetSigin(() => false);
        navigate('/signin');
    }, [isSigninClicked]);

    useEffect(() => {
        if (!isHomeClicled) return;
        resetHome(() => false);
        navigate('/');
    }, [isHomeClicled]);

    return (
        <div className='flex w-full items-center justify-between'>
            <motion.div initial='hidden' animate='show' exit='exit' className={`w-[90%] ${styles}`}>
                <motion.div variants={animation ? variantHeader : {}}>
                    <Header styles='cursor-pointer' fontSize={fontSize} text={'WOXVMOVIE'} color={'text-woxvmovie-3'} />
                </motion.div>
                {links && (
                    <>
                        {(size === 'xl' || size === 'lg') && (
                            <motion.div initial='hidden' animate='show' exit='exit' className='flex space-x-8'>
                                {links &&
                                    navlinks.map((link, key) => {
                                        return (
                                            <motion.div key={key} variants={animation ? variantLinks : {}} custom={key}>
                                                <Link
                                                    id='nav'
                                                    path={link.path}
                                                    text={link.text}
                                                    styles={link.styles}
                                                    color={link.color}
                                                />
                                            </motion.div>
                                        );
                                    })}
                            </motion.div>
                        )}
                    </>
                )}
            </motion.div>
            {!hideRightSide && (
                <motion.div
                    variants={animation ? variantBtn : {}}
                    initial='hidden'
                    animate='show'
                    exit='exit'
                    className='h-7 w-[10%]'
                >
                    {!user
                        ? (size === 'xl' || size === 'lg') && <Button text={'Login'} styles={'rounded-lg'} />
                        : (size === 'xl' || size === 'lg') && (
                              <div className='flex space-x-5'>
                                  <Regular text={'Logout'} styles='font-light cursor-pointer' color='text-white' />
                                  <Regular text={'Delete'} styles='font-bold cursor-pointer' color='text-red-500' />
                              </div>
                          )}
                    {size !== 'xl' && size !== 'lg' && <Hamburger />}
                </motion.div>
            )}
        </div>
    );
};

export default Nav;
