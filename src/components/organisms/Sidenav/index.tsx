import React from 'react';
import { useRecoilState } from 'recoil';
import { SideNavAtom } from '../../../store/LandingPage';
import logo from '../../../assets/images/logo.svg';
import Button from '../../atoms/Button';
import arrowr from '../../../assets/images/arrowr.svg';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

type Item = {
    text: string;
    path: string;
};

type SidenavProps = {
    list: Item[] | null;
};

const variant = {
    hidden: {
        x: -400
    },
    show: {
        x: 0,
        transition: {
            duration: 0.5
        }
    },
    exit: {
        x: -400,
        transition: {
            duration: 0.5
        }
    }
};

const Sidenav: React.FC<SidenavProps> = ({ list = null }) => {
    const [isOpen, OpenSideNav] = useRecoilState(SideNavAtom);
    const navigate = useNavigate();
    return (
        <AnimatePresence exitBeforeEnter>
            {isOpen && (
                <motion.div
                    variants={variant}
                    initial='hidden'
                    animate='show'
                    exit='exit'
                    className='h-screen w-full bg-white'
                >
                    <div className='flex h-full w-full flex-col items-center space-y-28 py-10'>
                        <img className='h-20 w-20' src={logo} alt='' />
                        <div className='w-[99%] space-y-0.5'>
                            {list?.map((item, key) => {
                                return (
                                    <div
                                        onClick={() => {
                                            OpenSideNav(() => false);
                                            navigate(item.path);
                                        }}
                                        key={key}
                                        className='h-12 w-full'
                                    >
                                        <Button
                                            textStyles={{ textPos: 'between', textColor: 'text-white' }}
                                            icon={{ icon: arrowr, pos: 'right' }}
                                            text={item.text}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Sidenav;
